/** `settings.eyeCare` dictionaries. */

/** Simplified Chinese dictionary. */
export const zh = {
  'title': '护眼模式',
  'description': '使用暖色语义主题降低长时间阅读时的冷白刺激',
  'mode.off': '关闭',
  'mode.auto': '自动',
  'mode.light': '日间',
  'mode.dark': '夜间',
  'intensity.title': '暖色强度',
  'intensity.soft': '柔和',
  'intensity.balanced': '均衡',
  'intensity.warm': '温暖',
  'status.off': '护眼模式已关闭',
  'status.auto': '自动跟随系统明暗外观',
  'status.light': '正在使用暖色日间主题',
  'status.dark': '正在使用暖暗夜间主题',
  'status.local': '仅当前浏览器有效',
  'status.saving': '正在保存',
  'status.error': '设置暂未保存',
} satisfies Record<string, string>

/** Dictionary key union. */
export type EyeCareKey = keyof typeof zh

/** English dictionary. */
export const en = {
  'title': 'Eye care',
  'description': 'Use warm semantic themes to reduce cool-white glare during long reading sessions',
  'mode.off': 'Off',
  'mode.auto': 'Auto',
  'mode.light': 'Day',
  'mode.dark': 'Night',
  'intensity.title': 'Warmth',
  'intensity.soft': 'Soft',
  'intensity.balanced': 'Balanced',
  'intensity.warm': 'Warm',
  'status.off': 'Eye care is off',
  'status.auto': 'Following the system light or dark appearance',
  'status.light': 'Warm day theme is active',
  'status.dark': 'Warm night theme is active',
  'status.local': 'Current browser only',
  'status.saving': 'Saving',
  'status.error': 'Setting is not saved yet',
} satisfies Record<EyeCareKey, string>
