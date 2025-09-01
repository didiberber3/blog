<template>
  <div v-if="toc.length > 0" class="toc-container">
    <h3 class="toc-title">目录</h3>
    <nav class="toc-nav">
      <ul class="toc-list">
        <li 
          v-for="item in toc" 
          :key="item.id"
          class="toc-item"
          :class="`toc-level-${item.level}`"
        >
          <a 
            :href="`#${item.id}`"
            class="toc-link"
            @click.prevent="scrollToHeading(item.id)"
            :title="item.text"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { scrollToHeading } from '../utils/toc.js'

export default {
  name: 'TableOfContents',
  props: {
    toc: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    scrollToHeading
  }
}
</script>

<style scoped>
.toc-container {
  /* 移除边框和背景，避免重复嵌套 */
}

.toc-title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-xl);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: var(--spacing-md);
  letter-spacing: -0.01em;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: var(--spacing-sm);
}

.toc-link {
  display: block;
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.toc-link:hover {
  color: var(--color-primary);
  background-color: rgba(76, 175, 80, 0.08);
  transform: translateX(4px);
}

/* 层级缩进 */
.toc-level-1 { padding-left: 0; }
.toc-level-2 { padding-left: var(--spacing-md); }
.toc-level-3 { padding-left: var(--spacing-xl); }
.toc-level-4 { padding-left: var(--spacing-2xl); }
.toc-level-5 { padding-left: var(--spacing-3xl); }
.toc-level-6 { padding-left: var(--spacing-4xl); }

/* 响应式设计 */
@media (max-width: 768px) {
  .toc-container {
    margin-top: var(--spacing-xl);
  }
  
  .toc-link {
    font-size: var(--font-size-base);
    padding: var(--spacing-md);
  }
}
</style>
