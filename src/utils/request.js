import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 基础 URL
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 可以在这里添加 token
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 可以在这里添加其他请求头
    // config.headers['X-Custom-Header'] = 'custom-value'

    // 打印请求信息（开发环境）
    if (import.meta.env.DEV) {
      console.log('请求:', config.method?.toUpperCase(), config.url, config.params || config.data)
    }

    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data

    // 打印响应信息（开发环境）
    if (import.meta.env.DEV) {
      console.log('响应:', response.config.url, res)
    }

    // 根据业务状态码处理
    // 如果后端返回的状态码不是 200，则视为错误
    if (res.code !== undefined && res.code !== 200 && res.code !== 0) {
      ElMessage.error(res.message || res.msg || '请求失败')
      return Promise.reject(new Error(res.message || res.msg || '请求失败'))
    }

    // 直接返回数据
    return res
  },
  (error) => {
    // 对响应错误做点什么
    console.error('响应错误:', error)

    let message = '请求失败'

    if (error.response) {
      // 服务器返回了错误状态码
      const { status, data } = error.response

      switch (status) {
        case 400:
          message = data?.message || data?.msg || '请求参数错误'
          break
        case 401:
          message = '未授权，请重新登录'
          // 可以在这里清除 token 并跳转到登录页
          // localStorage.removeItem('token')
          // router.push('/login')
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = data?.message || data?.msg || '服务器内部错误'
          break
        case 502:
          message = '网关错误'
          break
        case 503:
          message = '服务不可用'
          break
        case 504:
          message = '网关超时'
          break
        default:
          message = data?.message || data?.msg || `请求失败 (${status})`
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      message = '网络错误，请检查网络连接'
    } else {
      // 在设置请求时触发了错误
      message = error.message || '请求配置错误'
    }

    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default service
