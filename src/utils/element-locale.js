/**
 * Element Plus 语言包配置
 */
import en from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'

export const elementLocales = {
  'zh-CN': zhCn,
  'zh-TW': zhTw,
  'en-US': en
}

export const getElementLocale = (locale) => {
  return elementLocales[locale] || zhCn
}
