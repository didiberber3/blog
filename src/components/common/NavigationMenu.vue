<template>
  <nav class="navigation-menu">
    <!-- 桌面端导航 -->
    <div class="desktop-nav">
      <router-link 
        v-for="item in sortedMenuItems" 
        :key="item.path"
        :to="item.path" 
        class="nav-item"
        :class="{ 'nav-active': isRouteActive(item.path) }"
        :title="item.description"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-text">{{ item.text }}</span>
      </router-link>
    </div>
    
    <!-- 移动端菜单按钮 -->
    <button 
      class="mobile-menu-btn"
      @click="toggleMobileMenu"
      :aria-expanded="isMobileMenuOpen"
      :aria-label="isMobileMenuOpen ? '关闭菜单' : '打开菜单'"
    >
      <span class="menu-icon">{{ isMobileMenuOpen ? '✕' : '☰' }}</span>
    </button>
    
    <!-- 移动端菜单 -->
    <div 
      class="mobile-menu"
      :class="{ 'mobile-menu-open': isMobileMenuOpen }"
    >
      <div class="mobile-menu-header">
        <h3 class="mobile-menu-title">导航菜单</h3>
        <button 
          class="mobile-menu-close"
          @click="closeMobileMenu"
          aria-label="关闭菜单"
        >
          ✕
        </button>
      </div>
      
      <div class="mobile-menu-content">
        <router-link 
          v-for="item in sortedMenuItems" 
          :key="item.path"
          :to="item.path" 
          class="mobile-nav-item"
          :class="{ 'mobile-nav-active': isRouteActive(item.path) }"
          @click="closeMobileMenu"
        >
          <span class="mobile-nav-icon">{{ item.icon }}</span>
          <div class="mobile-nav-info">
            <span class="mobile-nav-text">{{ item.text }}</span>
            <span class="mobile-nav-description">{{ item.description }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { getSortedMenuItems, isRouteActive } from '../../config/menu.js'

export default {
  name: 'NavigationMenu',
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  computed: {
    sortedMenuItems() {
      return getSortedMenuItems('main')
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : ''
    },
    
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      document.body.style.overflow = ''
    },
    
    isRouteActive(menuPath) {
      return isRouteActive(menuPath, this.$route.path)
    }
  },
  
  watch: {
    $route() {
      this.closeMobileMenu()
    }
  },
  
  beforeUnmount() {
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.navigation-menu {
  position: relative;
}

/* 桌面端导航 */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  border: 2px solid transparent;
  font-weight: var(--font-weight-medium);
  position: relative;
  font-size: var(--font-size-sm);
}

.nav-item:hover {
  color: var(--color-primary);
  background-color: var(--color-bg-hover);
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.nav-item.nav-active {
  color: var(--color-primary);
  background-color: rgba(76, 175, 80, 0.1);
  border-color: var(--color-primary);
}

.nav-icon {
  font-size: var(--font-size-base);
}

.nav-text {
  font-size: var(--font-size-sm);
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.mobile-menu-btn:hover {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.mobile-menu-btn:active {
  transform: scale(0.95);
}

.menu-icon {
  font-size: var(--font-size-base);
}

/* 移动端菜单 */
.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-bg-primary);
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform var(--transition-normal);
  overflow-y: auto;
  width: 100%;
  height: 100vh;
}

.mobile-menu-open {
  transform: translateX(0);
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-primary);
  background: var(--color-bg-secondary);
  position: sticky;
  top: 0;
  z-index: 1001;
}

.mobile-menu-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.mobile-menu-close {
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-close:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-hover);
}

.mobile-menu-content {
  padding: var(--spacing-lg);
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  color: var(--color-text-primary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  border: 2px solid transparent;
  background-color: var(--color-bg-secondary);
  margin-bottom: var(--spacing-sm);
}

.mobile-nav-item:hover {
  background-color: var(--color-bg-tertiary);
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.mobile-nav-item.mobile-nav-active {
  background-color: rgba(76, 175, 80, 0.1);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.mobile-nav-icon {
  font-size: var(--font-size-lg);
}

.mobile-nav-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.mobile-nav-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}

.mobile-nav-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .mobile-menu {
    display: block;
  }
}

@media (max-width: 480px) {
  .mobile-menu-btn {
    width: 28px;
    height: 28px;
  }
  
  .menu-icon {
    font-size: var(--font-size-sm);
  }
  
  .mobile-menu-header {
    padding: var(--spacing-md);
  }
  
  .mobile-menu-content {
    padding: var(--spacing-md);
  }
  
  .mobile-nav-item {
    padding: var(--spacing-sm);
  }
  
  .mobile-nav-icon {
    font-size: var(--font-size-base);
  }
  
  .mobile-nav-text {
    font-size: var(--font-size-sm);
  }
  
  .mobile-nav-description {
    font-size: var(--font-size-xs);
  }
}

/* 动画效果 */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.mobile-menu-open {
  animation: slideIn var(--transition-normal) forwards;
}

.mobile-menu:not(.mobile-menu-open) {
  animation: slideOut var(--transition-normal) forwards;
}
</style>
