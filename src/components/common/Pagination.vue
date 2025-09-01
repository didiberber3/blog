<template>
  <div v-if="totalPages > 1" class="pagination">
    <button 
      class="btn btn-outline btn-with-icon"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      <span class="btn-icon">⬅️</span>
      <span>{{ prevText }}</span>
    </button>
    
    <div class="page-numbers">
      <button 
        v-for="page in visiblePages" 
        :key="page"
        class="btn"
        :class="{ 'btn-primary': page === currentPage, 'btn-outline': page !== currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>
    
    <button 
      class="btn btn-outline btn-with-icon"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      <span>{{ nextText }}</span>
      <span class="btn-icon">➡️</span>
    </button>
  </div>
</template>

<script>
import { APP_CONFIG } from '../../config/constants.js'

export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    prevText: {
      type: String,
      default: '上一页'
    },
    nextText: {
      type: String,
      default: '下一页'
    }
  },
  computed: {
    visiblePages() {
      const total = this.totalPages
      const current = this.currentPage
      const delta = APP_CONFIG.PAGINATION.DELTA_PAGES
      
      let start = Math.max(1, current - delta)
      let end = Math.min(total, current + delta)
      
      // 确保显示足够的页码
      if (end - start < APP_CONFIG.PAGINATION.MAX_VISIBLE_PAGES - 1) {
        if (start === 1) {
          end = Math.min(total, start + APP_CONFIG.PAGINATION.MAX_VISIBLE_PAGES - 1)
        } else {
          start = Math.max(1, end - APP_CONFIG.PAGINATION.MAX_VISIBLE_PAGES + 1)
        }
      }
      
      const pages = []
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-change', page)
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-2xl);
  padding: var(--spacing-xl) 0;
  border-top: 1px solid var(--color-border-primary);
}

/* 使用统一的按钮样式 */

.page-numbers {
  display: flex;
  gap: var(--spacing-xs);
}

/* 激活状态样式 - 当前页码高亮 */
.btn.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-primary);
}

.btn.btn-primary:hover {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  transform: translateY(-4px);
  box-shadow: var(--shadow-primary-hover);
}

/* 禁用状态样式 */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn:disabled:hover {
  background-color: var(--color-bg-secondary) !important;
  border-color: transparent !important;
  transform: none !important;
  box-shadow: var(--shadow-sm) !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .pagination {
    flex-direction: column;
    gap: var(--spacing-lg);
  }
  
  .page-numbers {
    order: -1;
  }
  

}
</style>
