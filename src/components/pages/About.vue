<template>
  <div class="about">
    <div class="container">
      <header class="page-header">
        <h1 class="page-title">关于我</h1>
        <p class="page-description">了解更多关于这个博客和我的故事</p>
      </header>

      <div class="about-content">
        <section class="intro-section">
          <div class="intro-text">
            <h2>欢迎来到我的技术世界</h2>
            <p>
              我是 Didiberber，一名热爱编程的开发者。这个博客是我分享技术心得、
              记录学习历程和探索新技术的地方。
            </p>
            <p>
              在这里，你可以找到关于前端开发、Vue.js、JavaScript 以及其他
              编程相关的文章和教程。我希望这些内容能够帮助到同样热爱编程的你。
            </p>
          </div>
        </section>

        <section class="skills-section">
          <h2>技术栈</h2>
          <div class="skills-grid">
            <div class="skill-category">
              <h3>前端开发</h3>
              <ul>
                <li>Vue.js 3</li>
                <li>JavaScript (ES6+)</li>
                <li>HTML5 & CSS3</li>
                <li>Vite</li>
                <li>Vue Router</li>
              </ul>
            </div>
            <div class="skill-category">
              <h3>工具与平台</h3>
              <ul>
                <li>Git & GitHub</li>
                <li>VS Code</li>
                <li>GitHub Pages</li>
                <li>Markdown</li>
                <li>Node.js</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="blog-section">
          <h2>关于这个博客</h2>
          <p>
            这个博客使用 Vue 3 + Vite 构建，采用现代化的前端技术栈。
            所有文章都以 Markdown 格式编写，支持代码高亮和丰富的排版。
          </p>
          <div class="tech-features">
            <div class="feature">
              <h4>🚀 现代化技术</h4>
              <p>基于 Vue 3 Composition API 和 Vite 构建工具</p>
            </div>
            <div class="feature">
              <h4>📱 响应式设计</h4>
              <p>完美适配桌面端和移动端设备</p>
            </div>
            <div class="feature">
              <h4>🌙 暗色主题</h4>
              <p>支持亮色/暗色主题切换</p>
            </div>
            <div class="feature">
              <h4>⚡ 快速加载</h4>
              <p>优化的构建配置，确保快速的页面加载</p>
            </div>
          </div>
        </section>

        <section class="contact-section">
          <h2>联系方式</h2>
          <div class="contact-links">
            <a href="https://github.com/didiberber3" target="_blank" class="contact-link">
              <span class="contact-icon">📱</span>
              <span>GitHub</span>
            </a>
            <a href="https://space.bilibili.com/487735502" target="_blank" class="contact-link">
              <span class="contact-icon">📺</span>
              <span>哔哩哔哩</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  min-height: 100vh;
  padding: var(--spacing-2xl) 0;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-4xl);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.page-description {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.intro-section,
.skills-section,
.blog-section,
.contact-section {
  margin-bottom: var(--spacing-4xl);
}

.intro-section h2,
.skills-section h2,
.blog-section h2,
.contact-section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xl);
}

.intro-text p {
  color: var(--color-text-primary);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
  font-size: 1.1rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.skill-category {
  background-color: var(--color-bg-secondary);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-primary);
}

.skill-category h3 {
  color: var(--color-primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
}

.skill-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skill-category li {
  color: var(--color-text-primary);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border-primary);
}

.skill-category li:last-child {
  border-bottom: none;
}

.blog-section p {
  color: var(--color-text-primary);
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
  font-size: 1.1rem;
}

.tech-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.feature {
  text-align: center;
  padding: var(--spacing-lg);
}

.feature h4 {
  color: var(--color-text-primary);
  font-size: 1.1rem;
  margin-bottom: var(--spacing-md);
}

.feature p {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.contact-links {
  display: flex;
  gap: var(--spacing-xl);
  justify-content: center;
  flex-wrap: wrap;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-xl);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
}

.contact-link:hover {
  background-color: var(--color-primary-light);
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
}

.contact-icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-features {
    grid-template-columns: 1fr;
  }
  
  .contact-links {
    flex-direction: column;
    align-items: center;
  }
}
</style>
