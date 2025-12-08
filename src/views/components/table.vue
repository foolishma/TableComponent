<template>
  <div class="component-doc-page">
    <el-card shadow="never" class="doc-card">
      <!-- 标题区域 -->
      <div class="doc-header mb-6">
        <h1 class="text-3xl font-bold mb-2">Table 表格组件</h1>
        <p class="text-gray-600 text-lg">
          高度可配置的表格组件，支持动态筛选、多级表头、行选择等功能
        </p>
      </div>

      <!-- 基础用法 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">基础用法</h2>
        <p class="section-desc">通过配置文件驱动，快速构建功能完整的表格页面。</p>

        <el-card shadow="never" class="demo-card">
          <template #header>
            <span class="font-semibold">示例</span>
          </template>
          <div class="demo-content">
            <TableComponent
              ref="demoTableRef"
              :config="demoConfig"
              :function-map="demoFunctionMap"
            />
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

      <!-- 筛选条件 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">筛选条件</h2>
        <p class="section-desc">支持多种类型的筛选条件，包括输入框、下拉框、日期选择器等。</p>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">配置示例</span>
              <el-button text size="small" @click="copyCode(queryConditionsCode)"
                >复制代码</el-button
              >
            </div>
          </template>
          <pre class="code-block"><code>{{ queryConditionsCode }}</code></pre>
        </el-card>
      </section>

      <!-- 表格列配置 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">表格列配置</h2>
        <p class="section-desc">支持固定列、排序、格式化、自定义插槽等功能。</p>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">配置示例</span>
              <el-button text size="small" @click="copyCode(columnsCode)">复制代码</el-button>
            </div>
          </template>
          <pre class="code-block"><code>{{ columnsCode }}</code></pre>
        </el-card>
      </section>

      <!-- 行选择 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">行选择</h2>
        <p class="section-desc">支持单选和多选，可配置行点击选中、保留选择等功能。</p>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">配置示例</span>
              <el-button text size="small" @click="copyCode(selectionCode)">复制代码</el-button>
            </div>
          </template>
          <pre class="code-block"><code>{{ selectionCode }}</code></pre>
        </el-card>
      </section>

      <!-- 操作按钮 -->
      <section class="doc-section mb-8">
        <h2 class="section-title">操作按钮</h2>
        <p class="section-desc">支持配置操作列按钮和顶部按钮，通过函数映射执行操作。</p>

        <el-card shadow="never" class="code-card">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold">配置示例</span>
              <el-button text size="small" @click="copyCode(buttonsCode)">复制代码</el-button>
            </div>
          </template>
          <pre class="code-block"><code>{{ buttonsCode }}</code></pre>
        </el-card>
      </section>

      <!-- API -->
      <section class="doc-section mb-8">
        <h2 class="section-title">API</h2>

        <h3 class="subsection-title">Props</h3>
        <el-table :data="propsData" border style="width: 100%" class="api-table">
          <el-table-column prop="name" label="参数" width="200" />
          <el-table-column prop="desc" label="说明" />
          <el-table-column prop="type" label="类型" width="200" />
          <el-table-column prop="default" label="默认值" width="150" />
        </el-table>

        <h3 class="subsection-title mt-6">Events</h3>
        <el-table :data="eventsData" border style="width: 100%" class="api-table">
          <el-table-column prop="name" label="事件名" width="200" />
          <el-table-column prop="desc" label="说明" />
          <el-table-column prop="params" label="参数" />
        </el-table>

        <h3 class="subsection-title mt-6">Methods</h3>
        <el-table :data="methodsData" border style="width: 100%" class="api-table">
          <el-table-column prop="name" label="方法名" width="200" />
          <el-table-column prop="desc" label="说明" />
          <el-table-column prop="params" label="参数" width="300" />
          <el-table-column prop="return" label="返回值" width="200" />
        </el-table>

        <h3 class="subsection-title mt-6">配置项说明</h3>
        <el-tabs v-model="activeTab" type="border-card" class="config-tabs">
          <el-tab-pane label="API 配置" name="api">
            <el-table :data="apiConfigData" border style="width: 100%">
              <el-table-column prop="name" label="参数" width="200" />
              <el-table-column prop="desc" label="说明" />
              <el-table-column prop="type" label="类型" width="150" />
              <el-table-column prop="required" label="必填" width="100" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="查询条件配置" name="query">
            <el-table :data="queryConfigData" border style="width: 100%">
              <el-table-column prop="name" label="参数" width="200" />
              <el-table-column prop="desc" label="说明" />
              <el-table-column prop="type" label="类型" width="150" />
              <el-table-column prop="default" label="默认值" width="150" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="表格列配置" name="columns">
            <el-table :data="columnsConfigData" border style="width: 100%">
              <el-table-column prop="name" label="参数" width="200" />
              <el-table-column prop="desc" label="说明" />
              <el-table-column prop="type" label="类型" width="150" />
              <el-table-column prop="default" label="默认值" width="150" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="表格配置" name="table">
            <el-table :data="tableConfigData" border style="width: 100%">
              <el-table-column prop="name" label="参数" width="200" />
              <el-table-column prop="desc" label="说明" />
              <el-table-column prop="type" label="类型" width="150" />
              <el-table-column prop="default" label="默认值" width="150" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </section>
    </el-card>
  </div>
