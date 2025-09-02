/**
 * 主题管理钩子
 * 提供主题相关的状态管理和操作方法
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import themeService from '../services/ThemeService.js'
import { THEME_TYPES } from '../types/index.js'

/**
 * 主题管理钩子
 * @returns {Object} 主题相关的状态和方法
 */
export function useTheme() {
  // 响应式状态
  const currentTheme = ref(themeService.getCurrentTheme())
  const availableThemes = ref(themeService.getAvailableThemes())
  const isAutoTheme = computed(() => currentTheme.value === THEME_TYPES.AUTO)
  const isDarkTheme = computed(() => {
    if (isAutoTheme.value) {
      return themeService.detectSystemTheme() === THEME_TYPES.DARK
    }
    return currentTheme.value === THEME_TYPES.DARK
  })

  // 主题切换方法
  const switchTheme = async (theme) => {
    try {
      const success = await themeService.switchTheme(theme)
      if (success) {
        currentTheme.value = theme
        return { success: true, theme }
      }
      return { success: false, error: '主题切换失败' }
    } catch (error) {
      console.error('切换主题失败:', error)
      return { success: false, error: error.message }
    }
  }

  // 切换到下一个主题
  const nextTheme = () => {
    const currentIndex = availableThemes.value.findIndex(t => t.value === currentTheme.value)
    const nextIndex = (currentIndex + 1) % availableThemes.value.length
    const nextTheme = availableThemes.value[nextIndex].value
    return switchTheme(nextTheme)
  }

  // 切换到上一个主题
  const prevTheme = () => {
    const currentIndex = availableThemes.value.findIndex(t => t.value === currentTheme.value)
    const prevIndex = currentIndex === 0 ? availableThemes.value.length - 1 : currentIndex - 1
    const prevTheme = availableThemes.value[prevIndex].value
    return switchTheme(prevTheme)
  }

  // 重置主题
  const resetTheme = () => {
    themeService.resetTheme()
    currentTheme.value = themeService.getCurrentTheme()
  }

  // 获取主题配置
  const getThemeConfig = (theme) => {
    return themeService.getThemeConfig(theme)
  }

  // 获取主题统计信息
  const getThemeStats = () => {
    return themeService.getThemeStats()
  }

  // 监听主题变化
  const onThemeChange = (callback) => {
    const handleThemeChange = (event) => {
      const { theme } = event.detail
      currentTheme.value = theme
      if (callback && typeof callback === 'function') {
        callback(theme)
      }
    }

    window.addEventListener('theme-change', handleThemeChange)
    
    // 返回清理函数
    return () => {
      window.removeEventListener('theme-change', handleThemeChange)
    }
  }

  // 生命周期钩子
  onMounted(() => {
    // 初始化主题状态
    currentTheme.value = themeService.getCurrentTheme()
    
    // 监听主题变化
    const cleanup = onThemeChange((theme) => {
      currentTheme.value = theme
    })
    
    // 保存清理函数，在组件卸载时调用
    if (cleanup) {
      onUnmounted(cleanup)
    }
  })

  return {
    // 状态
    currentTheme: readonly(currentTheme),
    availableThemes: readonly(availableThemes),
    isAutoTheme,
    isDarkTheme,
    
    // 方法
    switchTheme,
    nextTheme,
    prevTheme,
    resetTheme,
    getThemeConfig,
    getThemeStats,
    onThemeChange
  }
}

/**
 * 只读引用包装器
 * @param {Ref} ref - Vue引用
 * @returns {Object} 只读引用
 */
function readonly(ref) {
  return computed(() => ref.value)
}

export default useTheme
