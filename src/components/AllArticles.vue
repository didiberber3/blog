<template>
  <div class="all-articles-layout">
    <div class="main-container">
      <h2 class="page-title">所有文章</h2>
      
      <div class="articles-list">
        <ArticleCard 
          v-for="article in paginatedArticles" 
          :key="article.slug"
          :article="article"
          @click="goToArticle"
        />
      </div>
      
      <!-- 分页控件 -->
      <Pagination 
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="goToPage"
      />
      
      <div v-if="articles.length === 0" class="empty-state">
        <p>暂无文章，请在 pages/ 目录下添加 .md 文件</p>
      </div>
    </div>
    
    <aside class="sidebar">
      <DateArchive :articles="articles" @article-click="handleDateArchiveClick" />
    </aside>
  </div>
</template>

<script>
import { getArticles } from '../utils/articles.js'
import { groupArticlesByDate } from '../utils/date.js'
import { APP_CONFIG } from '../config/constants.js'
import ArticleCard from './common/ArticleCard.vue'
import Pagination from './common/Pagination.vue'
import DateArchive from './common/DateArchive.vue'

export default {
  name: 'AllArticles',
  components: {
    ArticleCard,
    Pagination,
    DateArchive
  },
  data() {
    return {
      articles: [],
      currentPage: 1,
      itemsPerPage: APP_CONFIG.PAGINATION.DEFAULT_ITEMS_PER_PAGE
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.articles.length / this.itemsPerPage)
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.articles.slice(start, end)
    }
  },
  mounted() {
    this.articles = getArticles()
    this.initializePageFromUrl()
  },
  watch: {
    '$route.query.page'(newPage) {
      this.currentPage = parseInt(newPage) || 1
    }
  },
  methods: {
    handleDateArchiveClick(slug) {
      if (typeof slug === 'string') {
        this.goToArticle(slug)
      }
    },
    goToArticle(slug) {
      // 只处理字符串类型的 slug，忽略事件对象
      if (typeof slug === 'string') {
        console.log('🔗 AllArticles - 跳转到文章:', slug)
        this.$router.push(`/article/${slug}`)
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        // 更新URL参数
        this.$router.push({
          query: { ...this.$route.query, page: page }
        })
      }
    },
    initializePageFromUrl() {
      const pageParam = this.$route.query.page
      if (pageParam) {
        const page = parseInt(pageParam)
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page
        }
      }
    }
  }
}
</script>

<style scoped>
.all-articles-layout {
  display: flex;
  gap: var(--spacing-2xl);
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.main-container {
  max-width: 1000px;
  width: 100%;
}

.page-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-2xl);
  text-align: center;
}

.articles-list {
  margin-top: var(--spacing-xl);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-3xl);
  color: var(--color-text-secondary);
}

.sidebar {
  width: 300px;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  position: sticky;
  top: var(--spacing-2xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-primary);
  height: fit-content;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .all-articles-layout {
    flex-direction: column;
    max-width: var(--container-max-width-wide);
    padding: 0 var(--spacing-lg);
  }
  
  .sidebar {
    width: 100%;
    position: static;
  }
}
</style>
