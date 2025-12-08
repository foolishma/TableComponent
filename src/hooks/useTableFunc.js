import request from '@/utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'

/**
 * 表格功能按钮 Hook
 * 用于处理列表中的功能按钮操作，支持二次确认、API调用、成功/失败回调等
 *
 * @param {Object} config - 配置对象
 * @param {Object} config.api - API 配置（必填）
 * @param {string|Function} config.api.url - 请求地址（必填）
 *   - 如果是字符串，直接作为请求地址
 *   - 如果是函数，接收 (row, index, ...args) 参数，返回请求地址（支持路径参数）
 * @param {string} config.api.method - 请求方法，默认为 'get'
 * @param {Object|Function} config.params - 请求参数（可选）
 *   - 如果是对象，直接作为请求参数
 *   - 如果是函数，接收 (row, index, ...args) 参数，返回请求参数对象
 *   - 注意：如果 url 是函数形式，params 中的参数不会自动用于路径替换
 * @param {Object} config.confirm - 二次确认配置（可选）
 * @param {string|Function} config.confirm.title - 确认对话框标题，默认为 '提示'，支持函数动态生成
 * @param {string|Function} config.confirm.message - 确认对话框内容，默认为 '确认操作？'，支持函数动态生成
 * @param {string} config.confirm.type - 确认对话框类型，默认为 'warning'
 * @param {string} config.confirm.confirmButtonText - 确认按钮文本，默认为 '确定'
 * @param {string} config.confirm.cancelButtonText - 取消按钮文本，默认为 '取消'
 * @param {string} config.successMessage - 成功提示信息（可选，默认 '操作成功'）
 * @param {string} config.errorMessage - 错误提示信息（可选，默认使用 request 的错误处理）
 * @param {Function} config.onSuccess - 成功回调函数（可选）
 *   - 接收参数：(response, row, index, ...args)
 * @param {Function} config.onError - 错误回调函数（可选）
 *   - 接收参数：(error, row, index, ...args)
 * @returns {Function} 返回一个函数，该函数可以接收 (row, index, ...args) 参数
 *
 * @example
 * // 基础用法 - 删除操作（带二次确认）
 * const handleDelete = useTableFunc({
 *   api: {
 *     url: '/api/menu/delete',
 *     method: 'delete'
 *   },
 *   params: (row) => ({ id: row.id }),
 *   confirm: {
 *     title: '确认删除',
 *     message: '删除后不可恢复，是否继续？',
 *     type: 'warning'
 *   },
 *   successMessage: '删除成功',
 *   onSuccess: (response, row) => {
 *     // 重新加载表格数据
 *     tableRef.value?.reload()
 *   }
 * })
 *
 * @example
 * // 不带二次确认的操作
 * const handleEdit = useTableFunc({
 *   api: {
 *     url: '/api/menu/update',
 *     method: 'put'
 *   },
 *   params: (row) => ({ id: row.id, name: row.name }),
 *   successMessage: '更新成功'
 * })
 *
 * @example
 * // 发起审核操作
 * const handleAudit = useTableFunc({
 *   api: {
 *     url: '/api/order/audit',
 *     method: 'post'
 *   },
 *   params: (row) => ({ orderId: row.id }),
 *   confirm: {
 *     title: '确认发起审核',
 *     message: '您是否确认发起审核？',
 *     type: 'info'
 *   },
 *   successMessage: '审核发起成功',
 *   onSuccess: (response, row) => {
 *     tableRef.value?.reload()
 *   }
 * })
 *
 * @example
 * // 路径参数 - 使用函数形式的 url
 * const handleGetDetail = useTableFunc({
 *   api: {
 *     url: (row) => `/sale/admin/getDetail/${row.id}`,
 *     method: 'get'
 *   },
 *   successMessage: '获取详情成功',
 *   onSuccess: (response, row) => {
 *     console.log('详情数据:', response)
 *   }
 * })
 *
 * @example
 * // 路径参数 - 多个路径参数
 * const handleUpdateStatus = useTableFunc({
 *   api: {
 *     url: (row) => `/api/order/${row.orderId}/status/${row.statusId}`,
 *     method: 'put'
 *   },
 *   params: (row) => ({ status: 'active' }),
 *   confirm: {
 *     title: '确认更新',
 *     message: '您是否确认更新状态？',
 *     type: 'warning'
 *   },
 *   successMessage: '更新成功',
 *   onSuccess: () => {
 *     tableRef.value?.reload()
 *   }
 * })
 */
