/**
 * 核心模块统一导出
 * 提供项目中所有核心功能的统一入口
 */

// 类型定义
export * from './types/index.js'

// 服务层
export { default as ArticleService } from './services/ArticleService.js'
export { default as ThemeService } from './services/ThemeService.js'

// 组合式API钩子
export { default as useTheme } from './hooks/useTheme.js'
export { default as useArticles } from './hooks/useArticles.js'

// 插件系统
export { default as PluginManager } from './plugins/PluginManager.js'

// 核心配置
export const CORE_CONFIG = {
  version: '1.0.0',
  name: 'Blog Core',
  description: '博客系统核心模块',
  author: 'Didiberber',
  license: 'MIT'
}

// 核心工具函数
export const coreUtils = {
  /**
   * 防抖函数
   * @param {Function} func - 要防抖的函数
   * @param {number} wait - 等待时间
   * @returns {Function} 防抖后的函数
   */
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  /**
   * 节流函数
   * @param {Function} func - 要节流的函数
   * @param {number} limit - 限制时间
   * @returns {Function} 节流后的函数
   */
  throttle(func, limit) {
    let inThrottle
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  },

  /**
   * 深拷贝函数
   * @param {*} obj - 要拷贝的对象
   * @returns {*} 拷贝后的对象
   */
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj.getTime())
    if (obj instanceof Array) return obj.map(item => this.deepClone(item))
    if (typeof obj === 'object') {
      const clonedObj = {}
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key])
        }
      }
      return clonedObj
    }
  },

  /**
   * 生成唯一ID
   * @returns {string} 唯一ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  },

  /**
   * 格式化日期
   * @param {Date|string} date - 日期
   * @param {string} format - 格式字符串
   * @returns {string} 格式化后的日期
   */
  formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')

    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
  },

  /**
   * 验证邮箱格式
   * @param {string} email - 邮箱地址
   * @returns {boolean} 是否有效
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * 验证URL格式
   * @param {string} url - URL地址
   * @returns {boolean} 是否有效
   */
  isValidUrl(url) {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  /**
   * 获取随机颜色
   * @returns {string} 随机颜色
   */
  getRandomColor() {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  },

  /**
   * 计算文本长度（支持中文）
   * @param {string} text - 文本
   * @returns {number} 文本长度
   */
  getTextLength(text) {
    if (!text) return 0
    return text.replace(/[\u4e00-\u9fa5]/g, '**').length
  },

  /**
   * 截断文本
   * @param {string} text - 文本
   * @param {number} length - 最大长度
   * @param {string} suffix - 后缀
   * @returns {string} 截断后的文本
   */
  truncateText(text, length, suffix = '...') {
    if (!text || text.length <= length) return text
    return text.substring(0, length) + suffix
  },

  /**
   * 获取文件扩展名
   * @param {string} filename - 文件名
   * @returns {string} 扩展名
   */
  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
  },

  /**
   * 格式化文件大小
   * @param {number} bytes - 字节数
   * @returns {string} 格式化后的大小
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
}

// 错误处理工具
export const errorHandler = {
  /**
   * 处理错误
   * @param {Error} error - 错误对象
   * @param {string} context - 错误上下文
   */
  handle(error, context = '') {
    console.error(`[${context}] 错误:`, error)
    
    // 这里可以添加错误上报逻辑
    // 例如发送到错误监控服务
    
    return {
      message: error.message || '未知错误',
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    }
  },

  /**
   * 创建错误
   * @param {string} message - 错误消息
   * @param {string} type - 错误类型
   * @returns {Error} 错误对象
   */
  create(message, type = 'runtime') {
    const error = new Error(message)
    error.type = type
    error.timestamp = new Date().toISOString()
    return error
  }
}

// 性能监控工具
export const performanceMonitor = {
  /**
   * 测量函数执行时间
   * @param {Function} fn - 要测量的函数
   * @param {string} name - 测量名称
   * @returns {Function} 包装后的函数
   */
  measure(fn, name = 'unnamed') {
    return async (...args) => {
      const start = performance.now()
      try {
        const result = await fn(...args)
        const end = performance.now()
        console.log(`[性能监控] ${name} 执行时间: ${(end - start).toFixed(2)}ms`)
        return result
      } catch (error) {
        const end = performance.now()
        console.error(`[性能监控] ${name} 执行失败，耗时: ${(end - start).toFixed(2)}ms`, error)
        throw error
      }
    }
  },

  /**
   * 开始性能标记
   * @param {string} name - 标记名称
   */
  mark(name) {
    if (performance.mark) {
      performance.mark(name)
    }
  },

  /**
   * 测量两个标记之间的时间
   * @param {string} startMark - 开始标记
   * @param {string} endMark - 结束标记
   * @returns {number} 时间差（毫秒）
   */
  measureBetween(startMark, endMark) {
    if (performance.measure) {
      const measure = performance.measure(`${startMark}-to-${endMark}`, startMark, endMark)
      return measure.duration
    }
    return 0
  }
}

// 默认导出
export default {
  CORE_CONFIG,
  coreUtils,
  errorHandler,
  performanceMonitor
}
