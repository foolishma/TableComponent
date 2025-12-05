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
