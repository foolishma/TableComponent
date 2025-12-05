<template>
  <div v-loading="tableLoading" element-loading-text="数据加载中..." class="table-container">
    <!-- 筛选条件区域 -->
    <el-card v-if="queryConditions.length > 0" shadow="hover" class="mb-4">
      <el-row :gutter="20">
        <el-col
          v-for="condition in visibleConditions"
          :key="condition.prop"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
        >
          <div class="mb-4 flex items-center">
            <label
              class="mr-2 text-sm text-gray-600 whitespace-nowrap"
              :style="{ width: (condition.labelWidth || 60) + 'px' }"
            >
              {{ condition.label }}{{ getLabelSuffix(condition) }}
            </label>
            <!-- 输入框 -->
            <el-input
              v-if="condition.type === 'input'"
              v-model="queryValues[condition.prop]"
              :placeholder="condition.placeholder"
              :clearable="condition.clearable !== false"
              :disabled="condition.disabled"
              class="flex-1"
            />
            <!-- 数字输入框 -->
            <el-input-number
              v-else-if="condition.type === 'number'"
              v-model="queryValues[condition.prop]"
              :placeholder="condition.placeholder"
              :disabled="condition.disabled"
              class="flex-1"
            />
            <!-- 下拉框 -->
            <el-select
              v-else-if="condition.type === 'select'"
              v-model="queryValues[condition.prop]"
              :placeholder="condition.placeholder"
              :clearable="condition.clearable !== false"
              :disabled="condition.disabled"
              class="flex-1"
            >
              <el-option
                v-for="option in getOptions(condition)"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <!-- 日期选择器 -->
            <el-date-picker
              v-else-if="isDateType(condition.type)"
              v-model="queryValues[condition.prop]"
              :type="condition.type"
              :placeholder="condition.placeholder"
              :start-placeholder="condition.startPlaceholder"
              :end-placeholder="condition.endPlaceholder"
              :format="condition.format"
              :value-format="condition.valueFormat"
              :clearable="condition.clearable !== false"
              :disabled="condition.disabled"
              class="flex-1"
            />
            <!-- 自定义插槽 -->
            <slot
              v-else-if="condition.type === 'slot'"
              :name="condition.slot"
              :condition="condition"
              :value="queryValues[condition.prop]"
              :on-change="
                (val) => {
                  queryValues[condition.prop] = val
                }
              "
            ></slot>
          </div>
        </el-col>

        <!-- 操作按钮列：展开更多、查询、重置 -->
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <div class="mb-4 flex items-center justify-start space-x-2">
            <!-- 查询按钮 -->
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <!-- 重置按钮 -->
            <el-button @click="handleReset">重置</el-button>
            <!-- 展开/收起按钮 -->
            <el-button v-if="hasMoreConditions" link type="primary" @click="toggleExpand">
              {{ isExpanded ? '收起' : '展开' }}
              <el-icon class="ml-1">
                <ArrowUp v-if="isExpanded" />
                <ArrowDown v-else />
              </el-icon>
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 表格区域 -->
    <el-card ref="tableCardRef" shadow="hover" :style="tableCardStyle" class="table-card">
      <!-- 顶部按钮区域 -->
      <div v-if="topButtons.length > 0" class="mb-4 flex items-center justify-start space-x-2">
        <el-button
          v-for="button in topButtons"
          :key="button.id"
          :type="button.type || 'default'"
          :icon="button.icon ? getIcon(button.icon) : undefined"
          :disabled="getButtonDisabled(button)"
          @click="handleTopButtonClick(button)"
        >
          {{ button.label }}
        </el-button>
      </div>
      <el-table
        ref="tableRef"
        :data="tableData"
        :stripe="tableConfigComputed.stripe"
        :border="tableConfigComputed.border"
        :height="computedTableHeight"
        :max-height="computedMaxHeight"
        :fit="tableConfigComputed.fit !== false"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <!-- 行选择列 -->
        <el-table-column
          v-if="selectionConfig.enabled && selectionConfig.type === 'multiple'"
          type="selection"
          width="55"
          fixed="left"
          :reserve-selection="selectionConfig.reserveSelection"
        />

        <!-- 单选列 -->
        <el-table-column
          v-if="selectionConfig.enabled && selectionConfig.type === 'single'"
          width="55"
          fixed="left"
        >
          <template #default="{ row }">
            <el-radio :model-value="selectedRow?.id === row.id" @change="handleSingleSelect(row)" />
          </template>
        </el-table-column>

        <!-- 序号列 -->
        <el-table-column
          v-if="showIndex"
          type="index"
          label="序号"
          width="60"
          :fixed="selectionConfig.enabled ? false : 'left'"
        />

        <!-- 数据列 -->
        <template v-for="column in dataColumns" :key="column.prop || column.label">
          <!-- 多级表头 -->
          <el-table-column
            v-if="column.children"
            :label="column.label"
            :align="column.align"
            :header-align="column.headerAlign"
          >
            <el-table-column
              v-for="child in column.children"
              :key="child.prop"
              :prop="child.prop"
              :label="child.label"
              :width="child.width"
              :min-width="child.minWidth"
              :align="child.align"
              :header-align="child.headerAlign"
              :sortable="child.sortable"
              :show-overflow-tooltip="child.showOverflowTooltip"
              :formatter="child.formatter"
            >
              <template v-if="child.slot" #default="scope">
                <slot :name="child.slot" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </el-table-column>

          <!-- 普通列 -->
          <el-table-column
            v-else
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :min-width="column.minWidth"
            :fixed="column.fixed"
            :align="column.align"
            :header-align="column.headerAlign"
            :sortable="column.sortable"
            :show-overflow-tooltip="column.showOverflowTooltip"
            :formatter="column.formatter"
          >
            <template v-if="column.slot" #default="scope">
              <slot :name="column.slot" v-bind="scope"></slot>
            </template>
          </el-table-column>
        </template>

        <!-- 操作列 -->
        <el-table-column
          v-if="showAction && actionColumn"
          :label="actionColumn.label"
          :width="actionColumn.width"
          :fixed="actionColumn.fixed"
        >
          <template #default="{ row, $index }">
            <div class="flex items-center space-x-2">
              <template v-for="button in visibleButtons(row)" :key="button.id">
                <el-button
                  v-if="shouldShowButton(button, row)"
                  :type="button.type || 'default'"
                  :size="button.size || 'small'"
                  :icon="button.icon ? getIcon(button.icon) : undefined"
                  :disabled="getButtonDisabled(button, row)"
                  :loading="button.loading"
                  link
                  @click="handleActionClick(button, row, $index)"
                >
                  {{ button.label }}
                </el-button>
              </template>

              <!-- 更多按钮 -->
              <el-dropdown
                v-if="moreButtons(row).length > 0"
                trigger="hover"
                @command="(cmd) => handleMoreButtonClick(cmd, row, $index)"
              >
                <el-button link type="primary" size="small">
                  更多 <el-icon><ArrowDown /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="button in moreButtons(row)"
                      :key="button.id"
                      :command="button"
                    >
                      {{ button.label }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div v-if="showPagination" class="mt-4 flex items-center justify-between">
        <div class="text-gray-600">
          共 <strong>{{ pagination.total }}</strong> 条数据
        </div>
        <el-pagination
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :page-sizes="pagination.pageSizes || [10, 20, 50, 100]"
          :total="pagination.total"
          :layout="pagination.layout || 'total, sizes, prev, pager, next, jumper'"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { useTableConfig } from './hooks/useTableConfig'

// Props
const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  functionMap: {
    type: Object,
    default: () => ({})
  }
})

