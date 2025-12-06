<template>
  <div>
    <!-- 遮罩层（点击关闭菜单）- 层级最低 -->
    <div v-if="isMenuVisible" class="float-menu-mask" @click="closeMenu"></div>

    <div class="float-menu-container">
      <!-- 悬浮按钮 -->
      <el-button :icon="Setting" circle class="float-menu-trigger" @click="toggleMenu" />

      <!-- 功能菜单面板 - 层级最高，阻止事件冒泡 -->
      <el-card v-show="isMenuVisible" class="float-menu-panel" shadow="always" @click.stop>
        <div class="menu-content">
          <!-- 语言切换 -->
          <div class="menu-section">
            <div class="menu-section-title">
              <el-icon><ChatDotRound /></el-icon>
              <span>{{ $t('language.title') }}</span>
            </div>
            <div class="menu-options">
              <el-radio-group
                :model-value="localeStore.currentLanguage"
                @update:model-value="handleLanguageChange"
              >
                <el-radio-button label="zh-CN">{{ $t('language.simplified') }}</el-radio-button>
                <el-radio-button label="zh-TW">{{ $t('language.traditional') }}</el-radio-button>
                <el-radio-button label="en-US">{{ $t('language.english') }}</el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <!-- 分隔线 -->
          <el-divider />

          <!-- 暗黑模式切换 -->
          <div class="menu-section">
            <div class="menu-section-title">
              <el-icon><Moon v-if="themeStore.isDarkMode" /><Sunny v-else /></el-icon>
              <span>{{ themeStore.isDarkMode ? $t('theme.dark') : $t('theme.light') }}</span>
            </div>
            <div class="menu-options">
              <el-switch
                :model-value="themeStore.isDarkMode"
                :active-text="$t('theme.dark')"
                :inactive-text="$t('theme.light')"
                @update:model-value="handleThemeChange"
              />
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { useLocaleStore } from '@/store/locale'
import { useThemeStore } from '@/store/theme'
import { ChatDotRound, Moon, Setting, Sunny } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

// 获取当前实例以访问 app
const instance = getCurrentInstance()
const app = instance?.appContext?.app

// 使用 i18n（获取 locale 和 t 函数）
const { locale: i18nLocale, t } = useI18n()

// 使用 Pinia stores
const localeStore = useLocaleStore()
const themeStore = useThemeStore()

// 菜单显示状态
const isMenuVisible = ref(false)

// 切换菜单显示/隐藏
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
}

// 关闭菜单
const closeMenu = () => {
  isMenuVisible.value = false
}

// 语言切换处理
const handleLanguageChange = (lang) => {
  // 创建 i18n 实例对象（与 store 中的 setLanguage 方法兼容）
  const i18nInstance = {
    global: {
      locale: i18nLocale
    }
  }

  if (localeStore.setLanguage(lang, i18nInstance, app)) {
    ElMessage.success(t('language.switchSuccess'))
  } else {
    ElMessage.error(t('language.switchError'))
  }
}

// 主题切换处理
const handleThemeChange = (value) => {
  themeStore.toggleTheme(value)
  ElMessage.success(value ? t('theme.switchToDark') : t('theme.switchToLight'))
}

// 点击外部关闭菜单
const handleClickOutside = (event) => {
  const container = document.querySelector('.float-menu-container')
  const mask = document.querySelector('.float-menu-mask')

  if (
    isMenuVisible.value &&
    container &&
    !container.contains(event.target) &&
    event.target !== mask
  ) {
    closeMenu()
  }
}

// 组件挂载时
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.float-menu-container {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1001;
}

.float-menu-trigger {
  width: 56px;
  height: 56px;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  position: relative;
  z-index: 1003;
}

.float-menu-trigger:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.float-menu-panel {
  position: absolute;
  right: 0;
  bottom: 72px;
  width: 320px;
  min-height: 200px;
  animation: slideUp 0.3s ease-out;
  z-index: 1002;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-content {
  padding: 8px;
}

.menu-section {
  margin-bottom: 16px;
}

.menu-section:last-child {
  margin-bottom: 0;
}

.menu-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.menu-options {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
}

.float-menu-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: transparent;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .float-menu-container {
    right: 16px;
    bottom: 16px;
  }

  .float-menu-panel {
    width: 280px;
    right: -8px;
  }
}
</style>
