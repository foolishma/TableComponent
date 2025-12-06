/**
 * 简单的语言管理工具
 * 支持简体中文、繁体中文、英文
 */

const locales = {
  'zh-CN': {
    language: {
      title: '语言'
    },
    theme: {
      light: '明亮模式',
      dark: '暗黑模式'
    }
  },
  'zh-TW': {
    language: {
      title: '語言'
    },
    theme: {
      light: '明亮模式',
      dark: '暗黑模式'
    }
  },
  'en-US': {
    language: {
      title: 'Language'
    },
    theme: {
      light: 'Light Mode',
      dark: 'Dark Mode'
    }
  }
}

// 当前语言
let currentLocale = 'zh-CN'

// 翻译函数
export const t = (key) => {
  const keys = key.split('.')
  let value = locales[currentLocale]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}

// 设置语言
export const setLocale = (locale) => {
  if (locales[locale]) {
    currentLocale = locale
    localStorage.setItem('app-language', locale)
    document.documentElement.lang = locale
    // 触发语言变化事件
    window.dispatchEvent(new CustomEvent('language-change', { detail: locale }))
    return true
  }
  return false
}

// 获取当前语言
export const getLocale = () => {
  return currentLocale
}

// 获取所有支持的语言
export const getSupportedLocales = () => {
  return Object.keys(locales).map((key) => ({
    value: key,
    label: key === 'zh-CN' ? '简体中文' : key === 'zh-TW' ? '繁體中文' : 'English'
  }))
}

// 初始化语言（从 localStorage 恢复）
export const initLocale = () => {
  const savedLocale = localStorage.getItem('app-language')
  if (savedLocale && locales[savedLocale]) {
    currentLocale = savedLocale
    document.documentElement.lang = savedLocale
  } else {
    // 检测浏览器语言
    const browserLang = navigator.language || navigator.userLanguage
    if (browserLang.startsWith('zh')) {
      if (browserLang.includes('TW') || browserLang.includes('HK')) {
        currentLocale = 'zh-TW'
      } else {
        currentLocale = 'zh-CN'
      }
    } else if (browserLang.startsWith('en')) {
      currentLocale = 'en-US'
    }
    document.documentElement.lang = currentLocale
  }
}

// 初始化
initLocale()
