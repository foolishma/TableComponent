<template>
  <div v-loading="tableLoading" element-loading-text="数据加载中..." class="table-container">
    <!-- 筛选条件区域 -->
    <TableFilter
      v-model:query-values="queryValues"
      :query-conditions="queryConditions"
      :get-label-suffix="getLabelSuffix"
      :get-options="getOptions"
      :is-date-type="isDateType"
      :is-range-type="isRangeType"
      @query="handleQuery"
      @reset="handleReset"
    >
      <!-- 传递自定义插槽 -->
      <template
        v-for="condition in queryConditions"
        :key="condition.prop"
        #[condition.slot]="slotProps"
      >
        <slot :name="condition.slot" v-bind="slotProps"></slot>
      </template>
    </TableFilter>

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
        :row-key="rowKey"
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
            <el-radio
              :model-value="selectedRow && getRowKeyValue(selectedRow) === getRowKeyValue(row)"
              @change="handleSingleSelect(row)"
            />
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
        <TableActionColumn
          :show-action="showAction"
          :action-column="actionColumn"
          :get-icon="getIcon"
          :function-map="functionMap"
          :selected-rows="selectedRows"
          @action-click="handleActionColumnClick"
        />
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
import { getTableDataApi } from '@/api/table'
import { ElMessage } from 'element-plus'
import { computed, onMounted, ref } from 'vue'
import TableActionColumn from './components/TableActionColumn.vue'
import TableFilter from './components/TableFilter.vue'
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

// 使用配置 Hook（组件内部将 props.config 转为响应式）
const {
  apiConfig,
  queryConditions,
  queryValues,
  buildQueryParams,
  resetQueryValues,
  getLabelSuffix,
  tableConfig: tableConfigComputed,
  rowKey,
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
  isDateType,
  isRangeType
} = useTableConfig(computed(() => props.config))

// 组件内部状态
const tableRef = ref(null)
const tableCardRef = ref(null)
const selectedRow = ref(null)
const selectedRows = ref([])
const tableCardHeight = ref(null)

// 获取行的唯一标识值
const getRowKeyValue = (row) => {
  const key = rowKey.value
  if (typeof key === 'function') {
    return key(row)
  }
  return row[key]
}

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

// 计算表格高度
const computedTableHeight = computed(() => {
  return getTableHeight(tableCardHeight.value)
})

// 计算表格最大高度
const computedMaxHeight = computed(() => {
  return getMaxHeight(tableCardHeight.value, showPagination.value)
})

// API 请求函数
const fetchData = async () => {
  if (!apiConfig.value) {
    return
  }

  internalLoading.value = true
  try {
    // 在内部构建查询参数（包含查询条件和分页参数）
    const params = buildQueryParams(pagination.value)

    // 使用封装的表格数据 API
    const result = await getTableDataApi(apiConfig.value, params)

    // 更新表格数据
    internalData.value = result.data

    // 更新分页总数
    if (pagination.value) {
      pagination.value.total = result.total
    }

    // 触发数据加载完成事件
    emit('data-loaded', { data: result.data, total: result.total, response: result.rawResponse })
  } catch (error) {
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
    // 重置到第一页
    pagination.value.currentPage = 1
    // fetchData 内部会构建参数
    await fetchData()
    // 查询成功后触发事件
    const params = buildQueryParams(pagination.value)
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
    // fetchData 内部会构建参数
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
      const rowKeyValue = getRowKeyValue(row)
      const index = selectedRows.value.findIndex((item) => getRowKeyValue(item) === rowKeyValue)
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

// 按钮是否禁用（用于顶部按钮）
const getButtonDisabled = (button) => {
  if (button.disabled === undefined || button.disabled === false) {
    return false
  }
  if (typeof button.disabled === 'function') {
    // 对于顶部按钮，可以传入选中的行数据，以便根据选中状态控制按钮禁用
    return button.disabled(selectedRows.value, selectedRows.value)
  }
  return button.disabled
}

// 操作列按钮点击处理
const handleActionColumnClick = (button, row, index) => {
  const func = props.functionMap[button.funcName]
  if (func) {
    func(row, index)
  } else {
    ElMessage.warning(`函数 ${button.funcName} 未定义`)
  }
}

// 分页变化
const handlePageChange = (page) => {
  pagination.value.currentPage = page
  // fetchData 内部会构建参数
  fetchData()
}

// 每页数量变化
const handleSizeChange = (size) => {
  pagination.value.pageSize = size
  pagination.value.currentPage = 1
  // fetchData 内部会构建参数
  fetchData()
}

// 重新加载数据
const reload = () => {
  // fetchData 内部会构建参数
  fetchData()
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
