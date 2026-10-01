import { describe, expect, it, vi } from 'vitest'
import { EyeCareController } from '../src/client/controller.ts'
import { EYE_CARE_THEMES, eyeCareThemeId } from '../src/client/themes.ts'
import {
  EYE_CARE_RPC_CHANNEL,
  EYE_CARE_RPC_READ,
  EYE_CARE_RPC_SAVE,
  type EyeCareSettingsSnapshot,
} from '../src/shared.ts'

interface FakeMedia extends MediaQueryList {
  flip(value: boolean): void
  listenerCount(): number
}

function media(matches = false): FakeMedia {
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  const value = {
    matches,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
      listeners.add(listener as (event: MediaQueryListEvent) => void)
    },
    removeEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
      listeners.delete(listener as (event: MediaQueryListEvent) => void)
    },
    dispatchEvent: () => true,
    flip(next: boolean) {
      value.matches = next
      for (const listener of listeners) listener({ matches: next } as MediaQueryListEvent)
    },
    listenerCount() {
      return listeners.size
    },
  }
  return value as FakeMedia
}

interface HarnessOptions {
  preference?: string
  basePreference?: 'light' | 'dark' | 'system'
  settings?: { mode: 'off' | 'auto' | 'light' | 'dark'; intensity: 'soft' | 'balanced' | 'warm' }
  rpc?: boolean
  media?: FakeMedia
  now?: () => number
  deferSave?: boolean
  tokenLayers?: boolean
}

function harness(options: HarnessOptions = {}) {
  let preference = options.preference ?? 'system'
  const basePreference = options.basePreference ?? preference
  let themeRevision = 1
  let settingsRevision = 1
  let settings = options.settings ?? { mode: 'off' as const, intensity: 'balanced' as const }
  const listeners = new Set<(snapshot: { preference: string; active: (typeof EYE_CARE_THEMES)[number] }) => void>()
  const unsubscribeTheme = vi.fn(() => { listeners.clear() })
  const unregisterThemes: Array<ReturnType<typeof vi.fn>> = []
  const theme = {
    ...(options.tokenLayers ? { overrideTokens: vi.fn(() => vi.fn()) } : {}),
    getTheme: vi.fn(() => ({
      preference,
      active: EYE_CARE_THEMES.find(theme => theme.id === preference) ?? { id: preference, colorScheme: 'light', tokens: {} },
      themes: EYE_CARE_THEMES,
      revision: themeRevision,
    })),
    setTheme: vi.fn((id: string) => {
      preference = id
      themeRevision += 1
      const snapshot = theme.getTheme()
      for (const listener of listeners) listener(snapshot as never)
    }),
    register: vi.fn((definition: (typeof EYE_CARE_THEMES)[number]) => {
      const unregister = vi.fn()
      unregisterThemes.push(unregister)
      return unregister
    }),
  }
  const snapshot = (): EyeCareSettingsSnapshot => ({
    schemaVersion: 1,
    writable: true,
    settings: { value: settings, revision: settingsRevision, applies: 'live' },
    baseThemePreference: basePreference,
  })
  const calls: Array<{ endpoint: string; payload: unknown }> = []
  let releaseSave: (() => void) | undefined
  const rpc = options.rpc === false ? undefined : {
    call: vi.fn(async (_channel: string, endpoint: string, payload: unknown) => {
      calls.push({ endpoint, payload })
      if (endpoint === EYE_CARE_RPC_READ) return { ok: true as const, value: snapshot() }
      if (options.deferSave === true) {
        await new Promise<void>(resolve => { releaseSave = resolve })
      }
      const request = payload as { expectedRevision: number; value: typeof settings }
      expect(request.expectedRevision).toBe(settingsRevision)
      settings = request.value
      settingsRevision += 1
      return { ok: true as const, value: snapshot() }
    }),
  }
  const sensor = options.media ?? media()
  const controller = new EyeCareController({
    theme,
    rpc,
    media: sensor,
    now: options.now,
    subscribeTheme: listener => {
      listeners.add(listener as never)
      return unsubscribeTheme
    },
  })
  return {
    controller,
    theme,
    rpc,
    calls,
    getSettings: () => settings,
    media: sensor,
    releaseSave: () => releaseSave?.(),
    unsubscribeTheme,
    unregisterThemes,
  }
}

