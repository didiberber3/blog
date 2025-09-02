<template>
  <header class="header">
    <div class="header-container">
      <h1 class="logo">
        <router-link to="/">Didiberber</router-link>
      </h1>
      
      <!-- 目录导航区域 -->
      <div class="toc-section" v-if="showToc">
        <div class="toc-header">
          <h3 class="toc-title">📑 目录</h3>
          <button 
            class="toc-toggle" 
            @click="isTocExpanded = !isTocExpanded"
            :aria-expanded="isTocExpanded"
          >
            {{ isTocExpanded ? '收起' : '展开' }}
          </button>
        </div>
        
        <nav class="toc-nav" :class="{ 'toc-expanded': isTocExpanded }">
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
      
      <!-- 主导航区域 -->
      <nav class="nav">
        <!-- 菜单按钮 -->
        <div class="menu-container">
          <button 
            class="menu-trigger"
            @mouseenter="showMenu = true"
            @mouseleave="hideMenu"
          >
            <span class="menu-icon">☰</span>
            <span class="menu-text">菜单</span>
          </button>
          
          <!-- 二级菜单 -->
          <div 
            class="submenu"
            :class="{ 'submenu-visible': showMenu }"
            @mouseenter="showMenu = true"
            @mouseleave="hideMenu"
          >
            <router-link to="/" class="submenu-item">
              <span class="submenu-icon">🏠</span>
              首页
            </router-link>
            <router-link to="/articles" class="submenu-item">
              <span class="submenu-icon">📚</span>
              文章
            </router-link>
            <router-link to="/about" class="submenu-item">
              <span class="submenu-icon">ℹ️</span>
              关于
            </router-link>
            <div class="submenu-divider"></div>
            <div class="submenu-item theme-toggle-item">
              <span class="submenu-icon">🎨</span>
              主题切换
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import ThemeToggle from '../common/ThemeToggle.vue'

export default {
  name: 'Header',
  components: {
    ThemeToggle
  },
  props: {
    // 是否显示目录导航
    showToc: {
      type: Boolean,
      default: false
    },
    // 文章内容（用于生成目录）
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showMenu: false,
      isTocExpanded: false,
      headings: [],
      activeHeading: null,
      observer: null
    }
  },
  mounted() {
    if (this.showToc && this.content) {
      this.generateHeadings()
      this.setupIntersectionObserver()
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    hideMenu() {
      // 延迟隐藏，给用户时间移动到子菜单
      setTimeout(() => {
        this.showMenu = false
      }, 100)
    },
    
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
        if (this.showToc) {
          this.generateHeadings()
          this.$nextTick(() => {
            this.setupIntersectionObserver()
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.header {
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-primary);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
}

.header-container {
  max-width: var(--container-max-width-wide);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  gap: var(--spacing-lg);
}

.logo {
  margin: 0;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.logo a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-normal);
}

.logo a:hover {
  color: var(--color-primary-dark);
}

.logo a:active {
  transform: scale(0.95);
}

/* 目录导航样式 */
.toc-section {
  flex: 1;
  max-width: 600px;
  margin: 0 var(--spacing-lg);
}

.toc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.toc-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.toc-toggle {
  background: none;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-sm);
  padding: 2px var(--spacing-xs);
  font-size: var(--font-size-xs);
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
  max-height: 200px;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.toc-item {
  margin: 0;
}

.toc-link {
  display: inline-block;
  padding: 2px var(--spacing-xs);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);
  font-size: var(--font-size-xs);
  white-space: nowrap;
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
.toc-level-2 { margin-left: var(--spacing-xs); }
.toc-level-3 { margin-left: calc(var(--spacing-xs) * 2); }

/* 主导航样式 */
.nav {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

/* 菜单容器 */
.menu-container {
  position: relative;
}

.menu-trigger {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.menu-trigger:hover {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: scale(1.05);
  box-shadow: var(--shadow-sm);
}

.menu-icon {
  font-size: var(--font-size-lg);
}

.menu-text {
  font-size: var(--font-size-sm);
}

/* 二级菜单 */
.submenu {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all var(--transition-normal);
  z-index: 1000;
  margin-top: var(--spacing-xs);
}

.submenu-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.submenu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: all var(--transition-normal);
  border-bottom: 1px solid var(--color-border-primary);
}

.submenu-item:last-child {
  border-bottom: none;
}

.submenu-item:hover {
  background-color: var(--color-bg-hover);
  color: var(--color-primary);
}

.submenu-icon {
  font-size: var(--font-size-lg);
  width: 20px;
  text-align: center;
}

.submenu-divider {
  height: 1px;
  background-color: var(--color-border-primary);
  margin: var(--spacing-xs) 0;
}

.theme-toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-container {
    padding: 0 var(--spacing-lg);
    flex-wrap: wrap;
    height: auto;
    min-height: 60px;
    gap: var(--spacing-md);
  }
  
  .toc-section {
    order: 3;
    max-width: 100%;
    margin: 0;
    width: 100%;
  }
  
  .toc-nav.toc-expanded {
    max-height: 150px;
  }
  
  .toc-list {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
  
  .toc-item {
    margin: 0;
  }
  
  .submenu {
    right: auto;
    left: 0;
    min-width: 200px;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: var(--font-size-xl);
  }
  
  .menu-text {
    display: none;
  }
  
  .menu-trigger {
    padding: var(--spacing-sm);
  }
}
</style>
