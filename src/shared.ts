/** Browser-safe eye-care settings and RPC wire values. */

/** User-selectable eye-care operating modes. */
export const EYE_CARE_MODES = ['off', 'auto', 'light', 'dark'] as const

/** Warmth levels shared by light and dark palettes. */
export const EYE_CARE_INTENSITIES = ['soft', 'balanced', 'warm'] as const

/** Eye-care operating mode. */
export type EyeCareMode = typeof EYE_CARE_MODES[number]

/** Eye-care warmth level. */
export type EyeCareIntensity = typeof EYE_CARE_INTENSITIES[number]

/** Settings namespace owned by this package. */
export const EYE_CARE_SETTINGS_NAMESPACE = 'eye-care'

/** Loopback-only Connection RPC channel owned by this package. */
export const EYE_CARE_RPC_CHANNEL = '/eye-care'

/** RPC endpoint that reads the current settings snapshot. */
export const EYE_CARE_RPC_READ = 'settings.read'

/** RPC endpoint that replaces the settings section. */
export const EYE_CARE_RPC_SAVE = 'settings.save'

/** Settings field carrying the selected mode. */
export const MODE_FIELD = 'mode'

/** Settings field carrying the selected warmth. */
export const INTENSITY_FIELD = 'intensity'

/** Defaults used when no user section exists. */
export const DEFAULT_EYE_CARE_SETTINGS: Readonly<EyeCareSettings> = Object.freeze({
  mode: 'off',
  intensity: 'balanced',
})

/** Persisted eye-care preferences. */
export interface EyeCareSettings {
  /** Whether eye care is disabled, system-aware, light, or dark. */
  mode: EyeCareMode
  /** Warmth applied by the active eye-care palette. */
  intensity: EyeCareIntensity
  /** Built-in preference to restore after a token-layer host reload. */
  restoreTheme?: 'light' | 'dark' | 'system'
}

/** Browser-safe Host snapshot returned through the loopback RPC channel. */
export interface EyeCareSettingsSnapshot {
  /** Wire schema version for this dedicated endpoint. */
  schemaVersion: 1
  /** Whether the active settings provider accepts writes. */
  writable: boolean
  /** Resolved settings and the revision fencing the next write. */
  settings: {
    value: EyeCareSettings
    revision: number
    applies: 'live'
  }
  /** Durable built-in Appearance preference used to fence startup convergence. */
  baseThemePreference?: 'light' | 'dark' | 'system'
}

/** Revision-fenced write request. */
export interface EyeCareSettingsWriteRequest {
  expectedRevision: number
  value: EyeCareSettings
}

/** Narrow an unknown value to one supported mode. */
export function isEyeCareMode(value: unknown): value is EyeCareMode {
  return EYE_CARE_MODES.some(mode => mode === value)
}

/** Narrow an unknown value to one supported warmth. */
export function isEyeCareIntensity(value: unknown): value is EyeCareIntensity {
  return EYE_CARE_INTENSITIES.some(intensity => intensity === value)
}

/** Decode a complete settings value from the RPC boundary. */
export function decodeEyeCareSettings(value: unknown): EyeCareSettings | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return undefined
  const record = value as Record<string, unknown>
  if (!isEyeCareMode(record[MODE_FIELD]) || !isEyeCareIntensity(record[INTENSITY_FIELD])) return undefined
  const restoreTheme = record['restoreTheme']
  if (restoreTheme !== undefined && restoreTheme !== 'light' && restoreTheme !== 'dark' && restoreTheme !== 'system') return undefined
  return { mode: record[MODE_FIELD], intensity: record[INTENSITY_FIELD], ...(restoreTheme === undefined ? {} : { restoreTheme }) }
}

/** Decode one complete Host snapshot from the RPC boundary. */
export function decodeEyeCareSnapshot(value: unknown): EyeCareSettingsSnapshot | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return undefined
  const record = value as Record<string, unknown>
  const settingsEnvelope = record['settings']
  if (record['schemaVersion'] !== 1 || typeof record['writable'] !== 'boolean'
    || typeof settingsEnvelope !== 'object' || settingsEnvelope === null || Array.isArray(settingsEnvelope)) return undefined
  const settingsRecord = settingsEnvelope as Record<string, unknown>
  const settings = decodeEyeCareSettings(settingsRecord['value'])
  const revision = settingsRecord['revision']
  if (settings === undefined || !Number.isSafeInteger(revision) || (revision as number) < 0
    || settingsRecord['applies'] !== 'live') return undefined
  const baseThemePreference = record['baseThemePreference']
  if (baseThemePreference !== undefined
    && baseThemePreference !== 'light' && baseThemePreference !== 'dark' && baseThemePreference !== 'system') return undefined
  return {
    schemaVersion: 1,
    writable: record['writable'],
    settings: {
      value: settings,
      revision: revision as number,
      applies: 'live',
    },
    ...(baseThemePreference === undefined ? {} : { baseThemePreference }),
  }
}
