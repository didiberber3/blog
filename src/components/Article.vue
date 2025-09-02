<template>
  <div class="article-layout">
    <div class="main-container">
      <div class="article">
        <div v-if="article" class="article-content">
          <header class="article-header">
            <h1 class="article-title">{{ article.title }}</h1>
            <div class="article-meta">
              <span class="date">发布于 {{ formatDate(article.date) }}</span>
              <span class="author">作者: {{ article.author }}</span>
            </div>
          </header>
          
          <div class="article-body" v-html="renderedContent" ref="articleBody"></div>
          
          <footer class="article-footer">
            <router-link to="/" class="back-link">← 返回首页</router-link>
          </footer>
        </div>
        
        <div v-else class="not-found">
          <h2>文章未找到</h2>
          <p>您访问的文章不存在</p>
          <router-link to="/" class="back-link">← 返回首页</router-link>
        </div>
      </div>
    </div>
    
    <aside class="sidebar">
      <!-- 侧栏内容可以保留，但不再显示目录 -->
      <div class="sidebar-content">
        <h3>相关文章</h3>
        <p>这里可以显示相关文章推荐</p>
      </div>
    </aside>
  </div>
</template>

<script>
import { getArticleBySlug } from '../utils/articles.js'
import { generateTableOfContents } from '../utils/toc.js'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

export default {
  name: 'Article',
  props: ['slug'],
  data() {
    return {
      article: null,
      toc: []
    }
  },
  computed: {
    renderedContent() {
      return this.article ? md.render(this.article.content) : ''
    }
  },
  mounted() {
    this.loadArticle()
    this.loadHighlightJS()
  },
  watch: {
    slug() {
      this.loadArticle()
    },
    renderedContent: {
      handler() {
        this.$nextTick(() => {
          this.generateToc()
          this.setupCodeBlocks()
          // 触发content-update事件，通知父组件更新目录
          this.$emit('content-update', this.article ? this.article.content : '')
        })
      },
      immediate: true
    }
  },
  methods: {
    loadArticle() {
      this.article = getArticleBySlug(this.slug)
      // 文章加载后立即触发content-update事件
      if (this.article) {
        this.$emit('content-update', this.article.content)
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    generateToc() {
      this.toc = generateTableOfContents(this.$refs.articleBody)
    },
    loadHighlightJS() {
      // 动态加载 highlight.js
      if (!window.hljs) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css'
        document.head.appendChild(link)
        
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js'
        script.onload = () => {
          if (window.hljs) {
            window.hljs.highlightAll()
          }
        }
        document.head.appendChild(script)
      }
    },
    setupCodeBlocks() {
      if (!this.$refs.articleBody) return
      
      const preElements = this.$refs.articleBody.querySelectorAll('pre')
      console.log('Found pre elements:', preElements.length) // 调试日志
      
      preElements.forEach((preElement, index) => {
        // 检查是否已经处理过
        if (preElement.parentNode.classList.contains('code-block-wrapper')) {
          return
        }
        
        const codeBlock = preElement.querySelector('code')
        if (!codeBlock) return
        
        // 为代码块添加包装器
        const wrapper = document.createElement('div')
        wrapper.className = 'code-block-wrapper'
        
        // 获取语言类型
        const language = codeBlock.className.replace('language-', '') || 'text'
        const languageName = this.getLanguageName(language)
        
        // 创建复制按钮
        const copyButton = document.createElement('button')
        copyButton.className = 'copy-button'
        copyButton.innerHTML = '📋'
        copyButton.title = '复制代码'
        copyButton.dataset.language = languageName
        copyButton.dataset.code = codeBlock.textContent
        
        copyButton.addEventListener('click', (e) => {
          this.copyCode(codeBlock.textContent, copyButton, e)
        })
        
        // 将包装器插入到pre元素之前
        preElement.parentNode.insertBefore(wrapper, preElement)
        wrapper.appendChild(preElement)
        wrapper.appendChild(copyButton)
        
        // 应用语法高亮
        if (window.hljs) {
          window.hljs.highlightElement(codeBlock)
        }
        
        console.log(`Processed code block ${index + 1}: ${languageName}`) // 调试日志
      })
    },
    getLanguageName(language) {
      const languageMap = {
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
        'react': 'React',
        'jsx': 'JSX',
        'tsx': 'TSX'
      }
      return languageMap[language.toLowerCase()] || language.toUpperCase()
    },
    
    async copyCode(code, button, event) {
      try {
        await navigator.clipboard.writeText(code)
        
        // 显示复制成功状态
        button.innerHTML = '✅'
        button.title = '已复制'
        button.classList.add('copied')
        
        // 创建渐隐弹窗
        this.showCopyToast(event)
        
        // 恢复原始状态
        setTimeout(() => {
          button.classList.remove('copied')
          button.innerHTML = '📋'
          button.title = '复制代码'
        }, 2000)
      } catch (err) {
        // 降级方案
        const textArea = document.createElement('textarea')
        textArea.value = code
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        
        button.innerHTML = '✅'
        button.title = '已复制'
        button.classList.add('copied')
        
        this.showCopyToast(event)
        
        this.showCopyToast(event)
        
        setTimeout(() => {
          button.classList.remove('copied')
          button.innerHTML = '📋'
          button.title = '复制代码'
        }, 2000)
      }
    },
    
    showCopyToast(event) {
      // 创建弹窗元素
      const toast = document.createElement('div')
      toast.className = 'copy-toast'
      toast.textContent = event.target.dataset.language
      
      // 设置弹窗位置（在鼠标位置附近）
      const rect = event.target.getBoundingClientRect()
      toast.style.left = `${rect.left + rect.width / 2}px`
      toast.style.top = `${rect.top - 40}px`
      
      // 添加到页面
      document.body.appendChild(toast)
      
      // 触发动画
      setTimeout(() => {
        toast.classList.add('show')
      }, 10)
      
      // 移除弹窗
      setTimeout(() => {
        toast.classList.remove('show')
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast)
          }
        }, 300)
      }, 1500)
    }
  }
}
</script>

<style scoped src="../styles/Article.css"></style>
