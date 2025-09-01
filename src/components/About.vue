<template>
  <div class="about">
    <div class="about-header">
      <div class="avatar-container">
        <!-- 头像实现方式1：相对路径 -->
        <!-- <img src="/avatar.jpg" alt="头像" class="avatar" /> -->
        
        <!-- 头像实现方式2：绝对路径 -->
        <!-- <img src="https://example.com/path/to/avatar.jpg" alt="头像" class="avatar" /> -->
        
        <!-- 默认头像 -->
        <div class="avatar-placeholder">
          <span class="avatar-text">{{ blogOwnerName.charAt(0) }}</span>
        </div>
      </div>
      
      <h2 class="owner-name">{{ blogOwnerName }}</h2>
      <p class="owner-description">{{ ownerDescription }}</p>
    </div>
    
    <div class="links-section">
      <h3 class="section-title">找到我</h3>
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
    
    <div class="content-section">
      <h3 class="section-title">关于博客</h3>
      <div class="content-editor">
        <div v-if="!isEditing" class="content-display" v-html="parsedContent"></div>
        <div v-else class="content-edit">
          <textarea 
            v-model="editableContent" 
            class="content-textarea"
            placeholder="在这里编写关于页面的内容，支持 Markdown 格式..."
          ></textarea>
          <div class="edit-actions">
            <button @click="saveContent" class="btn btn-primary btn-with-icon">
              <span class="btn-icon">💾</span>
              <span>保存</span>
            </button>
            <button @click="cancelEdit" class="btn btn-outline btn-with-icon">
              <span class="btn-icon">❌</span>
              <span>取消</span>
            </button>
          </div>
        </div>
        <button v-if="!isEditing" @click="startEdit" class="btn btn-primary btn-with-icon">
          <span class="btn-icon">✏️</span>
          <span>编辑内容</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  name: 'About',
  data() {
    return {
      blogOwnerName: 'Didiberber',
      ownerDescription: '师承韩顺平，师兄CodeLee',
      isEditing: false,
      aboutContent: `# 欢迎来到我的博客

这里是我分享技术心得、生活感悟和随想的地方。

## 关于这个博客

- 🔧 使用 Vue.js 构建
- 📝 支持 Markdown 写作
- 🎨 简洁的设计风格
- 📱 响应式布局

## 联系方式

如果你有任何问题或想法，欢迎通过上方的链接联系我！`,
      editableContent: '',
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
  },
  computed: {
    parsedContent() {
      const md = new MarkdownIt()
      return md.render(this.aboutContent)
    }
  },
  methods: {
    startEdit() {
      this.editableContent = this.aboutContent
      this.isEditing = true
    },
    saveContent() {
      this.aboutContent = this.editableContent
      this.isEditing = false
      // 这里可以添加保存到本地存储或发送到服务器的逻辑
      localStorage.setItem('aboutContent', this.aboutContent)
    },
    cancelEdit() {
      this.editableContent = ''
      this.isEditing = false
    },
    loadSavedContent() {
      const saved = localStorage.getItem('aboutContent')
      if (saved) {
        this.aboutContent = saved
      }
    }
  },
  mounted() {
    this.loadSavedContent()
  }
}
</script>

<style scoped src="../styles/About.css"></style>
