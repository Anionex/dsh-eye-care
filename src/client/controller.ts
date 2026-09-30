/** Eye-care state owner: durable settings synchronization plus theme lifecycle. */

import type { ClientConnectionRpc } from '@deepseek-ai/dsh-client-connection/client'
import { createSnapshotStore, type SnapshotStore } from '@deepseek-ai/dsh-client-store'
import type { ThemeRuntime, ThemeSnapshot } from '@deepseek-ai/dsh-client-ui-theme/client'
import {
  DEFAULT_EYE_CARE_SETTINGS,
  decodeEyeCareSnapshot,
  EYE_CARE_RPC_CHANNEL,
  EYE_CARE_RPC_READ,
  EYE_CARE_RPC_SAVE,
  type EyeCareIntensity,
  type EyeCareMode,
  type EyeCareSettings,
  type EyeCareSettingsSnapshot,
} from '../shared.ts'
import {
  EYE_CARE_THEMES,
  eyeCareThemeId,
  isEyeCareThemeId,
} from './themes.ts'

/** State consumed by the General-settings row. */
export interface EyeCareState {
  /** Current eye-care selection. */
  settings: EyeCareSettings
  /** Persistence lifecycle. */
  status: 'loading' | 'ready' | 'saving' | 'unavailable' | 'error'
  /** Whether the Host settings document can be written. */
  writable: boolean
  /** Host namespace revision for the next write. */
  revision: number | undefined
  /** User-facing read or write failure, when one stands. */
  error: string | null
}

/** Inputs isolated for deterministic controller tests. */
export interface EyeCareControllerOptions {
  /** DSH theme registry. */
  theme: Pick<ThemeRuntime, 'getTheme' | 'setTheme' | 'register'> & Partial<Pick<ThemeRuntime, 'overrideTokens'>>
  /** Snapshot change subscription. */
  subscribeTheme(listener: (snapshot: ThemeSnapshot) => void): () => void
  /** Loopback-only Connection RPC; absent remote browsers stay process-local. */
  rpc?: ClientConnectionRpc
  /** System dark-mode sensor. */
  media?: MediaQueryList
  /** Monotonic wall-clock source used only by the one-shot startup adoption fence. */
  now?: () => number
}

const INITIAL_STATE: EyeCareState = {
  settings: { ...DEFAULT_EYE_CARE_SETTINGS },
  status: 'loading',
  writable: false,
  revision: undefined,
  error: null,
}

/** Maximum delay accepted for ui-theme's already-started Host adoption. */
const STARTUP_BASE_THEME_GRACE_MS = 1000

