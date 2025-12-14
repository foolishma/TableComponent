<template>
  <div class="home-page">
    <el-row :gutter="20">
      <!-- 重要代办卡片 -->
      <el-col :span="24" :md="12" :lg="8">
        <el-card class="mb-4 box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="font-bold">重要代办</span>
              <el-button link type="primary" @click="refreshTodo">刷新</el-button>
            </div>
          </template>
          <div v-loading="loading" class="todo-list">
            <div
              v-for="item in todoList"
              :key="item.key"
              class="todo-item"
              @click="handleTodoClick(item)"
            >
              <span class="todo-label">{{ item.label }}</span>
              <span class="todo-value" :class="{ warning: item.count > item.threshold }">
                {{ item.count }}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 办公审批卡片 -->
      <el-col :span="24" :md="12" :lg="8">
        <el-card class="mb-4 box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="font-bold">办公审批</span>
            </div>
          </template>
          <div v-loading="loading" class="approval-list">
            <div
              v-for="item in approvalList"
              :key="item.key"
              class="approval-item"
              @click="handleApprovalClick(item)"
            >
              <span class="approval-label">{{ item.label }}</span>
              <el-badge
                :value="item.count"
                :max="99"
                class="approval-badge"
                :hidden="item.count === 0"
              >
                <span class="approval-value">{{ item.count }}</span>
              </el-badge>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 快捷入口卡片 -->
      <el-col :span="24" :md="12" :lg="8">
        <el-card class="mb-4 box-card" shadow="hover">
          <template #header>
            <span class="font-bold">快捷入口</span>
          </template>
          <div class="quick-actions">
            <div
              v-for="action in quickActions"
              :key="action.key"
              class="action-item"
              @click="handleQuickAction(action)"
            >
              <el-icon class="action-icon" :style="{ color: action.color }" :size="24">
                <component :is="action.icon" />
              </el-icon>
              <span class="action-label">{{ action.label }}</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 考勤统计卡片 -->
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header flex-wrap">
              <span class="font-bold">考勤统计</span>
              <div class="header-actions flex gap-2 items-center">
                <el-radio-group v-model="dateType" size="small" @change="handleDateTypeChange">
                  <el-radio-button label="today">今日</el-radio-button>
                  <el-radio-button label="yesterday">昨日</el-radio-button>
                  <el-radio-button label="week">本周</el-radio-button>
                  <el-radio-button label="month">本月</el-radio-button>
                </el-radio-group>
                <el-select
                  v-model="selectedSite"
                  placeholder="选择驻点"
                  clearable
                  size="small"
                  style="width: 150px"
                  @change="handleSiteChange"
                >
                  <el-option
                    v-for="site in siteList"
                    :key="site.id"
                    :label="site.name"
                    :value="site.id"
                  />
                </el-select>
              </div>
            </div>
          </template>
          <div ref="chartRef" v-loading="chartLoading" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import * as homeApi from '@/api/home'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const chartLoading = ref(false)

// 代办事项数据
const todoList = ref([
  { key: 'pendingEntry', label: '待入职', count: 0, threshold: 10, route: '/personnel/entry' },
  { key: 'todayLeave', label: '今日离职', count: 0, threshold: 5, route: '/personnel/leave' },
  {
    key: 'soonLeave',
    label: '即将离职',
    count: 0,
    threshold: 5,
    route: '/personnel/leave?type=soon'
  },
  {
    key: 'suspectedLeave',
    label: '疑似离职',
    count: 0,
    threshold: 3,
    route: '/personnel/leave?type=suspected'
  },
  { key: 'noContract', label: '未签合同', count: 0, threshold: 10, route: '/personnel/contract' },
  {
    key: 'noInsurance',
    label: '未购买商业保险',
    count: 0,
    threshold: 5,
    route: '/personnel/insurance'
  }
])

// 审批事项数据
const approvalList = ref([
  { key: 'myApproval', label: '我的审批', count: 0, route: '/approval/my-approval' },
  { key: 'myApplication', label: '我的申请', count: 0, route: '/approval/my-application' },
  { key: 'ccToMe', label: '抄送我的', count: 0, route: '/approval/cc-to-me' }
])

// 快捷入口数据
const quickActions = ref([
  {
    key: 'import',
    label: '导入新保安',
    color: '#409eff',
    icon: 'Upload',
    route: '/personnel/import'
  },
  { key: 'entry', label: '保安入职', color: '#67c23a', icon: 'User', route: '/personnel/entry' },
  { key: 'salary', label: '算工资', color: '#e6a23c', icon: 'Money', route: '/salary/calculate' },
  {
    key: 'member',
    label: '新建公司成员',
    color: '#909399',
    icon: 'UserFilled',
    route: '/system/user'
  },
  { key: 'site', label: '新建驻点', color: '#f56c6c', icon: 'Location', route: '/site' }, // 简化路由，通常列表页有新增按钮
  {
    key: 'customer',
    label: '新建客户',
    color: '#409eff',
    icon: 'OfficeBuilding',
    route: '/customer'
  }
])

