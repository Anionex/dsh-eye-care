import { Context } from '@deepseek-ai/cordis'
import { describe, expect, it } from 'vitest'
import Settings, { settingsNamespace, type SettingsNamespace } from 'dsh-settings-legacy'
import { EYE_CARE_SETTINGS_NS, EyeCareSettingsSchema } from '../src/settings.ts'
import { apply } from '../src/index.ts'

class MemorySettings extends Settings {
  readonly writable = true
  protected load(): Promise<Record<string, unknown>> { return Promise.resolve({}) }
  protected persist(_ns: SettingsNamespace, _section: Record<string, unknown>): Promise<void> { return Promise.resolve() }
}

describe('eye-care Host registration', () => {
  it('registers the namespace and removes it with the plugin fiber', async () => {
    const ctx = new Context()
    await ctx.plugin(MemorySettings).await()
    const fiber = ctx.plugin({ inject: ['settings'], apply })
    await fiber.await()
    expect(ctx.settings.get(EYE_CARE_SETTINGS_NS)).toEqual({ mode: 'off', intensity: 'balanced' })
    expect(EyeCareSettingsSchema.toJSON()).toBeDefined()
    await fiber.dispose()
    expect(ctx.settings.describe().map(row => row.ns)).not.toContain(EYE_CARE_SETTINGS_NS)
  })

  it('keeps the Host namespace branded separately from the browser string', () => {
    expect(EYE_CARE_SETTINGS_NS).toBe(settingsNamespace('eye-care'))
  })
})
