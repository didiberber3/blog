<template>
  <div class="home-layout">
    <div class="main-container">
      <div class="hero">
        <h1 class="hero-title">Didiberber's Blog</h1>
        <p class="hero-subtitle">这扯不扯你说</p>
      </div>
      
      <div class="featured-articles">
        <h2>最新文章</h2>
        <div class="articles-grid">
          <div 
            v-for="article in latestArticles" 
            :key="article.slug"
            class="article-card"
            @click="goToArticle(article.slug)"
          >
            <h3>{{ article.title }}</h3>
            <p>{{ article.excerpt }}</p>
            <span class="date">{{ formatDate(article.date) }}</span>
          </div>
        </div>
        
        <div class="view-all-container">
          <button class="btn btn-primary btn-with-icon" @click="goToAllArticles">
            <span class="btn-icon">📚</span>
            <span>查看更多</span>
          </button>
        </div>
      </div>
    </div>
    
    <aside class="sidebar">
      <AboutSidebar />
    </aside>
  </div>
</template>

<script>
import { getArticles } from '../utils/articles.js'
import { formatDate } from '../utils/date.js'
import AboutSidebar from './common/AboutSidebar.vue'

export default {
  name: 'Home',
  components: {
    AboutSidebar
  },
  data() {
    return {
      latestArticles: []
    }
  },
  mounted() {
    this.loadLatestArticles()
  },
  methods: {
    loadLatestArticles() {
      try {
        const articles = getArticles()
        this.latestArticles = articles.slice(0, 3) // 只显示最新的3篇
      } catch (error) {
        console.error('加载最新文章失败:', error)
      }
    },
    goToArticle(slug) {
      // 只处理字符串类型的 slug，忽略事件对象
      if (typeof slug === 'string') {
        this.$router.push(`/article/${slug}`)
      }
    },
    goToAllArticles() {
      this.$router.push('/articles')
    },
    formatDate
  }
}
</script>

<style scoped>
.home-layout {
  display: flex;
  gap: var(--spacing-2xl);
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.main-container {
  flex: 1;
  max-width: 1000px;
}

.hero {
  text-align: center;
  padding: var(--spacing-4xl) 0;
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-2xl);
}

.featured-articles {
  margin-top: var(--spacing-4xl);
}

.featured-articles h2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.article-card {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.article-card:active {
  transform: scale(0.98) translateY(-1px);
}

.article-card h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.article-card p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.article-card .date {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.view-all-container {
  text-align: center;
  margin-top: var(--spacing-2xl);
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
  .home-layout {
    flex-direction: column;
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    width: 100%;
    position: static;
  }
}
</style>
