import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => {
    // 从 localStorage 读取主题设置，如果没有则检测系统偏好
    const savedTheme = localStorage.getItem('app-theme')
    let isDarkMode = false

    if (savedTheme === 'dark') {
      isDarkMode = true
    } else if (savedTheme === 'light') {
      isDarkMode = false
    } else if (window.matchMedia) {
      // 检测系统主题偏好
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
      isDarkMode = darkModeQuery.matches
    }

    return {
      isDarkMode
    }
  },

  actions: {
    // 切换主题
    toggleTheme(value) {
      const newValue = value !== undefined ? value : !this.isDarkMode
      this.setTheme(newValue)
    },

    // 设置主题
    setTheme(isDark) {
      this.isDarkMode = isDark
      this.applyTheme(isDark)
    },

    // 应用主题到 DOM
    applyTheme(isDark) {
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },

    // 初始化主题（组件挂载时调用）
    initTheme() {
      this.applyTheme(this.isDarkMode)

      // 监听系统主题变化（仅在用户未手动设置时）
      if (window.matchMedia && !localStorage.getItem('app-theme')) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
        darkModeQuery.addEventListener('change', (e) => {
          if (!localStorage.getItem('app-theme')) {
            this.setTheme(e.matches)
          }
        })
      }
    }
  },

  // Pinia 持久化配置
  persist: {
    key: 'app-theme',
    storage: localStorage,
    paths: ['isDarkMode'],
    // 持久化时同步保存到旧的 localStorage key（兼容性）
    serializer: {
      deserialize: (value) => {
        try {
          const parsed = JSON.parse(value)
          // 同时更新旧的 localStorage key
          if (parsed.isDarkMode !== undefined) {
            localStorage.setItem('app-theme', parsed.isDarkMode ? 'dark' : 'light')
          }
          return parsed
        } catch {
          return {}
        }
      },
      serialize: (value) => {
        const result = JSON.stringify(value)
        // 同时更新旧的 localStorage key
        if (value.isDarkMode !== undefined) {
          localStorage.setItem('app-theme', value.isDarkMode ? 'dark' : 'light')
        }
        return result
      }
    }
  }
})
