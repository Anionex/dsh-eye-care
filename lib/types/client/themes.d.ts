/** Fixed eye-care themes built from semantic DSH Web tokens. */
import type { ThemeDefinition } from '@deepseek-ai/dsh-client-ui-theme/client';
import type { EyeCareIntensity } from '../shared.ts';
/** Theme id prefix reserved by this package. */
export declare const EYE_CARE_THEME_PREFIX = "eye-care-";
type Scheme = 'light' | 'dark';
/** Build the stable id for one concrete eye-care theme. */
export declare function eyeCareThemeId(scheme: Scheme, intensity: EyeCareIntensity): string;
/** Six concrete themes registered for the two schemes and three warmth levels. */
export declare const EYE_CARE_THEMES: readonly ThemeDefinition[];
/** Whether a theme id is one of this package's registered concrete themes. */
export declare function isEyeCareThemeId(id: string): boolean;
export {};
//# sourceMappingURL=themes.d.ts.map