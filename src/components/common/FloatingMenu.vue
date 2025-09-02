<template>
  <div class="floating-menu-wrapper">
    <!-- 触发按钮 -->
    <button 
      class="floating-menu-trigger"
      :class="{ 'trigger-active': isMenuVisible }"
      @mouseenter="showMenu"
      @mouseleave="handleTriggerLeave"
      @click="toggleMenu"
      :aria-expanded="isMenuVisible"
      :aria-label="buttonText"
    >
      <span class="trigger-icon">{{ icon }}</span>
      <span class="trigger-text">{{ buttonText }}</span>
      <span class="trigger-arrow" :class="{ 'arrow-rotated': isMenuVisible }">▼</span>
    </button>
    
    <!-- 悬浮菜单 -->
    <div 
      v-if="isMenuVisible"
      class="floating-menu"
      :class="{ 'menu-visible': isMenuVisible }"
      @mouseenter="handleMenuEnter"
      @mouseleave="handleMenuLeave"
    >
      <div class="menu-header" v-if="showHeader">
        <h3 class="menu-title">{{ menuTitle }}</h3>
        <button 
          v-if="showCloseButton"
          class="menu-close"
          @click="hideMenu"
          aria-label="关闭菜单"
        >
          ✕
        </button>
      </div>
      
      <div class="menu-content">
        <slot name="menu-items">
          <!-- 默认菜单项 -->
          <div 
            v-for="item in menuItems" 
            :key="item.path"
            class="menu-item"
            :class="{ 'menu-item-active': isRouteActive(item.path) }"
            @click="handleItemClick(item)"
          >
            <span class="menu-item-icon">{{ item.icon }}</span>
            <div class="menu-item-info">
              <span class="menu-item-text">{{ item.text }}</span>
              <span v-if="item.description" class="menu-item-description">
                {{ item.description }}
              </span>
            </div>
          </div>
        </slot>
      </div>
      
      <div class="menu-footer" v-if="$slots['menu-footer']">
        <slot name="menu-footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatingMenu',
  props: {
    // 按钮文本
    buttonText: {
      type: String,
      default: '菜单'
    },
    // 按钮图标
    icon: {
      type: String,
      default: '☰'
    },
    // 菜单标题
    menuTitle: {
      type: String,
      default: '菜单'
    },
    // 是否显示头部
    showHeader: {
      type: Boolean,
      default: true
    },
    // 是否显示关闭按钮
    showCloseButton: {
      type: Boolean,
      default: false
    },
    // 菜单项数据
    menuItems: {
      type: Array,
      default: () => []
    },
    // 延迟隐藏时间（毫秒）
    hideDelay: {
      type: Number,
      default: 200
    },
    // 是否支持点击切换
    clickToggle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isMenuVisible: false,
      hideTimeout: null,
      isMenuHovered: false
    }
  },
  methods: {
    // 显示菜单
    showMenu() {
      this.isMenuVisible = true
      this.clearHideTimeout()
    },
    
    // 隐藏菜单
    hideMenu() {
      this.isMenuVisible = false
      this.isMenuHovered = false
    },
    
    // 切换菜单显示状态
    toggleMenu() {
      if (this.clickToggle) {
        this.isMenuVisible = !this.isMenuVisible
        if (!this.isMenuVisible) {
          this.isMenuHovered = false
        }
      }
    },
    
    // 处理触发按钮鼠标离开
    handleTriggerLeave() {
      this.hideTimeout = setTimeout(() => {
        if (!this.isMenuHovered) {
          this.hideMenu()
        }
      }, this.hideDelay)
    },
    
    // 处理菜单鼠标进入
    handleMenuEnter() {
      this.isMenuHovered = true
      this.clearHideTimeout()
    },
    
    // 处理菜单鼠标离开
    handleMenuLeave() {
      this.isMenuHovered = false
      this.hideTimeout = setTimeout(() => {
        this.hideMenu()
      }, this.hideDelay)
    },
    
    // 清除隐藏定时器
    clearHideTimeout() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout)
        this.hideTimeout = null
      }
    },
    
    // 处理菜单项点击
    handleItemClick(item) {
      if (item.path) {
        this.$router.push(item.path)
      }
      if (item.action && typeof item.action === 'function') {
        item.action(item)
      }
      this.hideMenu()
      this.$emit('item-click', item)
    },
    
    // 检查路由是否激活
    isRouteActive(path) {
      if (!path) return false
      if (path === '/') {
        return this.$route.path === '/'
      }
      return this.$route.path.startsWith(path)
    }
  },
  
  beforeUnmount() {
    this.clearHideTimeout()
  }
}
</script>

<style scoped>
.floating-menu-wrapper {
  position: relative;
  display: inline-block;
}

/* 触发按钮样式 */
.floating-menu-trigger {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  min-height: 40px;
}

.floating-menu-trigger:hover {
  background-color: var(--color-bg-hover);
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.floating-menu-trigger.trigger-active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.trigger-icon {
  font-size: var(--font-size-base);
}

.trigger-text {
  font-size: var(--font-size-sm);
}

.trigger-arrow {
  font-size: var(--font-size-xs);
  transition: transform var(--transition-normal);
  margin-left: var(--spacing-xs);
}

.trigger-arrow.arrow-rotated {
  transform: rotate(180deg);
}

/* 悬浮菜单样式 */
.floating-menu {
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
  /* 添加内边距防止鼠标移动时意外触发隐藏 */
  padding: var(--spacing-xs);
}

.menu-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* 菜单头部 */
.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border-primary);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.menu-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.menu-close {
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-close:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-hover);
}

/* 菜单内容 */
.menu-content {
  padding: var(--spacing-md);
  max-height: 400px;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  color: var(--color-text-primary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  border: 2px solid transparent;
  margin-bottom: var(--spacing-xs);
  min-height: 44px;
}

.menu-item:hover {
  background-color: var(--color-bg-hover);
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.menu-item.menu-item-active {
  background-color: rgba(76, 175, 80, 0.1);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.menu-item:last-child {
  margin-bottom: 0;
}

.menu-item-icon {
  font-size: var(--font-size-lg);
  width: 24px;
  text-align: center;
}

.menu-item-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  flex: 1;
}

.menu-item-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.menu-item-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

/* 菜单底部 */
.menu-footer {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border-primary);
  background: var(--color-bg-secondary);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}

/* 优化交互体验 - 创建无形的连接区域 */
.floating-menu::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  height: 10px;
  background: transparent;
}

.floating-menu::after {
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  width: 10px;
  height: 100%;
  background: transparent;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .floating-menu {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    max-width: 90vw;
    max-height: 80vh;
  }
  
  .menu-visible {
    transform: translate(-50%, -50%) scale(1);
  }
}

@media (max-width: 480px) {
  .floating-menu-trigger {
    padding: var(--spacing-xs) var(--spacing-sm);
    min-height: 36px;
  }
  
  .trigger-text {
    display: none;
  }
  
  .floating-menu {
    min-width: 250px;
  }
  
  .menu-content {
    padding: var(--spacing-sm);
  }
  
  .menu-item {
    padding: var(--spacing-sm);
    min-height: 40px;
  }
}

/* 动画效果 */
@keyframes menuFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.menu-visible {
  animation: menuFadeIn 0.2s ease-out forwards;
}
</style>
