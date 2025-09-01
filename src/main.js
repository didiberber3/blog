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



app.mount('#app')