function sameSettings(left: EyeCareSettings, right: EyeCareSettings): boolean {
  return left.mode === right.mode && left.intensity === right.intensity
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

/** Stateful controller shared by theme listeners and the Settings row. */
export class EyeCareController {
  /** Reactive row source. */
  readonly store: SnapshotStore<EyeCareState> = createSnapshotStore(INITIAL_STATE)

  private readonly theme: EyeCareControllerOptions['theme']
  private readonly rpc: ClientConnectionRpc | undefined
  private readonly media: MediaQueryList | undefined
  private readonly now: () => number
  private readonly unregisterThemes: Array<() => void> = []
  private unsubscribeTheme: (() => void) | undefined
  private unsubscribeMedia: (() => void) | undefined
  private tail: Promise<void> = Promise.resolve()
  private disposeTask: Promise<void> | undefined
  private pendingSettings: EyeCareSettings | undefined
  private disposed = false
  private applyingTheme = 0
  private restoreTheme = 'system'
  private hasRestoreTheme = false
  private acceptedRemoteSnapshot = false
  private startupBaseTheme: 'light' | 'dark' | 'system' | undefined
  private startupBaseThemeDeadline = 0
  private removeTokenLayer: (() => void) | undefined
  private activeBaseTheme: string | undefined

  /**
   * Register the concrete themes and lifecycle listeners.
   * @param options - theme, transport, and system-scheme collaborators.
   */
  constructor(options: EyeCareControllerOptions) {
    this.theme = options.theme
    this.rpc = options.rpc
    this.now = options.now ?? Date.now
    this.media = options.media ?? (typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : undefined)
    const currentTheme = this.theme.getTheme().preference
    if (!isEyeCareThemeId(currentTheme)) {
      this.restoreTheme = currentTheme
      this.hasRestoreTheme = true
    }
    try {
      for (const definition of EYE_CARE_THEMES) {
        this.unregisterThemes.push(this.theme.register(definition))
      }
      this.unsubscribeTheme = options.subscribeTheme(snapshot => { this.onThemeChanged(snapshot) })
      if (this.media !== undefined) {
        const media = this.media
        const listener = (): void => {
          if (!this.disposed && this.store.getSnapshot().settings.mode === 'auto') this.applyCurrentTheme()
        }
        media.addEventListener('change', listener)
        this.unsubscribeMedia = () => { media.removeEventListener('change', listener) }
      }
    } catch (error) {
      for (const unregister of this.unregisterThemes.splice(0).reverse()) unregister()
      throw error
    }
  }

  /**
   * Load durable settings without blocking plugin activation.
   * @returns settlement after this read reaches the serialized transport queue.
   */
  load(): Promise<void> {
    if (this.rpc === undefined) {
      this.setUnavailable()
      return Promise.resolve()
    }
    if (this.store.getSnapshot().revision === undefined) {
      this.store.update(state => {
        state.status = 'loading'
        state.error = null
      })
    }
    return this.enqueue(async () => { await this.readRemote() })
  }

  /**
   * Select a mode and persist the latest selection when Host settings are writable.
   * @param mode - next operating mode.
   * @returns settlement after the serialized persistence attempt.
   */
  setMode(mode: EyeCareMode): Promise<void> {
    return this.select({ ...this.store.getSnapshot().settings, mode })
  }

  /**
   * Select a warmth and persist the latest selection when Host settings are writable.
   * @param intensity - next warmth level.
   * @returns settlement after the serialized persistence attempt.
   */
  setIntensity(intensity: EyeCareIntensity): Promise<void> {
    return this.select({ ...this.store.getSnapshot().settings, intensity })
  }

  /** Queue a refresh after a Host settings invalidation. */
  refresh(): void {
    void this.load()
  }

  /**
   * Reach transport quiescence, restore the user's live non-eye-care theme, and unregister all resources.
   * @returns settlement after cleanup completes.
   */
  dispose(): Promise<void> {
    return this.disposeTask ??= this.disposeOnce()
  }

  private async disposeOnce(): Promise<void> {
    this.disposed = true
    this.pendingSettings = undefined

    const failures: unknown[] = []
    for (const unsubscribe of [this.unsubscribeMedia, this.unsubscribeTheme]) {
      if (unsubscribe === undefined) continue
      try { unsubscribe() } catch (error) { failures.push(error) }
    }
    this.unsubscribeMedia = undefined
    this.unsubscribeTheme = undefined

    await this.tail

    const current = this.theme.getTheme()
    this.removeTokenLayer?.()
    this.removeTokenLayer = undefined
    if (isEyeCareThemeId(current.preference) || current.preference === this.activeBaseTheme) {
      try {
        this.setTheme(this.resolveRestoreTheme())
      } catch (error) {
        failures.push(error)
        try { this.setTheme('system') } catch (fallbackError) { failures.push(fallbackError) }
      }
    }
    for (const unregister of this.unregisterThemes.splice(0).reverse()) {
      try { unregister() } catch (error) { failures.push(error) }
    }
    if (failures.length > 0) throw new AggregateError(failures, 'eye-care cleanup failed')
  }

  private enqueue(operation: () => Promise<void>): Promise<void> {
    if (this.disposed) return Promise.resolve()
    const task = this.tail.then(async () => {
      if (!this.disposed) await operation()
    })
    this.tail = task.catch(() => {})
    return task
  }

  private select(settings: EyeCareSettings): Promise<void> {
    if (this.disposed) return Promise.resolve()
    const previous = this.store.getSnapshot().settings
    if (previous.mode === 'off' && settings.mode !== 'off') this.captureRestoreTheme()
    this.store.update(state => {
      state.settings = settings
      state.error = null
      if (state.status === 'error') state.status = state.revision === undefined ? 'unavailable' : 'ready'
    })
    this.applyCurrentTheme()
    return this.persist(settings)
  }

  private persist(settings: EyeCareSettings): Promise<void> {
    const state = this.store.getSnapshot()
    if (this.rpc === undefined) {
      this.setUnavailable(state.error)
      return Promise.resolve()
    }
    if (state.revision !== undefined && !state.writable) {
      this.setUnavailable(state.error)
      return Promise.resolve()
    }
    this.pendingSettings = { mode: settings.mode, intensity: settings.intensity }
    if (this.theme.overrideTokens !== undefined && settings.mode !== 'off'
      && (this.restoreTheme === 'light' || this.restoreTheme === 'dark' || this.restoreTheme === 'system')) {
      this.pendingSettings.restoreTheme = this.restoreTheme
    }
    return this.enqueue(async () => { await this.flushPending() })
  }

  private async flushPending(): Promise<void> {
    while (!this.disposed && this.pendingSettings !== undefined) {
      const desired = this.pendingSettings
      this.pendingSettings = undefined

      let state = this.store.getSnapshot()
      if (state.revision === undefined) {
        if (this.pendingSettings === undefined) this.pendingSettings = desired
        if (!await this.readRemote()) return
        continue
      }
      if (!state.writable || state.revision === undefined) {
        this.setUnavailable(state.error)
        return
      }

      this.store.update(next => {
        next.status = 'saving'
        next.error = null
      })
      let response: Awaited<ReturnType<ClientConnectionRpc['call']>>
      try {
        const rpc = this.rpc
        if (rpc === undefined) return
        response = await rpc.call(EYE_CARE_RPC_CHANNEL, EYE_CARE_RPC_SAVE, {
          expectedRevision: state.revision,
          value: desired,
        })
      } catch (error) {
        if (!this.disposed) this.setUnavailable(messageOf(error))
        return
      }
      if (this.disposed) return
      if (!response.ok) {
        if (response.error.code === 'settings-conflict') {
          const latest = this.pendingSettings ?? desired
          this.pendingSettings = latest
          if (!await this.readRemote()) return
          if (this.disposed) return
          continue
        }
        this.setUnavailable(response.error.message)
        return
      }
      const snapshot = decodeEyeCareSnapshot(response.value)
      if (snapshot === undefined) {
        this.store.update(next => {
          next.status = 'error'
          next.error = 'eye-care Settings returned an invalid save response'
        })
        return
      }
      const preserveSettings = this.pendingSettings !== undefined
        || !sameSettings(this.store.getSnapshot().settings, desired)
      this.accept(snapshot, preserveSettings)
    }
  }

  private async readRemote(): Promise<boolean> {
    let response: Awaited<ReturnType<ClientConnectionRpc['call']>>
    try {
      const rpc = this.rpc
      if (rpc === undefined) return false
      response = await rpc.call(EYE_CARE_RPC_CHANNEL, EYE_CARE_RPC_READ, {})
    } catch (error) {
      if (!this.disposed) this.setUnavailable(messageOf(error), true)
      return false
    }
    if (this.disposed) return false
    if (!response.ok) {
      this.setUnavailable(response.error.message, true)
      return false
    }
    const snapshot = decodeEyeCareSnapshot(response.value)
    if (snapshot === undefined) {
      this.store.update(state => {
        state.status = 'error'
        state.error = 'eye-care Settings returned an invalid read response'
      })
      return false
    }
    this.accept(snapshot, this.pendingSettings !== undefined)
    return true
  }

  private accept(snapshot: EyeCareSettingsSnapshot, preserveSettings: boolean): void {
    const previous = this.store.getSnapshot().settings
    const next = preserveSettings ? previous : snapshot.settings.value
    const firstRemote = !this.acceptedRemoteSnapshot
    this.acceptedRemoteSnapshot = true

    if (next.mode === 'off') {
      this.startupBaseTheme = undefined
      this.startupBaseThemeDeadline = 0
      if (!this.hasRestoreTheme && snapshot.baseThemePreference !== undefined) {
        this.restoreTheme = snapshot.baseThemePreference
        this.hasRestoreTheme = true
      }
    } else if (firstRemote) {
      const base = next.restoreTheme ?? snapshot.baseThemePreference
      if (base === undefined) {
        if (!this.hasRestoreTheme) this.captureRestoreTheme()
      } else {
        this.restoreTheme = base
        this.hasRestoreTheme = true
        if (this.theme.getTheme().preference !== base) {
          this.startupBaseTheme = base
          this.startupBaseThemeDeadline = this.now() + STARTUP_BASE_THEME_GRACE_MS
        }
      }
    } else if (!preserveSettings && previous.mode === 'off') {
      this.captureRestoreTheme(snapshot.baseThemePreference)
    }

    this.store.set({
      settings: next,
      status: snapshot.writable ? 'ready' : 'unavailable',
      writable: snapshot.writable,
      revision: snapshot.settings.revision,
      error: null,
    })
    this.applyCurrentTheme()
  }

  private setUnavailable(error: string | null = null, clearRevision = false): void {
    this.store.update(state => {
      state.status = 'unavailable'
      state.writable = false
      if (clearRevision) state.revision = undefined
      state.error = error
    })
  }

  private captureRestoreTheme(fallback?: 'light' | 'dark' | 'system'): void {
    const preference = this.theme.getTheme().preference
    const candidate = isEyeCareThemeId(preference) ? fallback ?? 'system' : preference
    this.restoreTheme = candidate
    this.hasRestoreTheme = true
  }

  private resolveRestoreTheme(): string {
    if (!this.hasRestoreTheme || this.restoreTheme === 'system') return 'system'
    return this.theme.getTheme().themes.some(theme => theme.id === this.restoreTheme)
      ? this.restoreTheme
      : 'system'
  }

  private applyCurrentTheme(): void {
    const { mode, intensity } = this.store.getSnapshot().settings
    const current = this.theme.getTheme().preference
    if (mode === 'off') {
      this.applyingTheme += 1
      try {
        this.removeTokenLayer?.()
        this.removeTokenLayer = undefined
        if (isEyeCareThemeId(current) || current === this.activeBaseTheme) this.setTheme(this.resolveRestoreTheme())
        this.activeBaseTheme = undefined
      } finally { this.applyingTheme -= 1 }
      this.hasRestoreTheme = false
      return
    }
    if (!this.hasRestoreTheme) this.captureRestoreTheme()
    const scheme = mode === 'auto' ? (this.media?.matches === true ? 'dark' : 'light') : mode
    // ConfigForms hosts re-adopt their durable built-in preference on every
    // settings refresh. Use the public token layer so warmth survives adoption.
    if (this.theme.overrideTokens !== undefined) {
      const definition = EYE_CARE_THEMES.find(theme => theme.id === eyeCareThemeId(scheme, intensity))!
      const tokens = Object.fromEntries(Object.entries(definition.tokens).map(([name, value]) => [name, { light: value, dark: value }]))
      this.applyingTheme += 1
      try {
        this.activeBaseTheme = mode === 'auto' ? 'system' : mode
        this.removeTokenLayer = this.theme.overrideTokens('@anionex/dsh-eye-care', tokens)
        this.setTheme(this.activeBaseTheme)
      } finally { this.applyingTheme -= 1 }
      return
    }
    this.setTheme(eyeCareThemeId(scheme, intensity))
  }

  private setTheme(id: string): void {
    if (this.theme.getTheme().preference === id) return
    this.applyingTheme += 1
    try {
      this.theme.setTheme(id)
    } finally {
      this.applyingTheme -= 1
    }
  }

  private onThemeChanged(snapshot: ThemeSnapshot): void {
    if (this.disposed || this.applyingTheme > 0 || isEyeCareThemeId(snapshot.preference)) return
    if (snapshot.preference === this.activeBaseTheme) return
    if (this.startupBaseTheme !== undefined) {
      const expected = this.startupBaseTheme
      const withinStartupWindow = this.now() <= this.startupBaseThemeDeadline
      this.startupBaseTheme = undefined
      this.startupBaseThemeDeadline = 0
      if (withinStartupWindow && snapshot.preference === expected) {
        this.restoreTheme = expected
        this.hasRestoreTheme = true
        this.applyCurrentTheme()
        return
      }
    }
    const state = this.store.getSnapshot()
    if (state.settings.mode === 'off') return
    this.restoreTheme = snapshot.preference
    this.hasRestoreTheme = true
    const settings = { ...state.settings, mode: 'off' as const }
    this.store.update(next => {
      next.settings = settings
      next.error = null
    })
    this.applyCurrentTheme()
    void this.persist(settings)
  }
}
