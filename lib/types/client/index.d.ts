/** DSH Web browser half for the eye-care profile bundle. */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
import type { ThemeRuntime } from '@deepseek-ai/dsh-client-ui-theme/client';
import { type EyeCareKey } from './locales.ts';
/** Required browser services. */
export declare const inject: string[];
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** Eye-care General row copy. */
        'settings.eyeCare': EyeCareKey;
    }
}
/** Browser context with the theme service declaration merged by ui-theme. */
type EyeCareClientContext = ClientContext & {
    theme: ThemeRuntime;
};
/** Register settings copy, controller lifecycle, and General row. */
export declare function apply(ctx: EyeCareClientContext): void;
export type { EyeCareRowInjected, EyeCareRowProps } from './EyeCareRow.tsx';
export type { EyeCareState } from './controller.ts';
export { EyeCareController } from './controller.ts';
export { EYE_CARE_THEMES, eyeCareThemeId, isEyeCareThemeId } from './themes.ts';
//# sourceMappingURL=index.d.ts.map