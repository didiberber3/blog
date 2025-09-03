<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          欢迎来到 <span class="highlight">Didiberber's Blog</span>
        </h1>
        <p class="hero-description">
          分享编程知识、技术心得和开发经验的个人博客
        </p>
        <div class="hero-actions">
          <router-link to="/articles" class="btn btn-primary">
            浏览文章
          </router-link>
          <router-link to="/about" class="btn btn-secondary">
            了解更多
          </router-link>
        </div>
      </div>
    </section>

    <section class="featured">
      <div class="container">
        <h2 class="section-title">最新文章</h2>
        <div class="articles-grid">
          <ArticleCard 
            v-for="article in featuredArticles" 
            :key="article.slug"
            :article="article"
          />
        </div>
        <div class="view-all">
          <router-link to="/articles" class="btn btn-outline">
            查看所有文章 →
          </router-link>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{ totalArticles }}</div>
            <div class="stat-label">文章总数</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ categories.length }}</div>
            <div class="stat-label">分类数量</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ lastUpdateDays }}</div>
            <div class="stat-label">天前更新</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ArticleCard from '../ui/ArticleCard.vue'
import { ArticleService } from '../../services/ArticleService.js'

export default {
  name: 'Home',
  components: {
    ArticleCard
  },
  data() {
    return {
      featuredArticles: [],
      totalArticles: 0,
      categories: [],
      lastUpdateDays: 0
    }
  },
  async mounted() {
    await this.loadFeaturedArticles()
    this.loadStats()
  },
  methods: {
    async loadFeaturedArticles() {
      try {
        const allArticles = await ArticleService.getAllArticles()
        // 获取最新的3篇文章作为推荐
        this.featuredArticles = allArticles
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3)
      } catch (error) {
        console.error('加载推荐文章失败:', error)
      }
    },
    loadStats() {
      this.totalArticles = ArticleService.getTotalCount()
      this.categories = ArticleService.getCategories()
      this.lastUpdateDays = ArticleService.getDaysSinceLastUpdate()
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light));
  padding: var(--spacing-4xl) 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-primary);
  line-height: 1.2;
}

.highlight {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-2xl);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
}

.featured {
  padding: var(--spacing-4xl) 0;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  color: var(--color-text-primary);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.view-all {
  text-align: center;
}

.stats {
  background-color: var(--color-bg-secondary);
  padding: var(--spacing-3xl) 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
}

.stat-item {
  text-align: center;
  padding: var(--spacing-xl);
  background-color: var(--color-bg-primary);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-primary);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.stat-label {
  color: var(--color-text-secondary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
