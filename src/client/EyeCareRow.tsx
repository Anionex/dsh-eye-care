/** General-settings row for eye-care mode and warmth controls. */

import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { EyeCareController } from './controller.ts'
import type { EyeCareKey } from './locales.ts'
import type { EyeCareIntensity, EyeCareMode } from '../shared.ts'
import css from './EyeCareRow.module.css'

/** Injected business face used by the row. */
export interface EyeCareRowInjected {
  /** State source. */
  hooks: { eyeCare: EyeCareController['store'] }
  /** Set the selected mode. */
  setMode: (mode: EyeCareMode) => Promise<void>
  /** Set the selected warmth. */
  setIntensity: (intensity: EyeCareIntensity) => Promise<void>
}

/** Full composed props for the settings slot. */
export type EyeCareRowProps = PropsRuntime<'settings.general.item'>
  & PropsLocale<'settings.eyeCare'>
  & InjectFace<EyeCareRowInjected>

const MODES: readonly { id: EyeCareMode; label: EyeCareKey }[] = [
  { id: 'off', label: 'mode.off' },
  { id: 'auto', label: 'mode.auto' },
  { id: 'light', label: 'mode.light' },
  { id: 'dark', label: 'mode.dark' },
]

const INTENSITIES: readonly { id: EyeCareIntensity; label: EyeCareKey }[] = [
  { id: 'soft', label: 'intensity.soft' },
  { id: 'balanced', label: 'intensity.balanced' },
  { id: 'warm', label: 'intensity.warm' },
]

function statusKey(mode: EyeCareMode): EyeCareKey {
  return `status.${mode}` as EyeCareKey
}

/** Render the feature-owned General settings row. */
export function EyeCareRow({ t, useEyeCare, setMode, setIntensity }: EyeCareRowProps) {
  const state = useEyeCare(value => value)
  const busy = state.status === 'loading' || state.status === 'saving'
  const status = state.status === 'error' && state.error !== null ? state.error : t(statusKey(state.settings.mode))
  const statusText = state.status === 'unavailable' ? `${status} · ${t('status.local')}` : status
  return (
    <section className={css.row} aria-labelledby="dsh-eye-care-title">
      <div className={css.copy}>
        <h3 id="dsh-eye-care-title" className={css.title}>{t('title')}</h3>
        <p className={css.description}>{t('description')}</p>
      </div>
      <div className={css.controls}>
        <div className={css.controlGroup} role="group" aria-label={t('title')}>
          {MODES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`${css.option}${state.settings.mode === id ? ` ${css.selected}` : ''}`}
              aria-pressed={state.settings.mode === id}
              disabled={busy}
              onClick={() => { void setMode(id) }}
            >
              {t(label)}
            </button>
          ))}
        </div>
        <div className={css.intensityLine}>
          <span className={css.intensityLabel}>{t('intensity.title')}</span>
          <div className={css.controlGroup} role="group" aria-label={t('intensity.title')}>
            {INTENSITIES.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`${css.smallOption}${state.settings.intensity === id ? ` ${css.selected}` : ''}`}
                aria-pressed={state.settings.intensity === id}
                disabled={busy}
                onClick={() => { void setIntensity(id) }}
              >
                {t(label)}
              </button>
            ))}
          </div>
        </div>
        <div className={css.status} aria-live="polite">
          {state.status === 'saving' ? t('status.saving') : statusText}
        </div>
      </div>
    </section>
  )
}
