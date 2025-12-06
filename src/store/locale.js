import { getElementLocale } from '@/utils/element-locale'
import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    // 当前语言，默认从 localStorage 读取，如果没有则使用浏览器语言
    currentLanguage: (() => {
      const saved = localStorage.getItem('app-language')
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
    })()
  }),

  getters: {
    // 获取当前语言对应的 Element Plus 语言包
    elementLocale: (state) => {
      return getElementLocale(state.currentLanguage)
    }
  },

  actions: {
    // 设置语言
    setLanguage(lang, i18nInstance = null, appInstance = null) {
      if (!['zh-CN', 'zh-TW', 'en-US'].includes(lang)) {
        console.warn(`不支持的语言: ${lang}`)
        return false
      }

      // 更新状态
      this.currentLanguage = lang

      // 更新 HTML lang 属性
      document.documentElement.lang = lang

      // 更新 vue-i18n 语言
      if (i18nInstance) {
        i18nInstance.global.locale.value = lang
      }

      // 更新 Element Plus 语言包
      if (appInstance) {
        const elementLocale = getElementLocale(lang)
        appInstance.config.globalProperties.$ELEMENT = {
          ...appInstance.config.globalProperties.$ELEMENT,
          locale: elementLocale
        }
      }

      return true
    }
  },

  // Pinia 持久化配置
  persist: {
    key: 'app-locale',
    storage: localStorage,
    paths: ['currentLanguage']
  }
})
