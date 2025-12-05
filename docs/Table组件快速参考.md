# Table 组件快速参考

## 快速开始

### 1. 创建配置文件

```javascript
// src/config/table-configs/my-list.js
export default {
  queryConditions: [...],
  columns: [...],
  tableConfig: {...}
}
```

### 2. 在页面中使用

```vue
<template>
  <Table
    :config="tableConfig"
    :data="tableData"
    :function-map="functionMap"
  />
</template>

<script>
import { useTableConfig } from '@/hooks/useTableConfig'
import myConfig from '@/config/table-configs/my-list.js'

export default {
  setup() {
    const { queryConditions, columns, tableConfig } = useTableConfig(myConfig)
    
    const functionMap = {
      handleEdit: (row) => { /* ... */ },
      handleDelete: (row) => { /* ... */ }
    }
    
    return { tableConfig, functionMap }
  }
}
</script>
```

---

## 筛选条件类型速查

| 类型 | type 值 | 适用场景 |
|------|---------|----------|
| 输入框 | `input` | 文本搜索 |
| 数字输入 | `number` | 数字搜索 |
| 单个日期 | `date` | 日期选择 |
| 日期范围 | `daterange` | 日期区间 |
| 单个日期时间 | `datetime` | 日期时间选择 |
| 日期时间范围 | `datetimerange` | 日期时间区间 |
| 年份 | `year` | 年份选择 |
| 月份 | `month` | 月份选择 |
| 年份范围 | `yearrange` | 年份区间 |
| 月份范围 | `monthrange` | 月份区间 |
| 下拉框 | `select` | 选项选择 |
| 数字范围 | `numberrange` | 数字区间 |
| 自定义 | `slot` | 自定义组件 |

---

## 列配置速查

### 基础列

```javascript
{
  prop: 'name',
  label: '名称',
  width: 150
}
```

### 固定列

```javascript
{
  prop: 'id',
  label: 'ID',
  fixed: 'left',  // 或 'right'
  width: 80
}
```

### 可排序列

```javascript
{
  prop: 'createTime',
  label: '创建时间',
  sortable: true
}
```

### 自定义列内容

```javascript
{
  prop: 'icon',
  label: '图标',
  slot: 'icon'  // 在模板中使用 <template #icon="{ row }">
}
```

### 多级表头

```javascript
{
  label: '基本信息',
  children: [
    { prop: 'name', label: '姓名' },
    { prop: 'age', label: '年龄' }
  ]
}
```

---

## 操作列按钮配置

### 基础按钮

```javascript
{
  label: '编辑',
  type: 'primary',
  id: 'edit',
  funcName: 'handleEdit',
  icon: 'Edit'
}
```

### 带确认的按钮

```javascript
{
  label: '删除',
  type: 'danger',
  id: 'delete',
  funcName: 'handleDelete',
  confirm: {
    title: '确认删除？',
    message: '此操作不可恢复',
    type: 'warning'
  }
}
```

### 条件显示按钮

```javascript
{
  label: '启用',
  type: 'success',
  id: 'enable',
  funcName: 'handleEnable',
  show: (row) => row.status === 'disabled'
}
```

---

## 行选择配置

### 多选

```javascript
tableConfig: {
  selection: {
    enabled: true,
    type: 'multiple',
    rowClickSelect: true
  }
}
```

### 单选

```javascript
tableConfig: {
  selection: {
    enabled: true,
    type: 'single',
    rowClickSelect: true
  }
}
```

---

## 函数映射示例

```javascript
const functionMap = {
  // 操作列按钮函数
  handleEdit: (row, index) => {
    console.log('编辑', row)
  },
  
  handleDelete: (row, index) => {
    ElMessageBox.confirm('确认删除？').then(() => {
      // 删除逻辑
    })
  },
  
  // 顶部按钮函数
  handleAdd: () => {
    // 新增逻辑
  },
  
  handleBatchDelete: (selectedRows) => {
    // 批量删除逻辑
  }
}
```

---

## 常用配置组合

### 基础列表页

```javascript
export default {
  queryConditions: [
    { prop: 'name', label: '名称', type: 'input', span: 6 },
    { prop: 'status', label: '状态', type: 'select', span: 6, dict: 'statusDict' }
  ],
  columns: [
    { prop: 'id', label: 'ID', width: 80 },
    { prop: 'name', label: '名称', width: 150 },
    { prop: 'status', label: '状态', width: 100 },
    {
      prop: 'actions',
      label: '操作',
      type: 'action',
      fixed: 'right',
      buttons: [
        { label: '编辑', type: 'primary', id: 'edit', funcName: 'handleEdit' },
        { label: '删除', type: 'danger', id: 'delete', funcName: 'handleDelete' }
      ]
    }
  ],
  tableConfig: {
    stripe: true,
    border: true,
    selection: {
      enabled: true,
      type: 'multiple'
    }
  }
}
```

---

## 常见问题

### Q: 如何自定义筛选条件？

A: 使用 `type: 'slot'` 并配置 `slot` 名称，在模板中提供对应插槽。

### Q: 操作列按钮超过3个怎么办？

A: 组件会自动处理，前2个按钮直接显示，其余按钮放入"更多"下拉菜单。

### Q: 如何实现行点击选中？

A: 配置 `selection.rowClickSelect: true`。

### Q: 如何禁用某些行的选择？

A: 配置 `selection.selectable: (row) => row.status !== 'disabled'`。

### Q: 如何实现条件显示按钮？

A: 在按钮配置中使用 `show: (row) => boolean` 函数。

---

**更多详细信息请参考**：[Table组件需求文档](./Table组件需求文档.md)