const dateType = ref('today')
const selectedSite = ref(null)
const siteList = ref([
  { id: 1, name: '驻点A' },
  { id: 2, name: '驻点B' }
]) // 模拟驻点数据
const chartRef = ref(null)
let chartInstance = null

// 加载统计数据
const loadStatistics = async () => {
  loading.value = true
  try {
    const res = await homeApi.getStatistics()
    if (res && res.data) {
      todoList.value.forEach((item) => {
        item.count = res.data.todo[item.key] || 0
      })
      approvalList.value.forEach((item) => {
        item.count = res.data.approval[item.key] || 0
      })
    } else {
      // 模拟数据
      todoList.value.forEach((item) => (item.count = Math.floor(Math.random() * 20)))
      approvalList.value.forEach((item) => (item.count = Math.floor(Math.random() * 10)))
    }
  } catch (error) {
    // 模拟数据
    todoList.value.forEach((item) => (item.count = Math.floor(Math.random() * 20)))
    approvalList.value.forEach((item) => (item.count = Math.floor(Math.random() * 10)))
  } finally {
    loading.value = false
  }
}

// 加载考勤数据
const loadAttendanceData = async () => {
  chartLoading.value = true
  try {
    const params = {
      dateType: dateType.value,
      siteId: selectedSite.value
    }
    const res = await homeApi.getAttendanceStatistics(params)
    updateChart(res.data)
  } catch (error) {
    // 模拟数据
    const mockData = {
      openNormal: 120,
      reportNormal: 80,
      normal: 200,
      late: 15,
      earlyLeave: 5,
      lateAndEarlyLeave: 2,
      lateAndNoEndCard: 3,
      noEndCard: 8,
      absent: 10,
      invalid: 5
    }
    // 随机波动一下
    for (let key in mockData) {
      mockData[key] = Math.floor(mockData[key] * (0.8 + Math.random() * 0.4))
    }
    updateChart(mockData)
  } finally {
    chartLoading.value = false
  }
}

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [
        '打开正常',
        '上报正常',
        '正常',
        '迟到',
        '早退',
        '迟到早退',
        '迟到缺卡',
        '缺下班卡',
        '缺勤',
        '无效'
      ],
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '人数',
        type: 'bar',
        barWidth: '60%',
        data: [],
        itemStyle: {
          color: function (params) {
            const colors = [
              '#67c23a',
              '#67c23a',
              '#67c23a',
              '#e6a23c',
              '#e6a23c',
              '#f56c6c',
              '#f56c6c',
              '#f56c6c',
              '#909399',
              '#909399'
            ]
            return colors[params.dataIndex] || '#409eff'
          }
        }
      }
    ]
  }

  chartInstance.setOption(option)

  window.addEventListener('resize', handleResize)
}

const handleResize = () => {
  chartInstance?.resize()
}

// 更新图表
const updateChart = (data) => {
  if (!chartInstance) return

  const option = {
    series: [
      {
        data: [
          data.openNormal || 0,
          data.reportNormal || 0,
          data.normal || 0,
          data.late || 0,
          data.earlyLeave || 0,
          data.lateAndEarlyLeave || 0,
          data.lateAndNoEndCard || 0,
          data.noEndCard || 0,
          data.absent || 0,
          data.invalid || 0
        ]
      }
    ]
  }

  chartInstance.setOption(option)
}

// 事件处理
const handleTodoClick = (item) => {
  router.push(item.route)
}

const handleApprovalClick = (item) => {
  router.push(item.route)
}

const handleQuickAction = (action) => {
  // 对于新建类型的快捷入口，可能需要传递参数或打开弹窗
  // 这里简化为跳转到列表页，实际可以带上 query 参数让列表页自动打开新增弹窗
  router.push(action.route)
  ElMessage.success(`点击了快捷入口: ${action.label}`)
}

const handleDateTypeChange = () => {
  loadAttendanceData()
}

const handleSiteChange = () => {
  loadAttendanceData()
}

const refreshTodo = () => {
  loadStatistics()
  ElMessage.success('刷新成功')
}

onMounted(() => {
  loadStatistics()
  // 稍微延迟初始化图表，确保容器已渲染
  setTimeout(() => {
    initChart()
    loadAttendanceData()
  }, 100)
})

onUnmounted(() => {
  chartInstance?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.home-page {
  padding: 20px;
}

.box-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-list,
.approval-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.todo-item,
.approval-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #f8f9fa;
  transition: all 0.3s;
}

.todo-item:hover,
.approval-item:hover {
  background-color: #ecf5ff;
  transform: translateX(5px);
}

.todo-label,
.approval-label {
  font-size: 14px;
  color: #606266;
}

.todo-value {
  font-size: 18px;
  font-weight: bold;
  color: #409eff;
}

.todo-value.warning {
  color: #f56c6c;
}

.approval-value {
  color: #606266;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
  cursor: pointer;
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: all 0.3s;
}

.action-item:hover {
  background-color: #ecf5ff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.action-icon {
  margin-bottom: 8px;
}

.action-label {
  font-size: 13px;
  color: #606266;
  text-align: center;
}

.chart-container {
  width: 100%;
  height: 350px;
}

.header-actions {
  display: flex;
  gap: 12px;
}
</style>
