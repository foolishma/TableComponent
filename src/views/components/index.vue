<template>
  <div class="components-doc-page">
    <el-card shadow="never" class="doc-card">
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">组件文档</h1>
          <el-tag type="primary">Components</el-tag>
        </div>
      </template>

      <div class="space-y-6">
        <el-alert title="组件文档" type="info" :closable="false" show-icon>
          <template #default>
            <p class="mt-2">
              这里包含了项目中所有自定义组件的使用文档，包括 API 说明、代码示例和配置项说明。
            </p>
          </template>
        </el-alert>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <el-card
              shadow="hover"
              class="component-card cursor-pointer transition-all hover:shadow-lg"
              @click="$router.push('/components/modal')"
            >
              <div class="text-center">
                <el-icon :size="48" class="text-blue-500 mb-4">
                  <Message />
                </el-icon>
                <h3 class="text-lg font-semibold mb-2">$modal 提示组件</h3>
                <p class="text-sm text-gray-500">全局消息提示和通知组件</p>
              </div>
            </el-card>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <el-card
              shadow="hover"
              class="component-card cursor-pointer transition-all hover:shadow-lg"
              @click="$router.push('/components/table')"
            >
              <div class="text-center">
                <el-icon :size="48" class="text-green-500 mb-4">
                  <Grid />
                </el-icon>
                <h3 class="text-lg font-semibold mb-2">Table 表格组件</h3>
                <p class="text-sm text-gray-500">高度可配置的表格组件</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { Grid, Message } from '@element-plus/icons-vue'
</script>

<style scoped>
.components-doc-page {
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

.doc-card {
  border: none;
}

.component-card {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
