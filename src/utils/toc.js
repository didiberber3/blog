/**
 * 生成文章目录
 * @param {HTMLElement} container - 文章内容容器
 * @returns {Array} 目录数组
 */
export function generateTableOfContents(container) {
  if (!container) return []
  
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const toc = []
  
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1))
    const text = heading.textContent.trim()
    
    // 生成更好的ID：基于文本内容
    let id = heading.id
    if (!id) {
      // 如果没有ID，生成一个基于文本的ID
      id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // 移除特殊字符
        .replace(/\s+/g, '-')     // 空格替换为连字符
        .replace(/-+/g, '-')      // 多个连字符替换为单个
        .trim()
      
      // 如果ID为空或重复，使用索引
      if (!id || document.getElementById(id)) {
        id = `heading-${index}`
      }
      
      // 设置标题的ID
      heading.id = id
    }
    
    toc.push({
      id,
      text,
      level
    })
  })
  
  return toc
}

/**
 * 滚动到指定标题
 * @param {string} id - 标题ID
 */
export function scrollToHeading(id) {
  const element = document.getElementById(id)
  if (element) {
    // 获取头部高度
    const header = document.querySelector('.header')
    const headerHeight = header ? header.offsetHeight : 80
    
    // 计算目标位置
    const targetPosition = element.offsetTop - headerHeight - 20
    
    // 平滑滚动
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
    
    // 添加高亮效果
    element.style.backgroundColor = 'rgba(76, 175, 80, 0.1)'
    setTimeout(() => {
      element.style.backgroundColor = ''
    }, 2000)
  }
}