</template>

<script setup>
import TableComponent from '@/components/TableComponent/index.vue'
import { ElMessage } from 'element-plus'
import { inject, reactive, ref } from 'vue'

const $modal = inject('$modal')
const demoTableRef = ref(null)
const activeTab = ref('api')

// 示例配置
const demoConfig = reactive({
  api: {
    url: '/api/demo/list',
    method: 'get'
  },
  queryConditions: [
    {
      prop: 'name',
      label: '名称',
      placeholder: '请输入名称',
      type: 'input'
    }
  ],
  columns: [
    {
      prop: 'id',
      label: 'ID',
      width: 80
    },
    {
      prop: 'name',
      label: '名称',
      minWidth: 150
    },
    {
      prop: 'status',
      label: '状态',
      width: 100,
      formatter: (row) => {
        return row.status === '1' ? '启用' : '禁用'
      }
    }
  ],
  tableConfig: {
    stripe: true,
    border: true,
    showPagination: true,
    showIndex: true,
    showAction: false
  }
})

const demoFunctionMap = {
  handleEdit: (row) => {
    $modal.msgInfo(`编辑: ${row.name}`)
  }
}

// 代码示例
const basicUsageCode =
  '<template>\n' +
  '  <TableComponent\n' +
  '    ref="tableRef"\n' +
  '    :config="tableConfig"\n' +
  '    :function-map="functionMap"\n' +
  '    :show-btn-func="showBtnFunc"\n' +
  '  />\n' +
  '</template>\n\n' +
  '<script setup>\n' +
  "import { ref } from 'vue'\n" +
  "import TableComponent from '@/components/TableComponent/index.vue'\n" +
  "import tableConfig from './listConfig.js'\n\n" +
  'const tableRef = ref(null)\n\n' +
  'const functionMap = {\n' +
  '  handleEdit: (row) => {\n' +
  "    console.log('编辑', row)\n" +
  '  },\n' +
  '  handleDelete: (row) => {\n' +
  "    console.log('删除', row)\n" +
  '  }\n' +
  '}\n\n' +
  'const showBtnFunc = (row, btn) => {\n' +
  '  return {\n' +
  '    show: true,\n' +
  '    disabled: false\n' +
  '  }\n' +
  '}\n' +
  '</' +
  'script>'

const queryConditionsCode = `queryConditions: [
  {
    prop: 'name',
    label: '名称',
    placeholder: '请输入名称',
    type: 'input',  // input | select | date | daterange | number
    labelWidth: 60,
    openLabelSuffix: true,
    labelSuffix: ':'
  },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    options: [
      { label: '启用', value: '1' },
      { label: '禁用', value: '0' }
    ]
  },
  {
    prop: 'createTime',
    label: '创建时间',
    type: 'daterange',
    format: 'YYYY-MM-DD',
    valueFormat: 'YYYY-MM-DD'
  }
]`

const columnsCode = `columns: [
  {
    prop: 'id',
    label: 'ID',
    width: 80,
    fixed: 'left'
  },
  {
    prop: 'name',
    label: '名称',
    minWidth: 150,
    sortable: true,
    showOverflowTooltip: true
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    formatter: (row) => {
      return row.status === '1' ? '启用' : '禁用'
    }
  },
  {
    label: '多级表头',
    children: [
      { prop: 'field1', label: '字段1', width: 100 },
      { prop: 'field2', label: '字段2', width: 100 }
    ]
  },
  {
    prop: 'actions',
    label: '操作',
    type: 'action',
    fixed: 'right',
    width: 200,
    buttons: [
      {
        label: '编辑',
        id: 'menuList:edit',
        funcName: 'handleEdit',
        type: 'primary'
      }
    ]
  }
]`

const selectionCode = `tableConfig: {
  selection: {
    enabled: true,
    type: 'multiple',  // 'single' | 'multiple'
    rowClickSelect: true,
    reserveSelection: true
  }
}`

