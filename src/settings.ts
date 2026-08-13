/** Host-only schema and branded namespace for eye-care settings. */

import z from '@deepseek-ai/schemastery'
import { settingsNamespace } from '@deepseek-ai/dsh-settings'
import {
  DEFAULT_EYE_CARE_SETTINGS,
  EYE_CARE_INTENSITIES,
  EYE_CARE_MODES,
  EYE_CARE_SETTINGS_NAMESPACE,
  INTENSITY_FIELD,
  MODE_FIELD,
  type EyeCareSettings,
} from './shared.ts'

/** Branded settings namespace used by the Host service. */
export const EYE_CARE_SETTINGS_NS = settingsNamespace(EYE_CARE_SETTINGS_NAMESPACE)

/** Host schema for the eye-care settings section. */
export const EyeCareSettingsSchema: z<EyeCareSettings> = z.object({
  [MODE_FIELD]: z.union([...EYE_CARE_MODES]).default(DEFAULT_EYE_CARE_SETTINGS.mode),
  [INTENSITY_FIELD]: z.union([...EYE_CARE_INTENSITIES]).default(DEFAULT_EYE_CARE_SETTINGS.intensity),
})
