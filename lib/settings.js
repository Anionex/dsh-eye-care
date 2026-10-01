/** Host-only schema and branded namespace for eye-care settings. */
import z from '@deepseek-ai/schemastery';
import SettingsService from '@deepseek-ai/dsh-settings';
import { DEFAULT_EYE_CARE_SETTINGS, EYE_CARE_INTENSITIES, EYE_CARE_MODES, EYE_CARE_SETTINGS_NAMESPACE, INTENSITY_FIELD, MODE_FIELD, } from "./shared.js";
/** Branded settings namespace used by the Host service. */
export const EYE_CARE_SETTINGS_NS = EYE_CARE_SETTINGS_NAMESPACE;
/** Host schema for the eye-care settings section. */
export const EyeCareSettingsSchema = z.object({
    [MODE_FIELD]: z.union([...EYE_CARE_MODES]).default(DEFAULT_EYE_CARE_SETTINGS.mode),
    [INTENSITY_FIELD]: z.union([...EYE_CARE_INTENSITIES]).default(DEFAULT_EYE_CARE_SETTINGS.intensity),
    restoreTheme: z.union(['light', 'dark', 'system']),
});
/** Modern Settings projects live Config fields; legacy hosts register a section. */
export const Config = (() => {
    if (typeof SettingsService.prototype.register === 'function')
        return EyeCareSettingsSchema;
    const schema = new z(EyeCareSettingsSchema.toJSON());
    for (const field of Object.values(schema.dict ?? {}))
        field.meta.volatile = true;
    return schema;
})();
//# sourceMappingURL=settings.js.map