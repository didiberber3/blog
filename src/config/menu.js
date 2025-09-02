// 菜单配置
export const MENU_CONFIG = {
  // 主导航菜单
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
  ],
  
  // 快速链接
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
  ],
  
  // 页脚链接
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
    },
    {
      path: '/contact',
      text: '联系我们',
      icon: '📧',
      order: 3
    }
  ]
}

// 获取菜单项
export function getMenuItems(type = 'main') {
  return MENU_CONFIG[type] || []
}

// 获取排序后的菜单项
export function getSortedMenuItems(type = 'main') {
  const items = getMenuItems(type)
  return items.sort((a, b) => a.order - b.order)
}

// 检查当前路由是否激活
export function isRouteActive(menuPath, currentPath) {
  if (menuPath === '/') {
    return currentPath === '/'
  }
  return currentPath.startsWith(menuPath)
}

// 获取面包屑导航
export function getBreadcrumbs(currentPath) {
  const breadcrumbs = []
  
  // 首页
  breadcrumbs.push({
    path: '/',
    text: '首页',
    icon: '🏠'
  })
  
  // 根据当前路径生成面包屑
  if (currentPath === '/') {
    return breadcrumbs
  }
  
  if (currentPath.startsWith('/articles')) {
    breadcrumbs.push({
      path: '/articles',
      text: '文章',
      icon: '📚'
    })
    
    // 如果是具体文章页面
    if (currentPath.startsWith('/article/')) {
      breadcrumbs.push({
        path: currentPath,
        text: '文章详情',
        icon: '📄'
      })
    }
  }
  
  if (currentPath.startsWith('/about')) {
    breadcrumbs.push({
      path: '/about',
      text: '关于',
      icon: 'ℹ️'
    })
  }
  
  return breadcrumbs
}

// 菜单权限控制
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

// 菜单主题配置
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
