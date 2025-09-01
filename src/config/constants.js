// 应用常量配置
export const APP_CONFIG = {
  // 分页配置
  PAGINATION: {
    DEFAULT_ITEMS_PER_PAGE: 10,
    MAX_VISIBLE_PAGES: 5,
    DELTA_PAGES: 2
  },
  
  // 文章配置
  ARTICLE: {
    DEFAULT_EXCERPT_LENGTH: 150,
    DEFAULT_AUTHOR: 'Anonymous',
    DATE_FORMAT: {
      locale: 'zh-CN',
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    }
  },
  
  // 代码高亮配置
  CODE_HIGHLIGHT: {
    CDN_URL: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0',
    THEME: 'github.min.css'
  },
  
  // 路由配置
  ROUTES: {
    HOME: '/',
    ARTICLES: '/articles',
    ABOUT: '/about',
    ARTICLE_PREFIX: '/article/'
  }
}

// 编程语言映射
export const LANGUAGE_MAP = {
  'javascript': 'JS',
  'js': 'JS',
  'typescript': 'TS',
  'ts': 'TS',
  'python': 'Python',
  'py': 'Python',
  'java': 'Java',
  'cpp': 'C++',
  'c': 'C',
  'csharp': 'C#',
  'cs': 'C#',
  'php': 'PHP',
  'ruby': 'Ruby',
  'go': 'Go',
  'rust': 'Rust',
  'swift': 'Swift',
  'kotlin': 'Kotlin',
  'scala': 'Scala',
  'html': 'HTML',
  'css': 'CSS',
  'scss': 'SCSS',
  'sass': 'Sass',
  'less': 'Less',
  'json': 'JSON',
  'xml': 'XML',
  'yaml': 'YAML',
  'yml': 'YAML',
  'toml': 'TOML',
  'ini': 'INI',
  'bash': 'Bash',
  'shell': 'Shell',
  'sh': 'Shell',
  'sql': 'SQL',
  'markdown': 'MD',
  'md': 'MD',
  'vue': 'Vue',
  'jsx': 'JSX',
  'tsx': 'TSX',
  'text': 'Text'
}
