<template>
  <div class="blog-page">
    <!-- 顶部横幅 -->
    <div class="blog-banner">
      <div class="banner-overlay">
        <div class="logo-container">
          <img src="/logo.png" alt="UUINN Logo" class="banner-logo"/>
        </div>
        <p class="banner-subtitle">
          Insights from our AI commerce team on how digital humans, AIGC and data intelligence
          are reshaping the future of online retail.
        </p>
        <!-- 搜索功能区域 -->
        <div class="search-bar">
          <input
              v-model="searchQuery"
              class="search-input"
              placeholder="Search"
              @keyup.enter="fetchPosts"
          />
          <button class="search-button" @click="fetchPosts">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path
                  d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 20l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 10.5 5 16 7.01 16 9.5 13.99 14 10.5 14z"
                  fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 分类筛选（改为多选） -->
    <div class="filter-bar">
      <h2 class="topics-title">Topics</h2>
      <button
          v-for="(cat, index) in categories"
          :key="cat.id"
          class="filter-button"
          :class="{ active: selectedCategoryIds.includes(cat.id) }"
          @click="handleCategorySelect(cat.id)"
      >
        {{ cat.name }}
      </button>

      <!-- 清除筛选按钮 -->
      <button
          class="clear-filters"
          @click="clearAllFilters"
          v-if="selectedCategoryIds.length > 0"
      >
        Clear All
      </button>
    </div>

    <!-- 博客列表 -->
    <div class="blog-grid-container">
      <div class="blog-grid" v-if="!isLoading">
        <div
            class="blog-card"
            v-for="post in displayedPosts"
            :key="post.id"
            @click="openPost(post.link)"
        >
          <div class="card-image" :style="{ backgroundImage: `url(${post.featured_media_src})` }"></div>
          <div class="card-content">
            <h3 class="card-title" v-html="post.title.rendered"></h3>
            <p class="card-excerpt" v-html="post.excerpt.rendered"></p>
            <div class="card-meta">
              <span class="category-tag" :style="{ backgroundColor: categoryColor }">
                {{ getCategoryName(post.categories) }}
              </span>
              <span class="category-tag" :style="{ backgroundColor: categoryColor }">
                {{ formatDate(post.date) }}
              </span>
            </div>
          </div>
        </div>

        <!-- 加载更多按钮 -->
        <div class="load-more" v-if="hasMorePosts">
          <button class="load-more-btn" @click="loadMorePosts">
            {{ isLoadingMore ? 'Loading...' : 'Load More' }}
          </button>
        </div>
      </div>

      <!-- 加载状态 -->
      <div class="loading-state" v-if="isLoading">
        <div class="spinner"></div>
      </div>

      <!-- 无数据状态 -->
      <div class="no-posts" v-else-if="displayedPosts.length === 0">
        <p>No articles found. Try adjusting your filters or search query.</p>
      </div>
    </div>
  </div>

  <footer class="custom-footer">
    <div class="footer-left">
      <div class="logo">
        <img src="/logo.png" alt="UUINN Logo" />
      </div>
    </div>
    <div class="footer-right">
      <div class="social-icons">
        <a href="#" class="icon-btn facebook" aria-label="Facebook">
          <img src="/facebook-icon.png" alt="Facebook" />
        </a>
        <a href="#" class="icon-btn x" aria-label="X">
          <img src="/X-before-icon.png" alt="X" />
        </a>
        <a href="#" class="icon-btn linkedin" aria-label="LinkedIn">
          <img src="/linkedin-write-icon.png" alt="LinkedIn" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {ref, onMounted, computed, getCurrentInstance, onUnmounted} from 'vue'

// 跟踪组件是否挂载
const isMounted = ref(true)
const instance = getCurrentInstance()

// 组件卸载时标记为未挂载
onUnmounted(() => {
  isMounted.value = false
})

