---
title: 菜单配置演示
date: 2025-01-15
author: Didiberber
---

# ⚙️ 菜单配置演示页面

这个页面展示了重构后菜单系统的配置能力和扩展性。

## 🔧 菜单配置系统

### 1. 基础配置结构

菜单系统使用 `src/config/menu.js` 文件进行集中配置：

```javascript
export const MENU_CONFIG = {
  // 主导航菜单
  main: [
    {
      path: '/',
      text: '首页',
      icon: '🏠',
      description: '返回博客首页',
      order: 1
    }
  ],
  
  // 快速链接
  quick: [...],
  
  // 页脚链接
  footer: [...]
}
```

### 2. 配置选项说明

每个菜单项支持以下配置：

- **path**: 路由路径（必需）
- **text**: 显示文本（必需）
- **icon**: 图标（必需）
- **description**: 描述信息（可选）
- **order**: 排序权重（可选，默认按数组顺序）

## 🎯 配置示例

### 主导航菜单
```javascript
main: [
  {
    path: '/',
    text: '首页',
    icon: '🏠',
    description: '返回博客首页',
    order: 1
  },
  {
    path: '/articles',
    text: '文章',
    icon: '📚',
    description: '浏览所有文章',
    order: 2
  },
  {
    path: '/about',
    text: '关于',
    icon: 'ℹ️',
    description: '了解更多信息',
    order: 3
  }
]
```

### 快速链接
```javascript
quick: [
  {
    path: '/articles?tag=技术',
    text: '技术',
    icon: '💻',
    description: '技术相关文章',
    order: 1
  },
  {
    path: '/articles?tag=生活',
    text: '生活',
    icon: '🌟',
    description: '生活感悟文章',
    order: 2
  }
]
```

### 页脚链接
```javascript
footer: [
  {
    path: '/privacy',
    text: '隐私政策',
    icon: '🔒',
    order: 1
  },
  {
    path: '/terms',
    text: '使用条款',
    icon: '📋',
    order: 2
  }
]
```

## 🚀 扩展菜单系统

### 1. 添加新菜单项

要添加新的菜单项，只需在 `menu.js` 中添加配置：

```javascript
// 添加新页面菜单
{
  path: '/new-page',
  text: '新页面',
  icon: '🆕',
  description: '新增的功能页面',
  order: 4
}

// 添加分类菜单
{
  path: '/categories',
  text: '分类',
  icon: '📂',
  description: '按分类浏览文章',
  order: 3
}
```

### 2. 创建新的菜单类型

可以创建新的菜单类型来满足不同需求：

```javascript
// 侧边栏菜单
sidebar: [
  {
    path: '/recent',
    text: '最新文章',
    icon: '🆕',
    description: '查看最新发布的文章'
  }
],

// 用户菜单
user: [
  {
    path: '/profile',
    text: '个人资料',
    icon: '👤',
    description: '管理个人信息'
  }
]
```

## 🎨 自定义样式

### 1. 图标系统

菜单系统使用Emoji图标，确保跨平台兼容性：

```javascript
// 常用图标
const ICONS = {
  home: '🏠',
  articles: '📚',
  about: 'ℹ️',
  settings: '⚙️',
  profile: '👤',
  search: '🔍',
  star: '⭐',
  heart: '❤️',
  share: '📤',
  download: '⬇️'
}
```

### 2. 主题支持

菜单系统支持明暗主题切换：

```javascript
export const MENU_THEMES = {
  light: {
    background: 'var(--color-bg-primary)',
    text: 'var(--color-text-primary)',
    border: 'var(--color-border-primary)',
    hover: 'var(--color-bg-hover)',
    active: 'var(--color-primary)'
  },
  dark: {
    background: 'var(--color-bg-primary)',
    text: 'var(--color-text-primary)',
    border: 'var(--color-border-primary)',
    hover: 'var(--color-bg-hover)',
    active: 'var(--color-primary)'
  }
}
```

## 🔐 权限控制

### 1. 权限配置

菜单系统支持基于权限的显示控制：

```javascript
export const MENU_PERMISSIONS = {
  // 需要登录的菜单
  requireAuth: ['/admin', '/profile', '/settings'],
  
  // 公开菜单
  public: ['/', '/articles', '/about'],
  
  // 检查菜单权限
  checkPermission(path, isAuthenticated = false) {
    if (this.requireAuth.includes(path)) {
      return isAuthenticated
    }
    return true
  }
}
```

