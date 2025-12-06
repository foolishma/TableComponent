<template>
  <div class="layout-container">
    <el-container class="h-screen flex flex-col">
      <!-- 顶部导航栏 -->
      <Header v-model:is-collapse="isCollapse" />

      <el-container class="flex-1 overflow-hidden">
        <!-- 侧边栏 -->
        <Sidebar v-model:is-collapse="isCollapse" @menu-select="handleMenuSelect" />

        <!-- 主内容区 -->
        <el-main class="layout-main overflow-y-auto overflow-x-hidden">
          <router-view />
        </el-main>
      </el-container>
    </el-container>

    <!-- 悬浮功能菜单 -->
    <FloatMenu />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import FloatMenu from './FloatMenu.vue'
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'

// 侧边栏折叠状态
const isCollapse = ref(false)

// 监听折叠状态变化，保存到 localStorage
watch(isCollapse, (newValue) => {
  localStorage.setItem('sidebar-collapse', String(newValue))
})

// 菜单选择处理（可以在这里添加额外逻辑）
const handleMenuSelect = (_index) => {
  // 如果需要的话，可以在这里添加额外的菜单选择逻辑
}

// 响应式处理：移动端自动收起侧边栏
const handleResize = () => {
  if (window.innerWidth < 768) {
    isCollapse.value = true
  } else {
    // 恢复保存的状态
    const savedState = localStorage.getItem('sidebar-collapse')
    if (savedState !== null) {
      isCollapse.value = savedState === 'true'
    }
  }
}

// 组件挂载时
onMounted(() => {
  // 从 localStorage 恢复折叠状态
  const savedState = localStorage.getItem('sidebar-collapse')
  if (savedState !== null) {
    isCollapse.value = savedState === 'true'
  }

  // 响应式处理
  handleResize()
  window.addEventListener('resize', handleResize)
})

// 组件卸载时
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.layout-main {
  background: #f0f2f5;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.3s;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .layout-main {
    margin-left: 0;
  }
}
</style>
