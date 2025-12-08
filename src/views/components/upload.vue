<template>
  <div class="component-doc-page">
    <el-card shadow="never" class="doc-card">
      <!-- 标题区域 -->
      <div class="doc-header mb-6">
        <h1 class="text-3xl font-bold mb-2">Upload 上传组件</h1>
        <p class="text-gray-600 text-lg">
          基于 Element Plus el-upload 的二次封装组件，支持图片上传、附件上传，提供多种 UI 样式
        </p>
      </div>

      <!-- 基础用法 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">基础用法</h2>
        <p class="section-desc">通过配置文件快速使用上传组件，支持图片和附件两种模式。</p>

        <el-card shadow="never" class="demo-card">
          <template #header>
            <span class="font-semibold">示例</span>
          </template>
          <div class="demo-content space-y-4">
            <div>
              <h4 class="mb-2 font-semibold">附件列表上传</h4>
              <UploadComponent
                v-model:file-list="demo1FileList"
                mode="attachment"
                ui-type="list"
                action="/api/upload"
              />
            </div>
            <div>
              <h4 class="mb-2 font-semibold">图片上传（卡片式）</h4>
              <UploadComponent
                v-model:file-list="demo2FileList"
                mode="image"
                ui-type="picture"
                action="/api/upload"
                :limit="3"
              />
            </div>
            <div>
              <h4 class="mb-2 font-semibold">拖拽上传</h4>
              <UploadComponent
                v-model:file-list="demo3FileList"
                mode="attachment"
                ui-type="drag"
                action="/api/upload"
              />
            </div>
          </div>
        </el-card>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">代码示例</span>
              <el-button text size="small" @click="copyCode(basicUsageCode)">复制代码</el-button>
            </div>
          </template>
          <pre class="code-block"><code>{{ basicUsageCode }}</code></pre>
        </el-card>
      </section>

      <!-- 不同模式 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">不同模式</h2>
        <p class="section-desc">
          通过 <code>mode</code> 属性区分图片上传和附件上传，图片模式只能上传图片文件。
        </p>

        <el-card shadow="never" class="demo-card">
          <template #header>
            <span class="font-semibold">示例</span>
          </template>
          <div class="demo-content space-y-4">
            <div>
              <h4 class="mb-2 font-semibold">图片模式（只能上传图片）</h4>
              <UploadComponent
                v-model:file-list="demo4FileList"
                mode="image"
                ui-type="list"
                action="/api/upload"
              />
            </div>
            <div>
              <h4 class="mb-2 font-semibold">附件模式（支持任意文件）</h4>
              <UploadComponent
                v-model:file-list="demo5FileList"
                mode="attachment"
                ui-type="list"
                action="/api/upload"
              />
            </div>
          </div>
        </el-card>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">代码示例</span>
              <el-button text size="small" @click="copyCode(modeCode)">复制代码</el-button>
            </div>
          </template>
          <pre class="code-block"><code>{{ modeCode }}</code></pre>
        </el-card>
      </section>

      <!-- 不同 UI 类型 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">不同 UI 类型</h2>
        <p class="section-desc">
          通过 <code>uiType</code> 属性选择不同的 UI
          样式：<code>list</code>（列表）、<code>drag</code>（拖拽）、<code>picture</code>（图片卡片）。
        </p>

        <el-card shadow="never" class="demo-card">
          <template #header>
            <span class="font-semibold">示例</span>
          </template>
          <div class="demo-content space-y-4">
            <div>
              <h4 class="mb-2 font-semibold">列表样式</h4>
              <UploadComponent
                v-model:file-list="demo6FileList"
                mode="attachment"
                ui-type="list"
                action="/api/upload"
              />
            </div>
            <div>
              <h4 class="mb-2 font-semibold">拖拽样式</h4>
              <UploadComponent
                v-model:file-list="demo7FileList"
                mode="attachment"
                ui-type="drag"
                action="/api/upload"
              />
            </div>
            <div>
              <h4 class="mb-2 font-semibold">图片卡片样式</h4>
              <UploadComponent
                v-model:file-list="demo8FileList"
                mode="image"
                ui-type="picture"
                action="/api/upload"
                :limit="4"
              />
            </div>
          </div>
        </el-card>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">代码示例</span>
              <el-button text size="small" @click="copyCode(uiTypeCode)">复制代码</el-button>
            </div>
          </template>
          <pre class="code-block"><code>{{ uiTypeCode }}</code></pre>
        </el-card>
      </section>

      <!-- 控制上传进度显示 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">控制上传进度显示</h2>
        <p class="section-desc">
          通过 <code>showProgress</code> 属性控制是否显示上传进度条，默认为 <code>true</code>。
        </p>

        <el-card shadow="never" class="demo-card">
          <template #header>
            <span class="font-semibold">示例</span>
          </template>
          <div class="demo-content space-y-4">
            <div>
              <h4 class="mb-2 font-semibold">显示上传进度（默认）</h4>
              <UploadComponent
                v-model:file-list="demo11FileList"
                mode="attachment"
                ui-type="list"
                action="/api/upload"
                :show-progress="true"
              />
            </div>
            <div>
              <h4 class="mb-2 font-semibold">隐藏上传进度</h4>
              <UploadComponent
                v-model:file-list="demo12FileList"
                mode="attachment"
                ui-type="list"
                action="/api/upload"
                :show-progress="false"
              />
            </div>
          </div>
        </el-card>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">代码示例</span>
              <el-button text size="small" @click="copyCode(showProgressCode)">复制代码</el-button>
            </div>
          </template>
          <pre class="code-block"><code>{{ showProgressCode }}</code></pre>
        </el-card>
      </section>

      <!-- 文件类型限制 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">文件类型限制</h2>
        <p class="section-desc">
          通过 <code>accept</code> 属性控制可上传的文件类型，会与 <code>mode</code> 结合使用。
        </p>

        <el-card shadow="never" class="demo-card">
          <template #header>
            <span class="font-semibold">示例</span>
          </template>
          <div class="demo-content space-y-4">
            <div>
              <h4 class="mb-2 font-semibold">限制为 PDF 文件</h4>
              <UploadComponent
                v-model:file-list="demo9FileList"
                mode="attachment"
                ui-type="list"
                accept=".pdf"
                action="/api/upload"
              />
            </div>
            <div>
              <h4 class="mb-2 font-semibold">限制为 Excel 文件</h4>
              <UploadComponent
                v-model:file-list="demo10FileList"
                mode="attachment"
                ui-type="list"
                accept=".xlsx,.xls"
                action="/api/upload"
              />
            </div>
          </div>
        </el-card>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">代码示例</span>
              <el-button text size="small" @click="copyCode(acceptCode)">复制代码</el-button>
            </div>
          </template>
          <pre class="code-block"><code>{{ acceptCode }}</code></pre>
        </el-card>
      </section>

      <!-- API 配置项 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">API</h2>
        <h3 class="subsection-title">Props</h3>
        <el-table :data="propsData" border class="api-table">
          <el-table-column prop="name" label="名称" width="150" />
          <el-table-column prop="desc" label="说明" />
          <el-table-column prop="type" label="类型" width="150" />
          <el-table-column prop="default" label="默认值" width="100" />
        </el-table>

        <h3 class="subsection-title mt-6">Events</h3>
        <el-table :data="eventsData" border class="api-table">
          <el-table-column prop="name" label="名称" width="150" />
          <el-table-column prop="desc" label="说明" />
          <el-table-column prop="params" label="参数" width="200" />
        </el-table>

        <h3 class="subsection-title mt-6">Methods</h3>
        <el-table :data="methodsData" border class="api-table">
          <el-table-column prop="name" label="名称" width="150" />
          <el-table-column prop="desc" label="说明" />
          <el-table-column prop="params" label="参数" width="200" />
        </el-table>
      </section>
    </el-card>
  </div>
