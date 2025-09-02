<template>
  <button @click="toggleTheme" class="theme-toggle" :title="toggleTitle">
    {{ themeIcon }}
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '../../core/hooks/useTheme.js'

// 使用主题钩子
const {
  currentTheme,
  isDarkTheme,
  switchTheme,
  nextTheme
} = useTheme()

// 计算属性
const themeIcon = computed(() => {
  return isDarkTheme.value ? '☀️' : '🌙'
})

const toggleTitle = computed(() => {
  return isDarkTheme.value ? '切换到浅色主题' : '切换到深色主题'
})

// 方法
const toggleTheme = async () => {
  try {
    const nextThemeValue = currentTheme.value === 'light' ? 'dark' : 'light'
    const result = await switchTheme(nextThemeValue)
    
    if (result.success) {
      console.log('主题切换成功:', result.theme)
    } else {
      console.error('主题切换失败:', result.error)
    }
  } catch (error) {
    console.error('主题切换出错:', error)
  }
}

// 或者使用循环切换
const cycleTheme = async () => {
  try {
    await nextTheme()
  } catch (error) {
    console.error('主题循环切换出错:', error)
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
