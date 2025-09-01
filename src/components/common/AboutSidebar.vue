<template>
  <div class="sidebar-section about-sidebar">
    <div class="about-header">
      <div class="avatar-container">
        <!-- 默认头像 -->
        <div class="avatar-placeholder">
          <span class="avatar-text">{{ blogOwnerName.charAt(0) }}</span>
        </div>
      </div>
      
      <h3 class="owner-name">{{ blogOwnerName }}</h3>
      <p class="owner-description">{{ ownerDescription }}</p>
    </div>
    
    <div class="links-section">
      <h4 class="section-title">找到我</h4>
      <div class="links-grid">
        <a 
          v-for="link in socialLinks" 
          :key="link.name"
          :href="link.url" 
          target="_blank" 
          class="social-link"
          :class="link.class"
        >
          <span class="link-icon">{{ link.icon }}</span>
          <span class="link-name">{{ link.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutSidebar',
  data() {
    return {
      blogOwnerName: 'Didiberber',
      ownerDescription: '师承韩顺平，师兄CodeLee',
      socialLinks: [
        {
          name: 'GitHub',
          url: 'https://github.com/didiberber3',
          icon: '🐙',
          class: 'github'
        },
        {
          name: '哔哩哔哩',
          url: 'https://space.bilibili.com/487735502',
          icon: '📺',
          class: 'bilibili'
        },
        {
          name: '邮箱',
          url: 'chenshi0720@outlook.com',
          icon: '📧',
          class: 'email'
        }
      ]
    }
  }
}
</script>

<style scoped>
.about-sidebar {
  text-align: center;
}

.about-header {
  margin-bottom: var(--spacing-xl);
}

.avatar-container {
  margin-bottom: var(--spacing-lg);
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: var(--shadow-md);
}

.avatar-text {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: white;
}

.owner-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.owner-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  line-height: 1.5;
  margin: 0;
}

.links-section {
  margin-top: var(--spacing-xl);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
}

.links-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: all var(--transition-normal);
}

.social-link:hover {
  background-color: var(--color-bg-hover);
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.social-link:active {
  transform: scale(0.95);
}

.link-icon {
  font-size: var(--font-size-lg);
  width: 24px;
  text-align: center;
}

.link-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}

/* 特定链接样式 */
.social-link.github:hover {
  border-color: #333;
}

.social-link.bilibili:hover {
  border-color: #00aeec;
}

.social-link.email:hover {
  border-color: #ea4335;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .avatar-placeholder {
    width: 60px;
    height: 60px;
  }
  
  .avatar-text {
    font-size: var(--font-size-xl);
  }
  
  .owner-name {
    font-size: var(--font-size-lg);
  }
  
  .links-grid {
    gap: var(--spacing-sm);
  }
  
  .social-link {
    padding: var(--spacing-sm) var(--spacing-md);
  }
}
</style>