</template>

<script setup>
import UploadComponent from '@/components/UploadComponent/index.vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

// 示例数据
const demo1FileList = ref([])
const demo2FileList = ref([])
const demo3FileList = ref([])
const demo4FileList = ref([])
const demo5FileList = ref([])
const demo6FileList = ref([])
const demo7FileList = ref([])
const demo8FileList = ref([])
const demo9FileList = ref([])
const demo10FileList = ref([])
const demo11FileList = ref([])
const demo12FileList = ref([])

// 代码示例
const basicUsageCode =
  '<template>\n' +
  '  <!-- 附件列表上传 -->\n' +
  '  <UploadComponent\n' +
  '    v-model:file-list="fileList"\n' +
  '    mode="attachment"\n' +
  '    ui-type="list"\n' +
  '    action="/api/upload"\n' +
  '  />\n\n' +
  '  <!-- 图片上传（卡片式） -->\n' +
  '  <UploadComponent\n' +
  '    v-model:file-list="fileList"\n' +
  '    mode="image"\n' +
  '    ui-type="picture"\n' +
  '    action="/api/upload"\n' +
  '    :limit="3"\n' +
  '  />\n\n' +
  '  <!-- 拖拽上传 -->\n' +
  '  <UploadComponent\n' +
  '    v-model:file-list="fileList"\n' +
  '    mode="attachment"\n' +
  '    ui-type="drag"\n' +
  '    action="/api/upload"\n' +
  '  />\n' +
  '</template>\n\n' +
  '<script setup>\n' +
  "import { ref } from 'vue'\n" +
  "import UploadComponent from '@/components/UploadComponent/index.vue'\n\n" +
  'const fileList = ref([])\n' +
  '</' +
  'script>'

