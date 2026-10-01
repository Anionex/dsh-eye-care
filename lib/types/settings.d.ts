/** Host-only schema and branded namespace for eye-care settings. */
import z from '@deepseek-ai/schemastery';
import { type SettingsNamespace } from '@deepseek-ai/dsh-settings';
import { type EyeCareSettings } from './shared.ts';
/** Branded settings namespace used by the Host service. */
export declare const EYE_CARE_SETTINGS_NS: SettingsNamespace;
/** Host schema for the eye-care settings section. */
export declare const EyeCareSettingsSchema: z<EyeCareSettings>;
/** Modern Settings projects live Config fields; legacy hosts register a section. */
export declare const Config: z<EyeCareSettings>;
//# sourceMappingURL=settings.d.ts.map