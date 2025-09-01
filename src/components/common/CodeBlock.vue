<template>
  <div class="code-block-wrapper">
    <pre class="code-block">
      <code 
        :class="`language-${language}`"
        ref="codeElement"
      >
        {{ code }}
      </code>
    </pre>
    <button 
      class="copy-button"
      :title="copyButtonTitle"
      @click="copyCode"
      :class="{ 'copied': isCopied }"
    >
      {{ copyButtonText }}
    </button>
  </div>
</template>

<script>
import { LANGUAGE_MAP, APP_CONFIG } from '../../config/constants.js'

export default {
  name: 'CodeBlock',
  props: {
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: 'text'
    },
    copyButtonText: {
      type: String,
      default: '📋'
    },
    copyButtonTitle: {
      type: String,
      default: '复制代码'
    }
  },
  data() {
    return {
      isCopied: false,
      copyTimeout: null
    }
  },
  computed: {
    languageName() {
      return LANGUAGE_MAP[this.language] || this.language.toUpperCase()
    }
  },
  mounted() {
    this.setupHighlightJS()
  },
  methods: {
    async copyCode() {
      try {
        await navigator.clipboard.writeText(this.code)
        this.showCopiedState()
      } catch (error) {
        // 降级方案：使用传统方法
        this.fallbackCopy()
      }
    },
    
    fallbackCopy() {
      const textArea = document.createElement('textarea')
      textArea.value = this.code
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        this.showCopiedState()
      } catch (error) {
        console.error('复制失败:', error)
      } finally {
        document.body.removeChild(textArea)
      }
    },
    
    showCopiedState() {
      this.isCopied = true
      this.$emit('copied', this.code)
      
      // 清除之前的定时器
      if (this.copyTimeout) {
        clearTimeout(this.copyTimeout)
      }
      
      // 3秒后恢复原始状态
      this.copyTimeout = setTimeout(() => {
        this.isCopied = false
      }, 3000)
    },
    
    setupHighlightJS() {
      if (!window.hljs) {
        this.loadHighlightJS()
      } else {
        this.highlightCode()
      }
    },
    
    loadHighlightJS() {
      // 检查是否已经加载
      if (document.querySelector(`link[href*="${APP_CONFIG.CODE_HIGHLIGHT.CDN_URL}"]`)) {
        return
      }
      
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `${APP_CONFIG.CODE_HIGHLIGHT.CDN_URL}/styles/${APP_CONFIG.CODE_HIGHLIGHT.THEME}`
      document.head.appendChild(link)
      
      const script = document.createElement('script')
      script.src = `${APP_CONFIG.CODE_HIGHLIGHT.CDN_URL}/highlight.min.js`
      script.onload = () => {
        if (window.hljs) {
          this.highlightCode()
        }
      }
      document.head.appendChild(script)
    },
    
    highlightCode() {
      if (window.hljs && this.$refs.codeElement) {
        window.hljs.highlightElement(this.$refs.codeElement)
      }
    }
  },
  
  beforeUnmount() {
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout)
    }
  }
}
</script>

<style scoped>
.code-block-wrapper {
  position: relative;
  margin: var(--spacing-lg) 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-primary);
}

.code-block {
  margin: 0;
  padding: var(--spacing-xl);
  background-color: var(--color-bg-tertiary);
  overflow-x: auto;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

.code-block code {
  background: none;
  padding: 0;
  border: none;
  font-size: inherit;
  font-family: inherit;
}

.copy-button {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: var(--font-size-sm);
  opacity: 0.7;
  backdrop-filter: blur(10px);
}

.copy-button:hover {
  opacity: 1;
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.copy-button.copied {
  background-color: var(--color-success);
  color: white;
  border-color: var(--color-success);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .code-block {
    padding: var(--spacing-lg);
    font-size: var(--font-size-xs);
  }
  
  .copy-button {
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}
</style>
