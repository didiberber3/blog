import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/blog/',
  assetsInclude: ['**/*.md'],
  // 确保 markdown 文件可以作为字符串导入
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  },
  // 处理文件导入
  optimizeDeps: {
    include: []
  },
  // 显式配置文件处理
  server: {
    fs: {
      allow: ['..']
    }
  }
})
