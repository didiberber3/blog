<template>
  <div class="toc-container" v-if="headings.length > 0">
    <div class="toc-header">
      <h3 class="toc-title">📑 目录导航</h3>
      <button 
        class="toc-toggle" 
        @click="isExpanded = !isExpanded"
        :aria-expanded="isExpanded"
      >
        {{ isExpanded ? '收起' : '展开' }}
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
          >
            {{ heading.text }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TableOfContents',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      headings: [],
      activeHeading: null,
      isExpanded: false,
      observer: null
    }
  },
  mounted() {
    this.generateHeadings()
    this.setupIntersectionObserver()
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
.toc-container {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  position: sticky;
  top: var(--spacing-xl);
}

.toc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border-primary);
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
}

.toc-toggle:hover {
  background-color: var(--color-bg-hover);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.toc-nav {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-normal);
}

.toc-nav.toc-expanded {
  max-height: 500px;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: var(--spacing-xs);
}

.toc-link {
  display: block;
  padding: var(--spacing-xs) var(--spacing-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);
  font-size: var(--font-size-sm);
}

.toc-link:hover {
  color: var(--color-primary);
  background-color: var(--color-bg-hover);
}

.toc-item.toc-active .toc-link {
  color: var(--color-primary);
  background-color: rgba(76, 175, 80, 0.1);
  font-weight: var(--font-weight-medium);
}

/* 不同级别的缩进 */
.toc-level-1 { margin-left: 0; }
.toc-level-2 { margin-left: var(--spacing-md); }
.toc-level-3 { margin-left: calc(var(--spacing-md) * 2); }
.toc-level-4 { margin-left: calc(var(--spacing-md) * 3); }
.toc-level-5 { margin-left: calc(var(--spacing-md) * 4); }
.toc-level-6 { margin-left: calc(var(--spacing-md) * 5); }

/* 响应式设计 */
@media (max-width: 768px) {
  .toc-container {
    position: static;
    margin-bottom: var(--spacing-lg);
  }
  
  .toc-nav.toc-expanded {
    max-height: 300px;
  }
}
</style>
