/**
 * 文章服务类
 * 负责文章数据的获取、处理和管理
 */
import { ARTICLE_STATUS, ARTICLE_CATEGORIES, SORT_DIRECTIONS } from '../types/index.js'

class ArticleService {
  constructor() {
    this.articles = []
    this.cache = new Map()
    this.cacheTimeout = 5 * 60 * 1000 // 5分钟缓存
  }

  /**
   * 获取所有文章
   * @param {Object} options - 查询选项
   * @returns {Array} 文章列表
   */
  async getAllArticles(options = {}) {
    try {
      const cacheKey = `articles_${JSON.stringify(options)}`
      
      // 检查缓存
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey)
        if (Date.now() - cached.timestamp < this.cacheTimeout) {
          return cached.data
        }
      }

      // 模拟API调用
      const articles = await this.fetchArticlesFromAPI(options)
      
      // 缓存结果
      this.cache.set(cacheKey, {
        data: articles,
        timestamp: Date.now()
      })

      return articles
    } catch (error) {
      console.error('获取文章失败:', error)
      throw new Error('获取文章失败')
    }
  }

  /**
   * 根据ID获取文章
   * @param {string} id - 文章ID
   * @returns {Object|null} 文章对象
   */
  async getArticleById(id) {
    try {
      if (!id) {
        throw new Error('文章ID不能为空')
      }

      const cacheKey = `article_${id}`
      
      // 检查缓存
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey)
        if (Date.now() - cached.timestamp < this.cacheTimeout) {
          return cached.data
        }
      }

      // 模拟API调用
      const article = await this.fetchArticleFromAPI(id)
      
      if (article) {
        // 缓存结果
        this.cache.set(cacheKey, {
          data: article,
          timestamp: Date.now()
        })
      }

      return article
    } catch (error) {
      console.error('获取文章详情失败:', error)
      throw new Error('获取文章详情失败')
    }
  }

  /**
   * 根据分类获取文章
   * @param {string} category - 文章分类
   * @param {Object} options - 查询选项
   * @returns {Array} 文章列表
   */
  async getArticlesByCategory(category, options = {}) {
    try {
      if (!category || !Object.values(ARTICLE_CATEGORIES).includes(category)) {
        throw new Error('无效的文章分类')
      }

      const allArticles = await this.getAllArticles(options)
      return allArticles.filter(article => article.category === category)
    } catch (error) {
      console.error('根据分类获取文章失败:', error)
      throw new Error('根据分类获取文章失败')
    }
  }

  /**
   * 搜索文章
   * @param {string} query - 搜索关键词
   * @param {Object} options - 搜索选项
   * @returns {Array} 搜索结果
   */
  async searchArticles(query, options = {}) {
    try {
      if (!query || query.trim().length < 2) {
        throw new Error('搜索关键词至少需要2个字符')
      }

      const { maxResults = 50, includeContent = false } = options
      const allArticles = await this.getAllArticles()
      
      const results = allArticles.filter(article => {
        const searchFields = [
          article.title,
          article.excerpt,
          article.tags?.join(' '),
          includeContent ? article.content : ''
        ].filter(Boolean).join(' ').toLowerCase()
        
        return searchFields.includes(query.toLowerCase())
      })

      return results.slice(0, maxResults)
    } catch (error) {
      console.error('搜索文章失败:', error)
      throw new Error('搜索文章失败')
    }
  }

  /**
   * 获取热门文章
   * @param {number} limit - 限制数量
   * @returns {Array} 热门文章列表
   */
  async getPopularArticles(limit = 5) {
    try {
      const allArticles = await this.getAllArticles()
      
      return allArticles
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, limit)
    } catch (error) {
      console.error('获取热门文章失败:', error)
      throw new Error('获取热门文章失败')
    }
  }

  /**
   * 获取最新文章
   * @param {number} limit - 限制数量
   * @returns {Array} 最新文章列表
   */
  async getLatestArticles(limit = 5) {
    try {
      const allArticles = await this.getAllArticles()
      
      return allArticles
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit)
    } catch (error) {
      console.error('获取最新文章失败:', error)
      throw new Error('获取最新文章失败')
    }
  }

  /**
   * 获取相关文章
   * @param {string} articleId - 当前文章ID
   * @param {number} limit - 限制数量
   * @returns {Array} 相关文章列表
   */
  async getRelatedArticles(articleId, limit = 3) {
    try {
      const currentArticle = await this.getArticleById(articleId)
      if (!currentArticle) {
        return []
      }

      const allArticles = await this.getAllArticles()
      const relatedArticles = allArticles
        .filter(article => 
          article.id !== articleId && 
          article.status === ARTICLE_STATUS.PUBLISHED
        )
        .map(article => {
          // 计算相关性分数
          let score = 0
          
          // 相同分类加分
          if (article.category === currentArticle.category) {
            score += 3
          }
          
          // 相同标签加分
          const commonTags = (currentArticle.tags || []).filter(tag => 
            (article.tags || []).includes(tag)
          )
          score += commonTags.length * 2
          
          // 时间越近加分
          const daysDiff = Math.abs(new Date(article.date) - new Date(currentArticle.date)) / (1000 * 60 * 60 * 24)
          score += Math.max(0, 10 - daysDiff)
          
          return { ...article, relevanceScore: score }
        })
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, limit)

      return relatedArticles
    } catch (error) {
      console.error('获取相关文章失败:', error)
      throw new Error('获取相关文章失败')
    }
  }

  /**
   * 清除缓存
   * @param {string} pattern - 缓存模式（可选）
   */
  clearCache(pattern = null) {
    if (pattern) {
      // 清除匹配模式的缓存
      for (const [key] of this.cache) {
        if (key.includes(pattern)) {
          this.cache.delete(key)
        }
      }
    } else {
      // 清除所有缓存
      this.cache.clear()
    }
  }

  /**
   * 模拟从API获取文章列表
   * @param {Object} options - 查询选项
   * @returns {Promise<Array>} 文章列表
   */
  async fetchArticlesFromAPI(options = {}) {
    // 这里应该是真实的API调用
    // 目前返回模拟数据
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: '示例文章1',
            excerpt: '这是示例文章的摘要...',
            content: '# 示例文章1\n\n这是文章内容...',
            category: ARTICLE_CATEGORIES.TECHNOLOGY,
            status: ARTICLE_STATUS.PUBLISHED,
            date: '2024-01-01',
            author: 'Didiberber',
            tags: ['技术', 'Vue.js'],
            views: 100
          }
        ])
      }, 100)
    })
  }

  /**
   * 模拟从API获取单篇文章
   * @param {string} id - 文章ID
   * @returns {Promise<Object|null>} 文章对象
   */
  async fetchArticleFromAPI(id) {
    // 这里应该是真实的API调用
    // 目前返回模拟数据
    return new Promise(resolve => {
      setTimeout(() => {
        if (id === '1') {
          resolve({
            id: '1',
            title: '示例文章1',
            excerpt: '这是示例文章的摘要...',
            content: '# 示例文章1\n\n这是文章内容...',
            category: ARTICLE_CATEGORIES.TECHNOLOGY,
            status: ARTICLE_STATUS.PUBLISHED,
            date: '2024-01-01',
            author: 'Didiberber',
            tags: ['技术', 'Vue.js'],
            views: 100
          })
        } else {
          resolve(null)
        }
      }, 100)
    })
  }
}

// 创建单例实例
const articleService = new ArticleService()

export default articleService
