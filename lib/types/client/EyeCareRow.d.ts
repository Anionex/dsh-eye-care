/** General-settings row for eye-care mode and warmth controls. */
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { EyeCareController } from './controller.ts';
import type { EyeCareIntensity, EyeCareMode } from '../shared.ts';
/** Injected business face used by the row. */
export interface EyeCareRowInjected {
    /** State source. */
    hooks: {
        eyeCare: EyeCareController['store'];
    };
    /** Set the selected mode. */
    setMode: (mode: EyeCareMode) => Promise<void>;
    /** Set the selected warmth. */
    setIntensity: (intensity: EyeCareIntensity) => Promise<void>;
}
/** Full composed props for the settings slot. */
export type EyeCareRowProps = PropsRuntime<'settings.general.item'> & PropsLocale<'settings.eyeCare'> & InjectFace<EyeCareRowInjected>;
/** Render the feature-owned General settings row. */
export declare function EyeCareRow({ t, useEyeCare, setMode, setIntensity }: EyeCareRowProps): import("react").JSX.Element;
//# sourceMappingURL=EyeCareRow.d.ts.map