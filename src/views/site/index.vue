<template>
  <div class="site-list-page p-5">
    <TableComponent ref="tableRef" :config="tableConfig" :function-map="functionMap" />

    <!-- 新增/编辑驻点弹窗 -->
    <SiteForm v-model="showFormDialog" :site-id="currentSiteId" @success="handleFormSuccess" />
  </div>
</template>

<script setup>
import * as siteApi from '@/api/site'
import TableComponent from '@/components/TableComponent/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SiteForm from './components/SiteForm.vue'
import tableConfig from './listConfig.js'

const router = useRouter()
const showFormDialog = ref(false)
const currentSiteId = ref(null)
const tableRef = ref(null)

// 刷新表格数据
const refreshTable = () => {
  if (tableRef.value) {
    tableRef.value.reload()
  }
}

// 函数映射对象
const functionMap = {
  // 顶部按钮函数
  handleAdd: () => {
    currentSiteId.value = null
    showFormDialog.value = true
  },

  handleExport: async () => {
    try {
      await siteApi.exportSite()
      ElMessage.success('导出成功')
    } catch (error) {
      ElMessage.error('导出失败')
    }
  },

  handleBatchDelete: async (selectedRows) => {
    if (!selectedRows || selectedRows.length === 0) {
      ElMessage.warning('请先选择要删除的数据')
      return
    }

    try {
      await ElMessageBox.confirm(
        `确定要删除选中的 ${selectedRows.length} 条数据吗？`,
        '批量删除确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )

      const ids = selectedRows.map((row) => row.id)
      await siteApi.batchDeleteSite(ids)
      ElMessage.success('批量删除成功')
      // 触发刷新
      refreshTable()
    } catch (error) {
      if (error !== 'cancel') {
        ElMessage.error('批量删除失败')
      }
    }
  },

  // 操作列按钮函数
  handleView: (row) => {
    ElMessage.info(`查看驻点: ${row.siteName}`)
  },

  handleEdit: (row) => {
    currentSiteId.value = row.id
    showFormDialog.value = true
  },

  handleDelete: async (row) => {
    try {
      await ElMessageBox.confirm(`确定要删除驻点 "${row.siteName}" 吗？`, '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })

      await siteApi.deleteSite(row.id)
      ElMessage.success('删除成功')
      // 触发刷新
      refreshTable()
    } catch (error) {
      if (error !== 'cancel') {
        ElMessage.error('删除失败')
      }
    }
  }
}

const handleFormSuccess = () => {
  // 刷新列表
  refreshTable()
}
</script>
