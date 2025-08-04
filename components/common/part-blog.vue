<template>
  <div class="blog-carousel-container">
    <!-- 调试信息 (开发环境) -->
    <div class="debug-info" v-if="isDebug">
      Current Index: {{ currentIndex }} | Total: {{ posts.length }}
    </div>

    <!-- 标题与描述 -->
    <div class="carousel-header">
      <h2 class="carousel-title">Recommended Blogs</h2>
      <p class="carousel-description">
        Stay Updated With The Latest in AI Shopping Trends, Creator Economy Insights, And Smart E-Commerce Strategies.
      </p>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
    </div>

    <!-- 错误状态 -->
    <div v-if="isError" class="error-state">
      <p>Failed to load blog posts. Please try again later.</p>
      <button @click="fetchPosts" class="retry-button">Retry</button>
    </div>

    <!-- 轮播容器 -->
    <div v-else-if="posts.length > 0" class="carousel-wrapper">
      <!-- 左侧箭头 -->
      <button
          class="carousel-arrow left-arrow"
          @click="prevSlide"
          @mouseenter="onArrowHover('left')"
          @mouseleave="onArrowLeave('left')"
          aria-label="Previous slide"
      >
        <span class="arrow-icon">&lt;</span>
      </button>

      <!-- 卡片容器 -->
      <div
          class="carousel-track"
          :style="{
          transform: `translateX(-${(currentIndex * (slideWidth + gap))}px)`,
          transition: `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
        }"
          @mouseenter="stopAutoPlay"
          @mouseleave="startAutoPlay"
      >
        <!-- 克隆最后一个元素用于无缝循环 -->
        <div
            class="carousel-slide"
            v-if="posts.length > 0"
            :style="{ width: `${slideWidth}px` }"
            :key="'clone-last'"
            @mouseenter="hoveredSlide = posts.length - 1"
            @mouseleave="hoveredSlide = null"
        >
          <div class="post-image" :style="{ backgroundImage: `url(${posts[posts.length - 1].featured_media_src})` }"></div>
          <div class="post-content">
            <h3 class="post-title" v-html="posts[posts.length - 1].title.rendered"></h3>
            <p class="post-excerpt" v-html="posts[posts.length - 1].excerpt.rendered"></p>
          </div>
        </div>

        <!-- 主轮播卡片 -->
        <div
            class="carousel-slide"
            v-for="(post, index) in posts"
            :key="post.id"
            :style="{ width: `${slideWidth}px` }"
            :class="{
            active: index === currentIndex,
            hovered: hoveredSlide === index
          }"
            @mouseenter="hoveredSlide = index; stopAutoPlay()"
            @mouseleave="hoveredSlide = null; startAutoPlay()"
            @click="goToSlide(index)"
        >
          <div class="post-image" :style="{ backgroundImage: `url(${post.featured_media_src})` }"></div>
          <div class="post-content">
            <h3 class="post-title" v-html="post.title.rendered"></h3>
            <p class="post-excerpt" v-html="post.excerpt.rendered"></p>
          </div>
        </div>

        <!-- 克隆第一个元素用于无缝循环 -->
        <div
            class="carousel-slide"
            v-if="posts.length > 0"
            :style="{ width: `${slideWidth}px` }"
            :key="'clone-first'"
            @mouseenter="hoveredSlide = 0"
            @mouseleave="hoveredSlide = null"
        >
          <div class="post-image" :style="{ backgroundImage: `url(${posts[0].featured_media_src})` }"></div>
          <div class="post-content">
            <h3 class="post-title" v-html="posts[0].title.rendered"></h3>
            <p class="post-excerpt" v-html="posts[0].excerpt.rendered"></p>
          </div>
        </div>
      </div>

      <!-- 右侧箭头 -->
      <button
          class="carousel-arrow right-arrow"
          @click="nextSlide"
          @mouseenter="onArrowHover('right')"
          @mouseleave="onArrowLeave('right')"
          aria-label="Next slide"
      >
        <span class="arrow-icon">&gt;</span>
      </button>

      <!-- 分页指示器 -->
      <div class="carousel-pagination">
        <span
            v-for="(dot, index) in posts"
            :key="index"
            class="dot"
            :class="{ active: index === currentIndex }"
            @click="goToSlide(index)"
            @mouseenter="hoveredDot = index; stopAutoPlay()"
            @mouseleave="hoveredDot = null; startAutoPlay()"
            :aria-label="`Go to slide ${index + 1}`"
        ></span>
      </div>
    </div>

    <!-- 无数据状态 -->
    <div v-else class="no-data">
      No blog posts available.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

// 配置 - WordPress API设置
const isDebug = ref(false) // 调试模式，生产环境可设为false
const wordpressApiUrl = ref('https://uuinn.local/wp-json/wp/v2/posts') // 替换为你的WordPress站点API地址
const postsPerPage = ref(5) // 从WordPress获取的文章数量

// 响应式数据
const posts = ref<any[]>([])
const currentIndex = ref(0)
const autoPlayTimer = ref<number | null>(null)
const isLoading = ref(true)
const isError = ref(false) // 新增错误状态
const slideWidth = ref(320)
const gap = 20 // 卡片间距
const hoveredSlide = ref<number | null>(null)
const hoveredDot = ref<number | null>(null)
const arrowHoverState = ref<{left: boolean, right: boolean}>({left: false, right: false})

// 常量配置
const autoPlayInterval = 5000
const animationDuration = 600 // 延长动画时间使过渡更平滑
const activeScale = 1.08 // 当前项放大比例
const inactiveScale = 0.95 // 非当前项缩小比例

// 处理窗口大小变化 - 适应全屏宽度
const handleResize = () => {
  if (typeof window === 'undefined') return;

  // 计算可用宽度，减去两边留白
  const padding = 40; // 两边各留的空间
  const availableWidth = window.innerWidth - (padding * 2);

  if (window.innerWidth <= 768) {
    // 移动端显示1个卡片，宽度更宽松
    slideWidth.value = availableWidth - 40
  } else if (window.innerWidth <= 1024) {
    // 平板显示2个卡片
    slideWidth.value = Math.floor((availableWidth - gap) / 2)
  } else {
    // 桌面显示3个卡片
    slideWidth.value = Math.floor((availableWidth - gap * 2) / 3)
  }
}

// 处理箭头悬停
const onArrowHover = (direction: 'left' | 'right') => {
  arrowHoverState.value[direction] = true
  stopAutoPlay()
}

const onArrowLeave = (direction: 'left' | 'right') => {
  arrowHoverState.value[direction] = false
  startAutoPlay()
}

// 从WordPress API获取文章数据
const fetchPosts = async () => {
  try {
    isLoading.value = true
    isError.value = false // 重置错误状态

    // 构建WordPress API请求URL，包含必要的参数
    const url = new URL(wordpressApiUrl.value)
    url.searchParams.append('per_page', postsPerPage.value.toString())
    url.searchParams.append('status', 'publish') // 只获取已发布的文章
    url.searchParams.append('_embed', '1') // 嵌入相关资源，包括特色图片

    // 调用WordPress REST API
    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const rawPosts = await response.json()

    // 处理WordPress返回的数据格式，提取所需字段
    posts.value = rawPosts.map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      // 提取特色图片URL，如果没有则使用默认图片
      featured_media_src: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
          `https://picsum.photos/seed/${post.id}/600/400`
    }))

    currentIndex.value = 0
  } catch (error) {
    console.error('Error fetching posts from WordPress:', error)
    isError.value = true // 设置错误状态
    posts.value = []
  } finally {
    isLoading.value = false
  }
}

