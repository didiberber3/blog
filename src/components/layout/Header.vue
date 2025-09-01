<template>
  <header class="header">
    <div class="header-container">
      <h1 class="logo">
        <router-link to="/">Didiberber</router-link>
      </h1>
      
      <nav class="nav">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/articles" class="nav-link">文章</router-link>
        <router-link to="/about" class="nav-link">关于</router-link>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>

<script>
import ThemeToggle from '../common/ThemeToggle.vue'

export default {
  name: 'Header',
  components: {
    ThemeToggle
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
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo {
  margin: 0;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
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

.nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.nav-link {
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-secondary);
  transition: all var(--transition-normal);
}

.nav-link:hover {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: scale(1.05);
  box-shadow: var(--shadow-sm);
}

.nav-link.router-link-active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-primary);
}

.nav-link:active {
  transform: scale(0.95);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-container {
    padding: 0 var(--spacing-lg);
  }
  
  .nav {
    gap: var(--spacing-md);
  }
  
  .nav-link {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
  }
}
</style>
