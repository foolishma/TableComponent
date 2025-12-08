# useTableFunc Hook 使用示例

## 功能说明

`useTableFunc` 是一个全局的 Hook，用于处理列表中的功能按钮操作。它支持：

- ✅ 二次确认（使用 ElMessageBox.confirm）
- ✅ API 调用（支持 GET、POST、PUT、DELETE 等方法）
- ✅ 自定义请求参数（支持对象或函数）
- ✅ 成功/失败回调
- ✅ 自定义提示内容

## 基础用法

### 1. 删除操作（带二次确认）

```javascript
import { useTableFunc } from '@/hooks/useTableFunc'
import { ref } from 'vue'

const tableRef = ref(null)

const handleDelete = useTableFunc({
  api: {
    url: '/api/menu/delete',
    method: 'delete'
  },
  params: (row) => ({ id: row.id }),
  confirm: {
    title: '确认删除',
    message: '删除后不可恢复，是否继续？',
    type: 'warning'
  },
  successMessage: '删除成功',
  onSuccess: (response, row) => {
    // 重新加载表格数据
    tableRef.value?.reload()
  }
})

// 在 functionMap 中使用
const functionMap = {
  handleDelete
}
```

### 2. 编辑操作（不带二次确认）

```javascript
const handleEdit = useTableFunc({
  api: {
    url: '/api/menu/update',
    method: 'put'
  },
  params: (row) => ({
    id: row.id,
    name: row.name,
    status: row.status
  }),
  successMessage: '更新成功',
  onSuccess: (response, row) => {
    tableRef.value?.reload()
  }
})
```

### 3. 发起审核操作

```javascript
const handleAudit = useTableFunc({
  api: {
    url: '/api/order/audit',
    method: 'post'
  },
  params: (row) => ({ orderId: row.id }),
  confirm: {
    title: '确认发起审核',
    message: '您是否确认发起审核？',
    type: 'info'
  },
  successMessage: '审核发起成功',
  onSuccess: (response, row) => {
    tableRef.value?.reload()
  }
})
```

### 4. 批量删除操作

```javascript
const handleBatchDelete = useTableFunc({
  api: {
    url: '/api/menu/batchDelete',
    method: 'post'
  },
  params: (rows) => ({
    ids: rows.map((row) => row.id)
  }),
  confirm: {
    title: '批量删除确认',
    message: (rows) => `确定要删除选中的 ${rows.length} 条数据吗？`,
    type: 'warning'
  },
  successMessage: '批量删除成功',
  onSuccess: () => {
    tableRef.value?.reload()
  }
})

// 在顶部按钮中使用
const functionMap = {
  handleBatchDelete: (rows) => {
    handleBatchDelete(rows)
  }
}
```

### 5. 使用固定参数

```javascript
const handleExport = useTableFunc({
  api: {
    url: '/api/menu/export',
    method: 'post'
  },
  params: {
    type: 'excel',
    format: 'xlsx'
  },
  successMessage: '导出成功',
  onSuccess: (response) => {
    // 处理导出文件下载
    const blob = new Blob([response])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = '菜单列表.xlsx'
    link.click()
  }
})
```

### 6. 路径参数示例

```javascript
// 获取详情（路径参数）
const handleGetDetail = useTableFunc({
  api: {
    url: (row) => `/sale/admin/getDetail/${row.id}`,
    method: 'get'
  },
  successMessage: '获取详情成功',
  onSuccess: (response, row) => {
    console.log('详情数据:', response)
    // 打开详情对话框等
  }
})

// 更新状态（多个路径参数）
const handleUpdateStatus = useTableFunc({
  api: {
    url: (row) => `/api/order/${row.orderId}/status/${row.statusId}`,
    method: 'put'
  },
  params: (row) => ({ status: 'active' }),
  confirm: {
    title: '确认更新',
    message: (row) => `确定要更新订单 ${row.orderId} 的状态吗？`,
    type: 'warning'
  },
  successMessage: '更新成功',
  onSuccess: () => {
    tableRef.value?.reload()
  }
})
```

### 7. 带错误处理的完整示例

```javascript
const handleDelete = useTableFunc({
  api: {
    url: '/api/menu/delete',
    method: 'delete'
  },
  params: (row) => ({ id: row.id }),
  confirm: {
    title: '确认删除',
    message: (row) => `确定要删除菜单 "${row.name}" 吗？`,
    type: 'warning'
  },
  successMessage: '删除成功',
  errorMessage: '删除失败，请稍后重试',
  onSuccess: (response, row) => {
    console.log('删除成功:', response)
    tableRef.value?.reload()
  },
  onError: (error, row) => {
    console.error('删除失败:', error)
    // 可以在这里做额外的错误处理
  }
})
```

## 在 Table 组件中使用

### 完整示例

