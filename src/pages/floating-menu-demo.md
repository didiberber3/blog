# 🎯 悬浮菜单演示页面

这个页面展示了如何实现和使用带有二级悬浮菜单的导航按钮。

## ✨ 主要特性

### 1. 智能延迟隐藏
- 鼠标离开按钮后，菜单不会立即消失
- 给用户足够时间移动到子菜单
- 可配置的延迟时间

### 2. 无缝交互体验
- 鼠标从按钮移动到菜单时不会触发隐藏
- 创建无形的连接区域，防止意外隐藏
- 支持键盘导航和屏幕阅读器

### 3. 响应式设计
- 桌面端：悬浮定位
- 移动端：居中弹窗
- 自适应不同屏幕尺寸

## 🚀 使用方法

### 基础用法

```vue
<template>
  <FloatingMenu 
    button-text="更多选项"
    icon="⚙️"
    :menu-items="menuItems"
    @item-click="handleItemClick"
  />
</template>

<script>
import FloatingMenu from '@/components/common/FloatingMenu.vue'

export default {
  components: {
    FloatingMenu
  },
  data() {
    return {
      menuItems: [
        {
          path: '/settings',
          text: '设置',
          icon: '⚙️',
          description: '系统设置'
        },
        {
          path: '/profile',
          text: '个人资料',
          icon: '👤',
          description: '查看和编辑个人资料'
        }
      ]
    }
  },
  methods: {
    handleItemClick(item) {
      console.log('点击了菜单项:', item)
    }
  }
}
</script>
```

### 高级配置

```vue
<template>
  <FloatingMenu 
    button-text="用户菜单"
    icon="👤"
    menu-title="用户中心"
    :show-close-button="true"
    :hide-delay="300"
    :click-toggle="false"
    @item-click="handleUserAction"
  >
    <!-- 自定义菜单内容 -->
    <template #menu-items>
      <div class="custom-menu-item">
        <span>🎨 主题切换</span>
      </div>
      <div class="custom-menu-item">
        <span>🔔 通知设置</span>
      </div>
    </template>
    
    <!-- 自定义底部内容 -->
    <template #menu-footer>
      <div class="menu-footer-actions">
        <button @click="logout">退出登录</button>
      </div>
    </template>
  </FloatingMenu>
</template>
```

## 🎨 样式定制

### CSS 变量

```css
:root {
  /* 菜单背景 */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8f9fa;
  --color-bg-hover: #e9ecef;
  
  /* 文字颜色 */
  --color-text-primary: #212529;
  --color-text-secondary: #6c757d;
  
  /* 边框颜色 */
  --color-border-primary: #dee2e6;
  
  /* 主题色 */
  --color-primary: #007bff;
  
  /* 阴影 */
  --shadow-sm: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  --shadow-lg: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  
  /* 圆角 */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  
  /* 间距 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  
  /* 过渡 */
  --transition-normal: 0.15s ease-in-out;
}
```

### 自定义样式

```css
/* 自定义菜单项样式 */
.custom-menu-item {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  cursor: pointer;
}

.custom-menu-item:hover {
  background-color: var(--color-bg-hover);
  transform: translateX(4px);
}

/* 自定义底部按钮 */
.menu-footer-actions button {
  width: 100%;
  padding: var(--spacing-sm);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color var(--transition-normal);
}

.menu-footer-actions button:hover {
  background: var(--color-primary-dark);
}
```

## 🔧 技术实现

### 核心原理

1. **事件处理**：使用 `mouseenter` 和 `mouseleave` 事件
2. **延迟隐藏**：通过 `setTimeout` 实现智能延迟
3. **状态管理**：跟踪菜单和按钮的悬停状态
4. **CSS 伪元素**：创建无形的连接区域

### 关键代码

```javascript
// 鼠标进入按钮
handleMouseEnter() {
  this.isMenuVisible = true
  this.clearHideTimeout()
}

// 鼠标离开按钮
handleMouseLeave() {
  this.hideTimeout = setTimeout(() => {
    if (!this.isMenuHovered) {
      this.hideMenu()
    }
  }, this.hideDelay)
}

// 鼠标进入菜单
handleMenuEnter() {
  this.isMenuHovered = true
  this.clearHideTimeout()
}
```

## 📱 响应式行为

### 桌面端
- 菜单相对于按钮定位
- 支持鼠标悬停显示
- 完整的交互体验

### 移动端
- 菜单居中显示
- 点击触发显示
- 触摸友好的界面

## 🎯 最佳实践

1. **延迟时间设置**：建议设置为 200-300ms
2. **菜单大小**：避免过大的菜单影响用户体验
3. **键盘支持**：确保支持 Tab 键导航
4. **无障碍性**：添加适当的 ARIA 标签
5. **性能优化**：及时清理定时器

## 🐛 常见问题

### Q: 菜单意外消失怎么办？
A: 检查延迟时间设置，确保给用户足够时间移动到子菜单。

### Q: 如何自定义菜单位置？
A: 可以通过 CSS 的 `position` 和 `transform` 属性调整。

### Q: 支持触摸设备吗？
A: 是的，移动端会自动切换到点击模式。

## 📚 相关链接

- [Vue.js 官方文档](https://vuejs.org/)
- [CSS 动画指南](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [无障碍设计原则](https://www.w3.org/WAI/WCAG21/quickref/)

---

*这个悬浮菜单组件提供了流畅的用户体验，解决了传统下拉菜单的交互问题。*
