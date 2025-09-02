/**
 * 主题管理服务
 * 负责主题的切换、持久化和配置管理
 */
import { THEME_TYPES, STORE_TYPES } from '../types/index.js'

class ThemeService {
  constructor() {
    this.currentTheme = THEME_TYPES.LIGHT
    this.availableThemes = Object.values(THEME_TYPES)
    this.themeConfig = {
      [THEME_TYPES.LIGHT]: {
        name: '浅色主题',
        icon: '☀️',
        description: '适合日间阅读的浅色主题'
      },
      [THEME_TYPES.DARK]: {
        name: '深色主题',
        icon: '🌙',
        description: '适合夜间阅读的深色主题'
      },
      [THEME_TYPES.AUTO]: {
        name: '自动主题',
        icon: '🔄',
        description: '根据系统设置自动切换主题'
      }
    }
    
    this.init()
  }

  /**
   * 初始化主题服务
   */
  init() {
    try {
      // 从本地存储恢复主题设置
      const savedTheme = this.getStoredTheme()
      if (savedTheme && this.availableThemes.includes(savedTheme)) {
        this.currentTheme = savedTheme
      } else {
        // 如果没有保存的主题，尝试检测系统主题
        this.currentTheme = this.detectSystemTheme()
      }

      // 应用主题
      this.applyTheme(this.currentTheme)
      
      // 监听系统主题变化
      this.watchSystemTheme()
      
      console.log('主题服务初始化完成:', this.currentTheme)
    } catch (error) {
      console.error('主题服务初始化失败:', error)
      // 使用默认主题
      this.currentTheme = THEME_TYPES.LIGHT
      this.applyTheme(this.currentTheme)
    }
  }

  /**
   * 获取当前主题
   * @returns {string} 当前主题
   */
  getCurrentTheme() {
    return this.currentTheme
  }

  /**
   * 获取可用主题列表
   * @returns {Array} 可用主题列表
   */
  getAvailableThemes() {
    return this.availableThemes.map(theme => ({
      value: theme,
      ...this.themeConfig[theme]
    }))
  }

  /**
   * 切换主题
   * @param {string} theme - 目标主题
   * @returns {boolean} 是否切换成功
   */
  switchTheme(theme) {
    try {
      if (!this.availableThemes.includes(theme)) {
        throw new Error(`不支持的主题: ${theme}`)
      }

      if (theme === this.currentTheme) {
        return true // 已经是目标主题
      }

      // 应用新主题
      const success = this.applyTheme(theme)
      if (success) {
        this.currentTheme = theme
        this.storeTheme(theme)
        this.notifyThemeChange(theme)
        return true
      }

      return false
    } catch (error) {
      console.error('切换主题失败:', error)
      return false
    }
  }

  /**
   * 应用主题
   * @param {string} theme - 主题名称
   * @returns {boolean} 是否应用成功
   */
  applyTheme(theme) {
    try {
      const root = document.documentElement
      
      // 移除所有主题类
      this.availableThemes.forEach(t => {
        root.classList.remove(`theme-${t}`)
      })
      
      // 添加新主题类
      root.classList.add(`theme-${theme}`)
      
      // 设置data-theme属性
      root.setAttribute('data-theme', theme)
      
      // 如果是自动主题，根据系统主题设置实际主题
      if (theme === THEME_TYPES.AUTO) {
        const systemTheme = this.detectSystemTheme()
        root.classList.add(`theme-${systemTheme}`)
        root.setAttribute('data-theme', systemTheme)
      }
      
      return true
    } catch (error) {
      console.error('应用主题失败:', error)
      return false
    }
  }

  /**
   * 检测系统主题
   * @returns {string} 系统主题
   */
  detectSystemTheme() {
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return THEME_TYPES.DARK
      }
      return THEME_TYPES.LIGHT
    } catch (error) {
      console.error('检测系统主题失败:', error)
      return THEME_TYPES.LIGHT
    }
  }

  /**
   * 监听系统主题变化
   */
  watchSystemTheme() {
    try {
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        
        const handleChange = (e) => {
          if (this.currentTheme === THEME_TYPES.AUTO) {
            const newSystemTheme = e.matches ? THEME_TYPES.DARK : THEME_TYPES.LIGHT
            this.applyTheme(THEME_TYPES.AUTO) // 重新应用自动主题
            this.notifyThemeChange(newSystemTheme)
          }
        }

        // 添加监听器
        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener('change', handleChange)
        } else {
          // 兼容旧版本浏览器
          mediaQuery.addListener(handleChange)
        }
      }
    } catch (error) {
      console.error('监听系统主题变化失败:', error)
    }
  }

  /**
   * 获取存储的主题
   * @returns {string|null} 存储的主题
   */
  getStoredTheme() {
    try {
      return localStorage.getItem('blog-theme')
    } catch (error) {
      console.error('获取存储的主题失败:', error)
      return null
    }
  }

  /**
   * 存储主题设置
   * @param {string} theme - 主题名称
   */
  storeTheme(theme) {
    try {
      localStorage.setItem('blog-theme', theme)
    } catch (error) {
      console.error('存储主题设置失败:', error)
    }
  }

  /**
   * 通知主题变化
   * @param {string} theme - 新主题
   */
  notifyThemeChange(theme) {
    try {
      // 触发自定义事件
      const event = new CustomEvent('theme-change', {
        detail: { theme, previousTheme: this.currentTheme }
      })
      window.dispatchEvent(event)
      
      // 触发Vue事件（如果存在）
      if (window.app && window.app.$emit) {
        window.app.$emit('theme-change', theme)
      }
    } catch (error) {
      console.error('通知主题变化失败:', error)
    }
  }

  /**
   * 获取主题配置
   * @param {string} theme - 主题名称
   * @returns {Object|null} 主题配置
   */
  getThemeConfig(theme) {
    return this.themeConfig[theme] || null
  }

  /**
   * 更新主题配置
   * @param {string} theme - 主题名称
   * @param {Object} config - 新配置
   */
  updateThemeConfig(theme, config) {
    if (this.availableThemes.includes(theme)) {
      this.themeConfig[theme] = { ...this.themeConfig[theme], ...config }
    }
  }

  /**
   * 重置主题设置
   */
  resetTheme() {
    try {
      localStorage.removeItem('blog-theme')
      this.currentTheme = THEME_TYPES.LIGHT
      this.applyTheme(this.currentTheme)
      this.notifyThemeChange(this.currentTheme)
    } catch (error) {
      console.error('重置主题设置失败:', error)
    }
  }

  /**
   * 获取主题统计信息
   * @returns {Object} 主题统计信息
   */
  getThemeStats() {
    try {
      const stats = {
        currentTheme: this.currentTheme,
        availableThemes: this.availableThemes.length,
        systemTheme: this.detectSystemTheme(),
        isAutoTheme: this.currentTheme === THEME_TYPES.AUTO,
        lastChanged: localStorage.getItem('theme-last-changed') || null
      }
      return stats
    } catch (error) {
      console.error('获取主题统计信息失败:', error)
      return {}
    }
  }

  /**
   * 销毁主题服务
   */
  destroy() {
    try {
      // 清理事件监听器
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', this.handleSystemThemeChange)
        }
      }
      
      console.log('主题服务已销毁')
    } catch (error) {
      console.error('销毁主题服务失败:', error)
    }
  }
}

// 创建单例实例
const themeService = new ThemeService()

export default themeService
