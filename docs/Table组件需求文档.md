# Table 公共组件需求文档

## 1. 项目概述

### 1.1 组件名称
**Table** - 通用表格组件

### 1.2 使用场景
- 菜单列表页
- 数据管理页面
- 需要筛选和展示数据的任何场景

### 1.3 技术栈
- Vue 3.5 + Composition API
- Element Plus 表格组件
- Tailwind CSS 样式
- 配置文件驱动（JS 文件）

### 1.4 核心特性
- ✅ 配置文件驱动，动态渲染
- ✅ 响应式筛选条件布局
- ✅ 多级表头支持
- ✅ 行选择功能（单选/多选）
- ✅ 自定义按钮配置
- ✅ 函数映射执行机制

---

## 2. 功能需求

### 2.1 配置驱动机制

#### 2.1.1 配置文件结构
通过引入 JS 配置文件，使用 hooks 解析配置信息动态渲染表格。

**配置文件位置**：`src/config/table-configs/` 目录

**配置文件示例**：
```javascript
// src/config/table-configs/menu-list.js
export default {
  // 表格列配置
  columns: [
    {
      prop: 'id',
      label: 'ID',
      width: 80,
      fixed: 'left'
    },
    {
      prop: 'name',
      label: '菜单名称',
      width: 150
    }
  ],
  
  // 查询条件配置
  queryConditions: [
    {
      prop: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input',
      span: 6  // 响应式布局，一行24格
    }
  ],
  
  // 表格配置
  tableConfig: {
    // 表格基础配置
    stripe: true,
    border: true,
    // 行选择配置
    selection: {
      enabled: true,
      type: 'multiple', // 'single' | 'multiple'
      rowClickSelect: true  // 是否支持行点击选中
    }
  }
}
```

#### 2.1.2 Hooks 使用
```javascript
// 在页面组件中使用
import { useTableConfig } from '@/hooks/useTableConfig'
import menuConfig from '@/config/table-configs/menu-list.js'

export default {
  setup() {
    const { columns, queryConditions, tableConfig } = useTableConfig(menuConfig)
    
    return {
      columns,
      queryConditions,
      tableConfig
    }
  }
}
```

### 2.2 筛选条件功能

#### 2.2.1 响应式布局
- **自适应列数**：根据屏幕宽度自动调整一行显示的筛选条件数量
- **断点配置**：
  - 超大屏（≥1920px）：一行 6 个
  - 大屏（≥1440px）：一行 5 个
  - 中屏（≥1024px）：一行 4 个
  - 小屏（≥768px）：一行 3 个
  - 移动端（<768px）：一行 2 个

#### 2.2.2 筛选条件类型

| 类型 | type 值 | 说明 | 配置示例 |
|------|---------|------|----------|
| 输入框 | `input` | 普通文本输入 | `{ type: 'input', prop: 'name' }` |
| 数字输入框 | `number` | 数字输入 | `{ type: 'number', prop: 'age' }` |
| 时间选择器（单个） | `datetime` | 单个日期时间 | `{ type: 'datetime', prop: 'createTime' }` |
| 时间范围 | `datetimerange` | 日期时间范围 | `{ type: 'datetimerange', prop: 'timeRange' }` |
| 日期选择器（单个） | `date` | 单个日期 | `{ type: 'date', prop: 'birthday' }` |
| 日期范围 | `daterange` | 日期范围 | `{ type: 'daterange', prop: 'dateRange' }` |
| 年份选择器 | `year` | 年份选择 | `{ type: 'year', prop: 'year' }` |
| 月份选择器 | `month` | 月份选择 | `{ type: 'month', prop: 'month' }` |
| 年份范围 | `yearrange` | 年份范围 | `{ type: 'yearrange', prop: 'yearRange' }` |
| 月份范围 | `monthrange` | 月份范围 | `{ type: 'monthrange', prop: 'monthRange' }` |
| 下拉框 | `select` | 下拉选择 | `{ type: 'select', prop: 'status', options: [...] }` |
| 数字范围 | `numberrange` | 数字范围输入 | `{ type: 'numberrange', prop: 'priceRange' }` |

#### 2.2.3 筛选条件配置项

