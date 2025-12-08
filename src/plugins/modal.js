import { Check, Close, InfoFilled, WarningFilled } from '@element-plus/icons-vue'
import { ElMessage, ElNotification } from 'element-plus'

/**
 * 全局 Modal 插件
 * 统一管理消息提示和通知
 */
const modal = {
  /**
   * 成功提示
   * @param {string} message - 提示消息
   * @param {Object} options - 自定义选项
   * @param {string} options.mode - 显示模式：'message' | 'notification'，默认为 'message'
   * @param {number} options.duration - 显示时长（毫秒），默认 3000
   * @param {string} options.title - 通知标题（仅 notification 模式有效）
   * @param {string} options.position - 通知位置（仅 notification 模式有效），默认 'top-right'
   */
  msgSuccess(message, options = {}) {
    const {
      mode = 'message',
      duration = 3000,
      title,
      position = 'top-right',
      ...restOptions
    } = options

    if (mode === 'notification') {
      return ElNotification({
        title: title || '成功',
        message,
        type: 'success',
        duration,
        position,
        icon: Check,
        ...restOptions
      })
    }

    return ElMessage({
      message,
      type: 'success',
      duration,
      showIcon: true,
      ...restOptions
    })
  },

  /**
   * 错误提示
   * @param {string} message - 提示消息
   * @param {Object} options - 自定义选项
   * @param {string} options.mode - 显示模式：'message' | 'notification'，默认为 'message'
   * @param {number} options.duration - 显示时长（毫秒），默认 3000
   * @param {string} options.title - 通知标题（仅 notification 模式有效）
   * @param {string} options.position - 通知位置（仅 notification 模式有效），默认 'top-right'
   */
  msgError(message, options = {}) {
    const {
      mode = 'message',
      duration = 3000,
      title,
      position = 'top-right',
      ...restOptions
    } = options

    if (mode === 'notification') {
      return ElNotification({
        title: title || '错误',
        message,
        type: 'error',
        duration,
        position,
        icon: Close,
        ...restOptions
      })
    }

    return ElMessage({
      message,
      type: 'error',
      duration,
      showIcon: true,
      ...restOptions
    })
  },

  /**
   * 信息提示
   * @param {string} message - 提示消息
   * @param {Object} options - 自定义选项
   * @param {string} options.mode - 显示模式：'message' | 'notification'，默认为 'message'
   * @param {number} options.duration - 显示时长（毫秒），默认 3000
   * @param {string} options.title - 通知标题（仅 notification 模式有效）
   * @param {string} options.position - 通知位置（仅 notification 模式有效），默认 'top-right'
   */
  msgInfo(message, options = {}) {
    const {
      mode = 'message',
      duration = 3000,
      title,
      position = 'top-right',
      ...restOptions
    } = options

    if (mode === 'notification') {
      return ElNotification({
        title: title || '提示',
        message,
        type: 'info',
        duration,
        position,
        icon: InfoFilled,
        ...restOptions
      })
    }

    return ElMessage({
      message,
      type: 'info',
      duration,
      showIcon: true,
      ...restOptions
    })
  },

  /**
   * 警告提示
   * @param {string} message - 提示消息
   * @param {Object} options - 自定义选项
   * @param {string} options.mode - 显示模式：'message' | 'notification'，默认为 'message'
   * @param {number} options.duration - 显示时长（毫秒），默认 3000
   * @param {string} options.title - 通知标题（仅 notification 模式有效）
   * @param {string} options.position - 通知位置（仅 notification 模式有效），默认 'top-right'
   */
  msgWarning(message, options = {}) {
    const {
      mode = 'message',
      duration = 3000,
      title,
      position = 'top-right',
      ...restOptions
    } = options

    if (mode === 'notification') {
      return ElNotification({
        title: title || '警告',
        message,
        type: 'warning',
        duration,
        position,
        icon: WarningFilled,
        ...restOptions
      })
    }

    return ElMessage({
      message,
      type: 'warning',
      duration,
      showIcon: true,
      ...restOptions
    })
  }
}

/**
 * Vue 插件安装函数
 */
export default {
  install(app) {
    // 挂载到全局属性
    app.config.globalProperties.$modal = modal

    // 同时挂载到 app 实例，方便在 setup 中使用
    app.provide('$modal', modal)
  }
}
