# 开发文档

## 项目配置

### 环境要求
- Node.js 16+
- npm 或 yarn
- Git

### 开发命令
```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint
```

## 项目结构说明

### 核心目录
- `src/components/` - Vue组件
- `src/pages/` - Markdown文章
- `src/styles/` - 样式文件
- `src/utils/` - 工具函数
- `src/config/` - 配置文件

### 重要文件
- `vite.config.js` - Vite构建配置
- `package.json` - 项目依赖和脚本
- `.gitignore` - Git忽略文件配置

## 开发规范

### 组件开发
- 使用Vue 3组合式API
- 组件名使用PascalCase
- 文件名使用PascalCase.vue
- 添加适当的注释和文档

### 样式开发
- 使用CSS变量系统
- 遵循BEM命名规范
- 支持响应式设计
- 考虑主题切换

### 代码提交
- 使用清晰的提交信息
- 遵循约定式提交规范
- 及时提交和推送代码

## 部署流程

### 本地构建
1. 运行 `npm run build`
2. 检查 `dist/` 目录
3. 本地预览构建结果

### GitHub Pages部署
1. 推送代码到GitHub
2. 配置GitHub Pages设置
3. 选择部署分支和目录
4. 等待部署完成

## 常见问题解决

### 构建问题
- 清理node_modules重新安装
- 检查Node.js版本兼容性
- 验证package.json依赖版本

### 样式问题
- 检查CSS变量定义
- 验证响应式断点设置
- 确认主题切换逻辑

### 部署问题
- 检查GitHub Pages配置
- 验证构建输出目录
- 确认分支和目录设置