// 切换上一页
const prevSlide = () => {
  if (posts.value.length === 0) return;

  currentIndex.value--

  // 无缝循环逻辑
  if (currentIndex.value < 0) {
    // 先快速切换到克隆的最后一项
    currentIndex.value = posts.value.length
    nextTick(() => {
      const track = document.querySelector('.carousel-track')
      if (track) {
        track.style.transition = 'none'
        track.style.transform = `translateX(-${(currentIndex.value * (slideWidth.value + gap))}px)`

        // 强制重绘后应用动画
        nextTick(() => {
          track.style.transition = `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
          currentIndex.value = posts.value.length - 1
        })
      }
    })
  }
}

// 切换下一页
const nextSlide = () => {
  if (posts.value.length === 0) return;

  currentIndex.value++

  // 无缝循环逻辑
  if (currentIndex.value >= posts.value.length) {
    // 先播放到克隆的第一项动画
    nextTick(() => {
      setTimeout(() => {
        const track = document.querySelector('.carousel-track')
        if (track) {
          // 动画结束后快速切换回真实第一项
          track.style.transition = 'none'
          currentIndex.value = 0
          track.style.transform = `translateX(-${(currentIndex.value * (slideWidth.value + gap))}px)`

          // 恢复过渡效果
          nextTick(() => {
            track.style.transition = `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
          })
        }
      }, animationDuration)
    })
  }
}

