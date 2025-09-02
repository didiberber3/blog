<template>
  <div class="tech-stack-component">
    <h3 class="tech-title">{{ title }}</h3>
    <div class="tech-grid">
      <div 
        v-for="tech in technologies" 
        :key="tech.name"
        class="tech-item"
        :class="{ 'tech-item-featured': tech.featured }"
        :title="tech.description"
      >
        <div class="tech-icon">{{ tech.icon }}</div>
        <div class="tech-info">
          <div class="tech-name">{{ tech.name }}</div>
          <div class="tech-version" v-if="tech.version">{{ tech.version }}</div>
        </div>
        <div class="tech-badge" v-if="tech.badge">{{ tech.badge }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechStack',
  props: {
    title: {
      type: String,
      default: '技术栈'
    },
    technologies: {
      type: Array,
      default: () => [
        {
          name: 'Vue.js',
          version: '3.x',
          icon: '⚡',
          description: '渐进式JavaScript框架',
          featured: true,
          badge: '核心'
        },
        {
          name: 'Vite',
          version: '5.x',
          icon: '🚀',
          description: '下一代前端构建工具',
          featured: true,
          badge: '构建'
        },
        {
          name: 'Vue Router',
          version: '4.x',
          icon: '🧭',
          description: 'Vue.js官方路由管理器',
          featured: false
        },
        {
          name: 'Markdown-it',
          version: '14.x',
          icon: '📝',
          description: 'Markdown解析器',
          featured: false
        },
        {
          name: 'Highlight.js',
          version: '11.x',
          icon: '✨',
          description: '代码语法高亮库',
          featured: false
        },
        {
          name: 'CSS3',
          version: '现代',
          icon: '🎨',
          description: '层叠样式表',
          featured: false
        },
        {
          name: 'ES6+',
          version: '现代',
          icon: '🔧',
          description: '现代JavaScript特性',
          featured: false
        },
        {
          name: 'Composition API',
          version: 'Vue 3',
          icon: '🧩',
          description: 'Vue 3组合式API',
          featured: true,
          badge: '新特性'
        }
      ]
    }
  }
}
</script>

<style scoped>
.tech-stack-component {
  padding: var(--spacing-lg);
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-primary);
}

.tech-title {
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-lg) 0;
  text-align: center;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: var(--spacing-sm);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.tech-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.tech-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
}

.tech-item-featured {
  border-color: var(--color-primary);
  background-color: var(--color-bg-primary);
}

.tech-item-featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
}

.tech-icon {
  font-size: var(--font-size-2xl);
  min-width: 40px;
  text-align: center;
}

.tech-info {
  flex: 1;
  min-width: 0;
}

.tech-name {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tech-version {
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  opacity: 0.8;
}

.tech-badge {
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  background-color: var(--color-primary);
  color: white;
  font-size: var(--font-size-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-medium);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tech-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-sm);
  }
  
  .tech-item {
    padding: var(--spacing-sm);
  }
  
  .tech-icon {
    font-size: var(--font-size-xl);
    min-width: 32px;
  }
  
  .tech-name {
    font-size: var(--font-size-xs);
  }
  
  .tech-version {
    font-size: var(--font-size-xs);
  }
}

@media (max-width: 480px) {
  .tech-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-stack-component {
    padding: var(--spacing-md);
  }
}
</style>
