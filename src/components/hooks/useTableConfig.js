import { ref, computed, watch } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

/**
 * Table 组件配置 Hook
 * @param {import('vue').Ref|Object} config - 表格配置（响应式）
 * @returns {Object} 解析后的配置对象和方法
 */
export function useTableConfig(config) {
  // 将 config 转换为响应式引用（如果还不是响应式）
  const configRef = computed(() => {
    if (config && typeof config === 'object' && 'value' in config) {
      return config.value
    }
    return config
  })

  // ========== API 配置 ==========
  const apiConfig = computed(() => {
    const api = configRef.value?.api
    if (!api) {
      console.error('Table 组件错误：必须配置 api')
      return null
    }
    return api
  })

  // ========== 查询条件配置 ==========
  const queryConditions = computed(() => configRef.value?.queryConditions || [])
  const queryValues = ref({})

  // 初始化查询条件值
  const initQueryValues = () => {
    queryValues.value = {}
    queryConditions.value.forEach((condition) => {
      queryValues.value[condition.prop] =
        condition.defaultValue !== undefined
          ? condition.defaultValue
          : condition.type?.includes('range')
            ? []
            : ''
    })
  }

  // 监听查询条件变化，重新初始化
  watch(
    () => queryConditions.value,
    () => {
      initQueryValues()
    },
    { immediate: true, deep: true }
  )

  // 构建查询参数
  const buildQueryParams = () => {
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
    return params
  }

  // 重置查询条件
  const resetQueryValues = () => {
    queryConditions.value.forEach((condition) => {
      queryValues.value[condition.prop] =
        condition.defaultValue !== undefined
          ? condition.defaultValue
          : condition.type?.includes('range')
            ? []
            : ''
    })
  }

  // 获取 label 后缀
  const getLabelSuffix = (condition) => {
    if (condition.openLabelSuffix === false) {
      return ''
    }
    if (condition.labelSuffix !== undefined && condition.labelSuffix !== null) {
      return condition.labelSuffix
    }
    return ':'
  }

  // ========== 表格配置 ==========
  const tableConfigComputed = computed(() => configRef.value?.tableConfig || {})

  // 是否显示分页器（从配置中读取，默认为 true）
  const showPagination = computed(() => {
    return tableConfigComputed.value.showPagination !== false
  })

  // 是否显示序号列（从配置中读取，默认为 true）
  const showIndex = computed(() => {
    return tableConfigComputed.value.showIndex !== false
  })

  // 是否显示操作列（从配置中读取，默认为 true）
  const showAction = computed(() => {
    return tableConfigComputed.value.showAction !== false
  })

  // 行选择配置
  const selectionConfig = computed(() => tableConfigComputed.value.selection || {})

  // 顶部按钮配置
  const topButtons = computed(() => tableConfigComputed.value.topButtons || [])

  // 是否自适应高度
  const autoHeight = computed(() => tableConfigComputed.value.autoHeight !== false)

  // 计算表格卡片样式
  const tableCardStyle = computed(() => {
    if (!autoHeight.value) {
      return {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }
    }
    return {
      display: 'flex',
      flexDirection: 'column'
    }
  })

  // 计算表格高度（需要外部传入 tableCardHeight）
  const getTableHeight = (_tableCardHeight) => {
    if (autoHeight.value) {
      return undefined
    }
    return tableConfigComputed.value.height || '100%'
  }

  // 计算表格最大高度（需要外部传入 tableCardHeight 和 showPagination）
  const getMaxHeight = (_tableCardHeight, showPaginationValue) => {
    if (autoHeight.value) {
      if (_tableCardHeight) {
        const topButtonsHeight = topButtons.value.length > 0 ? 50 : 0
        const paginationHeight = showPaginationValue ? 60 : 0
        return _tableCardHeight - topButtonsHeight - paginationHeight - 40
      }
      return tableConfigComputed.value.maxHeight
    }
    return tableConfigComputed.value.maxHeight
  }

  // ========== 表格列配置 ==========
  const columns = computed(() => configRef.value?.columns || [])

  // 过滤出非操作列
  const dataColumns = computed(() => {
    return columns.value.filter((col) => col.type !== 'action')
  })

  // 查找操作列
  const actionColumn = computed(() => {
    return columns.value.find((col) => col.type === 'action')
  })

  // ========== 工具函数 ==========
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

  return {
    // API 配置
    apiConfig,

    // 查询条件
    queryConditions,
    queryValues,
    buildQueryParams,
    resetQueryValues,
    getLabelSuffix,

    // 表格配置
    tableConfig: tableConfigComputed,
    selectionConfig,
    topButtons,
    autoHeight,
    tableCardStyle,
    getTableHeight,
    getMaxHeight,

    // 显示控制
    showPagination,
    showIndex,
    showAction,

    // 表格列
    columns,
    dataColumns,
    actionColumn,

    // 工具函数
    getIcon,
    getOptions,
    isDateType
  }
}