const modeCode =
  '<template>\n' +
  '  <!-- 图片模式（只能上传图片） -->\n' +
  '  <UploadComponent\n' +
  '    v-model:file-list="fileList"\n' +
  '    mode="image"\n' +
  '    ui-type="list"\n' +
  '    action="/api/upload"\n' +
  '  />\n\n' +
  '  <!-- 附件模式（支持任意文件） -->\n' +
  '  <UploadComponent\n' +
  '    v-model:file-list="fileList"\n' +
  '    mode="attachment"\n' +
  '    ui-type="list"\n' +
  '    action="/api/upload"\n' +
  '  />\n' +
  '</template>'

const uiTypeCode =
  '<template>\n' +
  '  <!-- 列表样式 -->\n' +
  '  <UploadComponent\n' +
  '    v-model:file-list="fileList"\n' +
  '    mode="attachment"\n' +
  '    ui-type="list"\n' +
  '    action="/api/upload"\n' +
  '  />\n\n' +
  '  <!-- 拖拽样式 -->\n' +
  '  <UploadComponent\n' +
  '    v-model:file-list="fileList"\n' +
  '    mode="attachment"\n' +
  '    ui-type="drag"\n' +
  '    action="/api/upload"\n' +
  '  />\n\n' +
  '  <!-- 图片卡片样式 -->\n' +
  '  <UploadComponent\n' +
  '    v-model:file-list="fileList"\n' +
  '    mode="image"\n' +
  '    ui-type="picture"\n' +
  '    action="/api/upload"\n' +
  '    :limit="4"\n' +
  '  />\n' +
  '</template>'

const acceptCode =
  '<template>\n' +
  '  <!-- 限制为 PDF 文件 -->\n' +
  '  <UploadComponent\n' +
  '    v-model:file-list="fileList"\n' +
  '    mode="attachment"\n' +
  '    ui-type="list"\n' +
  '    accept=".pdf"\n' +
  '    action="/api/upload"\n' +
  '  />\n\n' +
  '  <!-- 限制为 Excel 文件 -->\n' +
  '  <UploadComponent\n' +
  '    v-model:file-list="fileList"\n' +
  '    mode="attachment"\n' +
  '    ui-type="list"\n' +
  '    accept=".xlsx,.xls"\n' +
  '    action="/api/upload"\n' +
  '  />\n' +
  '</template>'

const showProgressCode =
  '<template>\n' +
  '  <!-- 显示上传进度（默认） -->\n' +
  '  <UploadComponent\n' +
  '    v-model:file-list="fileList"\n' +
  '    mode="attachment"\n' +
  '    ui-type="list"\n' +
  '    action="/api/upload"\n' +
  '    :show-progress="true"\n' +
  '  />\n\n' +
  '  <!-- 隐藏上传进度 -->\n' +
  '  <UploadComponent\n' +
  '    v-model:file-list="fileList"\n' +
  '    mode="attachment"\n' +
  '    ui-type="list"\n' +
  '    action="/api/upload"\n' +
  '    :show-progress="false"\n' +
  '  />\n' +
  '</template>'

