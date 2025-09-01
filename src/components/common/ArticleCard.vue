<template>
  <article 
    class="article-card"
    @click="handleClick"
  >
    <h3 class="article-title">{{ article.title }}</h3>
    <p class="article-meta">
      <span class="date">{{ formatDate(article.date) }}</span>
      <span class="author">{{ article.author }}</span>
    </p>
    <p class="article-excerpt">{{ article.excerpt }}</p>
  </article>
</template>

<script>
import { formatDate } from '../../utils/date.js'

export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.title && value.slug && value.date
      }
    },
    clickable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    formatDate,
    handleClick() {
      if (this.clickable) {
        this.$emit('click', this.article.slug)
      }
    }
  }
}
</script>

<style scoped>
.article-card {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.article-card:active {
  transform: scale(0.98) translateY(-1px);
}

.article-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.article-meta {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.date, .author {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.article-excerpt {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: var(--font-size-base);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-card {
    padding: var(--spacing-lg);
  }
  
  .article-title {
    font-size: var(--font-size-lg);
  }
  
  .article-meta {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
}
</style>
