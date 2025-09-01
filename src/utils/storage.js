/**
 * 本地存储工具函数
 */

/**
 * 设置本地存储项
 * @param {string} key - 存储键名
 * @param {any} value - 存储值
 */
export function setStorageItem(key, value) {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

/**
 * 获取本地存储项
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 默认值
 * @returns {any} 存储的值或默认值
 */
export function getStorageItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Failed to read from localStorage:', error)
    return defaultValue
  }
}

/**
 * 移除本地存储项
 * @param {string} key - 存储键名
 */
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Failed to remove from localStorage:', error)
  }
}

/**
 * 清除所有本地存储
 */
export function clearStorage() {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Failed to clear localStorage:', error)
  }
}

// 存储键名常量
export const STORAGE_KEYS = {
  THEME: 'theme',
  USER_PREFERENCES: 'userPreferences',
  ARTICLES_CACHE: 'articlesCache'
}
