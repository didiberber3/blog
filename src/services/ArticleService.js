import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

class ArticleServiceClass {
  constructor() {
    this.articles = new Map()
    this.initialized = false
  }

  async initialize() {
    if (this.initialized) return
    
    try {
      // 动态导入所有文章
      const articleModules = import.meta.glob('/src/pages/*.md', { query: '?raw', import: 'default' })
      
      for (const [path, moduleLoader] of Object.entries(articleModules)) {
        const slug = this.extractSlugFromPath(path)
        const content = await moduleLoader()
        const article = this.parseMarkdown(content, slug)
        this.articles.set(slug, article)
      }
      
      this.initialized = true
    } catch (error) {
      console.error('初始化文章服务失败:', error)
    }
  }

  extractSlugFromPath(path) {
    return path.split('/').pop().replace('.md', '')
  }

  parseMarkdown(content, slug) {
    const lines = content.split('\n')
    let frontmatterEnd = -1
    let frontmatter = {}

    // 解析 frontmatter
    if (lines[0] === '---') {
      for (let i = 1; i < lines.length; i++) {
        if (lines[i] === '---') {
          frontmatterEnd = i
          break
        }
        const line = lines[i].trim()
        if (line && line.includes(':')) {
          const [key, ...valueParts] = line.split(':')
          const value = valueParts.join(':').trim()
          frontmatter[key.trim()] = value.replace(/^['"]|['"]$/g, '')
        }
      }
    }

    // 获取正文内容
    const markdownContent = lines.slice(frontmatterEnd + 1).join('\n')
    const htmlContent = md.render(markdownContent)

    // 生成摘要
    const excerpt = this.generateExcerpt(markdownContent)

    return {
      slug,
      title: frontmatter.title || slug,
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      author: frontmatter.author || 'Didiberber',
      tags: frontmatter.tags ? frontmatter.tags.split(',').map(tag => tag.trim()) : [],
      excerpt,
      content: htmlContent,
      rawContent: markdownContent,
      ...frontmatter
    }
  }

  generateExcerpt(content, maxLength = 150) {
    // 移除 markdown 语法
    const plainText = content
      .replace(/#{1,6}\s+/g, '') // 标题
      .replace(/\*\*(.*?)\*\*/g, '$1') // 粗体
      .replace(/\*(.*?)\*/g, '$1') // 斜体
      .replace(/`(.*?)`/g, '$1') // 行内代码
      .replace(/```[\s\S]*?```/g, '') // 代码块
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // 图片
      .trim()

    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText
  }

  async getAllArticles() {
    await this.initialize()
    return Array.from(this.articles.values())
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  async getArticleBySlug(slug) {
    await this.initialize()
    return this.articles.get(slug)
  }

  async getArticlesByTag(tag) {
    await this.initialize()
    return Array.from(this.articles.values())
      .filter(article => article.tags.includes(tag))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  getCategories() {
    const categories = new Set()
    this.articles.forEach(article => {
      if (article.tags) {
        article.tags.forEach(tag => categories.add(tag))
      }
    })
    return Array.from(categories)
  }

  getTotalCount() {
    return this.articles.size
  }

  getDaysSinceLastUpdate() {
    const articles = Array.from(this.articles.values())
    if (articles.length === 0) return 0
    
    const latestDate = articles
      .map(article => new Date(article.date))
      .sort((a, b) => b - a)[0]
    
    const now = new Date()
    const diffTime = Math.abs(now - latestDate)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  async searchArticles(query) {
    await this.initialize()
    const lowercaseQuery = query.toLowerCase()
    
    return Array.from(this.articles.values()).filter(article => {
      return article.title.toLowerCase().includes(lowercaseQuery) ||
             article.rawContent.toLowerCase().includes(lowercaseQuery) ||
             article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    })
  }
}

export const ArticleService = new ArticleServiceClass()
