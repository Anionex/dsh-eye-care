import { createServer, request, type RequestListener } from 'node:http'
import { afterEach, expect, it, vi } from 'vitest'
import { installLoopbackTransport, loopbackAuthority } from '../src/transport.ts'

const cleanup: Array<() => Promise<void>> = []
afterEach(async () => { for (const close of cleanup.splice(0)) await close() })

it('keeps the modern authenticated RPC local and rejects invalid envelopes', async () => {
  let route: RequestListener = (_req, res) => { res.writeHead(404).end() }
  const dispose = vi.fn()
  let remove: (() => void) | undefined
  const ctx: any = {
    connection: { operator: {}, requestRejection: (req: any) => req.headers.authorization === 'fixture' ? undefined : 401 },
    webServer: { register: (entry: any) => { route = entry.handler; return dispose } },
    effect: (fn: () => () => void) => { remove = fn() },
    inject: (_names: string[], fn: (ctx: unknown) => void) => fn(ctx),
  }
  const handle = vi.fn(async () => ({ ok: true as const, value: { mode: 'off' } }))
  installLoopbackTransport(ctx, handle)
  const server = createServer((req, res) => { void route(req, res) })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  cleanup.push(() => new Promise<void>(resolve => server.close(() => resolve())))
  const port = (server.address() as { port: number }).port
  const send = (auth: string, host: string, body: object) => new Promise<{ code: number; body: string }>((resolve, reject) => {
    const req = request({ hostname: '127.0.0.1', port, path: '/eye-care/settings.read', method: 'POST', headers: { authorization: auth, host, 'content-type': 'application/json' } }, res => {
      let output = ''; res.on('data', chunk => { output += chunk }); res.on('end', () => resolve({ code: res.statusCode!, body: output }))
    })
    req.on('error', reject); req.end(JSON.stringify(body))
  })
  const envelope = { type: 'client-request', rpcId: 'fixture', method: 'settings.read', payload: {} }
  expect((await send('', 'localhost', envelope)).code).toBe(401)
  expect((await send('fixture', 'remote.example', envelope)).code).toBe(403)
  expect((await send('fixture', 'localhost', {})).code).toBe(400)
  const ok = await send('fixture', 'localhost', envelope)
  expect(ok.code).toBe(200)
  expect(JSON.parse(ok.body)).toMatchObject({ rpcId: 'fixture', result: { ok: true, value: { mode: 'off' } } })
  expect(handle).toHaveBeenCalledOnce()
  remove?.(); expect(dispose).toHaveBeenCalledOnce()
})

it('classifies only loopback authorities as local', () => {
  for (const host of ['localhost:3080', '127.0.0.1:3080', '[::1]:3080']) expect(loopbackAuthority(host)).toBe(true)
  for (const host of [undefined, 'example.com', '127.0.0.1.example.com']) expect(loopbackAuthority(host)).toBe(false)
})
