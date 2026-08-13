import { describe, expect, it } from 'vitest'
import { EYE_CARE_THEMES, eyeCareThemeId } from '../src/client/themes.ts'
import { isEyeCareThemeId } from '../src/client/themes.ts'

function channel(hex: string): number[] {
  const channels = hex.slice(1).match(/../g)
  if (channels === null) throw new Error(`not a hex color: ${hex}`)
  return channels.map(value => Number.parseInt(value, 16) / 255)
}

function luminance(color: string): number {
  const [red, green, blue] = channel(color).map(value =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  return 0.2126 * red! + 0.7152 * green! + 0.0722 * blue!
}

function contrast(left: string, right: string): number {
  const a = luminance(left)
  const b = luminance(right)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

describe('eye-care themes', () => {
  it('ships six unique, stable theme ids', () => {
    expect(EYE_CARE_THEMES).toHaveLength(6)
    expect(new Set(EYE_CARE_THEMES.map(theme => theme.id)).size).toBe(6)
    expect(isEyeCareThemeId('eye-care-light-soft')).toBe(true)
    expect(isEyeCareThemeId('eye-care-light-external')).toBe(false)
    expect(EYE_CARE_THEMES.map(theme => theme.id)).toEqual([
      eyeCareThemeId('light', 'soft'),
      eyeCareThemeId('light', 'balanced'),
      eyeCareThemeId('light', 'warm'),
      eyeCareThemeId('dark', 'soft'),
      eyeCareThemeId('dark', 'balanced'),
      eyeCareThemeId('dark', 'warm'),
    ])
  })

  it('uses semantic tokens without a global image or color filter', () => {
    for (const theme of EYE_CARE_THEMES) {
      expect(Object.keys(theme.tokens)).toContain('--dsw-alias-bg-base')
      expect(JSON.stringify(theme.tokens)).not.toMatch(/filter|sepia/i)
    }
  })

  it('keeps primary text at readable contrast against the base background', () => {
    for (const theme of EYE_CARE_THEMES) {
      expect(contrast(theme.tokens['--dsw-alias-label-primary']!, theme.tokens['--dsw-alias-bg-base']!)).toBeGreaterThanOrEqual(7)
    }
  })
})
