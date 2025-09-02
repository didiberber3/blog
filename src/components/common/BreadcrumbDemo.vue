<template>
  <div class="breadcrumb-demo">
    <h3 class="demo-title">🍞 面包屑导航演示</h3>
    
    <div class="demo-section">
      <h4>当前路径：{{ currentPath }}</h4>
      
      <nav class="breadcrumb-nav">
        <router-link 
          v-for="(crumb, index) in breadcrumbs" 
          :key="crumb.path"
          :to="crumb.path" 
          class="breadcrumb-item"
          :class="{ 'breadcrumb-active': index === breadcrumbs.length - 1 }"
        >
          <span class="breadcrumb-icon">{{ crumb.icon }}</span>
          <span class="breadcrumb-text">{{ crumb.text }}</span>
          <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">/</span>
        </router-link>
      </nav>
    </div>
    
    <div class="demo-section">
      <h4>面包屑数据</h4>
      <pre class="breadcrumb-data">{{ JSON.stringify(breadcrumbs, null, 2) }}</pre>
    </div>
    
    <div class="demo-section">
      <h4>测试导航</h4>
      <div class="test-links">
        <router-link to="/" class="test-link">🏠 首页</router-link>
        <router-link to="/articles" class="test-link">📚 文章列表</router-link>
        <router-link to="/about" class="test-link">ℹ️ 关于页面</router-link>
        <router-link to="/article/test" class="test-link">📄 测试文章</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getBreadcrumbs } from '../../config/menu.js'

export default {
  name: 'BreadcrumbDemo',
  computed: {
    currentPath() {
      return this.$route.path
    },
    
    breadcrumbs() {
      return getBreadcrumbs(this.$route.path)
    }
  }
}
</script>

<style scoped>
.breadcrumb-demo {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.demo-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-lg) 0;
  text-align: center;
}

.demo-section {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-primary);
}

.demo-section h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-md) 0;
}

/* 面包屑导航样式 */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color var(--transition-normal);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
}

.breadcrumb-item:hover {
  color: var(--color-primary);
  background-color: var(--color-bg-hover);
}

.breadcrumb-item.breadcrumb-active {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  background-color: rgba(76, 175, 80, 0.1);
}

.breadcrumb-icon {
  font-size: var(--font-size-sm);
}

.breadcrumb-separator {
  color: var(--color-text-muted);
  margin-left: var(--spacing-xs);
  font-weight: var(--font-weight-bold);
}

/* 面包屑数据显示 */
.breadcrumb-data {
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

/* 测试链接 */
.test-links {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.test-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: all var(--transition-normal);
  font-size: var(--font-size-sm);
}

.test-link:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .breadcrumb-demo {
    padding: var(--spacing-lg);
  }
  
  .test-links {
    flex-direction: column;
  }
  
  .test-link {
    text-align: center;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .breadcrumb-demo {
    padding: var(--spacing-md);
  }
  
  .demo-title {
    font-size: var(--font-size-lg);
  }
  
  .breadcrumb-nav {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
  
  .breadcrumb-separator {
    display: none;
  }
}
</style>
