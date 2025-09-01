---
title: 关于 GBlog
date: 2024-01-13
author: 开发者
---

# 关于 GBlog

GBlog 是一个专为极简主义者设计的静态博客系统。

## 设计理念

### 极简至上

- 纯白背景，专注内容
- 单栏布局，减少干扰
- 清晰的层次结构
- 优雅的排版

### 开发者友好

- Vue3 + Vite 现代技术栈
- 自动文章发现
- 热重载开发体验
- 一键部署到 GitHub Pages

## 技术特点

### 前端技术栈

- **Vue 3**：组合式 API，更好的 TypeScript 支持
- **Vite**：快速的开发服务器和构建工具
- **Vue Router**：单页应用路由
- **Markdown-it**：强大的 Markdown 解析器

### 文章管理

```
src/pages/
├── hello-world.md
├── markdown-guide.md
└── about-gblog.md
```

只需在 `src/pages/` 目录下放置 `.md` 文件，系统会自动：

1. 解析文件内容
2. 提取 frontmatter 元数据
3. 生成文章摘要
4. 在首页展示文章列表

### 部署简单

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 预览
npm run preview
```

构建后的文件可以直接部署到任何静态文件服务器。

## 路线图

### 已实现 ✅

- [x] Vue3 + Vite 基础架构
- [x] Markdown 文件自动发现
- [x] 首页文章列表
- [x] 文章详情页
- [x] 响应式设计
- [x] 极简样式
- [x] 完整的 Markdown 样式

### 计划中 🔄

- [ ] 文章标签系统
- [ ] 搜索功能
- [ ] 暗色主题
- [ ] 代码语法高亮
- [ ] RSS 订阅
- [ ] 评论系统集成

## 使用许可

MIT License - 自由使用，修改和分发。

---

感谢选择 GBlog！如果您有任何建议或问题，欢迎提交 Issue。