```javascript
{
  prop: 'name',                    // 字段名（必填）
  label: '菜单名称',                // 标签文本（必填）
  placeholder: '请输入菜单名称',     // 占位符（可选）
  type: 'input',                   // 类型（必填）
  span: 6,                        // 栅格占位（可选，默认6）
  defaultValue: '',              // 默认值（可选）
  dict: 'menuStatus',             // 字典编码（可选，用于下拉框）
  options: [                      // 选项列表（可选，用于下拉框）
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' }
  ],
  slot: 'customName',             // 自定义插槽名称（可选）
  rules: [],                      // 验证规则（可选）
  disabled: false,                // 是否禁用（可选）
  clearable: true,                // 是否可清空（可选）
  format: 'YYYY-MM-DD',          // 日期格式（可选，用于日期类型）
  valueFormat: 'YYYY-MM-DD',     // 值格式（可选，用于日期类型）
  startPlaceholder: '开始日期',    // 范围开始占位符（可选，用于范围类型）
  endPlaceholder: '结束日期'       // 范围结束占位符（可选，用于范围类型）
}
```

#### 2.2.4 字典配置支持
```javascript
// 字典配置示例
{
  type: 'select',
  prop: 'status',
  dict: 'menuStatus'  // 字典编码，组件内部通过字典服务获取选项
}

// 字典数据结构
const dictData = {
  menuStatus: [
    { label: '启用', value: '1' },
    { label: '禁用', value: '0' }
  ]
}
```

#### 2.2.5 自定义插槽支持
```javascript
// 配置中使用插槽
{
  prop: 'customField',
  type: 'slot',
  slot: 'customFilter'  // 插槽名称
}

// 在组件中使用
<template #customFilter="{ condition, value, onChange }">
  <el-input v-model="value" @input="onChange" />
</template>
```

#### 2.2.6 展开/收起功能
- **默认显示**：第一行筛选条件
- **展开更多**：当筛选条件超过一行时，显示"展开更多"按钮
- **收起**：展开后显示"收起"按钮
- **按钮位置**：查询/重置按钮跟随筛选条件区域，始终显示在筛选条件下方

**布局示例**：
```
┌─────────────────────────────────────┐
│ [筛选条件1] [筛选条件2] [筛选条件3]   │
│ [筛选条件4] [筛选条件5] [筛选条件6]   │
│ [展开更多 ▼]                         │
│ [查询] [重置]                        │
└─────────────────────────────────────┘

展开后：
┌─────────────────────────────────────┐
│ [筛选条件1] [筛选条件2] [筛选条件3]   │
│ [筛选条件4] [筛选条件5] [筛选条件6]   │
│ [筛选条件7] [筛选条件8] [筛选条件9]   │
│ [筛选条件10] [筛选条件11]             │
│ [收起 ▲]                             │
│ [查询] [重置]                        │
└─────────────────────────────────────┘
```

### 2.3 表格功能

#### 2.3.1 表头配置

**列配置结构**：
```javascript
{
  prop: 'name',              // 字段名
  label: '菜单名称',          // 列标题
  width: 150,                 // 列宽度（可选）
  minWidth: 100,             // 最小宽度（可选）
  fixed: 'left',             // 固定列：'left' | 'right'（可选）
  align: 'center',           // 对齐方式：'left' | 'center' | 'right'（可选）
  headerAlign: 'center',     // 表头对齐方式（可选）
  sortable: true,            // 是否可排序（可选）
  resizable: true,           // 是否可调整宽度（可选）
  showOverflowTooltip: true, // 超出显示提示（可选）
  formatter: (row, column, cellValue) => {}, // 格式化函数（可选）
  children: [                // 子列（多级表头）
    {
      prop: 'child1',
      label: '子列1'
    }
  ]
}
```

#### 2.3.2 表头生成逻辑

**列顺序规则**：
1. **行选择列**（如果启用）：固定在最左侧
   - 多选：`type="selection"`
   - 单选：自定义单选列
2. **序号列**：固定在行选择列之后（如果无行选择，则在最左侧）
   - `type="index"`
   - 固定：`fixed="left"`
3. **数据列**：按配置顺序渲染
4. **操作列**：固定在最右侧
   - `fixed="right"`
   - 按钮展示逻辑见 2.3.5

**表头生成示例**：
```javascript
// 配置
columns: [
  { prop: 'id', label: 'ID', fixed: 'left' },
  { prop: 'name', label: '名称' },
  { prop: 'status', label: '状态' },
  { prop: 'actions', label: '操作', fixed: 'right', type: 'action' }
]

// 生成后的列顺序（启用行选择）
// [selection列] [序号列] [ID列] [名称列] [状态列] [操作列]
```

