<template>
  <div class="space-y-6">
    <el-card shadow="hover">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg font-semibold">欢迎使用 Vue 3.5 Demo</span>
          <el-tag type="success">首页</el-tag>
        </div>
      </template>

      <div class="space-y-4">
        <el-alert title="项目信息" type="info" :closable="false" show-icon>
          <template #default>
            <p class="mt-2">这是一个基于 Vue 3.5 + Vite + Element Plus + Tailwind CSS 的演示项目</p>
          </template>
        </el-alert>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-statistic title="Vue 版本" value="3.5" />
          </el-col>
          <el-col :span="6">
            <el-statistic title="Vite 版本" value="5.4" />
          </el-col>
          <el-col :span="6">
            <el-statistic title="Element Plus" value="2.8" />
          </el-col>
          <el-col :span="6">
            <el-statistic title="路由系统" value="已启用" />
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card shadow="hover">
      <template #header>
        <span class="text-lg font-semibold">功能导航</span>
      </template>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-card
            shadow="hover"
            class="text-center cursor-pointer hover:shadow-lg transition-shadow"
            @click="$router.push('/table')"
          >
            <el-icon :size="40" class="text-blue-500 mb-2"><Grid /></el-icon>
            <h3 class="font-semibold mb-2">表格演示</h3>
            <p class="text-sm text-gray-500">查看表格组件示例</p>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card
            shadow="hover"
            class="text-center cursor-pointer hover:shadow-lg transition-shadow"
            @click="$router.push('/form')"
          >
            <el-icon :size="40" class="text-green-500 mb-2"><Document /></el-icon>
            <h3 class="font-semibold mb-2">表单演示</h3>
            <p class="text-sm text-gray-500">查看表单组件示例</p>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card
            shadow="hover"
            class="text-center cursor-pointer hover:shadow-lg transition-shadow"
            @click="$router.push('/components')"
          >
            <el-icon :size="40" class="text-purple-500 mb-2"><Box /></el-icon>
            <h3 class="font-semibold mb-2">组件演示</h3>
            <p class="text-sm text-gray-500">查看各种组件示例</p>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="text-center">
            <el-icon :size="40" class="text-orange-500 mb-2"><Setting /></el-icon>
            <h3 class="font-semibold mb-2">更多功能</h3>
            <p class="text-sm text-gray-500">持续更新中...</p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="hover">
      <template #header>
        <span class="text-lg font-semibold">技术栈说明</span>
      </template>

      <el-timeline>
        <el-timeline-item timestamp="Vue 3.5" placement="top" type="primary">
          <el-card>
            <h4 class="font-semibold mb-2">渐进式 JavaScript 框架</h4>
            <p class="text-gray-600">使用 Composition API 构建响应式用户界面</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="Vite 5" placement="top" type="success">
          <el-card>
            <h4 class="font-semibold mb-2">下一代前端构建工具</h4>
            <p class="text-gray-600">极速的开发服务器和优化的生产构建</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="Element Plus" placement="top" type="warning">
          <el-card>
            <h4 class="font-semibold mb-2">基于 Vue 3 的组件库</h4>
            <p class="text-gray-600">丰富的组件和完整的文档支持</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="Tailwind CSS" placement="top" type="danger">
          <el-card>
            <h4 class="font-semibold mb-2">实用优先的 CSS 框架</h4>
            <p class="text-gray-600">快速构建现代化的用户界面</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { Grid, Document, Box, Setting } from '@element-plus/icons-vue'
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
