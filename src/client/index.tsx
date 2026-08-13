/** DSH Web browser half for the eye-care profile bundle. */

import type { ConnectionHandle } from '@deepseek-ai/dsh-client-connection/client'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { ThemeRuntime, ThemeSnapshot } from '@deepseek-ai/dsh-client-ui-theme/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-api-remotes/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
import { EyeCareRow, type EyeCareRowInjected } from './EyeCareRow.tsx'
import { EyeCareController } from './controller.ts'
import { en, zh, type EyeCareKey } from './locales.ts'

/** Required browser services. */
export const inject = ['slots', 'locale', 'theme', 'connection', 'remote']

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Eye-care General row copy. */
    'settings.eyeCare': EyeCareKey
  }
}

/** Browser context with the theme service declaration merged by ui-theme. */
type EyeCareClientContext = ClientContext & { theme: ThemeRuntime }

/** Register settings copy, controller lifecycle, and General row. */
export function apply(ctx: EyeCareClientContext): void {
  const theme = ctx.get('theme') as ThemeRuntime
  const connection = ctx.get('connection') as ConnectionHandle
  const controller = new EyeCareController({
    theme,
    ...(connection.isLoopback ? { rpc: connection.rpc } : {}),
    subscribeTheme: (listener: (snapshot: ThemeSnapshot) => void): (() => void) => ctx.on('theme/change', listener),
  })
  ctx.effect(() => ctx.locale.register('settings.eyeCare', { zh, en }), 'dsh-eye-care: dictionaries')
  ctx.effect(() => {
    const refresh = (namespace?: string): void => {
      if (namespace !== undefined && namespace !== 'eye-care') return
      controller.refresh()
    }
    const disposers = [
      ctx.remote.$on('settings/document-updated', refresh),
      ctx.on('connection/reset', () => {
        if (connection.isLoopback) controller.refresh()
      }),
    ]
    void controller.load()
    return async () => {
      for (const dispose of disposers) dispose()
      await controller.dispose()
    }
  }, 'dsh-eye-care: controller lifecycle')

  const injected = (): EyeCareRowInjected => ({
    hooks: { eyeCare: controller.store },
    setMode: mode => controller.setMode(mode),
    setIntensity: intensity => controller.setIntensity(intensity),
  })
  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'eye-care',
    order: 15,
    locale: 'settings.eyeCare',
    inject: injected,
  }, EyeCareRow))
}

export type { EyeCareRowInjected, EyeCareRowProps } from './EyeCareRow.tsx'
export type { EyeCareState } from './controller.ts'
export { EyeCareController } from './controller.ts'
export { EYE_CARE_THEMES, eyeCareThemeId, isEyeCareThemeId } from './themes.ts'
