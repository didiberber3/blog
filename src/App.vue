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
            <h3>🚀 技术栈</h3>
            <TechStack />
          </div>
          
          <div class="footer-section">
            <h3>⚙️ 构建工具</h3>
            <ul class="features">
              <li>🔧 Vite 5.x - 下一代前端构建工具</li>
              <li>📦 ES Modules - 现代模块系统</li>
              <li>🎯 Vue 3 Composition API - 组合式API</li>
              <li>🔄 Hot Module Replacement - 热模块替换</li>
              <li>📱 PWA Ready - 渐进式Web应用</li>
              <li>🎨 CSS Variables - 动态主题系统</li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>🌐 部署信息</h3>
            <div class="deployment-info">
              <div class="deploy-item">
                <span class="deploy-icon">📡</span>
                <span class="deploy-label">部署平台:</span>
                <span class="deploy-value">GitHub Pages</span>
              </div>
              <div class="deploy-item">
                <span class="deploy-icon">🔗</span>
                <span class="deploy-label">访问地址:</span>
                <a href="https://didiberber3.github.io" target="_blank" class="deploy-link">didiberber3.github.io</a>
              </div>
              <div class="deploy-item">
                <span class="deploy-icon">📁</span>
                <span class="deploy-label">源码仓库:</span>
                <a href="https://github.com/didiberber3/gblog" target="_blank" class="deploy-link">GitHub</a>
              </div>
              <div class="deploy-item">
                <span class="deploy-icon">🚀</span>
                <span class="deploy-label">构建命令:</span>
                <code class="deploy-code">npm run build</code>
              </div>
            </div>
          </div>
          
          <div class="footer-section">
            <h3>🔗 快速链接</h3>
            <div class="quick-links">
              <a href="/about" class="quick-link">关于博客</a>
              <a href="/articles" class="quick-link">所有文章</a>
              <a href="https://github.com/didiberber3" target="_blank" class="quick-link">GitHub</a>
              <a href="https://space.bilibili.com/487735502" target="_blank" class="quick-link">哔哩哔哩</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 Didiberber's Blog. 基于现代Web技术构建</p>
          <p class="build-info">
            版本: 1.0.0 | 最后更新: 2024年 | 
            构建工具: Vite 5.x | 
            部署平台: GitHub Pages
          </p>
          <p class="tech-credits">
            技术驱动: Vue 3 + Vite + Markdown-it | 
            托管服务: GitHub Pages | 
            代码仓库: GitHub
          </p>
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
