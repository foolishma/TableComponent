import request from '@/utils/request'

/**
 * 获取驻点列表
 */
export function getSiteList(params) {
  return request({
    url: '/api/site/list',
    method: 'get',
    params
  })
}

/**
 * 获取驻点详情
 */
export function getSiteDetail(id) {
  return request({
    url: `/api/site/${id}`,
    method: 'get'
  })
}

/**
 * 新增驻点
 */
export function addSite(data) {
  return request({
    url: '/api/site',
    method: 'post',
    data
  })
}

/**
 * 更新驻点
 */
export function updateSite(id, data) {
  return request({
    url: `/api/site/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除驻点
 */
export function deleteSite(id) {
  return request({
    url: `/api/site/${id}`,
    method: 'delete'
  })
}

/**
 * 批量删除驻点
 */
export function batchDeleteSite(ids) {
  return request({
    url: '/api/site/batch',
    method: 'delete',
    data: { ids }
  })
}

/**
 * 导出驻点
 */
export function exportSite(params) {
  return request({
    url: '/api/site/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