describe('EyeCareController', () => {
  it('keeps a token layer through ConfigForms adoption and removes it on Appearance opt-out', async () => {
    const b = harness({ tokenLayers: true })
    await b.controller.load()
    await b.controller.setMode('light')
    b.theme.setTheme('light')
    expect(b.controller.store.getSnapshot().settings.mode).toBe('light')
    expect(b.theme.overrideTokens).toHaveBeenCalled()
    expect(b.getSettings().mode).toBe('light')
    b.theme.setTheme('dark')
    await vi.waitFor(() => { expect(b.getSettings().mode).toBe('off') })
    await b.controller.dispose()
  })

  it('restores the original Appearance after a token-layer host reload', async () => {
    const b = harness({ tokenLayers: true })
    await b.controller.load()
    await b.controller.setMode('dark')
    expect(b.getSettings()).toMatchObject({ restoreTheme: 'system' })
    const restored = harness({ tokenLayers: true, preference: 'dark', settings: b.getSettings() })
    await restored.controller.load()
    await restored.controller.setMode('off')
    expect(restored.theme.getTheme().preference).toBe('system')
    await restored.controller.dispose()
    await b.controller.dispose()
  })

  it('loads and follows auto mode when the system scheme changes', async () => {
    const sensor = media(false)
    const b = harness({ settings: { mode: 'auto', intensity: 'soft' }, media: sensor })
    await b.controller.load()
    expect(b.controller.store.getSnapshot().settings.mode).toBe('auto')
    expect(b.theme.setTheme).toHaveBeenCalledWith(eyeCareThemeId('light', 'soft'))
    sensor.flip(true)
    expect(b.theme.setTheme).toHaveBeenCalledWith(eyeCareThemeId('dark', 'soft'))
    await b.controller.dispose()
  })

  it('treats a post-start native Appearance change as an explicit opt-out', async () => {
    const b = harness({ settings: { mode: 'light', intensity: 'balanced' }, preference: 'system' })
    await b.controller.load()
    expect(b.theme.getTheme().preference).toBe(eyeCareThemeId('light', 'balanced'))
    b.theme.setTheme('dark')
    await vi.waitFor(() => { expect(b.getSettings().mode).toBe('off') })
    expect(b.controller.store.getSnapshot().settings.mode).toBe('off')
    await b.controller.dispose()
  })

  it('stays enabled when the already-matching base theme is reported at startup', async () => {
    const b = harness({ preference: 'light', settings: { mode: 'light', intensity: 'balanced' } })
    await b.controller.load()
    expect(b.theme.getTheme().preference).toBe(eyeCareThemeId('light', 'balanced'))
    expect(b.controller.store.getSnapshot().settings.mode).toBe('light')
    await b.controller.dispose()
  })

  it('adopts a base theme that converges inside the startup grace window', async () => {
    const clock = { now: 0 }
    const b = harness({
      preference: 'system',
      basePreference: 'dark',
      settings: { mode: 'light', intensity: 'warm' },
      now: () => clock.now,
    })
    await b.controller.load()
    expect(b.theme.getTheme().preference).toBe(eyeCareThemeId('light', 'warm'))
    clock.now = 999
    b.theme.setTheme('dark')
    expect(b.theme.getTheme().preference).toBe(eyeCareThemeId('light', 'warm'))
    expect(b.controller.store.getSnapshot().settings.mode).toBe('light')
    expect(b.calls.filter(call => call.endpoint === EYE_CARE_RPC_SAVE)).toHaveLength(0)
    await b.controller.dispose()
  })

  it.each(['light', 'dark', 'system'] as const)(
    'turns eye care off after the startup window when Appearance selects %s',
    async selection => {
      const clock = { now: 0 }
      const b = harness({
        preference: 'system',
        basePreference: 'dark',
        settings: { mode: 'light', intensity: 'balanced' },
        now: () => clock.now,
      })
      await b.controller.load()
      clock.now = 1001
      b.theme.setTheme(selection)
      await vi.waitFor(() => { expect(b.getSettings().mode).toBe('off') })
      expect(b.controller.store.getSnapshot().settings.mode).toBe('off')
      await b.controller.dispose()
    },
  )

  it('serializes rapid mode and intensity changes and preserves the latest intent', async () => {
    const b = harness()
    await b.controller.load()
    const first = b.controller.setMode('dark')
    const second = b.controller.setIntensity('warm')
    await Promise.all([first, second])
    expect(b.getSettings()).toEqual({ mode: 'dark', intensity: 'warm' })
    expect(b.calls.filter(call => call.endpoint === EYE_CARE_RPC_SAVE)).toHaveLength(1)
    expect(b.calls.at(-1)?.payload).toEqual({
      expectedRevision: expect.any(Number),
      value: { mode: 'dark', intensity: 'warm' },
    })
    await b.controller.dispose()
  })

  it('does not use Host RPC for a process-local controller', async () => {
    const b = harness({ rpc: false })
    await b.controller.load()
    await b.controller.setMode('light')
    expect(b.controller.store.getSnapshot().status).toBe('unavailable')
    expect(b.theme.setTheme).toHaveBeenCalledWith(eyeCareThemeId('light', 'balanced'))
    await b.controller.dispose()
  })

  it('waits for an in-flight save before dispose settles and publishes nothing after that save', async () => {
    const b = harness({ deferSave: true })
    await b.controller.load()
    const saving = b.controller.setMode('dark')
    await vi.waitFor(() => { expect(b.calls.some(call => call.endpoint === EYE_CARE_RPC_SAVE)).toBe(true) })
    let settled = false
    const disposing = b.controller.dispose()
    void disposing.finally(() => { settled = true })
    await Promise.resolve()
    expect(settled).toBe(false)

    const callsBeforeRelease = b.theme.setTheme.mock.calls.length
    b.releaseSave()
    await Promise.all([saving, disposing])
    expect(settled).toBe(true)
    expect(b.theme.setTheme.mock.calls.slice(callsBeforeRelease)).toEqual([['system']])
    await expect(b.controller.dispose()).resolves.toBeUndefined()
  })

  it('stops publishing state, applying themes, and starting writes after dispose', async () => {
    const sensor = media()
    const b = harness({ media: sensor })
    await b.controller.load()
    await b.controller.setMode('light')
    await b.controller.dispose()

    const state = b.controller.store.getSnapshot()
    const saveCount = b.calls.filter(call => call.endpoint === EYE_CARE_RPC_SAVE).length
    const themeCount = b.theme.setTheme.mock.calls.length
    await b.controller.setMode('dark')
    sensor.flip(true)
    b.theme.setTheme('dark')

    expect(b.controller.store.getSnapshot()).toBe(state)
    expect(b.calls.filter(call => call.endpoint === EYE_CARE_RPC_SAVE)).toHaveLength(saveCount)
    expect(b.theme.setTheme.mock.calls).toHaveLength(themeCount + 1)
    expect(sensor.listenerCount()).toBe(0)
  })

  it('unregisters every eye-care theme and removes both subscriptions on dispose', async () => {
    const sensor = media()
    const b = harness({ media: sensor })
    await b.controller.load()
    await b.controller.dispose()

    expect(b.theme.register).toHaveBeenCalledTimes(EYE_CARE_THEMES.length)
    expect(b.unregisterThemes).toHaveLength(EYE_CARE_THEMES.length)
    for (const unregister of b.unregisterThemes) expect(unregister).toHaveBeenCalledTimes(1)
    expect(b.unsubscribeTheme).toHaveBeenCalledTimes(1)
    expect(sensor.listenerCount()).toBe(0)
  })

  it('restores a missing third-party theme safely during dispose', async () => {
    const b = harness({ preference: 'custom-theme', settings: { mode: 'light', intensity: 'soft' } })
    await b.controller.load()
    b.theme.getTheme.mockReturnValue({
      ...b.theme.getTheme(),
      preference: eyeCareThemeId('light', 'soft'),
      themes: EYE_CARE_THEMES,
    } as never)
    await expect(b.controller.dispose()).resolves.toBeUndefined()
    expect(b.theme.setTheme).toHaveBeenCalledWith('system')
  })
})
