<template>
  <header class="header">
    <div class="header-container">
      <h1 class="logo">
        <router-link to="/">Didiberber</router-link>
      </h1>
      
      <!-- 主导航区域 -->
      <div class="nav-section">
        <NavigationMenu />
        
        <!-- 主题切换 -->
        <div class="theme-toggle-wrapper">
          <ThemeToggle />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ThemeToggle from '../common/ThemeToggle.vue'
import NavigationMenu from '../common/NavigationMenu.vue'

export default {
  name: 'Header',
  components: {
    ThemeToggle,
    NavigationMenu
  }
}
</script>

<style scoped>
.header {
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-primary);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
}

.header-container {
  max-width: var(--container-max-width-wide);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  gap: var(--spacing-lg);
}

.logo {
  margin: 0;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.logo a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-normal);
}

.logo a:hover {
  color: var(--color-primary-dark);
}

.logo a:active {
  transform: scale(0.95);
}

/* 导航区域 */
.nav-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.theme-toggle-wrapper {
  display: flex;
  align-items: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-container {
    padding: 0 var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: var(--font-size-xl);
  }
  
  .header-container {
    padding: 0 var(--spacing-md);
  }
}
</style>
