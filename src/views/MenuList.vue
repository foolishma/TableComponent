<template>
  <div class="menu-list-page">
    <TableComponent
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
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import TableComponent from '@/components/Table.vue'
import menuConfig from '@/config/table-configs/menu-list.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const loading = ref(false)
const tableData = ref([])
const selectedRows = ref([])

// 表格配置（直接使用配置文件）
const tableConfig = ref(menuConfig)

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageSizes: [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper'
})

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '首页',
    path: '/home',
    icon: 'HomeFilled',
    status: '1',
    sort: 1,
    createTime: '2024-01-15 10:30:00'
  },
  {
    id: 2,
    name: '表格管理',
    path: '/table',
    icon: 'Grid',
    status: '1',
    sort: 2,
    createTime: '2024-01-16 11:20:00'
  },
  {
    id: 3,
    name: '表单管理',
    path: '/form',
    icon: 'Document',
    status: '1',
    sort: 3,
    createTime: '2024-01-17 14:15:00'
  },
  {
    id: 4,
    name: '组件演示',
    path: '/components',
    icon: 'Box',
    status: '1',
    sort: 4,
    createTime: '2024-01-18 09:45:00'
  },
  {
    id: 5,
    name: '菜单列表',
    path: '/menu-list',
    icon: 'Menu',
    status: '1',
    sort: 5,
    createTime: '2024-01-19 16:30:00'
  },
  {
    id: 6,
    name: '系统设置',
    path: '/settings',
    icon: 'Setting',
    status: '0',
    sort: 6,
    createTime: '2024-01-20 13:20:00'
  },
  {
    id: 7,
    name: '用户管理',
    path: '/users',
    icon: 'User',
    status: '1',
    sort: 7,
    createTime: '2024-01-21 10:10:00'
  },
  {
    id: 8,
    name: '角色管理',
    path: '/roles',
    icon: 'UserFilled',
    status: '1',
    sort: 8,
    createTime: '2024-01-22 15:40:00'
  },
  {
    id: 9,
    name: '权限管理',
    path: '/permissions',
    icon: 'Lock',
    status: '1',
    sort: 9,
    createTime: '2024-01-23 11:30:00'
  },
  {
    id: 10,
    name: '日志管理',
    path: '/logs',
    icon: 'Document',
    status: '0',
    sort: 10,
    createTime: '2024-01-24 14:50:00'
  }
]

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
        // 删除逻辑
        const index = tableData.value.findIndex((item) => item.id === row.id)
        if (index > -1) {
          tableData.value.splice(index, 1)
          pagination.total = tableData.value.length
          ElMessage.success('删除成功')
        }
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
    const newRow = {
      ...row,
      id: Date.now(),
      name: `${row.name}_副本`
    }
    tableData.value.push(newRow)
    pagination.total = tableData.value.length
    ElMessage.success('复制成功')
  },

  // 顶部按钮函数
  handleAdd: () => {
    console.log('新增菜单')
    ElMessage.info('打开新增对话框')
    // 这里可以打开新增对话框
    const newMenu = {
      id: Date.now(),
      name: '新菜单',
      path: '/new-menu',
      icon: 'Plus',
      status: '1',
      sort: tableData.value.length + 1,
      createTime: new Date().toLocaleString('zh-CN')
    }
    tableData.value.unshift(newMenu)
    pagination.total = tableData.value.length
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
        // 批量删除逻辑
        const ids = rows.map((row) => row.id)
        tableData.value = tableData.value.filter((item) => !ids.includes(item.id))
        pagination.total = tableData.value.length
        selectedRows.value = []
        ElMessage.success('批量删除成功')
      })
      .catch(() => {
        ElMessage.info('已取消删除')
      })
  }
}

// 加载数据
const loadData = async (queryParams = {}) => {
  loading.value = true
  try {
    // 模拟 API 调用延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 模拟筛选
    let filteredData = [...mockData]

    if (queryParams.name) {
      filteredData = filteredData.filter((item) => item.name.includes(queryParams.name))
    }

    if (queryParams.status) {
      filteredData = filteredData.filter((item) => item.status === queryParams.status)
    }

    if (queryParams.createTime && queryParams.createTime.length === 2) {
      // 这里简化处理，实际应该比较日期
      filteredData = filteredData.filter((item) => {
        const createDate = new Date(item.createTime)
        const startDate = new Date(queryParams.createTime[0])
        const endDate = new Date(queryParams.createTime[1])
        return createDate >= startDate && createDate <= endDate
      })
    }

    // 分页处理
    const start = (pagination.currentPage - 1) * pagination.pageSize
    const end = start + pagination.pageSize
    tableData.value = filteredData.slice(start, end)
    pagination.total = filteredData.length
  } catch (error) {
    ElMessage.error('加载数据失败')
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 查询
const handleQuery = (queryParams) => {
  console.log('查询参数', queryParams)
  pagination.currentPage = 1
  loadData(queryParams)
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
  console.log('选中行', selection)
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
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.menu-list-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
