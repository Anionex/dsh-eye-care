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
  'enabled.title': '护眼模式', 'enabled.off': '关闭', 'enabled.on': '开启',
  'advanced.title': '显示方式与暖色强度', 'mode.title': '显示方式',
  'mode.off': '关闭', 'mode.auto': '自动', 'mode.light': '日间', 'mode.dark': '夜间',
  'intensity.title': '暖色强度', 'intensity.soft': '柔和', 'intensity.balanced': '均衡', 'intensity.warm': '温暖',
  'status.off': '已关闭', 'status.auto': '自动', 'status.light': '日间', 'status.dark': '夜间',
  'status.local': '仅当前浏览器有效', 'status.saving': '正在保存',
}

function mount(mode: EyeCareState['settings']['mode'] = 'off') {
  const state: EyeCareState = {
    settings: { mode, intensity: 'balanced' }, status: 'ready', writable: true, revision: 1, error: null,
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
  it('puts the minimum on/off choice first and hides tuning while disabled', () => {
    mount()
    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(screen.getByRole('button', { name: '关闭' }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('button', { name: '开启' }).getAttribute('aria-pressed')).toBe('false')
    expect(screen.queryByText('显示方式与暖色强度')).toBeNull()
  })

  it('enables the recommended automatic mode', () => {
    const b = mount()
    fireEvent.click(screen.getByRole('button', { name: '开启' }))
    expect(b.setMode).toHaveBeenCalledWith('auto')
    expect(b.setIntensity).not.toHaveBeenCalled()
  })

  it('keeps display mode and warmth inside collapsed advanced settings', () => {
    mount('auto')
    const advanced = screen.getByText('显示方式与暖色强度').closest('details')
    if (advanced === null) throw new Error('Advanced eye-care settings were not rendered')
    expect(advanced.open).toBe(false)
    fireEvent.click(screen.getByText('显示方式与暖色强度'))
    expect(advanced.open).toBe(true)
    expect(screen.getByRole('button', { name: '自动' }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('button', { name: '均衡' }).getAttribute('aria-pressed')).toBe('true')
  })
})
