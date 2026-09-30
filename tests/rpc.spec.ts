import { Context } from '@deepseek-ai/cordis'
import { describe, expect, it, vi } from 'vitest'
import z from '@deepseek-ai/schemastery'
import Settings, { settingsNamespace, type SettingsNamespace } from 'dsh-settings-legacy'
import { SettingsConflictError } from '@deepseek-ai/dsh-settings'
import { EyeCareRpcBackend } from '../src/rpc.ts'
import { EYE_CARE_SETTINGS_NS, EyeCareSettingsSchema } from '../src/settings.ts'
import { EYE_CARE_RPC_READ, EYE_CARE_RPC_SAVE } from '../src/shared.ts'

class MemorySettings extends Settings {
  readonly writable = true
  protected load(): Promise<Record<string, unknown>> { return Promise.resolve({}) }
  protected persist(_ns: SettingsNamespace, _section: Record<string, unknown>): Promise<void> { return Promise.resolve() }
}

async function bench() {
  const ctx = new Context()
  await ctx.plugin(MemorySettings).await()
  ctx.settings.register(EYE_CARE_SETTINGS_NS, EyeCareSettingsSchema)
  ctx.settings.register(settingsNamespace('ui-theme'), z.object({
    preference: z.union(['light', 'dark', 'system']).default('system'),
  }))
  return { ctx, backend: new EyeCareRpcBackend(ctx) }
}

describe('EyeCareRpcBackend', () => {
  it('reads and revision-fences a valid save', async () => {
    const b = await bench()
    const read = await b.backend.handle(EYE_CARE_RPC_READ, {}, new AbortController().signal)
    expect(read).toMatchObject({ ok: true, value: { settings: { value: { mode: 'off', intensity: 'balanced' } } } })
    if (!read.ok) throw new Error('read failed')
    const revision = (read.value as { settings: { revision: number } }).settings.revision
    const saved = await b.backend.handle(EYE_CARE_RPC_SAVE, {
      expectedRevision: revision,
      value: { mode: 'auto', intensity: 'warm' },
    }, new AbortController().signal)
    expect(saved).toMatchObject({ ok: true, value: { settings: { value: { mode: 'auto', intensity: 'warm' } } } })
  })

  it('rejects unknown endpoints and malformed save payloads', async () => {
    const b = await bench()
    expect(await b.backend.handle('unknown', {}, new AbortController().signal)).toMatchObject({
      ok: false, error: { code: 'bad-request' },
    })
    expect(await b.backend.handle(EYE_CARE_RPC_SAVE, { expectedRevision: -1, value: {} }, new AbortController().signal)).toMatchObject({
      ok: false, error: { code: 'bad-request' },
    })
  })

  it('maps revision conflicts to the shared RPC taxonomy', async () => {
    const b = await bench()
    vi.spyOn(b.ctx.settings, 'replace').mockRejectedValueOnce(new SettingsConflictError(EYE_CARE_SETTINGS_NS, 0, 1))
    expect(await b.backend.handle(EYE_CARE_RPC_SAVE, {
      expectedRevision: 0,
      value: { mode: 'dark', intensity: 'soft' },
    }, new AbortController().signal)).toMatchObject({
      ok: false,
      error: { code: 'settings-conflict', details: { ns: 'eye-care', expected: 0, actual: 1 } },
    })
  })
})
