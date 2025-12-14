import request from '@/utils/request'

/**
 * 获取首页统计数据
 * (待办事项、审批事项等)
 */
export function getStatistics() {
  return request({
    url: '/api/home/statistics',
    method: 'get'
  })
}

/**
 * 获取考勤统计数据
 * @param {Object} params { dateRange: [], siteId: '' }
 */
export function getAttendanceStatistics(params) {
  return request({
    url: '/api/home/attendance',
    method: 'get',
    params
  })
}
