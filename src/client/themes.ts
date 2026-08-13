/** Fixed eye-care themes built from semantic DSH Web tokens. */

import type { ThemeDefinition, ThemeTokens } from '@deepseek-ai/dsh-client-ui-theme/client'
import type { EyeCareIntensity } from '../shared.ts'

/** Theme id prefix reserved by this package. */
export const EYE_CARE_THEME_PREFIX = 'eye-care-'

type Scheme = 'light' | 'dark'

interface Palette {
  bgBase: string
  bgLayer1: string
  bgLayer2: string
  bgLayer3: string
  bgModule: string
  bgOverlay: string
  textPrimary: string
  textSecondary: string
  textTertiary: string
  textCaption: string
  border1: string
  border2: string
  border3: string
  hover: string
  hoverSolid: string
  active: string
  primaryFill: string
  primaryHover: string
  primaryDimmed: string
  bubble: string
  bubbleHighlight: string
  input: string
  selector: string
  sidebar: string
  sidebarHover: string
  sidebarActive: string
  sidebarAccent: string
  code: string
  codeBanner: string
  inlineCode: string
  scrollbar: string
  scrollbarHover: string
  shiki: {
    constant: string
    string: string
    comment: string
    keyword: string
    parameter: string
    function: string
    stringExpression: string
    punctuation: string
    link: string
  }
}

const LIGHT: Record<EyeCareIntensity, Palette> = {
  soft: {
    bgBase: '#fbf8ef', bgLayer1: '#fffdf6', bgLayer2: '#f8f3e8', bgLayer3: '#f2ecde',
    bgModule: '#f7f2e7', bgOverlay: '#ece4d5', textPrimary: '#29271f', textSecondary: '#575247',
    textTertiary: '#716a5d', textCaption: '#958b7a', border1: 'rgba(85, 72, 46, 0.08)',
    border2: 'rgba(85, 72, 46, 0.15)', border3: 'rgba(85, 72, 46, 0.21)',
    hover: 'rgba(126, 101, 53, 0.08)', hoverSolid: '#f1eadc', active: 'rgba(126, 101, 53, 0.14)',
    primaryFill: '#44583d', primaryHover: '#536a49', primaryDimmed: '#dfe6d9',
    bubble: '#eef3df', bubbleHighlight: '#e0e9cb', input: '#fffdf6', selector: '#f2ecde',
    sidebar: '#f4efe3', sidebarHover: '#ebe4d5', sidebarActive: '#e2dac9', sidebarAccent: '#d6e0c1',
    code: '#f2eee4', codeBanner: '#ebe5d8', inlineCode: '#eee8db', scrollbar: '#d1c6b4',
    scrollbarHover: '#baad98',
    shiki: {
      constant: '#176f88', string: '#34783c', comment: '#817768', keyword: '#a03e58',
      parameter: '#a15b1f', function: '#6950a6', stringExpression: '#2f7040', punctuation: '#5a554d', link: '#246d9a',
    },
  },
  balanced: {
    bgBase: '#faf5e8', bgLayer1: '#fffaf0', bgLayer2: '#f5eddd', bgLayer3: '#eee3d0',
    bgModule: '#f3ead9', bgOverlay: '#e7dbc7', textPrimary: '#2b281f', textSecondary: '#5b5345',
    textTertiary: '#766d5b', textCaption: '#9b8e77', border1: 'rgba(93, 72, 36, 0.09)',
    border2: 'rgba(93, 72, 36, 0.17)', border3: 'rgba(93, 72, 36, 0.24)',
    hover: 'rgba(139, 100, 37, 0.09)', hoverSolid: '#eee3d1', active: 'rgba(139, 100, 37, 0.16)',
    primaryFill: '#425b3c', primaryHover: '#52704a', primaryDimmed: '#dce7d3',
    bubble: '#eaf1d5', bubbleHighlight: '#dce7bc', input: '#fffaf0', selector: '#eee3d0',
    sidebar: '#f1e8d7', sidebarHover: '#e7dcc8', sidebarActive: '#ddd0b9', sidebarAccent: '#d2dfb3',
    code: '#efe9dc', codeBanner: '#e6dece', inlineCode: '#ebe2d1', scrollbar: '#ccbda6',
    scrollbarHover: '#b3a188',
    shiki: {
      constant: '#146d87', string: '#39753b', comment: '#837664', keyword: '#a13e57',
      parameter: '#a1581c', function: '#684ba3', stringExpression: '#34703d', punctuation: '#5d5549', link: '#206c98',
    },
  },
  warm: {
    bgBase: '#f8efda', bgLayer1: '#fff7e7', bgLayer2: '#f2e6d0', bgLayer3: '#eadcc4',
    bgModule: '#f0e3cc', bgOverlay: '#e1d0b5', textPrimary: '#30291f', textSecondary: '#615343',
    textTertiary: '#7c6a56', textCaption: '#a08b70', border1: 'rgba(105, 73, 30, 0.10)',
    border2: 'rgba(105, 73, 30, 0.19)', border3: 'rgba(105, 73, 30, 0.27)',
    hover: 'rgba(151, 97, 27, 0.10)', hoverSolid: '#eadbc2', active: 'rgba(151, 97, 27, 0.18)',
    primaryFill: '#3f5c39', primaryHover: '#506f46', primaryDimmed: '#d8e5ce',
    bubble: '#e6efc9', bubbleHighlight: '#d6e3ac', input: '#fff7e7', selector: '#eadcc4',
    sidebar: '#eee1ca', sidebarHover: '#e3d3b9', sidebarActive: '#d7c4a7', sidebarAccent: '#cedeaa',
    code: '#ece2d1', codeBanner: '#e2d5c0', inlineCode: '#e7dac4', scrollbar: '#c7b398',
    scrollbarHover: '#ad9779',
    shiki: {
      constant: '#116b83', string: '#3e7439', comment: '#85735e', keyword: '#a33b54',
      parameter: '#a25418', function: '#67459e', stringExpression: '#386d39', punctuation: '#625344', link: '#1c6b94',
    },
  },
}

