# 📑 GitHub风格目录导航功能说明

## 🎯 功能概述

这个功能为你的博客添加了类似GitHub README.md的目录导航，具有以下特点：

- ✅ **置顶显示**：目录始终显示在页面顶部
- ✅ **自动生成**：根据文章标题自动生成目录
- ✅ **平滑滚动**：点击目录项平滑滚动到对应位置
- ✅ **高亮显示**：当前阅读位置会在目录中高亮
- ✅ **响应式设计**：移动端和桌面端都有良好体验

## 📁 文件结构

```
src/
├── components/
│   └── common/
│       └── TableOfContents.vue    # 目录导航组件
├── pages/
│   └── test-toc.md                # 测试文章
└── README.md                      # 已添加目录导航
```

## 🚀 使用方法

### 1. 在文章中使用目录组件

```vue
<template>
  <div class="article-layout">
    <div class="main-container">
      <!-- 文章内容 -->
      <article class="article">
        <div class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="date">{{ formatDate(article.date) }}</span>
            <span class="author">{{ article.author }}</span>
          </div>
        </div>
        
        <!-- 目录导航 -->
        <TableOfContents :content="article.content" />
        
        <!-- 文章正文 -->
        <div class="article-body" v-html="article.content"></div>
      </article>
    </div>
    
    <aside class="sidebar">
      <!-- 侧栏内容 -->
    </aside>
  </div>
</template>

<script>
import TableOfContents from '@/components/common/TableOfContents.vue'

export default {
  components: {
    TableOfContents
  }
  // ... 其他代码
}
</script>
```

### 2. 在README.md中添加目录

```markdown
# 项目标题

## 📑 目录导航

- [✨ 特性](#-特性)
- [🚀 快速开始](#-快速开始)
  - [1. 克隆项目](#1-克隆项目)
  - [2. 安装依赖](#2-安装依赖)
- [📝 使用方法](#-使用方法)
- [📁 项目结构](#-项目结构)

---

## ✨ 特性

这里是特性内容...

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <url>
```

### 2. 安装依赖

```bash
npm install
```
```

## 🎨 样式特点

### GitHub风格设计
- **置顶显示**：目录始终在页面顶部可见
- **层级缩进**：不同级别的标题有不同的缩进
- **高亮状态**：当前阅读位置会高亮显示
- **平滑动画**：展开/收起有平滑的过渡效果

### 响应式适配
- **桌面端**：目录固定在侧边，始终可见
- **移动端**：目录在内容上方，可展开/收起
- **自适应**：根据屏幕尺寸自动调整布局

## 🔧 自定义配置

### 修改目录样式

在 `TableOfContents.vue` 中修改CSS变量：

```css
.toc-container {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
}
```

### 调整目录行为

```javascript
// 修改滚动行为
scrollToHeading(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',  // 平滑滚动
      block: 'start'       // 滚动到顶部
    })
  }
}
```

## 📱 移动端优化

### 触摸友好
- 目录项有足够的点击区域
- 展开/收起按钮易于操作
- 支持触摸滚动

### 性能优化
- 使用 `IntersectionObserver` 监听滚动
- 懒加载目录内容
- 平滑的动画过渡

## 🎯 最佳实践

### 1. 标题层级
- 使用合理的标题层级（h1-h6）
- 避免跳过层级（如h1直接到h3）
- 保持标题的语义化

### 2. 目录长度
- 建议目录项不超过20个
- 长文章可以分组显示
- 考虑使用折叠功能

### 3. 用户体验
- 目录始终可见
- 当前位置高亮显示
- 平滑的滚动体验

## 🚨 注意事项

### 浏览器兼容性
- 需要支持 `IntersectionObserver`
- 现代浏览器都有良好支持
- 旧版浏览器会降级处理

### 性能考虑
- 长文章可能影响性能
- 建议限制目录项数量
- 使用虚拟滚动优化长列表

## 🔄 更新日志

- **v1.0**：基础目录导航功能
- **v1.1**：添加高亮和滚动功能
- **v1.2**：优化移动端体验
- **v1.3**：添加展开/收起功能

---

**享受GitHub风格的目录导航体验！** 🎉
