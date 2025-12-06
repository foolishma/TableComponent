import request from '@/utils/request'

/**
 * 表格数据请求封装
 * @param {Object} config - 请求配置
 * @param {string} config.url - 请求地址
 * @param {string} config.method - 请求方法，默认为 'get'
 * @param {Object} config.params - 请求参数（包含查询条件和分页参数）
 * @returns {Promise} 返回 Promise
 */
export function fetchTableData(config) {
  const { url, method = 'get', params = {} } = config

  if (method.toLowerCase() === 'get') {
    return request({
      url,
      method: 'get',
      params
    })
  } else {
    return request({
      url,
      method: method.toLowerCase(),
      data: params
    })
  }
}

/**
 * 通用表格 API 请求函数
 * 供 Table 组件使用
 * @param {Object} options - 请求选项
 * @param {string} options.url - 请求地址
 * @param {string} options.method - 请求方法
 * @param {Object} options.params - GET 请求参数
 * @param {Object} options.data - POST/PUT/DELETE 请求体
 * @returns {Promise} 返回 Promise
 */
export function tableRequest(options) {
  const { url, method = 'get', params, data } = options

  if (method.toLowerCase() === 'get') {
    return request({
      url,
      method: 'get',
      params
    })
  } else {
    return request({
      url,
      method: method.toLowerCase(),
      data
    })
  }
}

/**
 * 表格数据 API 封装
 * 处理表格数据的请求、响应解析和错误处理
 * @param {Object} apiConfig - API 配置对象
 * @param {string} apiConfig.url - 请求地址（必填）
 * @param {string} apiConfig.method - 请求方法，默认为 'get'
 * @param {Object} queryParams - 查询参数对象（已包含查询条件和分页参数）
 * @returns {Promise<{data: Array, total: number}>} 返回处理后的数据对象
 * @throws {Error} 请求失败时抛出错误
 */
export function getTableDataApi(apiConfig, queryParams = {}) {
  return new Promise((resolve, reject) => {
    // 参数校验
    if (!apiConfig || !apiConfig.url) {
      const error = new Error('API 配置错误：缺少 url')
      reject(error)
      return
    }

    const method = (apiConfig.method || 'get').toLowerCase()
    const url = apiConfig.url

    // 使用传入的查询参数（已包含查询条件和分页参数）
    const requestParams = { ...queryParams }

    // 发起请求
    const requestPromise =
      method === 'get'
        ? request({
            url,
            method: 'get',
            params: requestParams
          })
        : request({
            url,
            method: method.toLowerCase(),
            data: requestParams
          })

    requestPromise
      .then((response) => {
        // 处理响应数据
        // 支持多种响应格式：
        // 1. { data: [], total: 0 }
        // 2. { list: [], total: 0 }
        // 3. { records: [], total: 0 }
        // 4. 直接是数组 []
        let data = []
        let total = 0

        if (Array.isArray(response)) {
          // 直接是数组
          data = response
          total = response.length
        } else if (response.data) {
          // { data: [], total: 0 } 格式
          data = Array.isArray(response.data) ? response.data : []
          total = response.total || response.data.length || 0
        } else if (response.list) {
          // { list: [], total: 0 } 格式
          data = Array.isArray(response.list) ? response.list : []
          total = response.total || response.list.length || 0
        } else if (response.records) {
          // { records: [], total: 0 } 格式
          data = Array.isArray(response.records) ? response.records : []
          total = response.total || response.records.length || 0
        } else {
          // 其他格式，返回空数组
          data = []
          total = 0
        }

        // 返回统一的数据格式
        resolve({
          data,
          total,
          rawResponse: response // 保留原始响应，供特殊需求使用
        })
      })
      .catch((error) => {
        // 处理请求失败
        console.error('表格数据请求失败:', error)
        reject(error)
      })
  })
}
