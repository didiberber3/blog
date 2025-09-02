<template>
  <div id="app" :data-theme="isDarkTheme ? 'dark' : 'light'">
    <Header @theme-change="handleThemeChange" />
    
    <main class="main">
      <router-view />
    </main>
    
    <footer class="footer">
      <div class="header-container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>技术栈</h3>
            <TechStack />
          </div>
          
          <div class="footer-section">
            <h3>项目特性</h3>
            <ul class="features">
              <li>🎨 主题切换 (浅色/深色/自动)</li>
              <li>📱 响应式设计</li>
              <li>🔍 文章搜索</li>
              <li>📚 目录导航</li>
              <li>⚡ 性能优化</li>
              <li>🔌 插件系统</li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>关于项目</h3>
            <p>这是一个现代化的博客系统，采用模块化架构设计，具有良好的扩展性和维护性。</p>
            <div class="project-links">
              <a href="#" class="project-link">GitHub</a>
              <a href="#" class="project-link">文档</a>
              <a href="#" class="project-link">更新日志</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 Didiberber's Blog. 基于现代Web技术构建</p>
          <p class="build-info">版本: 1.0.0 | 最后更新: 2024年</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'
import TechStack from './components/common/TechStack.vue'

export default {
  name: 'App',
  components: {
    Header,
    TechStack
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
