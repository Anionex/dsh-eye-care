import type { Context } from '@deepseek-ai/cordis';
import type { ConnectionRpcHandler } from '@deepseek-ai/dsh-client-connection';
export declare function loopbackAuthority(authority: string | undefined): boolean;
/** The official Connection still owns authentication and the Host/Origin fence. */
export declare function installLoopbackTransport(ctx: Context, handle: ConnectionRpcHandler): void;
//# sourceMappingURL=transport.d.ts.map