<template>
  <nav class="navigation">
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/" class="nav-link" exact-active-class="active">
          首页
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/articles" class="nav-link" active-class="active">
          文章
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link" active-class="active">
          关于
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped>
.navigation {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--spacing-lg);
}

.nav-item {
  display: flex;
  align-items: center;
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-bg-secondary);
}

.nav-link.active {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: 1px;
}

@media (max-width: 768px) {
  .nav-list {
    gap: var(--spacing-md);
  }
  
  .nav-link {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.9rem;
  }
}
</style>
