<template>
  <div class="min-h-screen bg-gray-50">
    <el-container class="h-screen">
      <el-header class="bg-white shadow-sm flex items-center justify-between px-6">
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-bold text-gray-800 cursor-pointer" @click="$router.push('/')">
            Vue 3.5 + Vite
          </h1>
          <el-tag type="success" size="small">Element Plus</el-tag>
          <el-tag type="info" size="small">Tailwind CSS</el-tag>
          <el-tag type="warning" size="small">Vue Router</el-tag>
        </div>
        <div class="flex items-center space-x-2">
          <el-button type="primary" :icon="User" circle />
          <el-button type="info" :icon="Setting" circle />
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px" class="bg-white shadow-sm">
          <el-menu :default-active="activeMenu" class="border-0" router @select="handleMenuSelect">
            <el-menu-item index="/home">
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/table">
              <el-icon><Grid /></el-icon>
              <span>表格</span>
            </el-menu-item>
            <el-menu-item index="/form">
              <el-icon><Document /></el-icon>
              <span>表单</span>
            </el-menu-item>
            <el-menu-item index="/components">
              <el-icon><Box /></el-icon>
              <span>组件</span>
            </el-menu-item>
            <el-menu-item index="/menu-list">
              <el-icon><Menu /></el-icon>
              <span>菜单列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main class="p-6">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { User, Setting, HomeFilled, Grid, Document, Box, Menu } from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = ref(route.path)

watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath
  }
)

const handleMenuSelect = (index) => {
  activeMenu.value = index
}
</script>

<style scoped>
.el-header {
  height: 60px;
  line-height: 60px;
}

.el-aside {
  height: calc(100vh - 60px);
}

.el-main {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>
