# $modal 全局提示插件使用说明

## 功能说明

`$modal` 是一个全局挂载的提示插件，统一管理所有消息提示和通知，支持 ElMessage 和 ElNotification 两种方式。

## 安装位置

插件已自动注册到 Vue 应用，无需手动导入即可使用。

## 使用方法

### 1. 在 Options API 中使用

```vue
<script>
export default {
  methods: {
    handleSuccess() {
      // 成功提示（默认使用 ElMessage）
      this.$modal.msgSuccess('操作成功')
    },

    handleError() {
      // 错误提示
      this.$modal.msgError('操作失败')
    },

    handleInfo() {
      // 信息提示
      this.$modal.msgInfo('这是一条信息')
    },

    handleWarning() {
      // 警告提示
      this.$modal.msgWarning('请注意')
    }
  }
}
</script>
```

### 2. 在 Composition API (setup) 中使用

#### 方式 1：通过 getCurrentInstance

```vue
<script setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const handleSuccess = () => {
  proxy.$modal.msgSuccess('操作成功')
}
</script>
```

#### 方式 2：通过 inject（推荐）

```vue
<script setup>
import { inject } from 'vue'

const $modal = inject('$modal')

const handleSuccess = () => {
  $modal.msgSuccess('操作成功')
}
</script>
```

### 3. 自定义选项

所有方法都支持自定义选项：

```javascript
// 基础用法
this.$modal.msgSuccess('操作成功')

// 自定义显示时长
this.$modal.msgSuccess('操作成功', { duration: 5000 })

// 使用通知方式（ElNotification）
this.$modal.msgSuccess('操作成功', {
  type: 'notification',
  title: '成功提示',
  position: 'top-right'
})

// 自定义所有选项
this.$modal.msgError('操作失败', {
  type: 'notification',
  title: '错误',
  duration: 5000,
  position: 'bottom-right',
  showClose: true,
  dangerouslyUseHTMLString: false
})
```

## API 说明

### msgSuccess(message, options?)

成功提示方法。

**参数：**

- `message` (string): 提示消息内容
- `options` (Object, 可选): 自定义选项
  - `type` (string): 提示类型，`'message'` 或 `'notification'`，默认为 `'message'`
  - `duration` (number): 显示时长（毫秒），默认 `3000`
  - `title` (string): 通知标题（仅 `notification` 类型有效）
  - `position` (string): 通知位置（仅 `notification` 类型有效），默认 `'top-right'`
  - 其他 ElMessage 或 ElNotification 支持的选项

**返回值：** ElMessage 或 ElNotification 实例

### msgError(message, options?)

错误提示方法。

**参数：** 同 `msgSuccess`

**返回值：** ElMessage 或 ElNotification 实例

### msgInfo(message, options?)

信息提示方法。

**参数：** 同 `msgSuccess`

**返回值：** ElMessage 或 ElNotification 实例

### msgWarning(message, options?)

警告提示方法。

**参数：** 同 `msgSuccess`

**返回值：** ElMessage 或 ElNotification 实例

## 使用示例

### 示例 1：基础消息提示

```javascript
// 成功提示
this.$modal.msgSuccess('保存成功')

// 错误提示
this.$modal.msgError('保存失败，请重试')

// 信息提示
this.$modal.msgInfo('数据已更新')

// 警告提示
this.$modal.msgWarning('请先选择数据')
```

### 示例 2：使用通知方式

```javascript
// 成功通知
this.$modal.msgSuccess('操作成功', {
  type: 'notification',
  title: '成功',
  position: 'top-right'
})

// 错误通知
this.$modal.msgError('操作失败', {
  type: 'notification',
  title: '错误',
  duration: 5000
})
```

### 示例 3：在 API 请求中使用

```javascript
import { inject } from 'vue'

const $modal = inject('$modal')

// 请求成功
const handleSuccess = () => {
  $modal.msgSuccess('数据加载成功')
}

// 请求失败
const handleError = (error) => {
  $modal.msgError(error.message || '请求失败')
}
```

### 示例 4：在表格操作中使用

```javascript
// 删除成功
const handleDeleteSuccess = () => {
  this.$modal.msgSuccess('删除成功', {
    duration: 2000
  })
  // 重新加载数据
  tableRef.value?.reload()
}

// 批量操作
const handleBatchSuccess = (count) => {
  this.$modal.msgSuccess(`成功处理 ${count} 条数据`, {
    type: 'notification',
    title: '批量操作'
  })
}
```

## 注意事项

1. **默认使用 ElMessage**：如果不指定 `type`，默认使用 `ElMessage` 显示提示
2. **通知方式**：设置 `type: 'notification'` 时，会使用 `ElNotification` 显示通知
3. **自定义选项**：所有 ElMessage 和 ElNotification 支持的选项都可以通过 `options` 传入
4. **类型安全**：在 TypeScript 项目中，可以通过类型声明文件增强类型提示

## 迁移指南

### 从 ElMessage 迁移

```javascript
// 旧代码
ElMessage.success('操作成功')

// 新代码
this.$modal.msgSuccess('操作成功')
```

### 从 ElNotification 迁移

```javascript
// 旧代码
ElNotification({
  title: '成功',
  message: '操作成功',
  type: 'success'
})

// 新代码
this.$modal.msgSuccess('操作成功', {
  type: 'notification',
  title: '成功'
})
```

## 优势

1. **统一管理**：所有提示都通过 `$modal` 统一管理，便于维护和修改
2. **灵活切换**：可以在消息和通知之间灵活切换
3. **类型支持**：支持所有 ElMessage 和 ElNotification 的选项
4. **易于扩展**：可以轻松添加新的提示方法或功能
