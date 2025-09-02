---
title: 导航菜单和侧栏目录测试
date: 2025-01-15
author: Didiberber
---

# 🧪 导航菜单和侧栏目录测试页面

这个页面用于测试恢复后的简单导航菜单和新的侧栏目录功能。

## 🎯 测试目标

### 1. 导航菜单测试
- ✅ 导航菜单已恢复为简单版本
- ✅ 删除了复杂的二级菜单和悬停逻辑
- ✅ 保留了基本的导航功能
- ✅ 移动端菜单正常工作

### 2. 侧栏目录测试
- ✅ 文章内目录已删除
- ✅ 目录现在显示在侧栏中
- ✅ 目录只跳转到当前页面的标题
- ✅ 不会跳转到其他页面

## 📋 测试项目

### 导航菜单测试
1. **桌面端导航**
   - 检查首页、文章、关于链接是否正常
   - 验证菜单项样式是否正确
   - 测试悬停效果（应该很简单）

2. **移动端菜单**
   - 点击☰按钮打开移动端菜单
   - 验证菜单项是否正常显示
   - 测试菜单项点击是否正常工作

### 侧栏目录测试
1. **目录生成**
   - 检查页面标题是否自动生成目录
   - 验证不同级别标题的缩进是否正确

2. **目录跳转**
   - 点击目录项，应该平滑滚动到对应标题
   - 验证滚动位置是否正确（考虑头部高度）
   - 确认不会跳转到其他页面

3. **滚动监听**
   - 滚动页面时，当前阅读的标题应该在目录中高亮
   - 验证高亮效果是否正常

## 🏗️ 技术实现

### 导航菜单
```vue
<!-- 简化的NavigationMenu组件 -->
<nav class="navigation-menu">
  <div class="desktop-nav">
    <router-link 
      v-for="item in sortedMenuItems" 
      :key="item.path"
      :to="item.path" 
      class="nav-item"
    >
      <span class="nav-icon">{{ item.icon }}</span>
      <span class="nav-text">{{ item.text }}</span>
    </router-link>
  </div>
</nav>
```

### 侧栏目录
```vue
<!-- 侧栏目录组件 -->
<aside class="sidebar">
  <div class="sidebar-toc" v-if="toc.length > 0">
    <h3 class="toc-title">📑 目录导航</h3>
    <nav class="toc-nav">
      <ul class="toc-list">
        <li 
          v-for="heading in toc" 
          :key="heading.id"
          :class="['toc-item', `toc-level-${heading.level}`]"
        >
          <a 
            :href="`#${heading.id}`"
            class="toc-link"
            @click.prevent="scrollToHeading(heading.id)"
          >
            {{ heading.text }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</aside>
```

## 🔧 关键功能

### 1. 目录ID生成
```javascript
// 基于标题文本生成ID
let id = text
  .toLowerCase()
  .replace(/[^\w\s-]/g, '') // 移除特殊字符
  .replace(/\s+/g, '-')     // 空格替换为连字符
  .replace(/-+/g, '-')      // 多个连字符替换为单个
  .trim()
```

### 2. 平滑滚动
```javascript
scrollToHeading(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
```

### 3. 滚动监听
```javascript
// 使用IntersectionObserver监听标题可见性
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
```

## 📱 响应式设计

### 桌面端
- 侧栏固定宽度：300px
- 目录最大高度：400px，超出时显示滚动条
- 标题缩进使用标准间距

### 移动端
- 侧栏宽度：100%
- 目录最大高度：300px
- 标题缩进使用较小间距
- 触摸友好的交互

## 🎨 样式特性

### 目录样式
- 不同级别标题有不同的缩进和字重
- 悬停效果：颜色变化、背景色、位移
- 当前活跃标题高亮显示
- 平滑的过渡动画

### 响应式样式
- 使用CSS变量确保一致性
- 媒体查询适配不同屏幕尺寸
- 触摸设备优化

## 🚨 注意事项

### 1. 目录跳转
- 使用 `@click.prevent` 防止默认的锚点跳转
- 自定义 `scrollToHeading` 方法实现平滑滚动
- 考虑头部高度，确保滚动位置正确

### 2. 性能优化
- 使用 `IntersectionObserver` 监听滚动
- 及时清理观察器，避免内存泄漏
- 目录项使用 `v-for` 的 `key` 属性

### 3. 无障碍性
- 目录项使用语义化的 `<nav>` 和 `<ul>` 标签
- 提供适当的 `title` 属性
- 支持键盘导航

## 🔍 调试信息

如果遇到问题，请检查：

1. **控制台错误**：查看是否有JavaScript错误
2. **DOM结构**：确认标题元素是否有正确的ID
3. **样式问题**：检查CSS是否正确加载
4. **滚动行为**：验证 `scrollIntoView` 是否正常工作

## 📈 性能指标

### 优化前
- 复杂的悬停逻辑
- 多个定时器
- 重复的事件监听器

### 优化后
- 简化的导航逻辑
- 高效的滚动监听
- 清理的事件管理

---

*这个测试页面验证了导航菜单的简化和侧栏目录的实现。所有功能都应该正常工作，提供流畅的用户体验。*
