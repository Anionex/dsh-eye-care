import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('eye-care package layout', () => {
  it('declares the modern dsh.client row and portable package exports', async () => {
    const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8')) as Record<string, unknown>
    const dsh = packageJson['dsh'] as Record<string, unknown>
    expect(packageJson['name']).toBe('@anionex/dsh-eye-care')
    expect(packageJson['private']).not.toBe(true)
    expect((packageJson['repository'] as Record<string, unknown>)['url']).toBe('git+https://github.com/Anionex/dsh-eye-care.git')
    expect(dsh['client']).toMatchObject({ platform: 'web' })
    expect(packageJson['dshClient']).toBeUndefined()
    expect(packageJson['main']).toBe('./lib/index.js')
    expect((packageJson['exports'] as Record<string, unknown>)['./client']).toMatchObject({ default: './lib/client.js' })
  })

  it('emits a loader-compatible client bundle with no raw TS relative imports', async () => {
    const source = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')
    expect(source).toContain('window.__ModuleLoader__.load')
    expect(source).toContain('"@anionex/dsh-eye-care"')
    expect(source).not.toMatch(/from ['"]\.\.?\/[^'"]+\.tsx?['"]/)
  })

  it('ships the profile patch and license in the package file list', async () => {
    const patch = await readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
    expect(patch).toContain('@anionex/dsh-eye-care')
    expect(await readFile(join(new URL('../', import.meta.url).pathname, 'LICENSE'), 'utf8')).toContain('MIT License')
  })
})