#### 2.3.3 多级表头支持

```javascript
columns: [
  {
    label: '基本信息',
    children: [
      { prop: 'name', label: '姓名' },
      { prop: 'age', label: '年龄' }
    ]
  },
  {
    label: '联系信息',
    children: [
      { prop: 'phone', label: '电话' },
      { prop: 'email', label: '邮箱' }
    ]
  }
]
```

#### 2.3.4 行选择功能

**配置项**：
```javascript
tableConfig: {
  selection: {
    enabled: true,              // 是否启用行选择
    type: 'multiple',          // 'single' | 'multiple'
    rowClickSelect: true,      // 是否支持行点击选中
    reserveSelection: true,    // 是否保留选择（分页时）
    selectable: (row, index) => {  // 是否可选（可选）
      return row.status !== 'disabled'
    }
  }
}
```

**事件**：
- `selection-change`：选择变化时触发
- `row-click`：行点击时触发（如果启用 `rowClickSelect`）

#### 2.3.5 操作列按钮配置

**按钮配置结构**：
```javascript
{
  prop: 'actions',
  label: '操作',
  type: 'action',
  fixed: 'right',
  width: 200,
  buttons: [
    {
      label: '编辑',
      type: 'primary',
      id: 'edit',
      funcName: 'handleEdit',
      icon: 'Edit',
      size: 'small'
    },
    {
      label: '删除',
      type: 'danger',
      id: 'delete',
      funcName: 'handleDelete',
      icon: 'Delete',
      size: 'small'
    },
    {
      label: '查看',
      type: 'info',
      id: 'view',
      funcName: 'handleView',
      icon: 'View',
      size: 'small'
    },
    {
      label: '复制',
      type: 'warning',
      id: 'copy',
      funcName: 'handleCopy',
      icon: 'CopyDocument',
      size: 'small'
    }
  ]
}
```

**按钮展示规则**：
- **≤3 个按钮**：全部展示
- **>3 个按钮**：
  - 默认展示前 2 个按钮
  - 第 3 个位置显示"更多"按钮（下拉菜单）
  - 鼠标移入"更多"时，展示剩余按钮

**按钮配置项**：
```javascript
{
  label: '按钮文本',        // 必填
  type: 'primary',         // 按钮类型：'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  id: 'uniqueId',          // 按钮唯一标识（必填）
  funcName: 'handleClick', // 函数名（必填）
  icon: 'Edit',            // 图标名称（可选）
  size: 'small',           // 按钮尺寸：'large' | 'default' | 'small'（可选）
  disabled: false,         // 是否禁用（可选，支持函数）
  show: true,              // 是否显示（可选，支持函数）
  loading: false,          // 是否加载中（可选）
  confirm: {               // 确认对话框（可选）
    title: '确认删除？',
    message: '此操作不可恢复',
    type: 'warning'
  }
}
```

#### 2.3.6 表格顶部按钮配置

**配置结构**：
```javascript
tableConfig: {
  topButtons: [
    {
      label: '新增',
      type: 'primary',
      id: 'add',
      funcName: 'handleAdd',
      icon: 'Plus'
    },
    {
      label: '导出',
      type: 'success',
      id: 'export',
      funcName: 'handleExport',
      icon: 'Download'
    },
    {
      label: '批量删除',
      type: 'danger',
      id: 'batchDelete',
      funcName: 'handleBatchDelete',
      icon: 'Delete',
      disabled: true  // 当没有选中行时禁用
    }
  ]
}
```

### 2.4 函数映射执行机制

#### 2.4.1 函数映射对象

在父组件中传入函数映射对象，组件内部通过 `funcName` 调用对应函数。

**使用示例**：
```vue
<template>
  <Table
    :config="tableConfig"
    :data="tableData"
    :function-map="functionMap"
    @selection-change="handleSelectionChange"
  />
</template>

<script>
export default {
  setup() {
    const functionMap = {
      // 操作列按钮函数
      handleEdit: (row) => {
        console.log('编辑', row)
        // 编辑逻辑
      },
      handleDelete: (row) => {
        console.log('删除', row)
        // 删除逻辑
      },
      handleView: (row) => {
        console.log('查看', row)
        // 查看逻辑
      },
      
      // 顶部按钮函数
      handleAdd: () => {
        console.log('新增')
        // 新增逻辑
      },
      handleExport: () => {
        console.log('导出')
        // 导出逻辑
      },
      handleBatchDelete: (selectedRows) => {
        console.log('批量删除', selectedRows)
        // 批量删除逻辑
      }
    }
    
    return {
      functionMap
    }
  }
}
</script>
```

