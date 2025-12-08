<template>
  <div class="menu-list-page">
    <TableComponent
      ref="tableRef"
      :config="menuConfig"
      :function-map="functionMap"
      :show-btn-func="showBtnFunc"
    >
      <!-- 自定义图标列 -->
      <template #icon="{ row }">
        <el-icon v-if="row.icon" :size="20">
          <component :is="getIcon(row.icon)" />
        </el-icon>
        <span v-else class="text-gray-400">-</span>
      </template>
    </TableComponent>
  </div>
</template>

<script setup>
import TableComponent from '@/components/TableComponent/index.vue'
import { useTableFunc } from '@/hooks/useTableFunc'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { inject, ref } from 'vue'
import menuConfig from './listConfig.js'

const tableRef = ref(null)
const $modal = inject('$modal')

const reload = () => {
  tableRef.value?.reload()
}

// 获取图标
const getIcon = (iconName) => {
  return ElementPlusIconsVue[iconName] || null
}

// 函数映射对象
const functionMap = {
  // 操作列按钮函数
  handleEdit: (row) => {
    console.log('编辑', row)
    $modal.msgInfo(`编辑菜单: ${row.name}`)
  },

  handleDelete: (row) => {
    useTableFunc({
      api: {
        url: '/api/menu/delete',
        method: 'delete'
      },
      params: () => ({ id: row.id }),
      successMessage: '删除成功',
      onSuccess: () => {
        reload()
      }
    })(row)
  },

  handleView: (row) => {
    console.log('查看', row)
    $modal.msgInfo(`查看菜单: ${row.name}`)
  },

  handleCopy: (row) => {
    console.log('复制', row)
    $modal.msgSuccess('复制成功')
    // 重新加载数据
    tableRef.value?.reload()
  },

  // 顶部按钮函数
  handleAdd: () => {
    console.log('新增菜单')
    $modal.msgInfo('打开新增对话框')
    // 这里可以打开新增对话框
    // 新增成功后重新加载数据
    // tableRef.value?.reload()
  },

  handleExport: () => {
    console.log('导出数据')
    $modal.msgSuccess('导出成功')
  },

  handleBatchDelete: (_button) => {
    const selectedRows = tableRef.value?.selectedRows
    if (!selectedRows || selectedRows.length === 0) {
      $modal.msgWarning('请先选择要删除的数据')
      return
    }
    useTableFunc({
      api: {
        url: '/api/menu/batchDelete',
        method: 'delete'
      },
      params: () => ({ ids: selectedRows.map((row) => row.id) }),
      successMessage: '批量删除成功',
      onSuccess: () => {
        reload()
      }
    })(selectedRows)
  }
}

const showBtnFunc = (row, btn) => {
  const btnStatus = {
    show: true,
    disabled: false
  }

  // 如果行内状态为已提交，则不能编辑
  if (btn.id === 'menuList:edit') {
    if (row.status === '已提交') {
      btnStatus.disabled = true
    }
  }

  return btnStatus
}
</script>

<style scoped>
.menu-list-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
