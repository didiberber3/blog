import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Article from './components/Article.vue'
import './style.css'

const routes = [
  { path: '/', component: Home },
  { path: '/article/:slug', component: Article, props: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
