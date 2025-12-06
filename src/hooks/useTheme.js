import { onMounted, ref } from 'vue'

/**
 * 主题切换 Composable
 */
export function useTheme() {
  const isDarkMode = ref(false)

  // 切换主题
  const toggleTheme = (value) => {
    isDarkMode.value = value !== undefined ? value : !isDarkMode.value
    applyTheme(isDarkMode.value)
  }

  // 应用主题
  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('app-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('app-theme', 'light')
    }
    // 触发主题变化事件
    window.dispatchEvent(new CustomEvent('theme-change', { detail: dark }))
  }

  // 初始化主题
  const initTheme = () => {
    // 从 localStorage 恢复主题设置
    const savedTheme = localStorage.getItem('app-theme')
    if (savedTheme === 'dark') {
      isDarkMode.value = true
      applyTheme(true)
    } else if (savedTheme === 'light') {
      isDarkMode.value = false
      applyTheme(false)
    } else {
      // 监听系统主题偏好
      if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
        isDarkMode.value = darkModeQuery.matches
        applyTheme(isDarkMode.value)

        // 监听系统主题变化
        darkModeQuery.addEventListener('change', (e) => {
          if (!localStorage.getItem('app-theme')) {
            isDarkMode.value = e.matches
            applyTheme(e.matches)
          }
        })
      }
    }
  }

  // 组件挂载时初始化
  onMounted(() => {
    initTheme()
  })

  return {
    isDarkMode,
    toggleTheme
  }
}
