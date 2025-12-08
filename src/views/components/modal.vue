<template>
  <div class="component-doc-page">
    <el-card shadow="never" class="doc-card">
      <!-- 标题区域 -->
      <div class="doc-header mb-6">
        <h1 class="text-3xl font-bold mb-2">$modal 提示组件</h1>
        <p class="text-gray-600 text-lg">全局消息提示和通知组件，统一管理所有提示信息</p>
      </div>

      <!-- 基础用法 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">基础用法</h2>
        <p class="section-desc">使用 <code>$modal</code> 可以快速显示不同类型的提示信息。</p>

        <el-card shadow="never" class="demo-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">示例</span>
              <el-button-group>
                <el-button size="small" @click="demo1">成功</el-button>
                <el-button size="small" @click="demo2">错误</el-button>
                <el-button size="small" @click="demo3">信息</el-button>
                <el-button size="small" @click="demo4">警告</el-button>
              </el-button-group>
            </div>
          </template>

          <div class="demo-content">
            <el-space wrap>
              <el-button type="success" @click="demo1">成功提示</el-button>
              <el-button type="danger" @click="demo2">错误提示</el-button>
              <el-button type="info" @click="demo3">信息提示</el-button>
              <el-button type="warning" @click="demo4">警告提示</el-button>
            </el-space>
          </div>
        </el-card>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">代码示例</span>
              <el-button text size="small" @click="copyCode(demo1Code)">复制代码</el-button>
            </div>
          </template>
          <pre class="code-block"><code>{{ demo1Code }}</code></pre>
        </el-card>
      </section>

      <!-- 不同类型的提示 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">不同类型的提示</h2>
        <p class="section-desc">提供了四种不同类型的提示：success、error、info、warning。</p>

        <el-card shadow="never" class="demo-card">
          <template #header>
            <span class="font-semibold">示例</span>
          </template>
          <div class="demo-content">
            <el-space wrap>
              <el-button @click="demo5">成功提示</el-button>
              <el-button @click="demo6">错误提示</el-button>
              <el-button @click="demo7">信息提示</el-button>
              <el-button @click="demo8">警告提示</el-button>
            </el-space>
          </div>
        </el-card>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">代码示例</span>
              <el-button text size="small" @click="copyCode(demo2Code)">复制代码</el-button>
            </div>
          </template>
          <pre class="code-block"><code>{{ demo2Code }}</code></pre>
        </el-card>
      </section>

      <!-- 使用通知方式 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">使用通知方式</h2>
        <p class="section-desc">
          可以通过设置 <code>mode: 'notification'</code> 使用 ElNotification 显示通知。
        </p>

        <el-card shadow="never" class="demo-card">
          <template #header>
            <span class="font-semibold">示例</span>
          </template>
          <div class="demo-content">
            <el-space wrap>
              <el-button @click="demo9">成功通知</el-button>
              <el-button @click="demo10">错误通知</el-button>
            </el-space>
          </div>
        </el-card>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">代码示例</span>
              <el-button text size="small" @click="copyCode(demo3Code)">复制代码</el-button>
            </div>
          </template>
          <pre class="code-block"><code>{{ demo3Code }}</code></pre>
        </el-card>
      </section>

      <!-- 自定义选项 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">自定义选项</h2>
        <p class="section-desc">支持自定义显示时长、位置、标题等选项。</p>

        <el-card shadow="never" class="demo-card">
          <template #header>
            <span class="font-semibold">示例</span>
          </template>
          <div class="demo-content">
            <el-space wrap>
              <el-button @click="demo11">自定义时长（5秒）</el-button>
              <el-button @click="demo12">自定义位置通知</el-button>
            </el-space>
          </div>
        </el-card>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">代码示例</span>
              <el-button text size="small" @click="copyCode(demo4Code)">复制代码</el-button>
            </div>
          </template>
          <pre class="code-block"><code>{{ demo4Code }}</code></pre>
        </el-card>
      </section>

      <!-- API -->
      <section class="doc-section mb-8">
        <h2 class="section-title">API</h2>

        <h3 class="subsection-title">方法</h3>
        <el-table :data="methodsData" border style="width: 100%" class="api-table">
          <el-table-column prop="name" label="方法名" width="200" />
          <el-table-column prop="desc" label="说明" />
          <el-table-column prop="params" label="参数" width="300" />
          <el-table-column prop="return" label="返回值" width="200" />
        </el-table>

        <h3 class="subsection-title mt-6">配置项</h3>
        <el-table :data="optionsData" border style="width: 100%" class="api-table">
          <el-table-column prop="name" label="参数" width="200" />
          <el-table-column prop="desc" label="说明" />
          <el-table-column prop="type" label="类型" width="150" />
          <el-table-column prop="default" label="默认值" width="150" />
        </el-table>
      </section>
    </el-card>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { inject } from 'vue'

