import request from '@/utils/request'

/**
 * 获取客户列表
 */
export function getCustomerList(params) {
  return request({
    url: '/api/customer/list',
    method: 'get',
    params
  })
}

/**
 * 获取客户详情
 */
export function getCustomerDetail(id) {
  return request({
    url: `/api/customer/${id}`,
    method: 'get'
  })
}

/**
 * 新增客户
 */
export function addCustomer(data) {
  return request({
    url: '/api/customer',
    method: 'post',
    data
  })
}

/**
 * 更新客户
 */
export function updateCustomer(id, data) {
  return request({
    url: `/api/customer/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除客户
 */
export function deleteCustomer(id) {
  return request({
    url: `/api/customer/${id}`,
    method: 'delete'
  })
}

/**
 * 批量删除客户
 */
export function batchDeleteCustomer(ids) {
  return request({
    url: '/api/customer/batch',
    method: 'delete',
    data: { ids }
  })
}

/**
 * 导出客户
 */
export function exportCustomer(params) {
  return request({
    url: '/api/customer/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

/**
 * 获取客户评价列表
 */
export function getCustomerEvaluations(customerId) {
  return request({
    url: `/api/customer/${customerId}/evaluations`,
    method: 'get'
  })
}

/**
 * 添加客户评价
 */
export function addCustomerEvaluation(data) {
  return request({
    url: '/api/customer/evaluation',
    method: 'post',
    data
  })
}