// Emits（保留部分事件供外部监听，但内部会自动处理）
const emit = defineEmits([
  'selection-change',
  'row-click',
  'data-loaded',
  'data-error',
  'query',
  'reset'
])

// 使用配置 Hook（传入响应式的 config）
const {
  apiConfig,
  queryConditions,
  queryValues,
  buildQueryParams,
  resetQueryValues,
  getLabelSuffix,
  tableConfig: tableConfigComputed,
  selectionConfig,
  topButtons,
  tableCardStyle,
  getTableHeight,
  getMaxHeight,
  showPagination,
  showIndex,
  showAction,
  dataColumns,
  actionColumn,
  getIcon,
  getOptions,
  isDateType
} = useTableConfig(computed(() => props.config))

// 组件内部状态
const tableRef = ref(null)
const tableCardRef = ref(null)
const isExpanded = ref(false)
const selectedRow = ref(null)
const selectedRows = ref([])
const tableCardHeight = ref(null)

// 内部数据状态
const internalData = ref([])
const internalLoading = ref(false)

// 内部分页状态（表格内部实现）
const internalPagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageSizes: [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper'
})

// 表格数据和加载状态
const tableData = computed(() => internalData.value)
const tableLoading = computed(() => internalLoading.value)

// 分页对象
const pagination = computed(() => internalPagination.value)

