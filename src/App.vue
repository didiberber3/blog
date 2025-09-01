<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <h1 class="logo">
          <router-link to="/">Didiberber</router-link>
        </h1>
      </div>
    </header>
    
    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 GBlog. 极简博客系统</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'

}
</script>
