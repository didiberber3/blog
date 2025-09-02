/**
 * 文章管理钩子
 * 提供文章相关的状态管理和操作方法
 */
import { ref, computed, onMounted } from 'vue'
import articleService from '../services/ArticleService.js'
import { ARTICLE_STATUS, ARTICLE_CATEGORIES, SORT_DIRECTIONS } from '../types/index.js'

/**
 * 文章管理钩子
 * @param {Object} options - 配置选项
 * @returns {Object} 文章相关的状态和方法
 */
export function useArticles(options = {}) {
  const {
    autoLoad = true,
    pageSize = 10,
    defaultCategory = null,
    defaultSort = SORT_DIRECTIONS.DESC
  } = options

  // 响应式状态
  const articles = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const selectedCategory = ref(defaultCategory)
  const sortDirection = ref(defaultSort)
  const searchQuery = ref('')

  // 计算属性
  const hasArticles = computed(() => articles.value.length > 0)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)
  const filteredArticles = computed(() => {
    let filtered = [...articles.value]

    // 按分类过滤
    if (selectedCategory.value) {
      filtered = filtered.filter(article => article.category === selectedCategory.value)
    }

    // 按搜索关键词过滤
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query)))
      )
    }

    // 排序
    filtered.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return sortDirection.value === SORT_DIRECTIONS.ASC ? dateA - dateB : dateB - dateA
    })

    return filtered
  })

  const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return filteredArticles.value.slice(start, end)
  })

  // 加载文章
  const loadArticles = async (loadOptions = {}) => {
    try {
      loading.value = true
      error.value = null

      const articlesData = await articleService.getAllArticles(loadOptions)
      articles.value = articlesData
      
      // 计算总页数
      totalPages.value = Math.ceil(filteredArticles.value.length / pageSize)
      
      // 确保当前页在有效范围内
      if (currentPage.value > totalPages.value && totalPages.value > 0) {
        currentPage.value = totalPages.value
      }

      return articlesData
    } catch (err) {
      error.value = err.message || '加载文章失败'
      console.error('加载文章失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 根据ID获取文章
  const getArticleById = async (id) => {
    try {
      loading.value = true
      error.value = null

      const article = await articleService.getArticleById(id)
      return article
    } catch (err) {
      error.value = err.message || '获取文章失败'
      console.error('获取文章失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 根据分类获取文章
  const getArticlesByCategory = async (category) => {
    try {
      selectedCategory.value = category
      const articlesData = await articleService.getArticlesByCategory(category)
      articles.value = articlesData
      
      // 重置分页
      currentPage.value = 1
      totalPages.value = Math.ceil(articlesData.length / pageSize)
      
      return articlesData
    } catch (err) {
      error.value = err.message || '获取分类文章失败'
      console.error('获取分类文章失败:', err)
      throw err
    }
  }

  // 搜索文章
  const searchArticles = async (query, searchOptions = {}) => {
    try {
      searchQuery.value = query
      loading.value = true
      error.value = null

      const results = await articleService.searchArticles(query, searchOptions)
      articles.value = results
      
      // 重置分页
      currentPage.value = 1
      totalPages.value = Math.ceil(results.length / pageSize)
      
      return results
    } catch (err) {
      error.value = err.message || '搜索文章失败'
      console.error('搜索文章失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 获取热门文章
  const getPopularArticles = async (limit = 5) => {
    try {
      loading.value = true
      error.value = null

      const popularArticles = await articleService.getPopularArticles(limit)
      return popularArticles
    } catch (err) {
      error.value = err.message || '获取热门文章失败'
      console.error('获取热门文章失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 获取最新文章
  const getLatestArticles = async (limit = 5) => {
    try {
      loading.value = true
      error.value = null

      const latestArticles = await articleService.getLatestArticles(limit)
      return latestArticles
    } catch (err) {
      error.value = err.message || '获取最新文章失败'
      console.error('获取最新文章失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 获取相关文章
  const getRelatedArticles = async (articleId, limit = 3) => {
    try {
      loading.value = true
      error.value = null

      const relatedArticles = await articleService.getRelatedArticles(articleId, limit)
      return relatedArticles
    } catch (err) {
      error.value = err.message || '获取相关文章失败'
      console.error('获取相关文章失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 分页控制
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const goToFirstPage = () => {
    currentPage.value = 1
  }

  const goToLastPage = () => {
    currentPage.value = totalPages.value
  }

  // 排序控制
  const setSortDirection = (direction) => {
    if (Object.values(SORT_DIRECTIONS).includes(direction)) {
      sortDirection.value = direction
    }
  }

  const toggleSortDirection = () => {
    sortDirection.value = sortDirection.value === SORT_DIRECTIONS.ASC 
      ? SORT_DIRECTIONS.DESC 
      : SORT_DIRECTIONS.ASC
  }

  // 分类控制
  const setCategory = (category) => {
    if (category === null || Object.values(ARTICLE_CATEGORIES).includes(category)) {
      selectedCategory.value = category
      currentPage.value = 1 // 重置分页
    }
  }

  const clearCategory = () => {
    selectedCategory.value = null
    currentPage.value = 1
  }

  // 搜索控制
  const setSearchQuery = (query) => {
    searchQuery.value = query
    currentPage.value = 1 // 重置分页
  }

  const clearSearch = () => {
    searchQuery.value = ''
    currentPage.value = 1
  }

  // 刷新数据
  const refresh = () => {
    return loadArticles()
  }

  // 清除错误
  const clearError = () => {
    error.value = null
  }

  // 获取可用分类
  const getAvailableCategories = () => {
    return Object.values(ARTICLE_CATEGORIES)
  }

  // 获取分类统计
  const getCategoryStats = () => {
    const stats = {}
    Object.values(ARTICLE_CATEGORIES).forEach(category => {
      stats[category] = articles.value.filter(article => article.category === category).length
    })
    return stats
  }

  // 生命周期钩子
  onMounted(() => {
    if (autoLoad) {
      loadArticles()
    }
  })

  return {
    // 状态
    articles: readonly(articles),
    loading: readonly(loading),
    error: readonly(error),
    currentPage: readonly(currentPage),
    totalPages: readonly(totalPages),
    selectedCategory: readonly(selectedCategory),
    sortDirection: readonly(sortDirection),
    searchQuery: readonly(searchQuery),

    // 计算属性
    hasArticles,
    isLoading,
    hasError,
    filteredArticles,
    paginatedArticles,

    // 方法
    loadArticles,
    getArticleById,
    getArticlesByCategory,
    searchArticles,
    getPopularArticles,
    getLatestArticles,
    getRelatedArticles,
    
    // 分页控制
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    
    // 排序控制
    setSortDirection,
    toggleSortDirection,
    
    // 分类控制
    setCategory,
    clearCategory,
    
    // 搜索控制
    setSearchQuery,
    clearSearch,
    
    // 其他
    refresh,
    clearError,
    getAvailableCategories,
    getCategoryStats
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

export default useArticles
