/** DSH eye-care Host plugin: settings ownership and loopback RPC transport. */

import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-settings'
import { installEyeCareRpc } from './rpc.ts'
import { EYE_CARE_SETTINGS_NS, EyeCareSettingsSchema } from './settings.ts'

export {
  DEFAULT_EYE_CARE_SETTINGS,
  EYE_CARE_INTENSITIES,
  EYE_CARE_MODES,
  EYE_CARE_SETTINGS_NAMESPACE,
  EYE_CARE_RPC_CHANNEL,
  EYE_CARE_RPC_READ,
  EYE_CARE_RPC_SAVE,
  type EyeCareIntensity,
  type EyeCareMode,
  type EyeCareSettings,
} from './shared.ts'
export { EYE_CARE_SETTINGS_NS, EyeCareSettingsSchema } from './settings.ts'
export { Config } from './settings.ts'
export { EyeCareRpcBackend } from './rpc.ts'

/** Required Host capability. */
export const inject = ['settings']

/** Register the durable namespace and the optional loopback browser transport. */
export function apply(ctx: Context): void {
  const settings = ctx.settings as unknown as { register?: (ns: string, schema: typeof EyeCareSettingsSchema) => unknown }
  settings.register?.(EYE_CARE_SETTINGS_NS, EyeCareSettingsSchema)
  installEyeCareRpc(ctx)
}