const buttonsCode = `// 操作列按钮
{
  prop: 'actions',
  label: '操作',
  type: 'action',
  buttons: [
    {
      label: '编辑',
      id: 'menuList:edit',
      funcName: 'handleEdit',
      type: 'primary',
      icon: 'Edit'
    },
    {
      label: '删除',
      id: 'menuList:del',
      funcName: 'handleDelete',
      type: 'danger',
      icon: 'Delete'
    }
  ]
}

// 顶部按钮
tableConfig: {
  topButtons: [
    {
      label: '新增',
      id: 'menuList:add',
      funcName: 'handleAdd',
      type: 'primary',
      icon: 'Plus'
    }
  ]
}`

// 复制代码
const copyCode = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    ElMessage.success('代码已复制到剪贴板')
  })
}

// API 数据
const propsData = [
  {
    name: 'config',
    desc: '表格配置文件对象',
    type: 'Object',
    default: '—'
  },
  {
    name: 'functionMap',
    desc: '函数映射对象',
    type: 'Object',
    default: '{}'
  },
  {
    name: 'showBtnFunc',
    desc: '按钮显示和禁用控制函数',
    type: 'Function',
    default: 'null'
  }
]

const eventsData = [
  {
    name: 'selection-change',
    desc: '选择变化时触发',
    params: '(selection: Array)'
  },
  {
    name: 'row-click',
    desc: '行点击时触发',
    params: '(row: Object, column: Object, event: Event)'
  },
  {
    name: 'data-loaded',
    desc: '数据加载完成时触发',
    params: '({ data: Array, total: number, response: Object })'
  },
  {
    name: 'query',
    desc: '查询时触发',
    params: '(params: Object)'
  },
  {
    name: 'reset',
    desc: '重置时触发',
    params: '—'
  }
]

const methodsData = [
  {
    name: 'reload',
    desc: '重新加载数据',
    params: '—',
    return: 'void'
  },
  {
    name: 'query',
    desc: '执行查询',
    params: '—',
    return: 'void'
  },
  {
    name: 'reset',
    desc: '重置查询条件',
    params: '—',
    return: 'void'
  }
]

const apiConfigData = [
  {
    name: 'url',
    desc: '请求地址',
    type: 'string',
    required: '是'
  },
  {
    name: 'method',
    desc: '请求方法',
    type: "'get' | 'post' | 'put' | 'delete'",
    required: '否'
  }
]

const queryConfigData = [
  {
    name: 'prop',
    desc: '字段名',
    type: 'string',
    default: '—'
  },
  {
    name: 'label',
    desc: '标签文本',
    type: 'string',
    default: '—'
  },
  {
    name: 'type',
    desc: '输入类型',
    type: "'input' | 'select' | 'date' | 'daterange' | ...",
    default: "'input'"
  },
  {
    name: 'labelWidth',
    desc: '标签宽度（px）',
    type: 'number',
    default: '60'
  },
  {
    name: 'openLabelSuffix',
    desc: '是否显示标签后缀',
    type: 'boolean',
    default: 'true'
  },
  {
    name: 'labelSuffix',
    desc: '标签后缀',
    type: 'string',
    default: "':'"
  }
]

const columnsConfigData = [
  {
    name: 'prop',
    desc: '字段名',
    type: 'string',
    default: '—'
  },
  {
    name: 'label',
    desc: '列标题',
    type: 'string',
    default: '—'
  },
  {
    name: 'width',
    desc: '列宽度',
    type: 'number | string',
    default: '—'
  },
  {
    name: 'minWidth',
    desc: '最小列宽',
    type: 'number | string',
    default: '—'
  },
  {
    name: 'fixed',
    desc: '固定列',
    type: "'left' | 'right'",
    default: '—'
  },
  {
    name: 'sortable',
    desc: '是否可排序',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'formatter',
    desc: '格式化函数',
    type: 'Function',
    default: '—'
  },
  {
    name: 'slot',
    desc: '自定义插槽名称',
    type: 'string',
    default: '—'
  }
]

const tableConfigData = [
  {
    name: 'stripe',
    desc: '是否显示斑马纹',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'border',
    desc: '是否显示边框',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'showPagination',
    desc: '是否显示分页器',
    type: 'boolean',
    default: 'true'
  },
  {
    name: 'showIndex',
    desc: '是否显示序号列',
    type: 'boolean',
    default: 'true'
  },
  {
    name: 'showAction',
    desc: '是否显示操作列',
    type: 'boolean',
    default: 'true'
  },
  {
    name: 'autoHeight',
    desc: '是否自适应高度',
    type: 'boolean',
    default: 'true'
  },
  {
    name: 'selection',
    desc: '行选择配置',
    type: 'Object',
    default: '—'
  },
  {
    name: 'topButtons',
    desc: '顶部按钮配置',
    type: 'Array',
    default: '[]'
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

.config-tabs {
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
