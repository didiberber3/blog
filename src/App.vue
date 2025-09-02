<template>
  <div id="app" :data-theme="isDarkTheme ? 'dark' : 'light'">
    <Header @theme-change="handleThemeChange" />
    
    <main class="main">
      <router-view />
    </main>
    
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-tech">
          <div class="tech-item">Vue.js 3</div>
          <div class="tech-item">Vite 5.x</div>
          <div class="tech-item">Vue Router</div>
          <div class="tech-item">Markdown-it</div>
          <div class="tech-item">CSS Variables</div>
          <div class="tech-item">ES Modules</div>
          <div class="tech-item">GitHub Pages</div>
        </div>
        
        <div class="footer-bottom">
          <span>&copy; 2024 Didiberber's Blog</span>
          <span>•</span>
          <a href="https://github.com/didiberber3" target="_blank" class="footer-link">GitHub</a>
          <span>•</span>
          <a href="https://space.bilibili.com/487735502" target="_blank" class="footer-link">哔哩哔哩</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      isDarkTheme: false
    }
  },
  methods: {
    handleThemeChange(theme) {
      this.isDarkTheme = theme === 'dark'
    }
  }
}
</script>

<style scoped>
/* App.vue 特定样式 */
.main {
  min-height: calc(100vh - 120px); /* 减去header和footer的高度 */
  padding: var(--spacing-2xl) 0;
}

.footer {
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border-primary);
  padding: var(--spacing-xl) 0;
  text-align: center;
  color: var(--color-text-secondary);
}

.header-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}
</style>
