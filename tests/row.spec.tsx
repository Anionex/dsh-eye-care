// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { bindSnapshotSelector } from '@deepseek-ai/dsh-client-web-react'
import { createSnapshotStore } from '@deepseek-ai/dsh-client-runtime/client'
import { EyeCareRow } from '../src/client/EyeCareRow.tsx'
import type { EyeCareState } from '../src/client/controller.ts'

afterEach(cleanup)

const copy: Record<string, string> = {
  title: '护眼模式',
  description: '暖色主题',
  'mode.off': '关闭', 'mode.auto': '自动', 'mode.light': '日间', 'mode.dark': '夜间',
  'intensity.title': '暖色强度', 'intensity.soft': '柔和', 'intensity.balanced': '均衡', 'intensity.warm': '温暖',
  'status.off': '已关闭', 'status.auto': '自动', 'status.light': '日间', 'status.dark': '夜间',
  'status.local': '仅当前浏览器有效', 'status.saving': '正在保存',
}

function mount() {
  const state: EyeCareState = {
    settings: { mode: 'off', intensity: 'balanced' }, status: 'ready', writable: true, revision: 1, error: null,
  }
  const store = createSnapshotStore(state)
  const setMode = vi.fn(async () => {})
  const setIntensity = vi.fn(async () => {})
  render(<EyeCareRow
    useEyeCare={bindSnapshotSelector(store)}
    setMode={setMode}
    setIntensity={setIntensity}
    t={(key: string) => copy[key] ?? key}
  />)
  return { setMode, setIntensity }
}

describe('EyeCareRow', () => {
  it('renders four mode controls, three intensity controls, and accessible pressed state', () => {
    mount()
    expect(screen.getAllByRole('button')).toHaveLength(7)
    expect(screen.getByRole('button', { name: '关闭' }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('button', { name: '自动' }).getAttribute('aria-pressed')).toBe('false')
  })

  it('routes mode and intensity button clicks', () => {
    const b = mount()
    fireEvent.click(screen.getByRole('button', { name: '夜间' }))
    fireEvent.click(screen.getByRole('button', { name: '温暖' }))
    expect(b.setMode).toHaveBeenCalledWith('dark')
    expect(b.setIntensity).toHaveBeenCalledWith('warm')
  })
})
