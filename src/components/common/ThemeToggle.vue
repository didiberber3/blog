<template>
  <button @click="toggleTheme" class="theme-toggle" :title="toggleTitle">
    {{ themeIcon }}
  </button>
</template>

<script>
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../../utils/storage.js'

export default {
  name: 'ThemeToggle',
  data() {
    return {
      isDarkTheme: false
    }
  },
  computed: {
    themeIcon() {
      return this.isDarkTheme ? '☀️' : '🌙'
    },
    toggleTitle() {
      return this.isDarkTheme ? '切换到浅色主题' : '切换到深色主题'
    }
  },
  mounted() {
    this.loadTheme()
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme
      this.applyTheme()
      this.saveTheme()
      this.$emit('theme-change', this.isDarkTheme ? 'dark' : 'light')
    },
    
    loadTheme() {
      const savedTheme = getStorageItem(STORAGE_KEYS.THEME, 'light')
      this.isDarkTheme = savedTheme === 'dark'
      this.applyTheme()
    },
    
    saveTheme() {
      setStorageItem(STORAGE_KEYS.THEME, this.isDarkTheme ? 'dark' : 'light')
    },
    
    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light')
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  cursor: pointer;
  font-size: var(--font-size-lg);
  transition: all var(--transition-normal);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.theme-toggle:hover {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: scale(1.05);
  box-shadow: var(--shadow-sm);
}

.theme-toggle:active {
  transform: scale(0.95);
}
</style>