#### 2.4.2 函数执行参数

| 函数类型 | 参数说明 | 示例 |
|---------|---------|------|
| 操作列按钮 | `(row, index)` | `handleEdit(row, index)` |
| 顶部按钮 | `()` 或 `(selectedRows)` | `handleAdd()` 或 `handleBatchDelete(selectedRows)` |

---

## 3. 组件接口设计

### 3.1 Props

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| config | Object | 是 | - | 表格配置文件对象 |
| data | Array | 是 | [] | 表格数据 |
| loading | Boolean | 否 | false | 加载状态 |
| functionMap | Object | 是 | {} | 函数映射对象 |
| pagination | Object | 否 | - | 分页配置 |
| height | String/Number | 否 | - | 表格高度 |

**pagination 配置**：
```javascript
{
  currentPage: 1,      // 当前页
  pageSize: 10,        // 每页数量
  total: 0,            // 总条数
  pageSizes: [10, 20, 50, 100],  // 每页数量选项
  layout: 'total, sizes, prev, pager, next, jumper'  // 布局
}
```

### 3.2 Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| selection-change | (selection) | 选择变化时触发 |
| row-click | (row, column, event) | 行点击时触发 |
| query | (queryParams) | 查询时触发，返回查询参数 |
| reset | () | 重置时触发 |
| page-change | (page) | 页码变化时触发 |
| size-change | (size) | 每页数量变化时触发 |

### 3.3 Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|-----------|
| top-actions | 顶部操作区域 | - |
| [condition.slot] | 自定义筛选条件 | `{ condition, value, onChange }` |
| [column.prop] | 自定义列内容 | `{ row, column, $index }` |
| empty | 空数据 | - |

---

## 4. 配置文件完整示例

### 4.1 菜单列表配置示例

```javascript
// src/config/table-configs/menu-list.js
export default {
  // 查询条件配置
  queryConditions: [
    {
      prop: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input',
      span: 6
    },
    {
      prop: 'status',
      label: '状态',
      placeholder: '请选择状态',
      type: 'select',
      span: 6,
      dict: 'menuStatus',
      clearable: true
    },
    {
      prop: 'createTime',
      label: '创建时间',
      type: 'daterange',
      span: 6,
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    },
    {
      prop: 'custom',
      label: '自定义筛选',
      type: 'slot',
      slot: 'customFilter',
      span: 6
    }
  ],
  
  // 表格列配置
  columns: [
    {
      prop: 'id',
      label: 'ID',
      width: 80,
      fixed: 'left'
    },
    {
      prop: 'name',
      label: '菜单名称',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'path',
      label: '路由路径',
      width: 200,
      showOverflowTooltip: true
    },
    {
      prop: 'icon',
      label: '图标',
      width: 100,
      slot: 'icon'  // 自定义列内容
    },
    {
      label: '状态信息',
      children: [
        {
          prop: 'status',
          label: '状态',
          width: 100,
          formatter: (row) => {
            return row.status === '1' ? '启用' : '禁用'
          }
        },
        {
          prop: 'sort',
          label: '排序',
          width: 100
        }
      ]
    },
    {
      prop: 'createTime',
      label: '创建时间',
      width: 180,
      sortable: true
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
          type: 'primary',
          id: 'edit',
          funcName: 'handleEdit',
          icon: 'Edit',
          size: 'small'
        },
        {
          label: '删除',
          type: 'danger',
          id: 'delete',
          funcName: 'handleDelete',
          icon: 'Delete',
          size: 'small',
          confirm: {
            title: '确认删除',
            message: '删除后不可恢复，是否继续？',
            type: 'warning'
          }
        },
        {
          label: '查看',
          type: 'info',
          id: 'view',
          funcName: 'handleView',
          icon: 'View',
          size: 'small'
        },
        {
          label: '复制',
          type: 'warning',
          id: 'copy',
          funcName: 'handleCopy',
          icon: 'CopyDocument',
          size: 'small'
        }
      ]
    }
  ],
  
  // 表格配置
  tableConfig: {
    stripe: true,
    border: true,
    height: 'auto',
    maxHeight: 600,
    
    // 行选择配置
    selection: {
      enabled: true,
      type: 'multiple',
      rowClickSelect: true,
      reserveSelection: true
    },
    
    // 顶部按钮配置
    topButtons: [
      {
        label: '新增菜单',
        type: 'primary',
        id: 'add',
        funcName: 'handleAdd',
        icon: 'Plus'
      },
      {
        label: '导出',
        type: 'success',
        id: 'export',
        funcName: 'handleExport',
        icon: 'Download'
      },
      {
        label: '批量删除',
        type: 'danger',
        id: 'batchDelete',
        funcName: 'handleBatchDelete',
        icon: 'Delete',
        disabled: (selectedRows) => {
          return !selectedRows || selectedRows.length === 0
        }
      }
    ]
  }
}
```