// 可见的筛选条件
const visibleConditions = computed(() => {
  if (isExpanded.value || queryConditions.value.length <= 6) {
    return queryConditions.value
  }
  return queryConditions.value.slice(0, 6)
})

// 是否有更多条件
const hasMoreConditions = computed(() => {
  return queryConditions.value.length > 6
})

// 计算表格高度
const computedTableHeight = computed(() => {
  return getTableHeight(tableCardHeight.value)
})

// 计算表格最大高度
const computedMaxHeight = computed(() => {
  return getMaxHeight(tableCardHeight.value, showPagination.value)
})

// 切换展开/收起
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// API 请求函数
const fetchData = async (queryParams = {}) => {
  if (!apiConfig.value) {
    return
  }

  internalLoading.value = true
  try {
    const api = apiConfig.value
    const method = (api.method || 'get').toLowerCase()
    const url = api.url

    if (!url) {
      ElMessage.error('API 配置错误：缺少 url')
      return
    }

    // 构建请求参数
    const requestParams = {
      ...queryParams
    }

    // 如果有分页，添加分页参数
    if (pagination.value) {
      requestParams.page = pagination.value.currentPage || 1
      requestParams.pageSize = pagination.value.pageSize || 10
    }

    // 获取自定义请求函数（如果通过 functionMap 传入）
    const customRequest = props.functionMap?.request || null

    let response

    if (customRequest) {
      // 使用自定义请求函数
      response = await customRequest({
        url,
        method,
        params: method === 'get' ? requestParams : undefined,
        data: method !== 'get' ? requestParams : undefined
      })
    } else {
      // 使用封装的表格请求 API
      const { tableRequest } = await import('@/api/table')
      response = await tableRequest({
        url,
        method,
        params: method === 'get' ? requestParams : undefined,
        data: method !== 'get' ? requestParams : undefined
      })
    }

    // 处理响应数据
    // 支持多种响应格式：
    // 1. { data: [], total: 0 }
    // 2. { list: [], total: 0 }
    // 3. { records: [], total: 0 }
    // 4. 直接是数组 []
    let data = []
    let total = 0

    if (Array.isArray(response)) {
      data = response
      total = response.length
    } else if (response.data) {
      data = Array.isArray(response.data) ? response.data : []
      total = response.total || response.data.length || 0
    } else if (response.list) {
      data = Array.isArray(response.list) ? response.list : []
      total = response.total || response.list.length || 0
    } else if (response.records) {
      data = Array.isArray(response.records) ? response.records : []
      total = response.total || response.records.length || 0
    } else {
      data = []
      total = 0
    }

    internalData.value = data

    // 更新分页总数
    if (pagination.value) {
      pagination.value.total = total
    }

    // 触发数据加载完成事件
    emit('data-loaded', { data, total, response })
  } catch (error) {
    console.error('API 请求失败:', error)
    ElMessage.error(error.message || '数据加载失败')
    internalData.value = []
    emit('data-error', error)
  } finally {
    internalLoading.value = false
  }
}

// 查询
const handleQuery = async () => {
  try {
    const params = buildQueryParams()
    // 重置到第一页
    pagination.value.currentPage = 1
    await fetchData(params)
    // 查询成功后触发事件
    emit('query', params)
  } catch (error) {
    console.error('查询失败:', error)
  }
}

