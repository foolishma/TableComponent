<template>
  <el-card v-if="queryConditions.length > 0" shadow="hover" class="mb-4">
    <el-row :gutter="20">
      <el-col
        v-for="condition in visibleConditions"
        :key="condition.prop"
        :xs="getResponsiveValue(condition, 'xs')"
        :sm="getResponsiveValue(condition, 'sm')"
        :md="getResponsiveValue(condition, 'md')"
        :lg="getResponsiveValue(condition, 'lg')"
        :xl="getResponsiveValue(condition, 'xl')"
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
            v-else-if="condition.type === 'number' && !isRangeType(condition.type)"
            v-model="queryValues[condition.prop]"
            :placeholder="condition.placeholder"
            :disabled="condition.disabled"
            class="flex-1"
          />
          <!-- 数字范围输入框 -->
          <div
            v-else-if="condition.type === 'numberrange' || condition.type === 'numberRange'"
            class="flex-1 flex items-center space-x-2"
          >
            <el-input-number
              :model-value="
                (queryValues[condition.prop] && queryValues[condition.prop][0]) || undefined
              "
              :placeholder="condition.startPlaceholder || '最小值'"
              :disabled="condition.disabled"
              class="flex-1"
              :min="condition.min"
              :max="condition.max"
              @update:model-value="handleRangeValueChange(condition.prop, 0, $event)"
            />
            <span class="text-gray-400">~</span>
            <el-input-number
              :model-value="
                (queryValues[condition.prop] && queryValues[condition.prop][1]) || undefined
              "
              :placeholder="condition.endPlaceholder || '最大值'"
              :disabled="condition.disabled"
              class="flex-1"
              :min="condition.min"
              :max="condition.max"
              @update:model-value="handleRangeValueChange(condition.prop, 1, $event)"
            />
          </div>
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
            :on-change="(val) => handleValueChange(condition.prop, val)"
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
</template>

<script setup>
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'

// Props
const props = defineProps({
  queryConditions: {
    type: Array,
    required: true
  },
  getLabelSuffix: {
    type: Function,
    required: true
  },
  getOptions: {
    type: Function,
    required: true
  },
  isDateType: {
    type: Function,
    required: true
  },
  isRangeType: {
    type: Function,
    required: true
  }
})

// 使用 defineModel 实现双向绑定
const queryValues = defineModel('queryValues', {
  type: Object,
  required: true
})

// Emits
const emit = defineEmits(['query', 'reset'])

// 处理值变化
const handleValueChange = (prop, value) => {
  queryValues.value[prop] = value
}

// 处理范围值变化（用于数字范围）
const handleRangeValueChange = (prop, index, value) => {
  // 确保数组已初始化
  if (!Array.isArray(queryValues.value[prop])) {
    queryValues.value[prop] = [null, null]
  }
  // 更新对应索引的值（空值设为 null）
  queryValues.value[prop][index] =
    value === null || value === undefined || value === '' ? null : value
}

// 展开/收起状态
const isExpanded = ref(false)

// 可见的筛选条件
const visibleConditions = computed(() => {
  if (isExpanded.value || props.queryConditions.length <= 6) {
    return props.queryConditions
  }
  return props.queryConditions.slice(0, 6)
})

// 是否有更多条件
const hasMoreConditions = computed(() => {
  return props.queryConditions.length > 6
})

// 根据 span 值计算响应式断点
const getResponsiveValue = (condition, breakpoint) => {
  const span = condition.span || 6

  // 如果配置中定义了自定义的响应式断点，优先使用
  if (condition[breakpoint] !== undefined) {
    return condition[breakpoint]
  }

  // 根据 span 值智能计算响应式断点
  // xs: 移动端（<768px），总是全宽
  if (breakpoint === 'xs') {
    return 24
  }

  // sm: 小屏（≥768px）
  if (breakpoint === 'sm') {
    if (span <= 6) return 12 // 一行2个
    if (span <= 12) return 12 // 一行2个
    return 24 // 大于12时全宽
  }

  // md: 中屏（≥1024px）
  if (breakpoint === 'md') {
    if (span <= 6) return 8 // 一行3个
    if (span <= 8) return 8 // 一行3个
    if (span <= 12) return 12 // 一行2个
    return 24 // 大于12时全宽
  }

  // lg: 大屏（≥1280px）- 使用配置的 span 值
  if (breakpoint === 'lg') {
    return span
  }

  // xl: 超大屏（≥1920px）
  if (breakpoint === 'xl') {
    if (span <= 4) return 4 // 一行6个
    if (span <= 6) return 6 // 一行4个
    if (span <= 8) return 8 // 一行3个
    if (span <= 12) return 12 // 一行2个
    return span // 大于12时使用原值
  }

  return span
}

// 切换展开/收起
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// 查询
const handleQuery = () => {
  emit('query')
}

// 重置
const handleReset = () => {
  emit('reset')
}
</script>

<style scoped>
/* 样式已通过 Tailwind CSS 实现 */
</style>
