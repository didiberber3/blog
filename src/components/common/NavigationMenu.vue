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
      
      <!-- 快速链接 -->
      <div class="mobile-quick-links" v-if="quickLinks.length > 0">
        <h4 class="quick-links-title">快速链接</h4>
        <div class="quick-links-grid">
          <router-link 
            v-for="link in quickLinks" 
            :key="link.path"
            :to="link.path" 
            class="quick-link-item"
            @click="closeMobileMenu"
          >
            <span class="quick-link-icon">{{ link.icon }}</span>
            <span class="quick-link-text">{{ link.text }}</span>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- 面包屑导航 -->
    <div class="breadcrumb-nav" v-if="showBreadcrumb">
      <nav class="breadcrumb-list">
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
  </nav>
</template>

<script>
import { getSortedMenuItems, getBreadcrumbs, isRouteActive } from '../../config/menu.js'

export default {
  name: 'NavigationMenu',
  props: {
    showBreadcrumb: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  computed: {
    sortedMenuItems() {
      return getSortedMenuItems('main')
    },
    
    quickLinks() {
      return getSortedMenuItems('quick')
    },
    
    breadcrumbs() {
      return getBreadcrumbs(this.$route.path)
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      // 切换body滚动
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
  
  // 监听路由变化，自动关闭移动端菜单
  watch: {
    $route() {
      this.closeMobileMenu()
    }
  },
  
  // 组件销毁时恢复body滚动
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
  gap: var(--spacing-md);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  border: 2px solid transparent;
  font-weight: var(--font-weight-medium);
  position: relative;
}

.nav-item:hover {
  color: var(--color-primary);
  background-color: var(--color-bg-hover);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.nav-item.nav-active {
  color: var(--color-primary);
  background-color: rgba(76, 175, 80, 0.1);
  border-color: var(--color-primary);
}

.nav-icon {
  font-size: var(--font-size-lg);
}

.nav-text {
  font-size: var(--font-size-sm);
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
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
  font-size: var(--font-size-lg);
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
}

.mobile-menu-open {
  transform: translateX(0);
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border-primary);
  background: var(--color-bg-secondary);
}

.mobile-menu-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.mobile-menu-close {
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);
}

.mobile-menu-close:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-hover);
}

.mobile-menu-content {
  padding: var(--spacing-xl);
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  color: var(--color-text-primary);
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
  border: 2px solid transparent;
  background-color: var(--color-bg-secondary);
  margin-bottom: var(--spacing-md);
}

.mobile-nav-item:hover {
  background-color: var(--color-bg-tertiary);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.mobile-nav-item.mobile-nav-active {
  background-color: rgba(76, 175, 80, 0.1);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.mobile-nav-item:last-child {
  margin-bottom: 0;
}

.mobile-nav-icon {
  font-size: var(--font-size-2xl);
}

.mobile-nav-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.mobile-nav-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
}

.mobile-nav-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* 快速链接 */
.mobile-quick-links {
  padding: 0 var(--spacing-xl) var(--spacing-xl);
  border-top: 1px solid var(--color-border-primary);
  margin-top: var(--spacing-lg);
}

.quick-links-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-md) 0;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.quick-link-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: all var(--transition-normal);
  border: 2px solid transparent;
}

.quick-link-item:hover {
  background-color: var(--color-bg-tertiary);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.quick-link-icon {
  font-size: var(--font-size-lg);
}

.quick-link-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

/* 面包屑导航 */
.breadcrumb-nav {
  display: none;
  margin-top: var(--spacing-md);
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color var(--transition-normal);
}

.breadcrumb-item:hover {
  color: var(--color-primary);
}

.breadcrumb-item.breadcrumb-active {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.breadcrumb-icon {
  font-size: var(--font-size-sm);
}

.breadcrumb-separator {
  color: var(--color-text-muted);
  margin-left: var(--spacing-xs);
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
  
  .breadcrumb-nav {
    display: block;
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
