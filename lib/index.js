/** DSH eye-care Host plugin: settings ownership and loopback RPC transport. */
import { installEyeCareRpc } from "./rpc.js";
import { EYE_CARE_SETTINGS_NS, EyeCareSettingsSchema } from "./settings.js";
export { DEFAULT_EYE_CARE_SETTINGS, EYE_CARE_INTENSITIES, EYE_CARE_MODES, EYE_CARE_SETTINGS_NAMESPACE, EYE_CARE_RPC_CHANNEL, EYE_CARE_RPC_READ, EYE_CARE_RPC_SAVE, } from "./shared.js";
export { EYE_CARE_SETTINGS_NS, EyeCareSettingsSchema } from "./settings.js";
export { EyeCareRpcBackend } from "./rpc.js";
/** Required Host capability. */
export const inject = ['settings'];
/** Register the durable namespace and the optional loopback browser transport. */
export function apply(ctx) {
    ctx.settings.register(EYE_CARE_SETTINGS_NS, EyeCareSettingsSchema);
    installEyeCareRpc(ctx);
}
//# sourceMappingURL=index.js.map