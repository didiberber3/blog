<template>
  <header class="header">
    <div class="header-container">
      <h1 class="logo">
        <router-link to="/">Didiberber</router-link>
      </h1>
      
      <!-- 主导航区域 -->
      <nav class="nav">
        <!-- 菜单按钮 -->
        <div 
          class="menu-container"
          @mouseenter="showMenu = true"
          @mouseleave="hideMenu"
        >
          <button class="menu-trigger">
            <span class="menu-icon">☰</span>
            <span class="menu-text">菜单</span>
          </button>
          
          <!-- 二级菜单 -->
          <div 
            class="submenu"
            :class="{ 'submenu-visible': showMenu }"
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
  name: 'HeaderSimple',
  components: {
    ThemeToggle
  },
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    hideMenu() {
      setTimeout(() => {
        this.showMenu = false
      }, 300)
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
}

.logo {
  margin: 0;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}

.logo a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-normal);
}

.logo a:hover {
  color: var(--color-primary-dark);
}

.nav {
  display: flex;
  align-items: center;
}

/* 菜单容器 */
.menu-container {
  position: relative;
  /* 关键：添加底部padding确保悬停区域连续 */
  padding-bottom: 20px;
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
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all var(--transition-normal);
  z-index: 1000;
  padding: var(--spacing-sm);
  /* 关键：确保菜单在悬停区域内 */
  margin-top: -20px;
}

.submenu-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.submenu-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-lg) var(--spacing-xl);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: all var(--transition-normal);
  border: 2px solid transparent;
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-sm);
}

.submenu-item:last-child {
  margin-bottom: 0;
}

.submenu-item:hover {
  background-color: var(--color-bg-tertiary);
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.submenu-item:active {
  transform: scale(0.95) translateY(-2px);
}

.submenu-icon {
  font-size: 1.75rem;
  margin-right: var(--spacing-base);
}

.submenu-divider {
  height: 1px;
  background-color: var(--color-border-primary);
  margin: var(--spacing-sm) 0;
}

.theme-toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .submenu {
    right: auto;
    left: 0;
    min-width: 220px;
  }
}

@media (max-width: 480px) {
  .menu-text {
    display: none;
  }
  
  .menu-trigger {
    padding: var(--spacing-sm);
  }
}
</style>
