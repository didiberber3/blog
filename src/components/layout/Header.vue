<template>
  <header class="header">
    <div class="header-container">
      <div class="header-left">
        <router-link to="/" class="logo">
          <span class="logo-text">Didiberber's Blog</span>
        </router-link>
      </div>
      
      <Navigation />
      
      <div class="header-right">
        <ThemeToggle @theme-change="$emit('theme-change', $event)" />
      </div>
    </div>
  </header>
</template>

<script>
import Navigation from './Navigation.vue'
import ThemeToggle from '../ui/ThemeToggle.vue'

export default {
  name: 'Header',
  components: {
    Navigation,
    ThemeToggle
  },
  emits: ['theme-change']
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
}

.header-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  text-decoration: none;
  color: var(--color-text-primary);
  font-weight: 600;
  font-size: 1.25rem;
  transition: color var(--transition-fast);
}

.logo:hover {
  color: var(--color-primary);
}

.logo-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 var(--spacing-lg);
  }
  
  .logo-text {
    font-size: 1.1rem;
  }
}
</style>
