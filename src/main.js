import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import { Home, Article, AllArticles, About } from './components/index.js'
import './styles/index.css'

const routes = [
  { path: '/', component: Home },
  { path: '/articles', component: AllArticles },
  { path: '/about', component: About },
  { path: '/article/:slug', component: Article, props: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)

// 额外的URL清理检查
function checkAndCleanUrl() {
  const currentUrl = window.location.href;
  
  if (currentUrl.includes('~and~') || currentUrl.includes('?/&/')) {
    console.log('Vue应用检测到问题URL，强制清理');
    window.location.replace('https://didiberber3.github.io/blog/#/');
    return false;
  }
  return true;
}

// 如果URL干净，才挂载应用
if (checkAndCleanUrl()) {
  app.mount('#app');
}
