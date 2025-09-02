<template>
  <nav class="navigation-menu">
    <!-- 桌面端导航 -->
    <div class="desktop-nav">
      <div 
        v-for="item in sortedMenuItems" 
        :key="item.path"
        class="nav-item-wrapper"
        @mouseenter="handleMouseEnter(item.path)"
        @mouseleave="handleMouseLeave(item.path)"
      >
        <router-link 
          :to="item.path" 
          class="nav-item"
          :class="{ 'nav-active': isRouteActive(item.path) }"
          :title="item.description"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-text">{{ item.text }}</span>
          <span v-if="item.submenu" class="nav-arrow">▼</span>
        </router-link>
        
        <!-- PC端二级菜单 -->
        <div 
          v-if="item.submenu && activeSubmenu === item.path"
          class="submenu"
          :class="{ 'submenu-visible': activeSubmenu === item.path }"
          @mouseenter="handleSubmenuMouseEnter(item.path)"
          @mouseleave="handleSubmenuMouseLeave(item.path)"
        >
          <div class="submenu-content">
            <router-link 
              v-for="subItem in item.submenu" 
              :key="subItem.path"
              :to="subItem.path" 
              class="submenu-item"
              :class="{ 'submenu-active': isRouteActive(subItem.path) }"
              @click="hideSubmenu(item.path)"
            >
              <span class="submenu-icon">{{ subItem.icon }}</span>
              <div class="submenu-info">
                <span class="submenu-text">{{ subItem.text }}</span>
                <span class="submenu-description">{{ subItem.description }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
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
        <div 
          v-for="item in sortedMenuItems" 
          :key="item.path"
          class="mobile-nav-section"
        >
          <!-- 主菜单项 -->
          <router-link 
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
          
          <!-- 移动端二级菜单 -->
          <div 
            v-if="item.submenu && item.submenu.length > 0"
            class="mobile-submenu"
          >
            <div 
              v-for="subItem in item.submenu" 
              :key="subItem.path"
              class="mobile-submenu-item"
            >
              <router-link 
                :to="subItem.path" 
                class="mobile-submenu-link"
                :class="{ 'mobile-submenu-active': isRouteActive(subItem.path) }"
                @click="closeMobileMenu"
              >
                <span class="mobile-submenu-icon">{{ subItem.icon }}</span>
                <div class="mobile-submenu-info">
                  <span class="mobile-submenu-text">{{ subItem.text }}</span>
                  <span class="mobile-submenu-description">{{ subItem.description }}</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
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
      isMobileMenuOpen: false,
      activeSubmenu: null,
      submenuTimeout: null,
      submenuHoverTimeout: null,
      isSubmenuHovered: false
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
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : ''
    },
    
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      document.body.style.overflow = ''
    },
    
    isRouteActive(menuPath) {
      return isRouteActive(menuPath, this.$route.path)
    },
    
    // 鼠标进入主菜单项
    handleMouseEnter(path) {
      if (this.submenuTimeout) {
        clearTimeout(this.submenuTimeout)
      }
      if (this.submenuHoverTimeout) {
        clearTimeout(this.submenuHoverTimeout)
      }
      this.activeSubmenu = path
      this.isSubmenuHovered = false
    },
    
    // 鼠标离开主菜单项
    handleMouseLeave(path) {
      // 延迟隐藏，给用户时间移动到子菜单
      this.submenuTimeout = setTimeout(() => {
        if (!this.isSubmenuHovered && this.activeSubmenu === path) {
          this.activeSubmenu = null
        }
      }, 200) // 增加延迟时间到200ms
    },
    
    // 鼠标进入子菜单
    handleSubmenuMouseEnter(path) {
      this.isSubmenuHovered = true
      if (this.submenuTimeout) {
        clearTimeout(this.submenuTimeout)
      }
      if (this.submenuHoverTimeout) {
        clearTimeout(this.submenuHoverTimeout)
      }
    },
    
    // 鼠标离开子菜单
    handleSubmenuMouseLeave(path) {
      this.isSubmenuHovered = false
      // 延迟隐藏子菜单
      this.submenuHoverTimeout = setTimeout(() => {
        if (this.activeSubmenu === path) {
          this.activeSubmenu = null
        }
      }, 150)
    },
    
    // 隐藏子菜单
    hideSubmenu(path) {
      this.activeSubmenu = null
      this.isSubmenuHovered = false
    }
  },
  
  watch: {
    $route() {
      this.closeMobileMenu()
      this.activeSubmenu = null
      this.isSubmenuHovered = false
    }
  },
  
  beforeUnmount() {
    document.body.style.overflow = ''
    if (this.submenuTimeout) {
      clearTimeout(this.submenuTimeout)
    }
    if (this.submenuHoverTimeout) {
      clearTimeout(this.submenuHoverTimeout)
    }
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

.nav-item-wrapper {
  position: relative;
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

.nav-arrow {
  font-size: var(--font-size-xs);
  margin-left: var(--spacing-xs);
  transition: transform var(--transition-normal);
}

.nav-item:hover .nav-arrow {
  transform: rotate(180deg);
}

/* PC端二级菜单 - 优化定位和交互 */
.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 280px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all var(--transition-normal);
  z-index: 1000;
  margin-top: var(--spacing-xs);
  /* 添加一个小的内边距，防止鼠标移动时意外触发隐藏 */
  padding: var(--spacing-xs);
}

.submenu-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.submenu-content {
  padding: var(--spacing-md);
  /* 确保内容区域有足够的空间 */
  min-height: 20px;
}

.submenu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  color: var(--color-text-primary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  border: 2px solid transparent;
  margin-bottom: var(--spacing-xs);
  /* 增加可点击区域 */
  min-height: 44px;
}

.submenu-item:hover {
  background-color: var(--color-bg-hover);
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.submenu-item.submenu-active {
  background-color: rgba(76, 175, 80, 0.1);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.submenu-item:last-child {
  margin-bottom: 0;
}

.submenu-icon {
  font-size: var(--font-size-lg);
  width: 24px;
  text-align: center;
}

.submenu-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.submenu-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.submenu-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
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

.mobile-nav-section {
  margin-bottom: var(--spacing-lg);
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

/* 移动端二级菜单 - 大幅提升可读性 */
.mobile-submenu {
  margin-left: var(--spacing-lg);
  margin-top: var(--spacing-sm);
  padding-left: var(--spacing-md);
  border-left: 2px solid var(--color-border-primary);
}

.mobile-submenu-item {
  margin-bottom: var(--spacing-sm);
}

.mobile-submenu-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);
  border: 1px solid transparent;
  background-color: var(--color-bg-tertiary);
  font-size: var(--font-size-sm);
}

.mobile-submenu-link:hover {
  background-color: var(--color-bg-hover);
  border-color: var(--color-primary);
  color: var(--color-text-primary);
  transform: translateX(4px);
}

.mobile-submenu-link.mobile-submenu-active {
  background-color: rgba(76, 175, 80, 0.1);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.mobile-submenu-icon {
  font-size: var(--font-size-base);
  width: 20px;
  text-align: center;
}

.mobile-submenu-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.mobile-submenu-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.mobile-submenu-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  line-height: var(--line-height-normal);
}

/* 快速链接 */
.mobile-quick-links {
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  border-top: 1px solid var(--color-border-primary);
  margin-top: var(--spacing-md);
}

.quick-links-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-sm) 0;
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
  padding: var(--spacing-sm);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: all var(--transition-normal);
  border: 1px solid transparent;
}

.quick-link-item:hover {
  background-color: var(--color-bg-tertiary);
  border-color: var(--color-primary);
  transform: translateY(-1px);
}

.quick-link-icon {
  font-size: var(--font-size-base);
}

.quick-link-text {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

/* 面包屑导航 */
.breadcrumb-nav {
  display: none;
  margin-top: var(--spacing-sm);
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
  font-size: var(--font-size-xs);
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
  font-size: var(--font-size-xs);
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
  
  .mobile-submenu {
    margin-left: var(--spacing-md);
    padding-left: var(--spacing-sm);
  }
  
  .mobile-submenu-link {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-xs);
  }
  
  .mobile-submenu-icon {
    font-size: var(--font-size-sm);
    width: 18px;
  }
  
  .mobile-submenu-text {
    font-size: var(--font-size-xs);
  }
  
  .mobile-submenu-description {
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

/* 优化二级菜单的交互体验 */
.submenu::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  height: 10px;
  background: transparent;
}

.submenu::after {
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  width: 10px;
  height: 100%;
  background: transparent;
}
</style>