const $modal = inject('$modal')

// 代码示例
const demo1Code = `// 在 Options API 中使用
this.$modal.msgSuccess('操作成功')
this.$modal.msgError('操作失败')
this.$modal.msgInfo('提示信息')
this.$modal.msgWarning('警告信息')

// 在 Composition API 中使用
import { inject } from 'vue'
const $modal = inject('$modal')
$modal.msgSuccess('操作成功')`

const demo2Code = `// 不同类型的提示
this.$modal.msgSuccess('操作成功')
this.$modal.msgError('操作失败')
this.$modal.msgInfo('这是一条信息')
this.$modal.msgWarning('请注意')`

const demo3Code = `// 使用通知方式
this.$modal.msgSuccess('操作成功', {
  mode: 'notification',
  title: '成功提示',
  position: 'top-right'
})

this.$modal.msgError('操作失败', {
  mode: 'notification',
  title: '错误',
  duration: 5000
})`

const demo4Code = `// 自定义选项
// 自定义显示时长
this.$modal.msgSuccess('操作成功', { duration: 5000 })

// 自定义位置的通知
this.$modal.msgInfo('这是一条通知', {
  mode: 'notification',
  title: '提示',
  position: 'bottom-right',
  duration: 5000
})`

// 示例方法
const demo1 = () => {
  $modal.msgSuccess('操作成功')
}

const demo2 = () => {
  $modal.msgError('操作失败')
}

const demo3 = () => {
  $modal.msgInfo('这是一条信息')
}

const demo4 = () => {
  $modal.msgWarning('请注意')
}

const demo5 = () => {
  $modal.msgSuccess('保存成功')
}

const demo6 = () => {
  $modal.msgError('保存失败，请重试')
}

const demo7 = () => {
  $modal.msgInfo('数据已更新')
}

const demo8 = () => {
  $modal.msgWarning('请先选择数据')
}

const demo9 = () => {
  $modal.msgSuccess('操作成功', {
    mode: 'notification',
    title: '成功',
    position: 'top-right'
  })
}

const demo10 = () => {
  $modal.msgError('操作失败', {
    mode: 'notification',
    title: '错误',
    duration: 5000
  })
}

const demo11 = () => {
  $modal.msgSuccess('这条消息将显示 5 秒', { duration: 5000 })
}

const demo12 = () => {
  $modal.msgInfo('这是一条底部通知', {
    mode: 'notification',
    title: '提示',
    position: 'bottom-right',
    duration: 5000
  })
}

// 复制代码
const copyCode = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    ElMessage.success('代码已复制到剪贴板')
  })
}

// API 数据
const methodsData = [
  {
    name: 'msgSuccess',
    desc: '显示成功提示',
    params: 'message: string, options?: Object',
    return: 'ElMessage | ElNotification 实例'
  },
  {
    name: 'msgError',
    desc: '显示错误提示',
    params: 'message: string, options?: Object',
    return: 'ElMessage | ElNotification 实例'
  },
  {
    name: 'msgInfo',
    desc: '显示信息提示',
    params: 'message: string, options?: Object',
    return: 'ElMessage | ElNotification 实例'
  },
  {
    name: 'msgWarning',
    desc: '显示警告提示',
    params: 'message: string, options?: Object',
    return: 'ElMessage | ElNotification 实例'
  }
]

const optionsData = [
  {
    name: 'type',
    desc: '提示类型，message 或 notification',
    type: 'string',
    default: "'message'"
  },
  {
    name: 'duration',
    desc: '显示时长（毫秒）',
    type: 'number',
    default: '3000'
  },
  {
    name: 'title',
    desc: '通知标题（仅 notification 类型有效）',
    type: 'string',
    default: '—'
  },
  {
    name: 'position',
    desc: '通知位置（仅 notification 类型有效）',
    type: 'string',
    default: "'top-right'"
  }
]
</script>

<style scoped>
.component-doc-page {
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

.doc-card {
  border: none;
  max-width: 1200px;
  margin: 0 auto;
}

.doc-header {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 20px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1f2937;
}

.subsection-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #374151;
}

.section-desc {
  color: #6b7280;
  margin-bottom: 20px;
  line-height: 1.6;
}

.demo-card {
  margin-bottom: 20px;
  border: 1px solid #e5e7eb;
}

.demo-content {
  padding: 20px;
}

.code-card {
  margin-bottom: 20px;
  border: 1px solid #e5e7eb;
}

.code-block {
  margin: 0;
  padding: 20px;
  background: #f9fafb;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #1f2937;
}

.api-table {
  margin-top: 16px;
}

code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
}
</style>
