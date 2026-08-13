/** Loopback-only Connection RPC for durable eye-care preferences. */
import type { Context } from '@deepseek-ai/cordis';
import type { ConnectionRpcHandler } from '@deepseek-ai/dsh-client-connection';
import { type EyeCareSettingsSnapshot } from './shared.ts';
/** Host backend used by the loopback-only Connection RPC registration. */
export declare class EyeCareRpcBackend {
    private readonly ctx;
    /** Create a backend over the active Settings service. */
    constructor(ctx: Context);
    /** Read the current browser-safe settings snapshot. */
    snapshot(): EyeCareSettingsSnapshot;
    /** Handle one Connection RPC endpoint. */
    readonly handle: ConnectionRpcHandler;
}
/** Register the RPC channel when the Web Connection Host is composed. */
export declare function installEyeCareRpc(ctx: Context): void;
//# sourceMappingURL=rpc.d.ts.map