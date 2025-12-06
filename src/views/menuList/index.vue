<template>
  <div class="menu-list-page">
    <TableComponent ref="tableRef" :config="menuConfig" :function-map="functionMap">
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
import menuConfig from '@/config/table-configs/menu-list.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'

const tableRef = ref(null)

// 获取图标
const getIcon = (iconName) => {
  return ElementPlusIconsVue[iconName] || null
}

// 函数映射对象
const functionMap = {
  // 操作列按钮函数
  handleEdit: (row) => {
    console.log('编辑', row)
    ElMessage.info(`编辑菜单: ${row.name}`)
  },

  handleDelete: (row) => {
    ElMessageBox.confirm(`确定要删除菜单 "${row.name}" 吗？`, '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        ElMessage.success('删除成功')
        // 重新加载数据
        tableRef.value?.reload()
      })
      .catch(() => {
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
    // 重新加载数据
    tableRef.value?.reload()
  },

  // 顶部按钮函数
  handleAdd: () => {
    console.log('新增菜单')
    ElMessage.info('打开新增对话框')
    // 这里可以打开新增对话框
    // 新增成功后重新加载数据
    // tableRef.value?.reload()
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

    ElMessageBox.confirm(`确定要删除选中的 ${rows.length} 条数据吗？`, '批量删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        ElMessage.success('批量删除成功')
        // 重新加载数据
        tableRef.value?.reload()
      })
      .catch(() => {
        ElMessage.info('已取消删除')
      })
  }
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