// 跳转到指定页
const goToSlide = (index: number) => {
  if (index >= 0 && index < posts.value.length && index !== currentIndex.value) {
    currentIndex.value = index
  }
}

// 自动播放控制
const startAutoPlay = () => {
  if (autoPlayTimer.value) {
    clearInterval(autoPlayTimer.value)
  }

  if (posts.value.length > 1 &&
      hoveredSlide.value === null &&
      hoveredDot.value === null &&
      !arrowHoverState.value.left &&
      !arrowHoverState.value.right) {
    autoPlayTimer.value = window.setInterval(() => {
      nextSlide()
    }, autoPlayInterval) as unknown as number
  }
}

const stopAutoPlay = () => {
  if (autoPlayTimer.value) {
    clearInterval(autoPlayTimer.value)
    autoPlayTimer.value = null
  }
}

// 监听窗口大小变化
watch(slideWidth, () => {
  const track = document.querySelector('.carousel-track')
  if (track) {
    track.style.transition = 'none'
    track.style.transform = `translateX(-${(currentIndex.value * (slideWidth.value + gap))}px)`

    nextTick(() => {
      track.style.transition = `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
    })
  }
})

// 监听鼠标交互状态
watch([hoveredSlide, hoveredDot, () => arrowHoverState.value.left, () => arrowHoverState.value.right], () => {
  if (hoveredSlide.value !== null || hoveredDot.value !== null || arrowHoverState.value.left || arrowHoverState.value.right) {
    stopAutoPlay()
  } else if (posts.value.length > 1) {
    startAutoPlay()
  }
})

// 初始化
onMounted(async () => {
  await fetchPosts()
  handleResize()
  window.addEventListener('resize', handleResize)

  if (posts.value.length > 1) {
    // 初始定位到第一项
    const track = document.querySelector('.carousel-track')
    if (track) {
      track.style.transform = `translateX(-${(currentIndex.value * (slideWidth.value + gap))}px)`
    }
    startAutoPlay()
  }
})

onUnmounted(() => {
  stopAutoPlay()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* 整体容器 - 铺满屏幕宽度，保留边距 */
.blog-carousel-container {
  position: relative;
  width: 100%; /* 铺满整个屏幕宽度 */
  margin: 0 auto;
  overflow: hidden;
  background-color: #000; /* 黑色背景 */
  padding: 40px 40px; /* 两边留出40px空间 */
  box-sizing: border-box; /* 确保padding不会增加总宽度 */
}

/* 标题与描述 */
.carousel-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 0 20px;
}

.carousel-title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
  white-space: nowrap;
}

.carousel-description {
  font-size: 0.9rem;
  color: #ccc;
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.6;
  word-wrap: break-word;
}

/* 加载状态 */
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #2b59ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 错误状态样式 */
.error-state {
  text-align: center;
  padding: 40px;
  color: #ff4444;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.retry-button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #2b59ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background-color: #1a47e0;
}

/* 轮播容器 */
.carousel-wrapper {
  position: relative;
  height: auto;
  min-height: 480px;
  overflow: visible;
  margin: 0 auto;
  padding: 20px 0;
  width: 100%;
  box-sizing: border-box;
}

.carousel-track {
  display: flex;
  height: 100%;
  will-change: transform;
  padding: 10px 0;
}

/* 卡片样式 */
.carousel-slide {
  flex-shrink: 0;
  margin: 0 10px;
  background-color: #121212;
  border-radius: 8px;
  color: #fff;
  overflow: hidden;
  width: 320px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
  /* 基础状态与过渡效果 */
  transform: scale(var(--scale, 0.95));
  opacity: var(--opacity, 0.8);
  z-index: var(--z-index, 1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 当前激活项放大效果 */
.carousel-slide.active {
  --scale: 1.08;
  --opacity: 1;
  --z-index: 3;
  box-shadow: 0 8px 24px rgba(255,255,255,0.15);
}

/* 非激活项样式 */
.carousel-slide:not(.active) {
  transition-delay: 0.1s;
}

/* 悬停效果 */
.carousel-slide:hover,
.carousel-slide.hovered {
  --scale: 1.05;
  --opacity: 0.95;
  --z-index: 2;
  box-shadow: 0 6px 20px rgba(255,255,255,0.12);
}

/* 卡片图片 */
.post-image {
  width: 100%;
  padding-top: 60%; /* 16:9 比例 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide.active .post-image {
  transform: scale(1.05);
}

.carousel-slide:hover .post-image,
.carousel-slide.hovered .post-image {
  transform: scale(1.03);
}

/* 卡片内容 */
.post-content {
  padding: 22px;
  text-align: left;
}

.post-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #fff;
  transition: color 0.3s ease;
  line-height: 1.4;
  white-space: normal;
}

.post-excerpt {
  font-size: 0.95rem;
  color: #ccc;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 箭头样式 */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scale(1);
  background: rgba(0,0,0,0.7);
  color: #fff;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.8;
}

/* 箭头位置调整，与边距对齐 */
.left-arrow {
  left: 0;
}

.right-arrow {
  right: 0;
}

.carousel-arrow:hover {
  background: rgba(43, 89, 255, 0.9);
  transform: translateY(-50%) scale(1.15);
  opacity: 1;
  box-shadow: 0 4px 12px rgba(43, 89, 255, 0.4);
}

.arrow-icon {
  font-size: 1.2rem;
}

/* 分页指示器 - 修改为圆角横线样式 */
.carousel-pagination {
  display: flex;
  justify-content: center;
  gap: 12px; /* 增加间距使横线样式更美观 */
  margin-top: 30px;
  padding-bottom: 10px;
}

/* 未激活状态 - 小圆点 */
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #666;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1);
}

/* 激活状态 - 圆角横线 */
.dot.active {
  width: 24px; /* 横线宽度 */
  height: 8px; /* 横线高度 */
  border-radius: 4px; /* 圆角，为高度的一半 */
  background: #2b59ff;
  transform: scale(1); /* 取消之前的缩放 */
  box-shadow: 0 0 0 2px rgba(43, 89, 255, 0.3);
}

/* 悬停效果调整 */
.dot:hover:not(.active) {
  background: #aaa;
  transform: scale(1.2);
}

/* 无数据状态 */
.no-data {
  text-align: center;
  padding: 40px;
  color: #666;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .blog-carousel-container {
    padding: 40px 30px;
  }
}

@media (max-width: 992px) {
  .carousel-slide {
    width: 290px;
  }
}

@media (max-width: 768px) {
  .blog-carousel-container {
    padding: 30px 20px;
  }

  .carousel-slide {
    width: 280px;
    margin: 0 8px;
  }

  .carousel-title {
    font-size: 1.6rem;
  }

  .post-title {
    font-size: 1.1rem;
  }

  .carousel-arrow {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .blog-carousel-container {
    padding: 20px 15px;
  }

  .carousel-slide {
    width: calc(100% - 30px);
  }

  .post-excerpt {
    font-size: 0.85rem;
    -webkit-line-clamp: 3;
  }

  .carousel-description {
    font-size: 0.8rem;
  }

  .carousel-arrow {
    width: 36px;
    height: 36px;
  }
}
</style>
