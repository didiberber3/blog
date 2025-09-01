<template>
  <div class="sidebar-section">
    <h3 class="sidebar-title">按日期归档</h3>
    <div class="date-groups">
      <div 
        v-for="(articles, date) in articlesByDate" 
        :key="date"
        class="date-group"
      >
        <h4 class="date-header">{{ formatDateGroup(date) }}</h4>
        <ul class="date-articles">
          <li 
            v-for="article in articles" 
            :key="article.slug"
            class="date-article"
            @click="handleArticleClick(article.slug)"
          >
            {{ article.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { groupArticlesByDate, formatDateGroup } from '../../utils/date.js'

export default {
  name: 'DateArchive',
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  computed: {
    articlesByDate() {
      return groupArticlesByDate(this.articles)
    }
  },
  methods: {
    formatDateGroup,
    handleArticleClick(slug) {
      this.$emit('article-click', slug)
    }
  }
}
</script>

<style scoped>
.sidebar-title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-xl);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: var(--spacing-md);
  letter-spacing: -0.01em;
}

.date-group {
  margin-bottom: var(--spacing-xl);
}

.date-header {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.01em;
}

.date-articles {
  list-style: none;
  padding: 0;
  margin: 0;
}

.date-article {
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  transition: all var(--transition-normal);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-xs);
}

.date-article:hover {
  color: var(--color-primary);
  background-color: rgba(76, 175, 80, 0.08);
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.15);
  transform: translateX(4px);
}

.date-article:active {
  transform: scale(0.98) translateX(2px);
}
</style>
