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
    
    // 生成简单的ID
    const id = `heading-${index}`
    heading.id = id
    
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