### 2. 使用权限控制

在组件中使用权限控制：

```javascript
import { MENU_PERMISSIONS } from '@/config/menu.js'

// 检查用户是否有权限访问某个菜单
const canAccess = MENU_PERMISSIONS.checkPermission('/admin', user.isAuthenticated)

// 过滤有权限的菜单项
const authorizedMenus = menuItems.filter(item => 
  MENU_PERMISSIONS.checkPermission(item.path, user.isAuthenticated)
)
```

## 📱 响应式配置

### 1. 断点配置

菜单系统使用CSS变量定义的断点：

```css
:root {
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1200px;
}
```

### 2. 响应式行为

不同屏幕尺寸下的菜单行为：

- **>768px**: 显示水平导航栏
- **≤768px**: 显示汉堡菜单按钮
- **≤480px**: 优化触摸体验

## 🔄 动态配置

### 1. 运行时配置

菜单系统支持运行时动态配置：

```javascript
// 动态添加菜单项
function addMenuItem(type, item) {
  if (MENU_CONFIG[type]) {
    MENU_CONFIG[type].push(item)
  }
}

// 动态移除菜单项
function removeMenuItem(type, path) {
  if (MENU_CONFIG[type]) {
    const index = MENU_CONFIG[type].findIndex(item => item.path === path)
    if (index > -1) {
      MENU_CONFIG[type].splice(index, 1)
    }
  }
}
```

### 2. 条件显示

根据条件动态显示菜单项：

```javascript
// 根据用户角色显示不同菜单
const userMenus = MENU_CONFIG.main.filter(item => {
  if (item.roles && !item.roles.includes(user.role)) {
    return false
  }
  return true
})
```

## 📊 性能优化

### 1. 计算属性缓存

使用Vue的计算属性缓存菜单项：

```javascript
computed: {
  sortedMenuItems() {
    return getSortedMenuItems('main')
  },
  
  quickLinks() {
    return getSortedMenuItems('quick')
  }
}
```

### 2. 懒加载

支持菜单项的懒加载：

```javascript
// 懒加载菜单项
const lazyMenus = {
  async loadUserMenus() {
    const response = await fetch('/api/user-menus')
    const menus = await response.json()
    return menus
  }
}
```

## 🧪 测试配置

### 1. 配置验证

菜单配置的验证规则：

```javascript
// 验证菜单配置
function validateMenuConfig(config) {
  const errors = []
  
  Object.entries(config).forEach(([type, items]) => {
    items.forEach((item, index) => {
      if (!item.path) {
        errors.push(`${type}[${index}]: 缺少path属性`)
      }
      if (!item.text) {
        errors.push(`${type}[${index}]: 缺少text属性`)
      }
      if (!item.icon) {
        errors.push(`${type}[${index}]: 缺少icon属性`)
      }
    })
  })
  
  return errors
}
```

### 2. 配置测试

测试菜单配置的正确性：

```javascript
// 测试菜单配置
describe('菜单配置测试', () => {
  test('主导航菜单配置正确', () => {
    const mainMenus = getMenuItems('main')
    expect(mainMenus).toHaveLength(3)
    expect(mainMenus[0].path).toBe('/')
  })
  
  test('菜单项排序正确', () => {
    const sortedMenus = getSortedMenuItems('main')
    expect(sortedMenus[0].order).toBe(1)
    expect(sortedMenus[1].order).toBe(2)
  })
})
```

## 📝 最佳实践

### 1. 命名规范

- 使用语义化的路径名称
- 图标选择要直观易懂
- 描述信息要简洁明了

### 2. 性能考虑

- 避免过多的菜单项
- 合理使用图标和描述
- 考虑移动端的显示效果

### 3. 用户体验

- 保持菜单结构的一致性
- 提供清晰的视觉反馈
- 支持键盘导航

## 🎯 总结

重构后的菜单配置系统具有以下优势：

1. **配置化**：通过配置文件管理菜单，易于维护
2. **扩展性**：支持多种菜单类型和自定义配置
3. **权限控制**：内置权限控制机制
4. **响应式**：自动适配不同屏幕尺寸
5. **性能优化**：支持缓存和懒加载
6. **开发友好**：提供完整的配置和测试工具

这个系统为博客提供了强大而灵活的菜单管理能力，可以轻松满足各种定制需求。

---

**开始配置你的自定义菜单吧！** 🚀
