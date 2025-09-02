# 🚀 GBlog - 极简静态博客系统

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-blue?style=for-the-badge&logo=github)](https://didiberber3.github.io/blog/)

基于 Vue3 + Vite 构建的极简静态博客系统，支持 GitHub Pages 部署。

## 📑 目录导航

<details>
<summary>📋 展开目录</summary>

- [✨ 特性](#-特性)
- [🚀 快速开始](#-快速开始)
  - [1. 克隆项目](#1-克隆项目)
  - [2. 安装依赖](#2-安装依赖)
  - [3. 开发模式](#3-开发模式)
  - [4. 构建](#4-构建)
  - [5. 预览](#5-预览)
- [📝 添加文章](#-添加文章)
- [📁 项目结构](#-项目结构)
- [🎨 样式特点](#-样式特点)
  - [极简设计](#极简设计)
  - [Markdown 样式](#markdown-样式)
  - [响应式适配](#响应式适配)
- [🚀 部署到 GitHub Pages](#-部署到-github-pages)
  - [配置 base URL](#配置-base-url)
- [🛠️ 技术栈](#️-技术栈)
- [📋 开发计划](#-开发计划)
  - [已实现 ✅](#已实现-)
  - [计划中 🔄](#计划中-)
- [📄 许可证](#-许可证)
- [🤝 贡献](#-贡献)

</details>

---

## ✨ 特性

- 🎨 **极简设计**：白色背景，黑灰文字，单栏布局
- 📝 **Markdown 支持**：完整的 Markdown 语法支持
- 📱 **响应式设计**：完美适配移动端和桌面端
- 🚀 **静态部署**：支持 GitHub Pages 一键部署
- 🔄 **自动识别**：自动读取 `src/pages/` 目录下的所有 `.md` 文件
- ⚡ **现代技术栈**：Vue3 + Vite + Vue Router

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/didiberber3/blog.git
cd blog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 开发模式

```bash
npm run dev
```

### 4. 构建

```bash
npm run build
```

### 5. 预览

```bash
npm run preview
```

## 📝 添加文章

1. 在 `src/pages/` 目录下创建新的 `.md` 文件
2. 在文件顶部添加 frontmatter（可选）：

```markdown
---
title: 文章标题
date: 2024-01-15
author: 作者名
---

# 文章内容

这里是您的文章内容...
```

3. 重新运行开发服务器或构建项目即可看到新文章

## 📁 项目结构

```
gblog/
├── src/
│   ├── components/
│   │   ├── Home.vue      # 首页组件
│   │   └── Article.vue   # 文章详情组件
│   ├── pages/            # 文章目录
│   │   ├── hello-world.md
│   │   ├── markdown-guide.md
│   │   └── about-gblog.md
│   ├── utils/
│   │   └── articles.js   # 文章处理工具
│   ├── App.vue          # 主应用组件
│   ├── main.js          # 入口文件
│   └── style.css        # 全局样式
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions 部署配置
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 样式特点

### 极简设计
- 白色背景 (#ffffff)
- 黑灰文字 (#333333)
- 单栏布局，最大宽度 800px
- 清晰的视觉层次

### Markdown 样式
- 完整的标题样式 (h1-h6)
- 代码块语法高亮
- 引用块样式
- 表格样式
- 列表样式
- 链接 hover 效果

### 响应式适配
- 桌面端：800px 最大宽度
- 平板端：768px 断点
- 移动端：480px 断点

## 🚀 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 GitHub Actions 作为源
4. 推送到 main 分支会自动触发部署

### 配置 base URL

如果您的仓库名不是 `gblog`，请修改 `vite.config.js` 中的 `base` 配置：

```javascript
export default defineConfig({
  // ...其他配置
  base: '/your-repo-name/'
})
```

## 🛠️ 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - Vue.js 官方路由
- **Markdown-it** - Markdown 解析器
- **vite-plugin-vue-markdown** - Vite Markdown 插件

## 📋 开发计划

### 已实现 ✅
- [x] Vue3 + Vite 基础架构
- [x] Markdown 文件自动发现
- [x] 首页文章列表
- [x] 文章详情页
- [x] 响应式设计
- [x] 极简样式
- [x] GitHub Pages 部署

### 计划中 🔄
- [ ] 文章标签系统
- [ ] 搜索功能  
- [ ] 暗色主题
- [ ] 代码语法高亮
- [ ] RSS 订阅

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

<div align="center">

**如果这个项目对你有帮助，请给它一个 ⭐️**

[![GitHub stars](https://img.shields.io/github/stars/didiberber3/blog?style=social)](https://github.com/didiberber3/blog)

</div>
