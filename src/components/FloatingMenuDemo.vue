<template>
  <div class="floating-menu-demo">
    <h1>🎯 悬浮菜单演示</h1>
    
    <div class="demo-section">
      <h2>基础悬浮菜单</h2>
      <div class="demo-row">
        <FloatingMenu 
          button-text="基础菜单"
          icon="📋"
          :menu-items="basicMenuItems"
          @item-click="handleBasicMenuClick"
        />
        
        <FloatingMenu 
          button-text="用户菜单"
          icon="👤"
          :menu-items="userMenuItems"
          @item-click="handleUserMenuClick"
        />
        
        <FloatingMenu 
          button-text="设置菜单"
          icon="⚙️"
          :menu-items="settingsMenuItems"
          @item-click="handleSettingsMenuClick"
        />
      </div>
    </div>
    
    <div class="demo-section">
      <h2>高级悬浮菜单</h2>
      <div class="demo-row">
        <FloatingMenu 
          button-text="高级菜单"
          icon="🚀"
          menu-title="功能中心"
          :show-close-button="true"
          :hide-delay="300"
          @item-click="handleAdvancedMenuClick"
        >
          <template #menu-items>
            <div class="custom-menu-item" @click="handleCustomAction('theme')">
              <span class="custom-icon">🎨</span>
              <div class="custom-content">
                <span class="custom-title">主题切换</span>
                <span class="custom-desc">切换明暗主题</span>
              </div>
            </div>
            
            <div class="custom-menu-item" @click="handleCustomAction('notification')">
              <span class="custom-icon">🔔</span>
              <div class="custom-content">
                <span class="custom-title">通知设置</span>
                <span class="custom-desc">管理通知偏好</span>
              </div>
            </div>
            
            <div class="custom-menu-item" @click="handleCustomAction('language')">
              <span class="custom-icon">🌐</span>
              <div class="custom-content">
                <span class="custom-title">语言设置</span>
                <span class="custom-desc">选择界面语言</span>
              </div>
            </div>
          </template>
          
          <template #menu-footer>
            <div class="menu-footer-actions">
              <button class="footer-btn primary" @click="handleCustomAction('help')">
                💡 帮助中心
              </button>
              <button class="footer-btn secondary" @click="handleCustomAction('feedback')">
                📝 意见反馈
              </button>
            </div>
          </template>
        </FloatingMenu>
        
        <FloatingMenu 
          button-text="文件菜单"
          icon="📁"
          menu-title="文件操作"
          :hide-delay="250"
          @item-click="handleFileMenuClick"
        >
          <template #menu-items>
            <div class="file-menu-item" @click="handleFileAction('new')">
              <span class="file-icon">📄</span>
              <span class="file-text">新建文件</span>
            </div>
            
            <div class="file-menu-item" @click="handleFileAction('open')">
              <span class="file-icon">📂</span>
              <span class="file-text">打开文件</span>
            </div>
            
            <div class="file-menu-item" @click="handleFileAction('save')">
              <span class="file-icon">💾</span>
              <span class="file-text">保存文件</span>
            </div>
            
            <div class="file-menu-item" @click="handleFileAction('export')">
              <span class="file-icon">📤</span>
              <span class="file-text">导出文件</span>
            </div>
          </template>
        </FloatingMenu>
      </div>
    </div>
    
    <div class="demo-section">
      <h2>导航栏集成示例</h2>
      <div class="demo-navbar">
        <div class="nav-brand">Demo App</div>
        
        <div class="nav-menu">
          <a href="#" class="nav-link">首页</a>
          <a href="#" class="nav-link">产品</a>
          <a href="#" class="nav-link">服务</a>
          
          <FloatingMenu 
            button-text="更多"
            icon="⋯"
            :menu-items="moreMenuItems"
            :hide-delay="200"
            class="nav-dropdown"
            @item-click="handleMoreMenuClick"
          />
        </div>
        
        <div class="nav-actions">
          <FloatingMenu 
            button-text="用户"
            icon="👤"
            :menu-items="profileMenuItems"
            :hide-delay="250"
            class="profile-dropdown"
            @item-click="handleProfileMenuClick"
          />
        </div>
      </div>
    </div>
    
    <div class="demo-section">
      <h2>交互说明</h2>
      <div class="interaction-info">
        <div class="info-item">
          <span class="info-icon">🖱️</span>
          <span class="info-text">桌面端：鼠标悬停显示菜单</span>
        </div>
        <div class="info-item">
          <span class="info-icon">👆</span>
          <span class="info-text">移动端：点击按钮显示菜单</span>
        </div>
        <div class="info-item">
          <span class="info-icon">⏱️</span>
          <span class="info-text">智能延迟：防止菜单意外消失</span>
        </div>
        <div class="info-item">
          <span class="info-icon">🔗</span>
          <span class="info-text">无缝连接：按钮到菜单的平滑过渡</span>
        </div>
      </div>
    </div>
    
    <!-- 操作日志 -->
    <div class="demo-section">
      <h2>操作日志</h2>
      <div class="action-log">
        <div 
          v-for="(log, index) in actionLogs" 
          :key="index"
          class="log-item"
        >
          <span class="log-time">{{ log.time }}</span>
          <span class="log-action">{{ log.action }}</span>
        </div>
        <div v-if="actionLogs.length === 0" class="log-empty">
          暂无操作记录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FloatingMenu from './common/FloatingMenu.vue'

