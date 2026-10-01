/** Browser-safe eye-care settings and RPC wire values. */
/** User-selectable eye-care operating modes. */
export declare const EYE_CARE_MODES: readonly ["off", "auto", "light", "dark"];
/** Warmth levels shared by light and dark palettes. */
export declare const EYE_CARE_INTENSITIES: readonly ["soft", "balanced", "warm"];
/** Eye-care operating mode. */
export type EyeCareMode = typeof EYE_CARE_MODES[number];
/** Eye-care warmth level. */
export type EyeCareIntensity = typeof EYE_CARE_INTENSITIES[number];
/** Settings namespace owned by this package. */
export declare const EYE_CARE_SETTINGS_NAMESPACE = "eye-care";
/** Loopback-only Connection RPC channel owned by this package. */
export declare const EYE_CARE_RPC_CHANNEL = "/eye-care";
/** RPC endpoint that reads the current settings snapshot. */
export declare const EYE_CARE_RPC_READ = "settings.read";
/** RPC endpoint that replaces the settings section. */
export declare const EYE_CARE_RPC_SAVE = "settings.save";
/** Settings field carrying the selected mode. */
export declare const MODE_FIELD = "mode";
/** Settings field carrying the selected warmth. */
export declare const INTENSITY_FIELD = "intensity";
/** Defaults used when no user section exists. */
export declare const DEFAULT_EYE_CARE_SETTINGS: Readonly<EyeCareSettings>;
/** Persisted eye-care preferences. */
export interface EyeCareSettings {
    /** Whether eye care is disabled, system-aware, light, or dark. */
    mode: EyeCareMode;
    /** Warmth applied by the active eye-care palette. */
    intensity: EyeCareIntensity;
    /** Built-in preference to restore after a token-layer host reload. */
    restoreTheme?: 'light' | 'dark' | 'system';
}
/** Browser-safe Host snapshot returned through the loopback RPC channel. */
export interface EyeCareSettingsSnapshot {
    /** Wire schema version for this dedicated endpoint. */
    schemaVersion: 1;
    /** Whether the active settings provider accepts writes. */
    writable: boolean;
    /** Resolved settings and the revision fencing the next write. */
    settings: {
        value: EyeCareSettings;
        revision: number;
        applies: 'live';
    };
    /** Durable built-in Appearance preference used to fence startup convergence. */
    baseThemePreference?: 'light' | 'dark' | 'system';
}
/** Revision-fenced write request. */
export interface EyeCareSettingsWriteRequest {
    expectedRevision: number;
    value: EyeCareSettings;
}
/** Narrow an unknown value to one supported mode. */
export declare function isEyeCareMode(value: unknown): value is EyeCareMode;
/** Narrow an unknown value to one supported warmth. */
export declare function isEyeCareIntensity(value: unknown): value is EyeCareIntensity;
/** Decode a complete settings value from the RPC boundary. */
export declare function decodeEyeCareSettings(value: unknown): EyeCareSettings | undefined;
/** Decode one complete Host snapshot from the RPC boundary. */
export declare function decodeEyeCareSnapshot(value: unknown): EyeCareSettingsSnapshot | undefined;
//# sourceMappingURL=shared.d.ts.map