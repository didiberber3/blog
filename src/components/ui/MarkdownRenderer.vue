<template>
  <div class="markdown-content" v-html="content"></div>
</template>

<script>
export default {
  name: 'MarkdownRenderer',
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.markdown-content {
  line-height: 1.7;
  color: var(--color-text-primary);
}

/* 全局 markdown 样式 */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  color: var(--color-text-primary);
  font-weight: 600;
  margin-top: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  line-height: 1.3;
}

.markdown-content :deep(h1) {
  font-size: 2rem;
  border-bottom: 2px solid var(--color-border-primary);
  padding-bottom: var(--spacing-md);
}

.markdown-content :deep(h2) {
  font-size: 1.5rem;
}

.markdown-content :deep(h3) {
  font-size: 1.25rem;
}

.markdown-content :deep(p) {
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-primary);
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: var(--spacing-lg);
  padding-left: var(--spacing-xl);
}

.markdown-content :deep(li) {
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-primary);
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--color-primary);
  padding-left: var(--spacing-lg);
  margin: var(--spacing-xl) 0;
  background-color: var(--color-bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  font-style: italic;
  color: var(--color-text-secondary);
}

.markdown-content :deep(code) {
  background-color: var(--color-bg-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--color-primary);
}

.markdown-content :deep(pre) {
  background-color: var(--color-bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  overflow-x: auto;
  margin: var(--spacing-xl) 0;
  border: 1px solid var(--color-border-primary);
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
  color: var(--color-text-primary);
}

.markdown-content :deep(a) {
  color: var(--color-primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-fast);
}

.markdown-content :deep(a:hover) {
  border-bottom-color: var(--color-primary);
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--border-radius-md);
  margin: var(--spacing-lg) 0;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: var(--spacing-xl) 0;
  background-color: var(--color-bg-primary);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  padding: var(--spacing-md);
  text-align: left;
  border-bottom: 1px solid var(--color-border-primary);
}

.markdown-content :deep(th) {
  background-color: var(--color-bg-secondary);
  font-weight: 600;
  color: var(--color-text-primary);
}

.markdown-content :deep(hr) {
  border: none;
  height: 1px;
  background-color: var(--color-border-primary);
  margin: var(--spacing-2xl) 0;
}
</style>
