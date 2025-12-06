<template>
  <el-header class="layout-header">
    <div class="header-left">
      <!-- 侧边栏折叠按钮 -->
      <el-button
        :icon="isCollapse ? Expand : Fold"
        circle
        text
        class="collapse-btn"
        @click="handleToggle"
      />
      <!-- 标题 -->
      <h1 class="logo-title" @click="handleLogoClick">Vue 3.5 + Vite</h1>
      <!-- 技术标签 -->
      <el-tag type="success" size="small">Element Plus</el-tag>
      <el-tag type="info" size="small">Tailwind CSS</el-tag>
      <el-tag type="warning" size="small">Vue Router</el-tag>
    </div>
    <div class="header-right">
      <el-button type="primary" :icon="User" circle text />
      <el-button type="info" :icon="Setting" circle text />
    </div>
  </el-header>
</template>

<script setup>
import { Expand, Fold, Setting, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

// 使用 defineModel 实现双向绑定
const isCollapse = defineModel('isCollapse', {
  type: Boolean,
  default: false
})

const router = useRouter()

// 切换侧边栏折叠状态
const handleToggle = () => {
  isCollapse.value = !isCollapse.value
}

// Logo 点击处理
const handleLogoClick = () => {
  router.push('/')
}
</script>

<style scoped>
.layout-header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.collapse-btn {
  font-size: 18px;
  transition: all 0.3s;
}

.logo-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
  cursor: pointer;
  transition: color 0.3s;
}

.logo-title:hover {
  color: #409eff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .logo-title {
    font-size: 16px;
  }
}
</style>
