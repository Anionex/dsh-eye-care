import { EYE_CARE_RPC_CHANNEL, EYE_CARE_RPC_READ, EYE_CARE_RPC_SAVE } from "./shared.js";
export function loopbackAuthority(authority) {
    if (!authority)
        return false;
    try {
        const host = new URL(`http://${authority}`).hostname;
        return host === 'localhost' || host === '[::1]' || /^127\.\d+\.\d+\.\d+$/.test(host);
    }
    catch {
        return false;
    }
}
/** The official Connection still owns authentication and the Host/Origin fence. */
export function installLoopbackTransport(ctx, handle) {
    ctx.inject(['webServer'], web => {
        web.effect(() => web.webServer.register({ kind: 'prefix', path: EYE_CARE_RPC_CHANNEL, handler: async (req, res) => {
                const reject = ctx.connection.requestRejection(req);
                if (reject !== undefined || !loopbackAuthority(req.headers.host)) {
                    res.writeHead(reject ?? 403).end('forbidden');
                    return;
                }
                const endpoint = new URL(req.url ?? '/', 'http://localhost').pathname.slice(EYE_CARE_RPC_CHANNEL.length + 1);
                if (req.method !== 'POST' || ![EYE_CARE_RPC_READ, EYE_CARE_RPC_SAVE].includes(endpoint)) {
                    res.writeHead(404).end('not found');
                    return;
                }
                if (req.headers['content-type']?.split(';')[0]?.trim() !== 'application/json') {
                    res.writeHead(415).end('content type must be application/json');
                    return;
                }
                let size = 0;
                const chunks = [];
                try {
                    for await (const chunk of req) {
                        const bytes = Buffer.from(chunk);
                        size += bytes.length;
                        if (size > 65536) {
                            res.writeHead(413).end('request too large');
                            return;
                        }
                        chunks.push(bytes);
                    }
                    const message = JSON.parse(Buffer.concat(chunks).toString('utf8'));
                    if (message === null || typeof message !== 'object' || !('type' in message) || message.type !== 'client-request'
                        || !('rpcId' in message) || typeof message.rpcId !== 'string' || message.rpcId.length === 0
                        || !('method' in message) || message.method !== endpoint || !('payload' in message)) {
                        res.writeHead(400).end('invalid request');
                        return;
                    }
                    const abort = new AbortController();
                    res.once('close', () => abort.abort());
                    const result = await handle(endpoint, message.payload, abort.signal, ctx.connection.operator);
                    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
                    res.end(JSON.stringify({ type: 'server-response', rpcId: message.rpcId, result }));
                }
                catch {
                    if (!res.headersSent)
                        res.writeHead(400).end('invalid request');
                }
            } }), 'dsh-eye-care: loopback RPC');
    });
}
//# sourceMappingURL=transport.js.map