// 重置
const handleReset = async () => {
  try {
    // 重置查询条件
    resetQueryValues()
    // 重置到第一页
    pagination.value.currentPage = 1
    // 重置后自动查询
    await fetchData()
    // 重置成功后触发事件
    emit('reset')
  } catch (error) {
    console.error('重置失败:', error)
  }
}

// 选择变化
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
  emit('selection-change', selection)
}

// 行点击
const handleRowClick = (row, column, event) => {
  if (selectionConfig.value.rowClickSelect) {
    if (selectionConfig.value.type === 'single') {
      selectedRow.value = row
      emit('selection-change', [row])
    } else {
      const index = selectedRows.value.findIndex((item) => item.id === row.id)
      if (index > -1) {
        tableRef.value?.toggleRowSelection(row, false)
      } else {
        tableRef.value?.toggleRowSelection(row, true)
      }
    }
  }
  emit('row-click', row, column, event)
}

// 单选
const handleSingleSelect = (row) => {
  selectedRow.value = row
  emit('selection-change', [row])
}

// 顶部按钮点击
const handleTopButtonClick = (button) => {
  const func = props.functionMap[button.funcName]
  if (func) {
    if (button.id === 'batchDelete' || button.id === 'batchDelete') {
      func(selectedRows.value)
    } else {
      func()
    }
  } else {
    ElMessage.warning(`函数 ${button.funcName} 未定义`)
  }
}

// 操作按钮点击
const handleActionClick = async (button, row, index) => {
  if (button.confirm) {
    try {
      await ElMessageBox.confirm(
        button.confirm.message || '确认操作？',
        button.confirm.title || '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: button.confirm.type || 'warning'
        }
      )
    } catch {
      return
    }
  }

  const func = props.functionMap[button.funcName]
  if (func) {
    func(row, index)
  } else {
    ElMessage.warning(`函数 ${button.funcName} 未定义`)
  }
}

// 更多按钮点击
const handleMoreButtonClick = async (button, row, index) => {
  await handleActionClick(button, row, index)
}

// 可见按钮
const visibleButtons = (row) => {
  const buttons = actionColumn.value?.buttons || []
  if (buttons.length <= 3) {
    return buttons
  }
  return buttons.slice(0, 2)
}

// 更多按钮
const moreButtons = (row) => {
  const buttons = actionColumn.value?.buttons || []
  if (buttons.length <= 3) {
    return []
  }
  return buttons.slice(2)
}

// 是否显示按钮
const shouldShowButton = (button, row) => {
  if (button.show === undefined || button.show === true) {
    return true
  }
  if (typeof button.show === 'function') {
    return button.show(row)
  }
  return button.show
}

// 按钮是否禁用
const getButtonDisabled = (button, row) => {
  if (button.disabled === undefined || button.disabled === false) {
    return false
  }
  if (typeof button.disabled === 'function') {
    return row ? button.disabled(row) : button.disabled(selectedRows.value)
  }
  return button.disabled
}

// 分页变化
const handlePageChange = (page) => {
  pagination.value.currentPage = page
  const params = buildQueryParams()
  fetchData(params)
}

// 每页数量变化
const handleSizeChange = (size) => {
  pagination.value.pageSize = size
  pagination.value.currentPage = 1
  const params = buildQueryParams()
  fetchData(params)
}

// 重新加载数据
const reload = () => {
  const params = buildQueryParams()
  fetchData(params)
}

// 生命周期：组件挂载时自动请求数据
onMounted(() => {
  fetchData()
})

// 暴露给父组件的方法和属性
defineExpose({
  // 选中的行
  selectedRows,
  // 上次查询参数 form 对象
  queryValues,
  // 重新加载数据方法
  reload,
  // 查询方法
  query: handleQuery,
  // 重置方法
  reset: handleReset,
  // 表格实例引用
  tableRef
})
</script>

<style scoped>
.table-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.table-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-card :deep(.el-card__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:deep(.el-table) {
  width: 100%;
  flex: 1;
}
</style>
