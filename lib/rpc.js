/** Loopback-only Connection RPC for durable eye-care preferences. */
import { SettingsConflictError } from '@deepseek-ai/dsh-settings';
import { decodeEyeCareSettings, EYE_CARE_RPC_CHANNEL, EYE_CARE_RPC_READ, EYE_CARE_RPC_SAVE, } from "./shared.js";
import { EYE_CARE_SETTINGS_NS } from "./settings.js";
import { installLoopbackTransport } from "./transport.js";
function descriptorOf(ctx) {
    const descriptor = ctx.settings.describe().find(row => row.ns === EYE_CARE_SETTINGS_NS || String(row.ns) === 'dsh-eye-care');
    if (descriptor === undefined)
        throw new Error('eye-care settings namespace is not registered');
    return descriptor;
}
function baseThemePreferenceOf(ctx) {
    const descriptor = ctx.settings.describe().find(row => String(row.ns) === 'ui-theme');
    if (typeof descriptor?.value !== 'object' || descriptor.value === null || Array.isArray(descriptor.value))
        return undefined;
    const preference = descriptor.value['preference'];
    return preference === 'light' || preference === 'dark' || preference === 'system' ? preference : undefined;
}
function parseWriteRequest(value) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        throw new TypeError('request must be an object');
    }
    const record = value;
    const settings = decodeEyeCareSettings(record['value']);
    const revision = record['expectedRevision'];
    if (!Number.isSafeInteger(revision) || revision < 0 || settings === undefined) {
        throw new TypeError('save requires a non-negative expectedRevision and a valid eye-care value');
    }
    return { expectedRevision: revision, value: settings };
}
function publicMessage(error) {
    return (error instanceof Error ? error.message : String(error)).slice(0, 1000);
}
/** Host backend used by the loopback-only Connection RPC registration. */
export class EyeCareRpcBackend {
    ctx;
    /** Create a backend over the active Settings service. */
    constructor(ctx) {
        this.ctx = ctx;
    }
    /** Read the current browser-safe settings snapshot. */
    snapshot() {
        const descriptor = descriptorOf(this.ctx);
        const baseThemePreference = baseThemePreferenceOf(this.ctx);
        return {
            schemaVersion: 1,
            writable: this.ctx.settings.writable,
            settings: {
                value: descriptor.value,
                revision: descriptor.revision,
                applies: 'live',
            },
            ...(baseThemePreference === undefined ? {} : { baseThemePreference }),
        };
    }
    /** Handle one Connection RPC endpoint. */
    handle = async (endpoint, payload) => {
        if (endpoint === EYE_CARE_RPC_READ) {
            return { ok: true, value: this.snapshot() };
        }
        if (endpoint !== EYE_CARE_RPC_SAVE) {
            return {
                ok: false,
                error: {
                    code: 'bad-request',
                    message: `unknown eye-care endpoint: ${endpoint}`,
                    details: { issues: [] },
                },
            };
        }
        let request;
        try {
            request = parseWriteRequest(payload);
        }
        catch (error) {
            return {
                ok: false,
                error: {
                    code: 'bad-request',
                    message: publicMessage(error),
                    details: { issues: [] },
                },
            };
        }
        try {
            if (!this.ctx.settings.writable)
                throw new Error('settings provider is read-only');
            await this.ctx.settings.replace(descriptorOf(this.ctx).ns, request.value, request.expectedRevision);
            return { ok: true, value: this.snapshot() };
        }
        catch (error) {
            if (error instanceof SettingsConflictError) {
                return {
                    ok: false,
                    error: {
                        code: 'settings-conflict',
                        message: publicMessage(error),
                        details: {
                            ns: String(EYE_CARE_SETTINGS_NS),
                            expected: error.expected,
                            actual: error.actual,
                        },
                    },
                };
            }
            return {
                ok: false,
                error: {
                    code: 'settings-rejected',
                    message: publicMessage(error),
                    details: { ns: String(EYE_CARE_SETTINGS_NS) },
                },
            };
        }
    };
}
/** Register the RPC channel when the Web Connection Host is composed. */
export function installEyeCareRpc(ctx) {
    const backend = new EyeCareRpcBackend(ctx);
    ctx.inject(['connection'], (connectionCtx) => {
        if (typeof connectionCtx.connection.requestRejection === 'function') {
            installLoopbackTransport(connectionCtx, backend.handle);
            return;
        }
        const legacy = connectionCtx.connection;
        legacy.rpc.handle(EYE_CARE_RPC_CHANNEL, backend.handle, { authority: 'loopback' });
    });
}
//# sourceMappingURL=rpc.js.map