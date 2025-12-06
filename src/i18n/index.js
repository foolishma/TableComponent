import { createI18n } from 'vue-i18n'
import enUS from './locales/en-US'
import zhCN from './locales/zh-CN'
import zhTW from './locales/zh-TW'

// 从 localStorage 获取保存的语言设置（如果没有则使用默认值）
const getInitialLocale = () => {
  const saved = localStorage.getItem('app-language') || localStorage.getItem('app-locale')
  if (saved && ['zh-CN', 'zh-TW', 'en-US'].includes(saved)) {
    return saved
  }

  // 检测浏览器语言
  const browserLang = navigator.language || navigator.userLanguage
  if (browserLang.startsWith('zh')) {
    if (browserLang.includes('TW') || browserLang.includes('HK')) {
      return 'zh-TW'
    }
    return 'zh-CN'
  }
  if (browserLang.startsWith('en')) {
    return 'en-US'
  }

  return 'zh-CN'
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式（必须为 false）
  locale: getInitialLocale(),
  fallbackLocale: 'zh-CN',
  globalInjection: true, // 全局注入 $t 函数
  messages: {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en-US': enUS
  }
})

export default i18n
