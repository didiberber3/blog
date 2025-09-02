<template>
  <div class="article-toc" v-if="headings.length > 0">
    <div class="toc-header">
      <h3 class="toc-title">📑 目录导航</h3>
      <button 
        class="toc-toggle" 
        @click="isExpanded = !isExpanded"
        :aria-expanded="isExpanded"
        :title="isExpanded ? '收起目录' : '展开目录'"
      >
        <span class="toc-toggle-icon">{{ isExpanded ? '▼' : '▶' }}</span>
      </button>
    </div>
    
    <nav class="toc-nav" :class="{ 'toc-expanded': isExpanded }">
      <ul class="toc-list">
        <li 
          v-for="heading in headings" 
          :key="heading.id"
          :class="[
            'toc-item',
            `toc-level-${heading.level}`,
            { 'toc-active': activeHeading === heading.id }
          ]"
        >
          <a 
            :href="`#${heading.id}`"
            class="toc-link"
            @click="scrollToHeading(heading.id)"
            :title="heading.text"
          >
            <span class="toc-link-text">{{ heading.text }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'ArticleToc',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isExpanded: true,
      headings: [],
      activeHeading: null,
      observer: null
    }
  },
  mounted() {
    this.generateHeadings()
    this.$nextTick(() => {
      this.setupIntersectionObserver()
    })
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    generateHeadings() {
      if (!this.content) return
      
      // 使用正则表达式匹配Markdown标题
      const headingRegex = /^(#{1,6})\s+(.+)$/gm
      const headings = []
      let match
      
      while ((match = headingRegex.exec(this.content)) !== null) {
        const level = match[1].length
        const text = match[2].trim()
        const id = this.generateId(text)
        
        headings.push({
          level,
          text,
          id
        })
      }
      
      this.headings = headings
    },
    
    generateId(text) {
      return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    },
    
    setupIntersectionObserver() {
      if (!('IntersectionObserver' in window)) return
      
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.activeHeading = entry.target.id
            }
          })
        },
        {
          rootMargin: '-20% 0px -80% 0px',
          threshold: 0
        }
      )
      
      // 观察所有标题元素
      this.headings.forEach(heading => {
        const element = document.getElementById(heading.id)
        if (element) {
          this.observer.observe(element)
        }
      })
    },
    
    scrollToHeading(id) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  },
  
  watch: {
    content: {
      handler() {
        this.generateHeadings()
        this.$nextTick(() => {
          this.setupIntersectionObserver()
        })
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.article-toc {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  box-shadow: var(--shadow-sm);
}

.toc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.toc-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.toc-toggle {
  background: none;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 28px;
}

.toc-toggle:hover {
  background-color: var(--color-bg-hover);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.toc-toggle-icon {
  font-size: var(--font-size-xs);
  transition: transform var(--transition-normal);
}

.toc-nav {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-normal);
}

.toc-nav.toc-expanded {
  max-height: 400px;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.toc-item {
  margin: 0;
}

.toc-link {
  display: block;
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  border: 2px solid transparent;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
}

.toc-link:hover {
  color: var(--color-primary);
  background-color: var(--color-bg-hover);
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.toc-item.toc-active .toc-link {
  color: var(--color-primary);
  background-color: rgba(76, 175, 80, 0.1);
  border-color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.toc-link-text {
  display: block;
  word-break: break-word;
}

/* 不同级别的缩进和样式 */
.toc-level-1 { 
  margin-left: 0; 
  font-weight: var(--font-weight-semibold);
}

.toc-level-2 { 
  margin-left: var(--spacing-md); 
  font-weight: var(--font-weight-medium);
}

.toc-level-3 { 
  margin-left: calc(var(--spacing-md) * 2); 
  font-weight: var(--font-weight-normal);
}

.toc-level-4 { 
  margin-left: calc(var(--spacing-md) * 3); 
  font-weight: var(--font-weight-normal);
}

.toc-level-5 { 
  margin-left: calc(var(--spacing-md) * 4); 
  font-weight: var(--font-weight-normal);
}

.toc-level-6 { 
  margin-left: calc(var(--spacing-md) * 5); 
  font-weight: var(--font-weight-normal);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-toc {
    margin: 0 calc(-1 * var(--spacing-lg)) var(--spacing-2xl);
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
  
  .toc-nav.toc-expanded {
    max-height: 300px;
  }
}

@media (max-width: 480px) {
  .article-toc {
    padding: var(--spacing-md);
    margin: 0 calc(-1 * var(--spacing-md)) var(--spacing-xl);
  }
  
  .toc-title {
    font-size: var(--font-size-base);
  }
  
  .toc-link {
    font-size: var(--font-size-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}
</style>