export function useTableFunc(config) {
  // 参数校验
  if (!config || !config.api) {
    console.error('useTableFunc: API 配置错误，缺少 api 配置')
    return () => {
      ElMessage.error('功能配置错误，请联系管理员')
    }
  }

  // 检查 url 是否存在（可以是字符串或函数）
  if (
    !config.api.url ||
    (typeof config.api.url !== 'string' && typeof config.api.url !== 'function')
  ) {
    console.error('useTableFunc: API 配置错误，url 必须是字符串或函数')
    return () => {
      ElMessage.error('功能配置错误，请联系管理员')
    }
  }

  const {
    api,
    params = {},
    confirm = null,
    successMessage = '操作成功',
    errorMessage = null,
    onSuccess = null,
    onError = null
  } = config

  // 返回执行函数
  return async (row = null, index = null, ...args) => {
    try {
      // 1. 如果需要二次确认，先显示确认对话框
      if (confirm) {
        try {
          // 支持 message 为函数，动态生成确认消息
          const message =
            typeof confirm.message === 'function'
              ? confirm.message(row, index, ...args)
              : confirm.message || '确认操作？'
          const title =
            typeof confirm.title === 'function'
              ? confirm.title(row, index, ...args)
              : confirm.title || '提示'

          await ElMessageBox.confirm(message, title, {
            confirmButtonText: confirm.confirmButtonText || '确定',
            cancelButtonText: confirm.cancelButtonText || '取消',
            type: confirm.type || 'warning'
          })
        } catch {
          // 用户取消操作
          return
        }
      }

      // 2. 构建请求 URL（支持函数形式，用于路径参数）
      let requestUrl = ''
      if (typeof api.url === 'function') {
        // 如果是函数，调用函数生成 URL（支持路径参数）
        requestUrl = api.url(row, index, ...args)
      } else {
        // 如果是字符串，直接使用
        requestUrl = api.url
      }

      // 3. 构建请求参数
      let requestParams = {}
      if (typeof params === 'function') {
        // 如果是函数，调用函数获取参数
        requestParams = params(row, index, ...args)
      } else if (params && typeof params === 'object') {
        // 如果是对象，直接使用
        requestParams = { ...params }
      }

      // 4. 发起 API 请求
      const method = (api.method || 'get').toLowerCase()
      let response

      if (method === 'get') {
        response = await request({
          url: requestUrl,
          method: 'get',
          params: requestParams
        })
      } else {
        response = await request({
          url: requestUrl,
          method: method,
          data: requestParams
        })
      }

      // 4. 处理成功情况
      if (successMessage) {
        ElMessage.success(successMessage)
      }

      // 5. 执行成功回调
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(response, row, index, ...args)
      }
    } catch (error) {
      // 6. 处理错误情况
      console.error('useTableFunc 执行失败:', error)

      // 显示错误提示
      if (errorMessage) {
        ElMessage.error(errorMessage)
      } else if (error.message) {
        // 如果 error.message 存在，request 拦截器已经处理了，这里不再重复提示
        // 但如果需要自定义错误提示，可以在这里处理
      }

      // 7. 执行错误回调
      if (onError && typeof onError === 'function') {
        onError(error, row, index, ...args)
      } else {
        // 如果没有错误回调，默认抛出错误（可选）
        // throw error
      }
    }
  }
}
