// 自动导入 pages 目录下的所有 markdown 文件
const modules = import.meta.glob('../pages/*.md', { 
  eager: true, 
  query: '?raw',
  import: 'default'
})

// 解析 markdown 文件的 frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      metadata: {},
      content: content
    }
  }
  
  const frontmatter = match[1]
  const body = match[2]
  const metadata = {}
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      metadata[key.trim()] = value.replace(/^["']|["']$/g, '')
    }
  })
  
  return {
    metadata,
    content: body
  }
}

// 获取文章摘要
function getExcerpt(content, maxLength = 150) {
  // 移除 markdown 标记
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // 移除标题标记
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体标记
    .replace(/\*(.*?)\*/g, '$1') // 移除斜体标记
    .replace(/`(.*?)`/g, '$1') // 移除行内代码标记
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接标记
    .replace(/\n+/g, ' ') // 替换换行为空格
    .trim()
  
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText
}

// 从文件路径提取 slug
function getSlugFromPath(path) {
  return path.replace('../pages/', '').replace('.md', '')
}

// 获取所有文章
export function getArticles() {
  const articles = []
  
  for (const path in modules) {
    const content = modules[path]
    const { metadata, content: body } = parseFrontmatter(content)
    const slug = getSlugFromPath(path)
    
    articles.push({
      slug,
      title: metadata.title || slug,
      date: metadata.date || new Date().toISOString().split('T')[0],
      author: metadata.author || 'Anonymous',
      excerpt: getExcerpt(body),
      content: body,
      metadata
    })
  }
  
  // 按日期排序（最新的在前面）
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// 根据 slug 获取单篇文章
export function getArticleBySlug(slug) {
  const articles = getArticles()
  return articles.find(article => article.slug === slug)
}
