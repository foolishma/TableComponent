<template>
  <div class="space-y-6">
    <el-card shadow="hover">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg font-semibold">表格演示页面</span>
          <el-tag type="primary">表格演示</el-tag>
        </div>
      </template>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <el-input
            v-model="searchText"
            placeholder="搜索用户"
            style="width: 300px"
            clearable
            @input="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>

          <div class="flex space-x-2">
            <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
            <el-button type="success" :icon="Download">导出</el-button>
          </div>
        </div>

        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="email" label="邮箱" width="200" />
          <el-table-column prop="role" label="角色" width="120">
            <template #default="scope">
              <el-tag :type="getRoleType(scope.row.role)">
                {{ scope.row.role }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                active-text="启用"
                inactive-text="禁用"
                @change="handleStatusChange(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180" />
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="scope">
              <el-button type="primary" link :icon="Edit" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button type="danger" link :icon="Delete" @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <div class="flex items-center justify-between">
          <div class="text-gray-600">
            已选择 <strong>{{ selectedRows.length }}</strong> 项
          </div>
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>

    <el-card shadow="hover">
      <template #header>
        <span class="text-lg font-semibold">表格功能说明</span>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="搜索功能">支持按姓名和邮箱搜索</el-descriptions-item>
        <el-descriptions-item label="分页功能">支持自定义每页显示数量</el-descriptions-item>
        <el-descriptions-item label="多选功能">支持批量选择操作</el-descriptions-item>
        <el-descriptions-item label="状态切换">支持快速启用/禁用</el-descriptions-item>
        <el-descriptions-item label="操作按钮">支持编辑和删除操作</el-descriptions-item>
        <el-descriptions-item label="数据展示">支持斑马纹和边框样式</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Download, Edit, Delete } from '@element-plus/icons-vue'
const searchText = ref('')
const tableData = ref([])
const selectedRows = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: true,
    createTime: '2024-01-15 10:30:00'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '编辑',
    status: true,
    createTime: '2024-01-16 11:20:00'
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '用户',
    status: false,
    createTime: '2024-01-17 14:15:00'
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: '管理员',
    status: true,
    createTime: '2024-01-18 09:45:00'
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    role: '编辑',
    status: true,
    createTime: '2024-01-19 16:30:00'
  },
  {
    id: 6,
    name: '孙八',
    email: 'sunba@example.com',
    role: '用户',
    status: false,
    createTime: '2024-01-20 13:20:00'
  },
  {
    id: 7,
    name: '周九',
    email: 'zhoujiu@example.com',
    role: '用户',
    status: true,
    createTime: '2024-01-21 10:10:00'
  },
  {
    id: 8,
    name: '吴十',
    email: 'wushi@example.com',
    role: '编辑',
    status: true,
    createTime: '2024-01-22 15:40:00'
  }
]

const loadData = () => {
  // 模拟数据加载
  tableData.value = mockData
  total.value = mockData.length
}

const handleSearch = (value) => {
  if (!value) {
    tableData.value = mockData
    return
  }
  tableData.value = mockData.filter(
    (item) => item.name.includes(value) || item.email.includes(value)
  )
  total.value = tableData.value.length
}

const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

const handleAdd = () => {
  ElMessage.success('新增功能待实现')
}

const handleEdit = (row) => {
  ElMessage.info(`编辑用户: ${row.name}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除用户 "${row.name}" 吗？`, '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage.success('删除成功')
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

const handleStatusChange = (row) => {
  ElMessage.success(`${row.name} 状态已${row.status ? '启用' : '禁用'}`)
}

const handleSizeChange = (size) => {
  pageSize.value = size
  ElMessage.info(`每页显示 ${size} 条`)
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  ElMessage.info(`当前第 ${page} 页`)
}

const getRoleType = (role) => {
  const roleMap = {
    管理员: 'danger',
    编辑: 'warning',
    用户: 'success'
  }
  return roleMap[role] || 'info'
}

onMounted(() => {
  loadData()
})
</script>

<style scoped></style>