---

## 5. 使用示例

### 5.1 页面组件使用

```vue
<template>
  <div class="menu-list-page">
    <Table
      :config="tableConfig"
      :data="tableData"
      :loading="loading"
      :function-map="functionMap"
      :pagination="pagination"
      @query="handleQuery"
      @reset="handleReset"
      @selection-change="handleSelectionChange"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <!-- 自定义筛选条件插槽 -->
      <template #customFilter="{ condition, value, onChange }">
        <el-input
          v-model="value"
          placeholder="自定义筛选"
          @input="onChange"
        />
      </template>
      
      <!-- 自定义列内容插槽 -->
      <template #icon="{ row }">
        <el-icon :size="20">
          <component :is="row.icon" />
        </el-icon>
      </template>
    </Table>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useTableConfig } from '@/hooks/useTableConfig'
import menuConfig from '@/config/table-configs/menu-list.js'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'MenuList',
  setup() {
    const loading = ref(false)
    const tableData = ref([])
    const selectedRows = ref([])
    
    // 使用 hooks 解析配置
    const { queryConditions, columns, tableConfig } = useTableConfig(menuConfig)
    
    // 分页配置
    const pagination = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 50, 100]
    })
    
    // 函数映射对象
    const functionMap = {
      // 操作列按钮
      handleEdit: (row) => {
        console.log('编辑', row)
        ElMessage.info(`编辑菜单: ${row.name}`)
      },
      
      handleDelete: (row) => {
        ElMessageBox.confirm(
          `确定要删除菜单 "${row.name}" 吗？`,
          '删除确认',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // 删除逻辑
          ElMessage.success('删除成功')
          loadData()
        }).catch(() => {
          ElMessage.info('已取消删除')
        })
      },
      
      handleView: (row) => {
        console.log('查看', row)
        ElMessage.info(`查看菜单: ${row.name}`)
      },
      
      handleCopy: (row) => {
        console.log('复制', row)
        ElMessage.success('复制成功')
      },
      
      // 顶部按钮
      handleAdd: () => {
        console.log('新增菜单')
        ElMessage.info('打开新增对话框')
      },
      
      handleExport: () => {
        console.log('导出数据')
        ElMessage.success('导出成功')
      },
      
      handleBatchDelete: (rows) => {
        if (!rows || rows.length === 0) {
          ElMessage.warning('请先选择要删除的数据')
          return
        }
        
        ElMessageBox.confirm(
          `确定要删除选中的 ${rows.length} 条数据吗？`,
          '批量删除确认',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // 批量删除逻辑
          ElMessage.success('批量删除成功')
          loadData()
        }).catch(() => {
          ElMessage.info('已取消删除')
        })
      }
    }
    
    // 加载数据
    const loadData = async () => {
      loading.value = true
      try {
        // 模拟 API 调用
        const response = await fetchMenuList({
          page: pagination.currentPage,
          pageSize: pagination.pageSize
        })
        tableData.value = response.data
        pagination.total = response.total
      } catch (error) {
        ElMessage.error('加载数据失败')
      } finally {
        loading.value = false
      }
    }
    
    // 查询
    const handleQuery = (queryParams) => {
      console.log('查询参数', queryParams)
      pagination.currentPage = 1
      loadData()
    }
    
    // 重置
    const handleReset = () => {
      console.log('重置查询条件')
      pagination.currentPage = 1
      loadData()
    }
    
    // 选择变化
    const handleSelectionChange = (selection) => {
      selectedRows.value = selection
    }
    
    // 分页变化
    const handlePageChange = (page) => {
      pagination.currentPage = page
      loadData()
    }
    
    // 每页数量变化
    const handleSizeChange = (size) => {
      pagination.pageSize = size
      pagination.currentPage = 1
      loadData()
    }
    
    // 初始化
    loadData()
    
    return {
      tableConfig,
      tableData,
      loading,
      pagination,
      functionMap,
      handleQuery,
      handleReset,
      handleSelectionChange,
      handlePageChange,
      handleSizeChange
    }
  }
}
</script>
```

