import { reactive, ref } from 'vue'

/**
 * Table 配置解析 Hook
 * @param {Object} config - 表格配置文件
 * @returns {Object} 解析后的配置对象
 */
export function useTableConfig(config) {
  // 查询条件配置
  const queryConditions = ref(config.queryConditions || [])

  // 表格列配置
  const columns = ref(config.columns || [])

  // 表格配置
  const tableConfig = ref(config.tableConfig || {})

  // 初始化查询条件值
  const queryValues = reactive({})
  queryConditions.value.forEach((condition) => {
    queryValues[condition.prop] =
      condition.defaultValue !== undefined
        ? condition.defaultValue
        : condition.type?.includes('range')
          ? []
          : ''
  })

  // 处理查询条件
  const getQueryParams = () => {
    const params = {}
    Object.keys(queryValues).forEach((key) => {
      const value = queryValues[key]
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
  const resetQuery = () => {
    queryConditions.value.forEach((condition) => {
      queryValues[condition.prop] =
        condition.defaultValue !== undefined
          ? condition.defaultValue
          : condition.type?.includes('range')
            ? []
            : ''
    })
  }

  return {
    queryConditions,
    columns,
    tableConfig,
    queryValues,
    getQueryParams,
    resetQuery
  }
}
