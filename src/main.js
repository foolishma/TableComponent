import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import modalPlugin from './plugins/modal'
import router from './router'
import pinia from './store'
import { useLocaleStore } from './store/locale'
import { useThemeStore } from './store/theme'
import './style.css'
import { getElementLocale } from './utils/element-locale'

const app = createApp(App)

// 1. 先注册 Pinia（store 依赖）
app.use(pinia)

// 2. 注册 i18n
app.use(i18n)

// 3. 获取 store 实例
const localeStore = useLocaleStore()
const themeStore = useThemeStore()

// 4. 初始化语言（从持久化存储恢复，并同步到 i18n 和 Element Plus）
const currentLanguage = localeStore.currentLanguage
localeStore.setLanguage(currentLanguage, i18n, app)

// 5. 初始化主题（从持久化存储恢复）
themeStore.initTheme()

// 6. 获取当前语言对应的 Element Plus 语言包
const elementLocale = getElementLocale(currentLanguage)

// 7. 注册 Element Plus（带语言包）
app.use(ElementPlus, {
  locale: elementLocale
})

// 8. 注册路由
app.use(router)

// 9. 注册全局 Modal 插件
app.use(modalPlugin)

// 10. 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 11. 监听语言变化，同步更新 i18n 和 Element Plus
localeStore.$subscribe(
  (mutation, state) => {
    // 只在 currentLanguage 变化时触发
    if (mutation.storeId === 'locale') {
      const lang = state.currentLanguage
      const elementLocale = getElementLocale(lang)

      // 更新 vue-i18n
      i18n.global.locale.value = lang

      // 更新 Element Plus 语言包
      app.config.globalProperties.$ELEMENT = {
        ...app.config.globalProperties.$ELEMENT,
        locale: elementLocale
      }

      // 更新 HTML lang 属性
      document.documentElement.lang = lang
    }
  },
  { detached: false } // 组件卸载后也继续监听
)

// 12. 挂载应用
app.mount('#app')
