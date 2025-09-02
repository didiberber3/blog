# GitHub Pages 部署指南

## 概述

本博客使用 GitHub Pages 进行自动部署，通过 GitHub Actions 实现持续集成和部署。

## 部署流程

### 1. 自动部署
- 当代码推送到 `main` 分支时，GitHub Actions 会自动触发部署
- 构建过程包括：安装依赖 → 构建项目 → 部署到 GitHub Pages

### 2. 部署配置
- **构建命令**: `npm run build`
- **输出目录**: `./dist`
- **部署分支**: `gh-pages` (自动管理)
- **访问地址**: `https://didiberber3.github.io`

## 技术架构

### 前端技术栈
- **Vue 3**: 渐进式JavaScript框架
- **Vite 5.x**: 下一代前端构建工具
- **Vue Router 4.x**: 官方路由管理器
- **Markdown-it**: Markdown解析器
- **CSS Variables**: 动态主题系统

### 构建特性
- **ES Modules**: 现代模块系统
- **Hot Module Replacement**: 热模块替换
- **PWA Ready**: 渐进式Web应用支持
- **响应式设计**: 移动端友好
- **主题切换**: 浅色/深色/自动模式

## 部署步骤

### 1. 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 2. 推送到GitHub
```bash
# 添加更改
git add .

# 提交更改
git commit -m "更新footer信息"

# 推送到远程仓库
git push origin main
```

### 3. 自动部署
- GitHub Actions 自动检测推送
- 执行构建和部署流程
- 部署完成后可通过 `https://didiberber3.github.io` 访问

## 配置文件

### GitHub Actions
`.github/workflows/deploy.yml` - 自动部署配置

### 构建配置
`vite.config.js` - Vite构建配置
`package.json` - 项目依赖和脚本

### 路由配置
- 使用 Hash 路由模式 (`createWebHashHistory`)
- 兼容 GitHub Pages 的静态托管

## 部署状态

### 检查部署状态
1. 访问 GitHub 仓库页面
2. 点击 "Actions" 标签页
3. 查看最新的部署工作流状态

### 常见问题
- **构建失败**: 检查依赖安装和构建脚本
- **部署失败**: 检查 GitHub Pages 设置和权限
- **页面404**: 确认路由配置和构建输出

## 自定义部署

### 修改部署分支
在 `.github/workflows/deploy.yml` 中修改：
```yaml
on:
  push:
    branches: [ main ]  # 修改为你的主分支名
```

### 修改构建命令
在 `.github/workflows/deploy.yml` 中修改：
```yaml
- name: Build
  run: npm run build  # 修改为你的构建命令
```

### 修改输出目录
在 `.github/workflows/deploy.yml` 中修改：
```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: ./dist  # 修改为你的输出目录
```

## 性能优化

### 构建优化
- 代码分割和懒加载
- 资源压缩和优化
- Tree-shaking 消除未使用代码

### 运行时优化
- 组件懒加载
- 图片懒加载
- 缓存策略优化

## 监控和维护

### 性能监控
- 页面加载速度
- 资源加载时间
- 用户体验指标

### 定期维护
- 依赖包更新
- 安全漏洞修复
- 性能优化改进

## 联系信息

- **GitHub**: [didiberber3](https://github.com/didiberber3)
- **博客**: [didiberber3.github.io](https://didiberber3.github.io)
- **邮箱**: chenshi0720@outlook.com

---

*最后更新: 2024年*
*部署状态: ✅ 自动部署已配置*
