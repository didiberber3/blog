<template>
  <div id="app" :data-theme="isDarkTheme ? 'dark' : 'light'">
    <Header 
      :show-toc="showToc" 
      :content="currentContent"
      @theme-change="handleThemeChange" 
    />
    
    <main class="main">
      <router-view @content-update="handleContentUpdate" />
    </main>
    
    <footer class="footer">
      <div class="header-container">
        <p>&copy; 2024 Blog. Didiberber</p>
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
      isDarkTheme: false,
      showToc: false,
      currentContent: ''
    }
  },
  watch: {
    $route(to) {
      // 只在文章页面显示目录
      this.showToc = to.name === 'Article'
    }
  },
  methods: {
    handleThemeChange(theme) {
      this.isDarkTheme = theme === 'dark'
    },
    
    handleContentUpdate(content) {
      this.currentContent = content
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