const DARK: Record<EyeCareIntensity, Palette> = {
  soft: {
    bgBase: '#20211c', bgLayer1: '#25261f', bgLayer2: '#2a2b23', bgLayer3: '#313128',
    bgModule: '#2d2e26', bgOverlay: '#3a392e', textPrimary: '#ece9dc', textSecondary: '#c7c1b0',
    textTertiary: '#aaa28f', textCaption: '#7f786a', border1: 'rgba(245, 233, 201, 0.07)',
    border2: 'rgba(245, 233, 201, 0.13)', border3: 'rgba(245, 233, 201, 0.19)',
    hover: 'rgba(244, 227, 182, 0.08)', hoverSolid: '#36362c', active: 'rgba(244, 227, 182, 0.14)',
    primaryFill: '#dfe9cf', primaryHover: '#f1f5e7', primaryDimmed: '#4d5143',
    bubble: '#30372a', bubbleHighlight: '#3d4933', input: '#2b2d25', selector: '#37382e',
    sidebar: '#252820', sidebarHover: '#30342a', sidebarActive: '#3a3e32', sidebarAccent: '#3f4b35',
    code: '#1c1e1b', codeBanner: '#252821', inlineCode: '#292c24', scrollbar: '#57584d',
    scrollbarHover: '#707064',
    shiki: {
      constant: '#68b7d2', string: '#91c88b', comment: '#9d988d', keyword: '#e39aaf',
      parameter: '#e6ad72', function: '#b9a5df', stringExpression: '#9bcf91', punctuation: '#c7c2b7', link: '#77b8d9',
    },
  },
  balanced: {
    bgBase: '#211f19', bgLayer1: '#27231c', bgLayer2: '#2d2921', bgLayer3: '#353027',
    bgModule: '#302b22', bgOverlay: '#40382b', textPrimary: '#efe7d6', textSecondary: '#cbc0aa',
    textTertiary: '#aea087', textCaption: '#837662', border1: 'rgba(250, 230, 190, 0.08)',
    border2: 'rgba(250, 230, 190, 0.15)', border3: 'rgba(250, 230, 190, 0.21)',
    hover: 'rgba(247, 216, 157, 0.09)', hoverSolid: '#3b352b', active: 'rgba(247, 216, 157, 0.16)',
    primaryFill: '#e0ebcf', primaryHover: '#f2f7e6', primaryDimmed: '#505243',
    bubble: '#32392a', bubbleHighlight: '#404c32', input: '#302b23', selector: '#3b352a',
    sidebar: '#282820', sidebarHover: '#33342a', sidebarActive: '#3d3e32', sidebarAccent: '#435036',
    code: '#1d1d19', codeBanner: '#28251f', inlineCode: '#2d2922', scrollbar: '#5b584b',
    scrollbarHover: '#757062',
    shiki: {
      constant: '#69b8d0', string: '#94c985', comment: '#a19a8d', keyword: '#e49aad',
      parameter: '#e7aa6c', function: '#bca2df', stringExpression: '#9dcc89', punctuation: '#cbc2b2', link: '#79b9d5',
    },
  },
  warm: {
    bgBase: '#231e17', bgLayer1: '#2a231b', bgLayer2: '#31291f', bgLayer3: '#3a3025',
    bgModule: '#342b21', bgOverlay: '#46392b', textPrimary: '#f1e4cf', textSecondary: '#cdbb9f',
    textTertiary: '#b09a7e', textCaption: '#857058', border1: 'rgba(255, 225, 177, 0.09)',
    border2: 'rgba(255, 225, 177, 0.17)', border3: 'rgba(255, 225, 177, 0.24)',
    hover: 'rgba(252, 207, 136, 0.10)', hoverSolid: '#403529', active: 'rgba(252, 207, 136, 0.18)',
    primaryFill: '#e1ebcc', primaryHover: '#f3f7e4', primaryDimmed: '#535143',
    bubble: '#353a28', bubbleHighlight: '#444d30', input: '#342a20', selector: '#403428',
    sidebar: '#2b271e', sidebarHover: '#363127', sidebarActive: '#413a2e', sidebarAccent: '#485235',
    code: '#1f1b17', codeBanner: '#2b241d', inlineCode: '#31281f', scrollbar: '#605548',
    scrollbarHover: '#7a6b5b',
    shiki: {
      constant: '#6ab9ce', string: '#98c87e', comment: '#a59a89', keyword: '#e696a8',
      parameter: '#e8a765', function: '#bea0dc', stringExpression: '#a0cb82', punctuation: '#cec0ad', link: '#7bb9d1',
    },
  },
}

