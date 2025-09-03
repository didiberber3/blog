<template>
  <div class="article-page" v-if="article">
    <div class="container">
      <article class="article">
        <header class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="article-date">{{ formatDate(article.date) }}</span>
            <span class="article-author" v-if="article.author">{{ article.author }}</span>
          </div>
          <div class="article-tags" v-if="article.tags && article.tags.length">
            <span v-for="tag in article.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </header>
        
        <div class="article-content">
          <MarkdownRenderer :content="article.content" />
        </div>
        
        <footer class="article-footer">
          <div class="article-actions">
            <router-link to="/articles" class="btn btn-secondary">
              ← 返回文章列表
            </router-link>
          </div>
        </footer>
      </article>
    </div>
  </div>
  
  <div class="article-loading" v-else-if="loading">
    <div class="container">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    </div>
  </div>
  
  <div class="article-not-found" v-else>
    <div class="container">
      <div class="not-found-content">
        <h1>文章未找到</h1>
        <p>抱歉，您访问的文章不存在或已被删除。</p>
        <router-link to="/articles" class="btn btn-primary">
          返回文章列表
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownRenderer from '../ui/MarkdownRenderer.vue'
import { ArticleService } from '../../services/ArticleService.js'

export default {
  name: 'Article',
  components: {
    MarkdownRenderer
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      article: null,
      loading: true
    }
  },
  async mounted() {
    await this.loadArticle()
  },
  async beforeRouteUpdate(to, from, next) {
    this.loading = true
    this.article = null
    await this.loadArticle(to.params.slug)
    next()
  },
  methods: {
    async loadArticle(slug = this.slug) {
      try {
        this.loading = true
        this.article = await ArticleService.getArticleBySlug(slug)
        
        if (this.article) {
          // 更新页面标题
          document.title = `${this.article.title} - Didiberber's Blog`
        }
      } catch (error) {
        console.error('加载文章失败:', error)
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  beforeUnmount() {
    // 恢复默认标题
    document.title = "Didiberber's Blog"
  }
}
</script>

<style scoped>
.article-page {
  min-height: 100vh;
  padding: var(--spacing-2xl) 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.article {
  background-color: var(--color-bg-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-3xl);
  box-shadow: var(--shadow-sm);
}

.article-header {
  margin-bottom: var(--spacing-3xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border-primary);
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  line-height: 1.2;
}

.article-meta {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.article-date {
  font-weight: 500;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.8rem;
  font-weight: 500;
}

.article-content {
  margin-bottom: var(--spacing-3xl);
}

.article-footer {
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-border-primary);
}

.article-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-loading,
.article-not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-content,
.not-found-content {
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border-primary);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--spacing-lg);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.not-found-content h1 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
}

.not-found-content p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

@media (max-width: 768px) {
  .article {
    padding: var(--spacing-xl);
  }
  
  .article-title {
    font-size: 2rem;
  }
  
  .article-meta {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>
