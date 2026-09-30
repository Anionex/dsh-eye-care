/** Browser-safe eye-care settings and RPC wire values. */
/** User-selectable eye-care operating modes. */
export const EYE_CARE_MODES = ['off', 'auto', 'light', 'dark'];
/** Warmth levels shared by light and dark palettes. */
export const EYE_CARE_INTENSITIES = ['soft', 'balanced', 'warm'];
/** Settings namespace owned by this package. */
export const EYE_CARE_SETTINGS_NAMESPACE = 'eye-care';
/** Loopback-only Connection RPC channel owned by this package. */
export const EYE_CARE_RPC_CHANNEL = '/eye-care';
/** RPC endpoint that reads the current settings snapshot. */
export const EYE_CARE_RPC_READ = 'settings.read';
/** RPC endpoint that replaces the settings section. */
export const EYE_CARE_RPC_SAVE = 'settings.save';
/** Settings field carrying the selected mode. */
export const MODE_FIELD = 'mode';
/** Settings field carrying the selected warmth. */
export const INTENSITY_FIELD = 'intensity';
/** Defaults used when no user section exists. */
export const DEFAULT_EYE_CARE_SETTINGS = Object.freeze({
    mode: 'off',
    intensity: 'balanced',
});
/** Narrow an unknown value to one supported mode. */
export function isEyeCareMode(value) {
    return EYE_CARE_MODES.some(mode => mode === value);
}
/** Narrow an unknown value to one supported warmth. */
export function isEyeCareIntensity(value) {
    return EYE_CARE_INTENSITIES.some(intensity => intensity === value);
}
/** Decode a complete settings value from the RPC boundary. */
export function decodeEyeCareSettings(value) {
    if (typeof value !== 'object' || value === null || Array.isArray(value))
        return undefined;
    const record = value;
    if (!isEyeCareMode(record[MODE_FIELD]) || !isEyeCareIntensity(record[INTENSITY_FIELD]))
        return undefined;
    const restoreTheme = record['restoreTheme'];
    if (restoreTheme !== undefined && restoreTheme !== 'light' && restoreTheme !== 'dark' && restoreTheme !== 'system')
        return undefined;
    return { mode: record[MODE_FIELD], intensity: record[INTENSITY_FIELD], ...(restoreTheme === undefined ? {} : { restoreTheme }) };
}
/** Decode one complete Host snapshot from the RPC boundary. */
export function decodeEyeCareSnapshot(value) {
    if (typeof value !== 'object' || value === null || Array.isArray(value))
        return undefined;
    const record = value;
    const settingsEnvelope = record['settings'];
    if (record['schemaVersion'] !== 1 || typeof record['writable'] !== 'boolean'
        || typeof settingsEnvelope !== 'object' || settingsEnvelope === null || Array.isArray(settingsEnvelope))
        return undefined;
    const settingsRecord = settingsEnvelope;
    const settings = decodeEyeCareSettings(settingsRecord['value']);
    const revision = settingsRecord['revision'];
    if (settings === undefined || !Number.isSafeInteger(revision) || revision < 0
        || settingsRecord['applies'] !== 'live')
        return undefined;
    const baseThemePreference = record['baseThemePreference'];
    if (baseThemePreference !== undefined
        && baseThemePreference !== 'light' && baseThemePreference !== 'dark' && baseThemePreference !== 'system')
        return undefined;
    return {
        schemaVersion: 1,
        writable: record['writable'],
        settings: {
            value: settings,
            revision: revision,
            applies: 'live',
        },
        ...(baseThemePreference === undefined ? {} : { baseThemePreference }),
    };
}
//# sourceMappingURL=shared.js.map