---

## 6. 技术实现要点

### 6.1 响应式布局实现

使用 Tailwind CSS 和 Element Plus 的栅格系统实现响应式布局：

```vue
<template>
  <el-row :gutter="20">
    <el-col
      v-for="condition in visibleConditions"
      :key="condition.prop"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="4"
    >
      <!-- 筛选条件 -->
    </el-col>
  </el-row>
</template>
```

### 6.2 筛选条件组件动态渲染

根据 `type` 动态渲染不同的 Element Plus 组件：

```vue
<template>
  <component
    :is="getComponentByType(condition.type)"
    v-model="condition.value"
    v-bind="getComponentProps(condition)"
  />
</template>

<script>
export default {
  setup() {
    const getComponentByType = (type) => {
      const componentMap = {
        input: 'el-input',
        number: 'el-input-number',
        select: 'el-select',
        date: 'el-date-picker',
        daterange: 'el-date-picker',
        datetime: 'el-date-picker',
        // ... 其他类型
      }
      return componentMap[type] || 'el-input'
    }
    
    return { getComponentByType }
  }
}
</script>
```

### 6.3 操作列按钮展示逻辑

```javascript
const getVisibleButtons = (buttons) => {
  if (buttons.length <= 3) {
    return {
      visible: buttons,
      more: []
    }
  } else {
    return {
      visible: buttons.slice(0, 2),
      more: buttons.slice(2)
    }
  }
}
```

---

## 7. 补充需求

### 7.1 数据加载

- 支持远程数据加载
- 支持本地数据
- 支持数据缓存
- 支持数据刷新

### 7.2 表格功能增强

- 支持列拖拽排序
- 支持列显示/隐藏
- 支持列宽调整
- 支持表格导出（Excel、CSV）
- 支持表格打印

### 7.3 性能优化

- 虚拟滚动（大数据量）
- 懒加载
- 防抖节流（筛选条件输入）

### 7.4 交互优化

- 加载状态提示
- 空数据提示
- 错误提示
- 操作确认提示

### 7.5 可访问性

- 键盘导航支持
- 屏幕阅读器支持
- ARIA 属性完善

---

## 8. 开发计划

### 8.1 第一阶段：基础功能
- [ ] 配置文件解析 hooks
- [ ] 基础表格渲染
- [ ] 筛选条件基础类型（input、select）
- [ ] 基础操作列按钮

### 8.2 第二阶段：筛选功能
- [ ] 响应式布局
- [ ] 所有筛选条件类型
- [ ] 字典支持
- [ ] 自定义插槽
- [ ] 展开/收起功能

### 8.3 第三阶段：表格功能
- [ ] 多级表头
- [ ] 行选择功能
- [ ] 操作列按钮优化（更多按钮）
- [ ] 顶部按钮配置

### 8.4 第四阶段：增强功能
- [ ] 函数映射执行
- [ ] 分页功能
- [ ] 数据加载
- [ ] 性能优化

### 8.5 第五阶段：测试与优化
- [ ] 单元测试
- [ ] 集成测试
- [ ] 性能测试
- [ ] 文档完善

---

## 9. 注意事项

1. **配置文件规范**：确保配置文件结构符合规范，避免解析错误
2. **函数映射**：确保所有 `funcName` 都在 `functionMap` 中有对应实现
3. **响应式布局**：注意不同屏幕尺寸下的布局适配
4. **性能考虑**：大数据量时考虑虚拟滚动或分页
5. **错误处理**：完善的错误提示和处理机制
6. **类型安全**：虽然使用 JavaScript，但要保证配置项的类型正确性

---

## 10. 附录

### 10.1 配置文件模板

见 `docs/table-config-template.js`

### 10.2 API 接口规范

见 `docs/table-api.md`

### 10.3 更新日志

见 `CHANGELOG.md`

---

**文档版本**：v1.0.0  
**创建日期**：2024年  
**最后更新**：2024年  
**维护者**：项目开发团队

