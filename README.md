# Didiberber's Blog

基于 VitePress 的个人博客，保持极简设计风格，专注于内容创作。

## ✨ 特性

- 🎨 **极简设计** - 保持原有的白色背景，黑灰文字，单栏布局
- ⚡ **VitePress 驱动** - 更快的构建速度和更好的 SEO
- 📝 **Markdown 支持** - 完整的 Markdown 语法支持
- 🌙 **暗色主题** - 支持明暗主题切换
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🔍 **内置搜索** - 本地搜索功能
- 🚀 **静态部署** - 支持 GitHub Pages 等静态托管

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
# 或者
npm run docs:dev
```

在浏览器中打开 `http://localhost:5173` 查看博客。

### 构建

```bash
npm run build
# 或者
npm run docs:build
```

### 预览构建结果

```bash
npm run preview
# 或者
npm run docs:preview
```

## 📝 文章管理

### 添加新文章

1. 在 `docs/articles/` 目录下创建新的 `.md` 文件
2. 在文件顶部添加 frontmatter：

```markdown
---
title: 文章标题
date: 2024-01-15
author: 作者名
---

# 文章内容

这里是文章正文...
```

3. 文章会自动出现在博客中

### 修改文章

直接编辑 `docs/articles/` 目录下的对应 `.md` 文件即可。

### 删除文章

删除 `docs/articles/` 目录下的对应 `.md` 文件，并从 `docs/.vitepress/config.js` 的侧边栏配置中移除相关链接。

## 📂 项目结构

```
project-root/
├── docs/                   # VitePress 主目录
│   ├── .vitepress/         # VitePress 配置
│   │   ├── config.js       # 站点配置
│   │   └── theme/          # 主题自定义
│   │       ├── index.js    # 主题入口
│   │       └── custom.css  # 自定义样式
│   ├── articles/           # 博客文章存放区
│   │   ├── index.md        # 文章列表页
│   │   ├── hello-world.md  # 示例文章
│   │   └── ...             # 其他文章
│   ├── index.md            # 首页
│   └── about.md            # 关于页面
├── push.bat                # Windows 部署脚本
├── quick-push.bat          # 快速推送脚本
├── package.json            # 项目配置
└── README.md               # 项目说明
```

## 🚀 部署

### GitHub Pages 部署

1. 确保代码已推送到 GitHub 仓库
2. 运行部署脚本：

```bash
# Windows
.\push.bat

# 或者手动执行
npm run build
# 然后将 docs/.vitepress/dist 目录内容推送到 gh-pages 分支
```

3. 在 GitHub 仓库设置中启用 Pages，选择 `gh-pages` 分支

### 其他静态托管

构建后的文件位于 `docs/.vitepress/dist/` 目录，可以部署到：

- Netlify
- Vercel
- Cloudflare Pages
- 任何静态文件服务器

## 🎨 自定义

### 修改主题样式

编辑 `docs/.vitepress/theme/custom.css` 文件来自定义样式。

### 修改站点配置

编辑 `docs/.vitepress/config.js` 文件来修改：
- 站点标题和描述
- 导航菜单
- 侧边栏
- 社交链接等

## 🛠️ 技术栈

- **VitePress** - 静态站点生成器
- **Vue 3** - 前端框架
- **Vite** - 构建工具
- **Markdown** - 内容格式
- **CSS Variables** - 主题系统

## 📄 许可证

MIT License - 自由使用，修改和分发。
