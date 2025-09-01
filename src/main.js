import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
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
  history: createWebHistory('/blog/'),
  routes
})

const app = createApp(App)
app.use(router)

// GitHub Pages SPA 路由处理
if (window.location.pathname.indexOf('/blog/') === 0) {
  const redirect = window.location.search.match(/redirect=([^&]+)/);
  if (redirect) {
    window.history.replaceState(null, null, 
      window.location.pathname + redirect[1] + window.location.hash
    );
  }
}

app.mount('#app')
