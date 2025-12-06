import { getLocale, setLocale, t } from '@/utils/locale'
import { ref, watch } from 'vue'

/**
 * 语言切换 Composable
 */
export function useLocale() {
  const currentLanguage = ref(getLocale())

  // 切换语言
  const changeLanguage = (lang) => {
    if (setLocale(lang)) {
      currentLanguage.value = lang
    }
  }

  // 监听语言变化
  watch(
    () => currentLanguage.value,
    (newLang) => {
      changeLanguage(newLang)
    }
  )

  return {
    currentLanguage,
    changeLanguage,
    t
  }
}
