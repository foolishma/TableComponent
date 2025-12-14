<template>
  <div class="customer-list-page p-5">
    <TableComponent ref="tableRef" :config="tableConfig" :function-map="functionMap" />

    <!-- 新增/编辑客户弹窗 -->
    <CustomerForm
      v-model="showFormDialog"
      :customer-id="currentCustomerId"
      @success="handleFormSuccess"
    />

    <!-- 客户评价弹窗 -->
    <CustomerEvaluate v-model="showEvaluateDialog" :customer-id="currentCustomerId || ''" />
  </div>
</template>

<script setup>
import * as customerApi from '@/api/customer'
import TableComponent from '@/components/TableComponent/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CustomerEvaluate from './components/CustomerEvaluate.vue'
import CustomerForm from './components/CustomerForm.vue'
import tableConfig from './listConfig.js'

const router = useRouter()
const showFormDialog = ref(false)
const showEvaluateDialog = ref(false)
const currentCustomerId = ref(null)
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
    currentCustomerId.value = null
    showFormDialog.value = true
  },

  handleExport: async () => {
    try {
      await customerApi.exportCustomer()
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
      await customerApi.batchDeleteCustomer(ids)
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
    // 查看详情，复用编辑表单，只是禁用
    // 或者跳转详情页
    // 这里简单复用编辑表单作为查看（需改造Form支持只读）
    // 或者跳转到专门的详情页
    ElMessage.info(`查看客户: ${row.customerName}`)
  },

  handleEdit: (row) => {
    currentCustomerId.value = row.id
    showFormDialog.value = true
  },

  handleEvaluate: (row) => {
    currentCustomerId.value = row.id
    showEvaluateDialog.value = true
  },

  handleDelete: async (row) => {
    try {
      await ElMessageBox.confirm(`确定要删除客户 "${row.customerName}" 吗？`, '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })

      await customerApi.deleteCustomer(row.id)
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
