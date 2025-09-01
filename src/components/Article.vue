<template>
  <div class="article">
    <div v-if="article" class="article-content">
      <header class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <span class="date">发布于 {{ formatDate(article.date) }}</span>
          <span class="author">作者: {{ article.author }}</span>
        </div>
      </header>
      
      <div class="article-body" v-html="renderedContent"></div>
      
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
</template>

<script>
import { getArticleBySlug } from '../utils/articles.js'
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
      article: null
    }
  },
  computed: {
    renderedContent() {
      return this.article ? md.render(this.article.content) : ''
    }
  },
  mounted() {
    this.loadArticle()
  },
  watch: {
    slug() {
      this.loadArticle()
    }
  },
  methods: {
    loadArticle() {
      this.article = getArticleBySlug(this.slug)
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.article-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.article-title {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 700;
  line-height: 1.3;
}

.article-meta {
  color: #888;
  font-size: 0.9rem;
}

.article-meta .date {
  margin-right: 1.5rem;
}

.article-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.back-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

.not-found {
  text-align: center;
  padding: 3rem 0;
}

.not-found h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.not-found p {
  color: #666;
  margin-bottom: 2rem;
}
</style>
