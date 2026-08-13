import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

describe('eye-care client bundle', () => {
  it('contains the loader handoff, settings row, and CSS module runtime', async () => {
    const source = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')
    expect(source).toContain('window.__ModuleLoader__.load')
    expect(source).toContain('dsh-eye-care')
    expect(source).toContain('data-plugin-css')
    expect(source).toContain('aria-pressed')
  })
})
