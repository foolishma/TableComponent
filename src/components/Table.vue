<template>
  <div class="table-container">
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
          <div class="mb-4 flex items-center justify-start">
            <!-- 查询/重置按钮 -->
            <el-button @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handleQuery">查询</el-button>
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
        :data="data"
        :loading="loading"
        :stripe="tableConfig.stripe"
        :border="tableConfig.border"
        :height="computedTableHeight"
        :max-height="computedMaxHeight"
        :fit="tableConfig.fit !== false"
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
          v-if="actionColumn"
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
      <div v-if="pagination" class="mt-4 flex items-center justify-between">
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
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

// Props
const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  functionMap: {
    type: Object,
    default: () => ({})
  },
  pagination: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits([
  'selection-change',
  'row-click',
  'query',
  'reset',
  'page-change',
  'size-change'
])
const tableRef = ref(null)
const tableCardRef = ref(null)
const isExpanded = ref(false)
const selectedRow = ref(null)
const selectedRows = ref([])
const tableCardHeight = ref(null)

// 查询条件
const queryConditions = computed(() => props.config.queryConditions || [])
const queryValues = ref({})

// 初始化查询条件值
queryConditions.value.forEach((condition) => {
  queryValues.value[condition.prop] =
    condition.defaultValue !== undefined
      ? condition.defaultValue
      : condition.type?.includes('range')
        ? []
        : ''
})

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

// 表格配置
const tableConfig = computed(() => props.config.tableConfig || {})
const selectionConfig = computed(() => tableConfig.value.selection || {})
const topButtons = computed(() => tableConfig.value.topButtons || [])
const autoHeight = computed(() => tableConfig.value.autoHeight !== false) // 默认为 true

// 计算表格卡片样式
const tableCardStyle = computed(() => {
  if (!autoHeight.value) {
    // autoHeight 为 false 时，占满剩余空间
    return {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }
  // autoHeight 为 true 时，自适应内容高度
  return {
    display: 'flex',
    flexDirection: 'column'
  }
})

// 计算表格高度
const computedTableHeight = computed(() => {
  if (autoHeight.value) {
    // autoHeight 为 true 时，不设置固定高度，让内容自然展开
    return undefined
  }
  // autoHeight 为 false 时，使用配置的高度或计算剩余空间
  return tableConfig.value.height || '100%'
})

// 计算表格最大高度
const computedMaxHeight = computed(() => {
  if (autoHeight.value) {
    // autoHeight 为 true 时，最大高度为剩余空间，超出则滚动
    if (tableCardHeight.value) {
      // 减去顶部按钮区域高度（如果有）和分页区域高度
      const topButtonsHeight = topButtons.value.length > 0 ? 50 : 0
      const paginationHeight = props.pagination ? 60 : 0
      return tableCardHeight.value - topButtonsHeight - paginationHeight - 40 // 40 是卡片内边距
    }
    return tableConfig.value.maxHeight
  }
  // autoHeight 为 false 时，使用配置的最大高度
  return tableConfig.value.maxHeight
})

// 表格列
const columns = computed(() => props.config.columns || [])
const dataColumns = computed(() => {
  return columns.value.filter((col) => col.type !== 'action')
})
const actionColumn = computed(() => {
  return columns.value.find((col) => col.type === 'action')
})

// 获取图标
const getIcon = (iconName) => {
  return ElementPlusIconsVue[iconName] || null
}

// 获取选项
const getOptions = (condition) => {
  if (condition.options) {
    return condition.options
  }
  // 这里可以集成字典服务
  return []
}

// 判断是否为日期类型
const isDateType = (type) => {
  return [
    'date',
    'daterange',
    'datetime',
    'datetimerange',
    'year',
    'month',
    'yearrange',
    'monthrange'
  ].includes(type)
}

// 切换展开/收起
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// 查询
const handleQuery = () => {
  const params = {}
  Object.keys(queryValues.value).forEach((key) => {
    const value = queryValues.value[key]
    if (value !== '' && value !== null && value !== undefined) {
      if (Array.isArray(value) && value.length === 0) {
        return
      }
      params[key] = value
    }
  })
  emit('query', params)
}

// 重置
const handleReset = () => {
  queryConditions.value.forEach((condition) => {
    queryValues.value[condition.prop] =
      condition.defaultValue !== undefined
        ? condition.defaultValue
        : condition.type?.includes('range')
          ? []
          : ''
  })
  emit('reset')
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
  emit('page-change', page)
}

// 每页数量变化
const handleSizeChange = (size) => {
  emit('size-change', size)
}

// 获取 label 后缀
const getLabelSuffix = (condition) => {
  // 如果 openLabelSuffix 为 false，不显示后缀
  if (condition.openLabelSuffix === false) {
    return ''
  }
  // 如果配置了 labelSuffix，使用 labelSuffix 的值
  if (condition.labelSuffix !== undefined && condition.labelSuffix !== null) {
    return condition.labelSuffix
  }
  // 如果 openLabelSuffix 为 true 或未设置，使用默认值 ':'
  return ':'
}
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