// WordPress 配置
const wordpressApiUrl = 'http://47.99.32.217/wp-json/wp/v2'
const perPage = 9

// 响应式数据 - 将单选改为多选数组
const posts = ref<any[]>([])
const categories = ref<any[]>([])
const isLoading = ref(true)
const isLoadingMore = ref(false)
const hasMorePosts = ref(false)
const currentPage = ref(1)
const searchQuery = ref('')
const selectedCategoryIds = ref<number[]>([]) // 存储多个选中的分类ID
const categoryColor = ref('rgba(38, 38, 38, 1)')

// 初始化数据
onMounted(async () => {
  await fetchCategories()
  await fetchPosts()
})

/**
 * 获取文章分类
 */
const fetchCategories = async () => {
  try {
    const response = await fetch(`${wordpressApiUrl}/categories?per_page=100`)
    const allCategories = await response.json()
    if (isMounted.value) {
      categories.value = allCategories.filter((cat: any) => cat.id !== 1 && cat.count > 0)
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

/**
 * 获取文章列表（支持多分类筛选）
 */
const fetchPosts = async (resetPage = true) => {
  if (resetPage) {
    currentPage.value = 1
    posts.value = []
  }
  isLoading.value = true

  try {
    const params = new URLSearchParams({
      per_page: perPage.toString(),
      page: currentPage.value.toString(),
      _embed: '1',
      search: searchQuery.value,
      // 多分类筛选参数，用逗号分隔多个ID
      ...(selectedCategoryIds.value.length > 0 && {
        categories: selectedCategoryIds.value.join(',')
      })
    })

    const response = await fetch(`${wordpressApiUrl}/posts?${params}`)
    const newPosts = await response.json()

    // 处理特色图片
    newPosts.forEach((post: any) => {
      post.featured_media_src = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
    })

    if (isMounted.value) {
      posts.value = [...posts.value, ...newPosts]
      hasMorePosts.value = newPosts.length === perPage
      currentPage.value++
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
  } finally {
    if (isMounted.value) {
      isLoading.value = false
    }
  }
}

/**
 * 加载更多文章
 */
const loadMorePosts = async () => {
  if (!isMounted.value || isLoadingMore.value || !hasMorePosts.value) return
  isLoadingMore.value = true

  try {
    await fetchPosts(false)
  } finally {
    if (isMounted.value) {
      isLoadingMore.value = false
    }
  }
}

/**
 * 分类筛选 - 多选逻辑
 */
const handleCategorySelect = (categoryId: number) => {
  if (!isMounted.value) return

  // 检查当前分类是否已选中
  const index = selectedCategoryIds.value.indexOf(categoryId)

  if (index > -1) {
    // 如果已选中，则移除
    selectedCategoryIds.value = selectedCategoryIds.value.filter(id => id !== categoryId)
  } else {
    // 如果未选中，则添加
    selectedCategoryIds.value = [...selectedCategoryIds.value, categoryId]
  }

  // 触发筛选
  fetchPosts()
}

/**
 * 清除所有筛选
 */
const clearAllFilters = () => {
  if (selectedCategoryIds.value.length > 0) {
    selectedCategoryIds.value = []
    fetchPosts()
  }
}

/**
 * 计算最终显示的文章
 */
const displayedPosts = computed(() => {
  if (!searchQuery.value) return posts.value
  return posts.value.filter(post =>
      post.title.rendered.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.excerpt.rendered.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

/**
 * 辅助函数 - 获取分类名称
 */
const getCategoryName = (categoryIds: number[]) => {
  const category = categories.value.find(cat => categoryIds.includes(cat.id))
  return category ? category.name : 'Uncategorized'
}

/**
 * 辅助函数 - 格式化日期
 */
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * 打开文章详情
 */
const openPost = (link: string) => {
  window.open(link, '_blank')
}
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-page {
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  padding: 0;
}

.blog-banner {
  position: relative;
  background: url('/background.png') no-repeat center/cover;
  padding: 80px 20px;
  text-align: center;
  overflow: hidden;
}

.banner-overlay {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.banner-logo {
  height: 60px;
  margin-bottom: 20px;
}

.banner-subtitle {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.search-bar {
  display: flex;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.search-bar:hover {
  box-shadow: 0 0 10px rgba(75, 121, 255, 0.3);
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 12px 20px;
  color: #fff;
  font-size: 1rem;
  outline: none;
}

.search-input::placeholder {
  color: #aaa;
}

.search-button {
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: rgba(75, 121, 255, 0.3);
}

.search-icon {
  width: 20px;
  height: 20px;
}

.filter-bar {
  margin: 40px auto;
  display: flex;
  gap: 12px;
  padding: 0 20px;
  flex-wrap: wrap;
  justify-content: left;
  max-width: 1200px;
}

.topics-title {
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.filter-button {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-button.active,
.filter-button:hover {
  background-color: #4b79ff;
  border-color: #4b79ff;
  transform: translateY(-2px);
}

/* 清除筛选按钮样式 */
.clear-filters {
  background-color: transparent;
  color: #4b79ff;
  border: 1px solid #4b79ff;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-filters:hover {
  background-color: rgba(75, 121, 255, 0.1);
}

/* 博客网格容器 */
.blog-grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

/* 博客网格 - 固定每行三个卡片 */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* 博客卡片 - 固定大小 */
.blog-card {
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image {
  width: 100%;
  padding-top: 60%;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
}

.card-content {
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.category-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  color: rgba(152, 152, 154, 1);
}

.post-date {
  color: #aaa;
  font-size: 0.875rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-shrink: 0;
}

.card-excerpt {
  color: #ccc;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.load-more {
  grid-column: 1 / -1;
  text-align: center;
  margin-top: 24px;
}

.load-more-btn {
  background-color: #4b79ff;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.load-more-btn:hover {
  background-color: #3a63e7;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #4b79ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 优化后的页脚样式 */
.custom-footer {
  background-color: #000;
  color: #fff;
  padding: 60px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-left {
  flex: 1;
  min-width: 280px;
  margin: 0 20px 40px;
}

.footer-left .logo img {
  max-height: 80px;
  margin-bottom: 20px;
  filter: brightness(1.2);
}

.footer-description {
  color: #aaa;
  line-height: 1.6;
  max-width: 400px;
  font-size: 0.95rem;
}

.footer-right {
  flex: 1;
  min-width: 280px;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.footer-heading {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #fff;
  font-weight: 600;
}

/* 社交图标方形按钮样式 - 带金属渐变 */
.social-icons {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
}

.icon-btn {
  width: 48px;
  height: 48px;
  border-radius: 4px; /* 方形按钮 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* 金属渐变效果 - 从上到下 */
.icon-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.icon-btn.facebook::before {
  background: linear-gradient(to bottom, rgba(36, 36, 36, 1), rgba(36, 36, 36, 0));
}

.icon-btn.x::before {
  background: linear-gradient(to bottom, rgba(36, 36, 36, 1), rgba(36, 36, 36, 0));
}

.icon-btn.linkedin::before {
  background: linear-gradient(to bottom, rgba(36, 36, 36, 1), rgba(36, 36, 36, 0));
}

.icon-btn img {
  width: 24px;
  height: 24px;
  z-index: 1;
  filter: brightness(1.2) contrast(1.1);
}

.icon-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.copyright {
  color: #888;
  font-size: 0.85rem;
  margin-top: auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.no-posts {
  text-align: center;
  padding: 40px;
  color: #aaa;
}

@media (max-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-right {
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .banner-subtitle {
    font-size: 0.9rem;
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }

  .custom-footer {
    padding: 40px 20px;
  }

  .icon-btn {
    width: 42px;
    height: 42px;
  }

  .icon-btn img {
    width: 20px;
    height: 20px;
  }
}
</style>
