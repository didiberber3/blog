<template>
  <div class="all-articles">
    <div class="container">
      <header class="page-header">
        <h1 class="page-title">所有文章</h1>
        <p class="page-description">探索我的编程世界，分享技术心得</p>
      </header>

      <div class="articles-controls">
        <div class="search-box">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索文章..."
            class="search-input"
            @input="handleSearch"
          >
        </div>
        
        <div class="filter-tags" v-if="allTags.length">
          <button 
            @click="selectedTag = ''"
            :class="['tag-filter', { active: selectedTag === '' }]"
          >
            全部
          </button>
          <button 
            v-for="tag in allTags" 
            :key="tag"
            @click="selectedTag = tag"
            :class="['tag-filter', { active: selectedTag === tag }]"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <div class="articles-stats">
        <span class="stats-text">
          共找到 {{ filteredArticles.length }} 篇文章
        </span>
      </div>

      <div class="articles-grid" v-if="filteredArticles.length">
        <ArticleCard 
          v-for="article in filteredArticles" 
          :key="article.slug"
          :article="article"
        />
      </div>

      <div class="no-results" v-else>
        <div class="no-results-content">
          <h3>没有找到相关文章</h3>
          <p>尝试调整搜索关键词或筛选条件</p>
          <button @click="clearFilters" class="btn btn-primary">
            清除筛选
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from '../ui/ArticleCard.vue'
import { ArticleService } from '../../services/ArticleService.js'

export default {
  name: 'AllArticles',
  components: {
    ArticleCard
  },
  data() {
    return {
      articles: [],
      searchQuery: '',
      selectedTag: '',
      allTags: []
    }
  },
  computed: {
    filteredArticles() {
      let filtered = this.articles

      // 按标签筛选
      if (this.selectedTag) {
        filtered = filtered.filter(article => 
          article.tags.includes(this.selectedTag)
        )
      }

      // 按搜索关键词筛选
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(article => 
          article.title.toLowerCase().includes(query) ||
          article.rawContent.toLowerCase().includes(query) ||
          article.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }

      return filtered
    }
  },
  async mounted() {
    await this.loadArticles()
    this.loadTags()
  },
  methods: {
    async loadArticles() {
      try {
        this.articles = await ArticleService.getAllArticles()
      } catch (error) {
        console.error('加载文章失败:', error)
      }
    },
    loadTags() {
      this.allTags = ArticleService.getCategories()
    },
    handleSearch() {
      // 搜索时自动清除标签筛选
      if (this.searchQuery.trim()) {
        this.selectedTag = ''
      }
    },
    clearFilters() {
      this.searchQuery = ''
      this.selectedTag = ''
    }
  }
}
</script>

<style scoped>
.all-articles {
  min-height: 100vh;
  padding: var(--spacing-2xl) 0;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.page-description {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.articles-controls {
  margin-bottom: var(--spacing-xl);
}

.search-box {
  margin-bottom: var(--spacing-lg);
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
}

.tag-filter {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  color: var(--color-text-secondary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.9rem;
}

.tag-filter:hover {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.tag-filter.active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.articles-stats {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.stats-text {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-xl);
}

.no-results {
  text-align: center;
  padding: var(--spacing-4xl) 0;
}

.no-results-content h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.no-results-content p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-tags {
    justify-content: flex-start;
  }
}
</style>
