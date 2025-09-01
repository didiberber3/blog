# GBlog 安装和使用指南

## 🚀 快速安装

### 1. 安装 Node.js
确保您的系统已安装 Node.js 18 或更高版本。

### 2. 安装依赖
在项目根目录运行：
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:5173 查看您的博客。

## 📝 添加第一篇文章

### 1. 创建文章文件
在 `src/pages/` 目录下创建 `my-first-post.md`：

```markdown
---
title: 我的第一篇文章
date: 2024-01-16
author: 您的名字
---

# 我的第一篇文章

这是我在 GBlog 上的第一篇文章！

## 开始写作

- 支持完整的 Markdown 语法
- 自动生成文章摘要
- 响应式设计
- 极简美观

开始您的写作之旅吧！
```

### 2. 查看效果
保存文件后，开发服务器会自动重新加载，您的新文章将出现在首页。

## 🔧 自定义配置

### 修改站点信息
编辑 `src/App.vue` 中的标题和页脚信息。

### 调整样式
编辑 `src/style.css` 来自定义样式。

### 修改仓库名
如果您的 GitHub 仓库名不是 `gblog`，请修改 `vite.config.js`：

```javascript
export default defineConfig({
  // ...
  base: '/your-repo-name/'
})
```

## 📤 部署到 GitHub Pages

### 1. 推送到 GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. 启用 GitHub Pages
1. 进入您的 GitHub 仓库
2. 点击 Settings 选项卡
3. 滚动到 Pages 部分
4. 在 Source 下选择 "GitHub Actions"

### 3. 自动部署
每次推送到 main 分支都会触发自动部署。

## 🎯 使用技巧

### 文章组织
- 使用有意义的文件名，如 `2024-01-16-react-hooks-guide.md`
- 在 frontmatter 中设置准确的日期和作者信息
- 为文章编写清晰的标题

### Markdown 最佳实践
- 使用标题层次结构 (h1, h2, h3...)
- 适当使用代码块和引用
- 添加适当的链接和图片

### 性能优化
- 图片文件放在 `public/` 目录下
- 使用合适的图片格式和大小
- 避免过长的文章，考虑分成多个部分

## 🐛 常见问题

### Q: 新文章没有显示？
A: 确保文件放在 `src/pages/` 目录下，文件扩展名是 `.md`，并且重启了开发服务器。

### Q: 样式没有生效？
A: 检查 CSS 语法是否正确，清除浏览器缓存。

### Q: GitHub Pages 部署失败？
A: 检查 `.github/workflows/deploy.yml` 文件，确保 `base` 配置正确。

## 📞 获取帮助

如果遇到问题：
1. 查看浏览器开发者工具的控制台错误
2. 检查 GitHub Actions 的构建日志
3. 参考项目的 Issues 页面

祝您使用愉快！🎉
