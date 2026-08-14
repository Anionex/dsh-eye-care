import { spawn } from 'node:child_process'
import { mkdtemp, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

function run(command: string, args: readonly string[], env: Record<string, string> = {}, timeoutMs = 180000) {
  return new Promise<{ code: number; stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: new URL('../', import.meta.url).pathname,
      env: { ...process.env, ...env },
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let stdout = ''
    let stderr = ''
    child.stdout.setEncoding('utf8').on('data', value => { stdout += value })
    child.stderr.setEncoding('utf8').on('data', value => { stderr += value })
    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      reject(new Error(`${command} timed out\nstdout:\n${stdout}\nstderr:\n${stderr}`))
    }, timeoutMs)
    child.once('error', error => { clearTimeout(timer); reject(error) })
    child.once('close', code => {
      clearTimeout(timer)
      resolve({ code: code ?? -1, stdout, stderr })
    })
  })
}

describe.skipIf(process.env['DSH_EYE_CARE_PROFILE_E2E'] !== '1')('clean eye-care Profile installation', () => {
  const temporary: string[] = []

  afterEach(async () => {
    for (const path of temporary.splice(0)) await rm(path, { recursive: true, force: true })
  })

  it('packs, installs into Web, appears in the composed config, and removes cleanly', async () => {
    const home = await mkdtemp(join(tmpdir(), 'dsh-eye-care-home-'))
    const packing = await mkdtemp(join(tmpdir(), 'dsh-eye-care-pack-'))
    temporary.push(home, packing)

    const packed = await run('pnpm', ['pack', '--pack-destination', packing], {}, 300000)
    expect(packed.code, packed.stderr).toBe(0)
    const tarballs = (await readdir(packing)).filter(file => file.endsWith('.tgz'))
    expect(tarballs).toHaveLength(1)
    const tarball = join(packing, tarballs[0]!)

    const add = await run('dsh', ['plugin', '--profile', 'web', 'add', tarball], { DSH_HOME: home })
    expect(add.code, add.stderr).toBe(0)
    const dump = await run('dsh', ['--profile', 'web', '--dump-config'], { DSH_HOME: home })
    expect(dump.code, dump.stderr).toBe(0)
    expect(dump.stdout).toContain('- id: dsh-eye-care')
    expect(dump.stdout).toContain("name: '@anionex/dsh-eye-care'")

    const remove = await run('dsh', ['plugin', '--profile', 'web', 'remove', '@anionex/dsh-eye-care'], { DSH_HOME: home })
    expect(remove.code, remove.stderr).toBe(0)
    const after = await run('dsh', ['--profile', 'web', '--dump-config'], { DSH_HOME: home })
    expect(after.stdout).not.toContain('@anionex/dsh-eye-care')
  })
})