export default {
  name: 'FloatingMenuDemo',
  components: {
    FloatingMenu
  },
  data() {
    return {
      actionLogs: [],
      basicMenuItems: [
        {
          path: '/demo/basic1',
          text: '基础功能1',
          icon: '🔧',
          description: '基础功能描述'
        },
        {
          path: '/demo/basic2',
          text: '基础功能2',
          icon: '⚡',
          description: '另一个基础功能'
        }
      ],
      userMenuItems: [
        {
          path: '/profile',
          text: '个人资料',
          icon: '👤',
          description: '查看和编辑个人资料'
        },
        {
          path: '/settings',
          text: '账户设置',
          icon: '⚙️',
          description: '管理账户设置'
        },
        {
          path: '/logout',
          text: '退出登录',
          icon: '🚪',
          description: '安全退出系统'
        }
      ],
      settingsMenuItems: [
        {
          path: '/settings/theme',
          text: '主题设置',
          icon: '🎨',
          description: '自定义界面主题'
        },
        {
          path: '/settings/notification',
          text: '通知设置',
          icon: '🔔',
          description: '管理通知偏好'
        },
        {
          path: '/settings/privacy',
          text: '隐私设置',
          icon: '🔒',
          description: '隐私和安全选项'
        }
      ],
      moreMenuItems: [
        {
          path: '/about',
          text: '关于我们',
          icon: 'ℹ️',
          description: '了解更多信息'
        },
        {
          path: '/contact',
          text: '联系我们',
          icon: '📧',
          description: '获取帮助和支持'
        },
        {
          path: '/blog',
          text: '博客',
          icon: '📝',
          description: '阅读最新文章'
        }
      ],
      profileMenuItems: [
        {
          path: '/profile',
          text: '个人资料',
          icon: '👤',
          description: '查看和编辑个人资料'
        },
        {
          path: '/dashboard',
          text: '控制台',
          icon: '📊',
          description: '访问管理控制台'
        },
        {
          path: '/logout',
          text: '退出登录',
          icon: '🚪',
          description: '安全退出系统'
        }
      ]
    }
  },
  methods: {
    addLog(action) {
      const now = new Date()
      const time = now.toLocaleTimeString()
      this.actionLogs.unshift({ time, action })
      
      // 限制日志数量
      if (this.actionLogs.length > 10) {
        this.actionLogs = this.actionLogs.slice(0, 10)
      }
    },
    
    handleBasicMenuClick(item) {
      this.addLog(`点击了基础菜单: ${item.text}`)
    },
    
    handleUserMenuClick(item) {
      this.addLog(`点击了用户菜单: ${item.text}`)
    },
    
    handleSettingsMenuClick(item) {
      this.addLog(`点击了设置菜单: ${item.text}`)
    },
    
    handleAdvancedMenuClick(item) {
      this.addLog(`点击了高级菜单: ${item.text}`)
    },
    
    handleFileMenuClick(item) {
      this.addLog(`点击了文件菜单: ${item.text}`)
    },
    
    handleMoreMenuClick(item) {
      this.addLog(`点击了更多菜单: ${item.text}`)
    },
    
    handleProfileMenuClick(item) {
      this.addLog(`点击了个人菜单: ${item.text}`)
    },
    
    handleCustomAction(action) {
      this.addLog(`执行了自定义操作: ${action}`)
    },
    
    handleFileAction(action) {
      this.addLog(`执行了文件操作: ${action}`)
    }
  }
}
</script>

<style scoped>
.floating-menu-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.floating-menu-demo h1 {
  text-align: center;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-3xl);
}

.demo-section {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-primary);
}

.demo-section h2 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-xl);
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: var(--spacing-sm);
}

.demo-row {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  align-items: flex-start;
}

/* 自定义菜单项样式 */
.custom-menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  cursor: pointer;
  border: 2px solid transparent;
}

.custom-menu-item:hover {
  background-color: var(--color-bg-hover);
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.custom-icon {
  font-size: var(--font-size-xl);
  width: 32px;
  text-align: center;
}

.custom-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.custom-title {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.custom-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* 文件菜单项样式 */
.file-menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  cursor: pointer;
  border: 2px solid transparent;
}

.file-menu-item:hover {
  background-color: var(--color-bg-hover);
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.file-icon {
  font-size: var(--font-size-lg);
  width: 24px;
  text-align: center;
}

.file-text {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

/* 菜单底部按钮 */
.menu-footer-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

.footer-btn.primary {
  background: var(--color-primary);
  color: white;
}

.footer-btn.primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
}

.footer-btn.secondary {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
}

.footer-btn.secondary:hover {
  background: var(--color-bg-hover);
  border-color: var(--color-primary);
}

/* 导航栏样式 */
.demo-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-lg);
}

.nav-brand {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-bg-hover);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.nav-dropdown,
.profile-dropdown {
  margin: 0;
}

/* 交互说明 */
.interaction-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-primary);
}

.info-icon {
  font-size: var(--font-size-xl);
}

.info-text {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

/* 操作日志 */
.action-log {
  max-height: 300px;
  overflow-y: auto;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.log-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border-primary);
  font-size: var(--font-size-sm);
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: var(--color-text-secondary);
  font-family: monospace;
}

.log-action {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.log-empty {
  text-align: center;
  color: var(--color-text-secondary);
  padding: var(--spacing-lg);
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .demo-row {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .demo-navbar {
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
  }
  
  .nav-menu {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .interaction-info {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .floating-menu-demo {
    padding: var(--spacing-md);
  }
  
  .demo-section {
    padding: var(--spacing-md);
  }
  
  .custom-menu-item,
  .file-menu-item {
    padding: var(--spacing-sm);
  }
}
</style>