```vue
<template>
  <div class="menu-list-page">
    <TableComponent ref="tableRef" :config="menuConfig" :function-map="functionMap" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TableComponent from '@/components/TableComponent/index.vue'
import menuConfig from '@/config/table-configs/menu-list.js'
import { useTableFunc } from '@/hooks/useTableFunc'

const tableRef = ref(null)

// 删除操作
const handleDelete = useTableFunc({
  api: {
    url: '/api/menu/delete',
    method: 'delete'
  },
  params: (row) => ({ id: row.id }),
  confirm: {
    title: '确认删除',
    message: (row) => `确定要删除菜单 "${row.name}" 吗？`,
    type: 'warning'
  },
  successMessage: '删除成功',
  onSuccess: () => {
    tableRef.value?.reload()
  }
})

// 编辑操作
const handleEdit = useTableFunc({
  api: {
    url: '/api/menu/update',
    method: 'put'
  },
  params: (row) => ({
    id: row.id,
    name: row.name
  }),
  successMessage: '更新成功',
  onSuccess: () => {
    tableRef.value?.reload()
  }
})

// 查看操作（不需要 API）
const handleView = (row) => {
  console.log('查看', row)
  // 打开查看对话框等
}

// 批量删除
const handleBatchDelete = useTableFunc({
  api: {
    url: '/api/menu/batchDelete',
    method: 'post'
  },
  params: (rows) => ({
    ids: rows.map((row) => row.id)
  }),
  confirm: {
    title: '批量删除确认',
    message: (rows) => `确定要删除选中的 ${rows.length} 条数据吗？`,
    type: 'warning'
  },
  successMessage: '批量删除成功',
  onSuccess: () => {
    tableRef.value?.reload()
  }
})

// 函数映射对象
const functionMap = {
  handleDelete,
  handleEdit,
  handleView,
  handleBatchDelete: (rows) => {
    handleBatchDelete(rows)
  }
}
</script>
```

## 配置参数说明

### api（必填）

API 配置对象：

```javascript
{
  url: '/api/menu/delete',  // 请求地址（必填），支持字符串或函数
  method: 'delete'          // 请求方法，默认为 'get'
}
```

**路径参数支持**：

`url` 可以是函数，用于动态生成包含路径参数的 URL：

```javascript
// 方式1：使用函数形式的 url（推荐）
api: {
  url: (row) => `/sale/admin/getDetail/${row.id}`,
  method: 'get'
}

// 方式2：多个路径参数
api: {
  url: (row) => `/api/order/${row.orderId}/status/${row.statusId}`,
  method: 'put'
}
```

### params（可选）

请求参数，可以是对象或函数：

```javascript
// 方式1：对象
params: {
  id: 1
}

// 方式2：函数（推荐，可以动态获取参数）
params: (row, index) => ({ id: row.id })
```

### confirm（可选）

二次确认配置：

```javascript
{
  title: '确认删除',           // 标题，默认为 '提示'，支持函数：(row, index, ...args) => string
  message: '确认操作？',        // 内容，默认为 '确认操作？'，支持函数：(row, index, ...args) => string
  type: 'warning',            // 类型：'success' | 'warning' | 'info' | 'error'，默认为 'warning'
  confirmButtonText: '确定',   // 确认按钮文本，默认为 '确定'
  cancelButtonText: '取消'     // 取消按钮文本，默认为 '取消'
}
```

**动态确认消息示例**：

```javascript
const handleDelete = useTableFunc({
  api: {
    url: '/api/menu/delete',
    method: 'delete'
  },
  params: (row) => ({ id: row.id }),
  confirm: {
    title: '确认删除',
    message: (row) => `确定要删除菜单 "${row.name}" 吗？删除后不可恢复。`,
    type: 'warning'
  },
  successMessage: '删除成功',
  onSuccess: () => {
    tableRef.value?.reload()
  }
})
```

### successMessage（可选）

成功提示信息，默认为 '操作成功'。设置为 `null` 或空字符串则不显示提示。

### errorMessage（可选）

错误提示信息。如果不设置，则使用 `request` 拦截器的错误处理。

### onSuccess（可选）

成功回调函数：

```javascript
onSuccess: (response, row, index, ...args) => {
  // response: API 响应数据
  // row: 当前行数据
  // index: 当前行索引
  // ...args: 其他传入的参数
}
```

### onError（可选）

错误回调函数：

```javascript
onError: (error, row, index, ...args) => {
  // error: 错误对象
  // row: 当前行数据
  // index: 当前行索引
  // ...args: 其他传入的参数
}
```

## 注意事项

1. **API 配置必须包含 url**：如果缺少 url，会返回一个错误处理函数
2. **params 函数参数**：函数接收 `(row, index, ...args)` 参数，可以根据需要返回请求参数对象
3. **二次确认**：如果配置了 `confirm`，会先显示确认对话框，用户取消则不会执行 API 调用
4. **错误处理**：默认使用 `request` 拦截器的错误处理，如果需要自定义错误提示，可以设置 `errorMessage`
5. **成功回调**：在 API 调用成功后执行，可以在这里重新加载表格数据等操作