/** Build the stable id for one concrete eye-care theme. */
export function eyeCareThemeId(scheme: Scheme, intensity: EyeCareIntensity): string {
  return `${EYE_CARE_THEME_PREFIX}${scheme}-${intensity}`
}

function tokensOf(palette: Palette): ThemeTokens {
  return Object.freeze({
    '--dsw-alias-bg-base': palette.bgBase,
    '--dsw-alias-bg-layer-1': palette.bgLayer1,
    '--dsw-alias-bg-layer-2': palette.bgLayer2,
    '--dsw-alias-bg-layer-3': palette.bgLayer3,
    '--dsw-alias-bg-module-platform': palette.bgModule,
    '--dsw-alias-bg-multi-select': palette.bgModule,
    '--dsw-alias-bg-overlay': palette.bgOverlay,
    '--dsw-alias-bg-skeleton': palette.hover,
    '--dsw-alias-border-l1': palette.border1,
    '--dsw-alias-border-l2-darkmode-thin': palette.border2,
    '--dsw-alias-border-l2': palette.border2,
    '--dsw-alias-border-l3': palette.border3,
    '--dsw-alias-border-l4': palette.border3,
    '--dsw-alias-brand-primary': palette.textPrimary,
    '--dsw-alias-brand-text': palette.textPrimary,
    '--dsw-alias-button-contrast-fill': palette.textSecondary,
    '--dsw-alias-button-elevated-fill': palette.bgLayer3,
    '--dsw-alias-button-floating-fill': palette.bgLayer2,
    '--dsw-alias-button-floating-hover': palette.hoverSolid,
    '--dsw-alias-button-ghost-active-border': palette.textCaption,
    '--dsw-alias-button-ghost-active-fill': palette.active,
    '--dsw-alias-button-ghost-active-hover': palette.hoverSolid,
    '--dsw-alias-button-primary-fill': palette.primaryFill,
    '--dsw-alias-button-primary-hover': palette.primaryHover,
    '--dsw-alias-button-primary-dimmed': palette.primaryDimmed,
    '--dsw-alias-interactive-bg-active': palette.active,
    '--dsw-alias-interactive-bg-hover-accent': palette.active,
    '--dsw-alias-interactive-bg-hover': palette.hover,
    '--dsw-alias-interactive-bg-hover-solid': palette.hoverSolid,
    '--dsw-alias-label-caption': palette.textCaption,
    '--dsw-alias-label-dimmed': palette.border3,
    '--dsw-alias-label-primary-bluish': palette.textPrimary,
    '--dsw-alias-label-primary-dimmed': palette.textPrimary,
    '--dsw-alias-label-primary': palette.textPrimary,
    '--dsw-alias-label-secondary': palette.textSecondary,
    '--dsw-alias-label-tertiary': palette.textTertiary,
    '--dsw-alias-markdown-citation': palette.hoverSolid,
    '--dsw-alias-markdown-code-block-banner': palette.codeBanner,
    '--dsw-alias-markdown-code-block': palette.code,
    '--dsw-alias-markdown-code-segment-selected': palette.bgLayer3,
    '--dsw-alias-markdown-code-segment-unselected': palette.code,
    '--dsw-alias-markdown-inline-code': palette.inlineCode,
    '--dsw-alias-markdown-placeholder': palette.bgModule,
    '--dsw-alias-markdown-tag': palette.hoverSolid,
    '--dsw-alias-scrollbar-bg-l1': palette.scrollbar,
    '--dsw-alias-scrollbar-bg-l2': palette.scrollbar,
    '--dsw-alias-scrollbar-hover-l1': palette.scrollbarHover,
    '--dsw-alias-scrollbar-hover-l2': palette.scrollbarHover,
    '--dsw-specific-bubble-highlight': palette.bubbleHighlight,
    '--dsw-specific-bubble': palette.bubble,
    '--dsw-specific-input-major': palette.input,
    '--dsw-specific-login-input': palette.bgLayer2,
    '--dsw-specific-menu': palette.bgLayer3,
    '--dsw-specific-selector': palette.selector,
    '--dsw-specific-sidebar-fill': palette.sidebar,
    '--dsw-specific-sidebar-nav-item-active-accent': palette.sidebarAccent,
    '--dsw-specific-sidebar-nav-item-active': palette.sidebarActive,
    '--dsw-specific-sidebar-nav-item-hover': palette.sidebarHover,
    '--dsw-specific-tip': palette.bgModule,
    '--shiki-foreground': palette.textPrimary,
    '--shiki-background': palette.code,
    '--shiki-token-constant': palette.shiki.constant,
    '--shiki-token-string': palette.shiki.string,
    '--shiki-token-comment': palette.shiki.comment,
    '--shiki-token-keyword': palette.shiki.keyword,
    '--shiki-token-parameter': palette.shiki.parameter,
    '--shiki-token-function': palette.shiki.function,
    '--shiki-token-string-expression': palette.shiki.stringExpression,
    '--shiki-token-punctuation': palette.shiki.punctuation,
    '--shiki-token-link': palette.shiki.link,
  })
}

/** Six concrete themes registered for the two schemes and three warmth levels. */
export const EYE_CARE_THEMES: readonly ThemeDefinition[] = Object.freeze(
  (['light', 'dark'] as const).flatMap(scheme =>
    (['soft', 'balanced', 'warm'] as const).map(intensity => Object.freeze({
      id: eyeCareThemeId(scheme, intensity),
      colorScheme: scheme,
      tokens: tokensOf((scheme === 'light' ? LIGHT : DARK)[intensity]),
    }))),
)

const EYE_CARE_THEME_IDS = new Set(EYE_CARE_THEMES.map(theme => theme.id))

/** Whether a theme id is one of this package's registered concrete themes. */
export function isEyeCareThemeId(id: string): boolean {
  return EYE_CARE_THEME_IDS.has(id)
}
