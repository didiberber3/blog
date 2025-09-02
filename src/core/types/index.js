/**
 * 核心类型定义
 * 提供项目中使用的所有类型定义，提高代码的类型安全性和可维护性
 */

/**
 * 文章类型定义
 */
export const ARTICLE_TYPES = {
  BLOG: 'blog',
  TUTORIAL: 'tutorial',
  NEWS: 'news',
  REVIEW: 'review'
}

/**
 * 主题类型定义
 */
export const THEME_TYPES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
}

/**
 * 响应式断点定义
 */
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1200
}

/**
 * 文章状态定义
 */
export const ARTICLE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
}

/**
 * 导航项类型定义
 */
export const NAV_ITEM_TYPES = {
  LINK: 'link',
  DROPDOWN: 'dropdown',
  BUTTON: 'button'
}

/**
 * 组件大小定义
 */
export const COMPONENT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
}

/**
 * 动画类型定义
 */
export const ANIMATION_TYPES = {
  FADE: 'fade',
  SLIDE: 'slide',
  SCALE: 'scale',
  ROTATE: 'rotate'
}

/**
 * 错误类型定义
 */
export const ERROR_TYPES = {
  VALIDATION: 'validation',
  NETWORK: 'network',
  RUNTIME: 'runtime',
  UNKNOWN: 'unknown'
}

/**
 * 日志级别定义
 */
export const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
}

/**
 * 缓存策略定义
 */
export const CACHE_STRATEGIES = {
  NONE: 'none',
  MEMORY: 'memory',
  LOCAL_STORAGE: 'localStorage',
  SESSION_STORAGE: 'sessionStorage'
}

/**
 * 权限级别定义
 */
export const PERMISSION_LEVELS = {
  GUEST: 'guest',
  USER: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
}

/**
 * 文章分类定义
 */
export const ARTICLE_CATEGORIES = {
  TECHNOLOGY: 'technology',
  LIFESTYLE: 'lifestyle',
  TUTORIAL: 'tutorial',
  NEWS: 'news',
  REVIEW: 'review',
  OPINION: 'opinion'
}

/**
 * 标签类型定义
 */
export const TAG_TYPES = {
  TECHNICAL: 'technical',
  PERSONAL: 'personal',
  BUSINESS: 'business',
  CREATIVE: 'creative'
}

/**
 * 用户角色定义
 */
export const USER_ROLES = {
  READER: 'reader',
  AUTHOR: 'author',
  EDITOR: 'editor',
  ADMIN: 'admin'
}

/**
 * 内容类型定义
 */
export const CONTENT_TYPES = {
  MARKDOWN: 'markdown',
  HTML: 'html',
  PLAIN_TEXT: 'plain_text'
}

/**
 * 排序方向定义
 */
export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc'
}

/**
 * 分页配置默认值
 */
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 10,
  MAX_PAGES: 100,
  SHOW_FIRST_LAST: true,
  SHOW_PREV_NEXT: true
}

/**
 * 搜索配置默认值
 */
export const SEARCH_DEFAULTS = {
  MIN_QUERY_LENGTH: 2,
  MAX_RESULTS: 50,
  DEBOUNCE_DELAY: 300
}

/**
 * 性能配置默认值
 */
export const PERFORMANCE_DEFAULTS = {
  LAZY_LOAD_THRESHOLD: 0.1,
  DEBOUNCE_DELAY: 150,
  THROTTLE_DELAY: 100
}

/**
 * 验证规则定义
 */
export const VALIDATION_RULES = {
  REQUIRED: 'required',
  MIN_LENGTH: 'minLength',
  MAX_LENGTH: 'maxLength',
  PATTERN: 'pattern',
  EMAIL: 'email',
  URL: 'url'
}

/**
 * 状态管理类型定义
 */
export const STORE_TYPES = {
  LOCAL: 'local',
  SESSION: 'session',
  MEMORY: 'memory',
  PERSISTENT: 'persistent'
}

/**
 * 国际化语言定义
 */
export const SUPPORTED_LANGUAGES = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
  JA_JP: 'ja-JP'
}

/**
 * 导出所有类型定义
 */
export default {
  ARTICLE_TYPES,
  THEME_TYPES,
  BREAKPOINTS,
  ARTICLE_STATUS,
  NAV_ITEM_TYPES,
  COMPONENT_SIZES,
  ANIMATION_TYPES,
  ERROR_TYPES,
  LOG_LEVELS,
  CACHE_STRATEGIES,
  PERMISSION_LEVELS,
  ARTICLE_CATEGORIES,
  TAG_TYPES,
  USER_ROLES,
  CONTENT_TYPES,
  SORT_DIRECTIONS,
  PAGINATION_DEFAULTS,
  SEARCH_DEFAULTS,
  PERFORMANCE_DEFAULTS,
  VALIDATION_RULES,
  STORE_TYPES,
  SUPPORTED_LANGUAGES
}
