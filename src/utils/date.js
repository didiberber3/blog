import { APP_CONFIG } from '../config/constants.js'

/**
 * 格式化日期
 * @param {string|Date} date - 日期字符串或Date对象
 * @param {Object} options - 格式化选项
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, options = {}) {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const defaultOptions = APP_CONFIG.ARTICLE.DATE_FORMAT.options
  const locale = APP_CONFIG.ARTICLE.DATE_FORMAT.locale
  
  return dateObj.toLocaleDateString(locale, { ...defaultOptions, ...options })
}

/**
 * 格式化日期组（年月）
 * @param {string|Date} date - 日期字符串或Date对象
 * @returns {string} 格式化后的年月字符串
 */
export function formatDateGroup(date) {
  return formatDate(date, {
    year: 'numeric',
    month: 'long'
  })
}

/**
 * 获取年月字符串（用于分组）
 * @param {string|Date} date - 日期字符串或Date对象
 * @returns {string} 年月字符串 (YYYY-MM)
 */
export function getYearMonth(date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

/**
 * 按日期分组文章
 * @param {Array} articles - 文章数组
 * @returns {Object} 按年月分组的文章对象
 */
export function groupArticlesByDate(articles) {
  const groups = {}
  
  articles.forEach(article => {
    const yearMonth = getYearMonth(article.date)
    
    if (!groups[yearMonth]) {
      groups[yearMonth] = []
    }
    groups[yearMonth].push(article)
  })
  
  // 按日期倒序排列
  const sortedKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a))
  const sortedGroups = {}
  sortedKeys.forEach(key => {
    sortedGroups[key] = groups[key]
  })
  
  return sortedGroups
}
