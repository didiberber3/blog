<template>
  <div class="home">
    <div class="intro">
      <h2>欢迎来到我的博客</h2>
      <p>分享技术心得，记录生活点滴</p>
    </div>
    
    <div class="articles-list">
      <article 
        v-for="article in articles" 
        :key="article.slug"
        class="article-item"
        @click="goToArticle(article.slug)"
      >
        <h3 class="article-title">{{ article.title }}</h3>
        <p class="article-meta">
          <span class="date">{{ formatDate(article.date) }}</span>
          <span class="author">{{ article.author }}</span>
        </p>
        <p class="article-excerpt">{{ article.excerpt }}</p>
      </article>
    </div>
    
    <div v-if="articles.length === 0" class="no-articles">
      <p>暂无文章，请在 pages/ 目录下添加 .md 文件</p>
    </div>
  </div>
</template>

<script>
import { getArticles } from '../utils/articles.js'

export default {
  name: 'Home',
  data() {
    return {
      articles: []
    }
  },
  mounted() {
    this.articles = getArticles()
  },
  methods: {
    goToArticle(slug) {
      this.$router.push(`/article/${slug}`)
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
.intro {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 1px solid #eee;
}

.intro h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.intro p {
  font-size: 1.1rem;
  color: #666;
}

.articles-list {
  margin-top: 2rem;
}

.article-item {
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.article-item:hover {
  background-color: #f8f9fa;
  margin: 0 -1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 8px;
}

.article-item:last-child {
  border-bottom: none;
}

.article-title {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
}

.article-meta {
  margin-bottom: 1rem;
  color: #888;
  font-size: 0.9rem;
}

.article-meta .date {
  margin-right: 1rem;
}

.article-meta .author::before {
  content: '作者: ';
}

.article-excerpt {
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
}

.no-articles {
  text-align: center;
  color: #888;
  padding: 3rem 0;
}

.no-articles p {
  font-size: 1.1rem;
}
</style>