// 复制代码
const copyCode = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    ElMessage.success('代码已复制到剪贴板')
  })
}

// API 数据
const propsData = [
  {
    name: 'mode',
    desc: '上传模式',
    type: "'image' | 'attachment'",
    default: "'attachment'"
  },
  {
    name: 'uiType',
    desc: 'UI 类型',
    type: "'drag' | 'list' | 'picture'",
    default: "'list'"
  },
  {
    name: 'accept',
    desc: '接受上传的文件类型（会与 mode 结合）',
    type: 'string',
    default: "''"
  },
  {
    name: 'fileList',
    desc: '文件列表',
    type: 'Array',
    default: '[]'
  },
  {
    name: 'action',
    desc: '上传的地址',
    type: 'string',
    default: "''"
  },
  {
    name: 'headers',
    desc: '设置上传的请求头部',
    type: 'Object',
    default: '{}'
  },
  {
    name: 'method',
    desc: '设置上传的请求方法',
    type: 'string',
    default: "'post'"
  },
  {
    name: 'data',
    desc: '上传时附带的额外参数',
    type: 'Object',
    default: '{}'
  },
  {
    name: 'name',
    desc: '上传的文件字段名',
    type: 'string',
    default: "'file'"
  },
  {
    name: 'withCredentials',
    desc: '支持发送 cookie 凭证信息',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'showFileList',
    desc: '是否显示已上传文件列表',
    type: 'boolean',
    default: 'true'
  },
  {
    name: 'showProgress',
    desc: '是否显示上传进度',
    type: 'boolean',
    default: 'true'
  },
  {
    name: 'multiple',
    desc: '是否支持多选文件',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'limit',
    desc: '最大允许上传个数',
    type: 'number',
    default: '0'
  },
  {
    name: 'autoUpload',
    desc: '是否在选取文件后立即进行上传',
    type: 'boolean',
    default: 'true'
  },
  {
    name: 'listType',
    desc: '文件列表的类型',
    type: "'text' | 'picture' | 'picture-card'",
    default: "'text'"
  },
  {
    name: 'httpRequest',
    desc: '覆盖默认的上传行为，可以自定义上传的实现',
    type: 'Function',
    default: 'null'
  },
  {
    name: 'disabled',
    desc: '是否禁用',
    type: 'boolean',
    default: 'false'
  }
]

const eventsData = [
  {
    name: 'change',
    desc: '文件状态改变时的钩子',
    params: '(file, fileList)'
  },
  {
    name: 'progress',
    desc: '文件上传时的钩子',
    params: '(event, file, fileList)'
  },
  {
    name: 'success',
    desc: '文件上传成功时的钩子',
    params: '(response, file, fileList)'
  },
  {
    name: 'error',
    desc: '文件上传失败时的钩子',
    params: '(error, file, fileList)'
  },
  {
    name: 'remove',
    desc: '文件列表移除文件时的钩子',
    params: '(file, fileList)'
  },
  {
    name: 'preview',
    desc: '点击文件列表中已上传的文件时的钩子',
    params: '(file)'
  },
  {
    name: 'exceed',
    desc: '当超出限制时执行的钩子',
    params: '(files, fileList)'
  },
  {
    name: 'before-upload',
    desc: '上传文件之前的钩子',
    params: '(file) => boolean | Promise'
  },
  {
    name: 'before-remove',
    desc: '删除文件之前的钩子',
    params: '(file, fileList) => boolean | Promise'
  }
]

const methodsData = [
  {
    name: 'submit',
    desc: '手动提交上传',
    params: '()'
  },
  {
    name: 'clearFiles',
    desc: '清空已上传的文件列表',
    params: '()'
  },
  {
    name: 'upload',
    desc: '手动上传文件列表',
    params: '(fileList)'
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
