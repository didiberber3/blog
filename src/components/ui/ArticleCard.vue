<template>
  <article class="article-card">
    <router-link :to="`/article/${article.slug}`" class="card-link">
      <div class="card-header">
        <h3 class="card-title">{{ article.title }}</h3>
        <div class="card-meta">
          <span class="card-date">{{ formatDate(article.date) }}</span>
          <span class="card-author" v-if="article.author">{{ article.author }}</span>
        </div>
      </div>
      
      <div class="card-content">
        <p class="card-excerpt">{{ article.excerpt || '暂无摘要' }}</p>
      </div>
      
      <div class="card-footer">
        <div class="card-tags" v-if="article.tags && article.tags.length">
          <span 
            v-for="tag in article.tags.slice(0, 3)" 
            :key="tag" 
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
        <div class="card-arrow">→</div>
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.article-card {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  height: 100%;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-light);
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
}

.card-header {
  margin-bottom: var(--spacing-lg);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
}

.card-meta {
  display: flex;
  gap: var(--spacing-md);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.card-date {
  font-weight: 500;
}

.card-content {
  flex: 1;
  margin-bottom: var(--spacing-lg);
}

.card-excerpt {
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.tag {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.card-arrow {
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1.2rem;
  transition: transform var(--transition-fast);
}

.article-card:hover .card-arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .card-link {
    padding: var(--spacing-lg);
  }
  
  .card-title {
    font-size: 1.1rem;
  }
}
</style>
