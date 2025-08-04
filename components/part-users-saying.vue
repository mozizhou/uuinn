<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

// 定义分类列表，用于自动滚动
const categories = [
  'Content Creators',
  'Influencers',
  'Shoppers',
  'Merchants',
  'Suppliers'
];

const activeCategory = ref('Content Creators');
let rotationInterval: number | null = null;
const sidebarRef = ref<HTMLElement | null>(null);

// 模拟不同分类的内容数据
const categoryContent = {
  'Content Creators': {
    image: '/assets/feature-1.jpg',
    avatar: '/assets/user-avatar.png',
    name: 'Alex Wang',
    role: 'Content Creators',
    testimonial: "I use UUININ to generate product videos in seconds—it saved me so much time."
  },
  'Influencers': {
    image: '/assets/feature-1.jpg',
    avatar: '/assets/user-avatar.png',
    name: 'Sara Chen',
    role: 'Influencers',
    testimonial: "UUININ helps me manage my brand partnerships efficiently and grow my audience."
  },
  'Shoppers': {
    image: '/assets/feature-1.jpg',
    avatar: '/assets/user-avatar.png',
    name: 'Mike Johnson',
    role: 'Shoppers',
    testimonial: "Finding the best deals has never been easier with UUININ's AI recommendations."
  },
  'Merchants': {
    image: '/assets/feature-1.jpg',
    avatar: '/assets/user-avatar.png',
    name: 'Lisa Zhang',
    role: 'Merchants',
    testimonial: "Our sales increased by 30% after implementing UUININ's AI marketing tools."
  },
  'Suppliers': {
    image: '/assets/feature-1.jpg',
    avatar: '/assets/user-avatar.png',
    name: 'David Kim',
    role: 'Suppliers',
    testimonial: "UUININ streamlined our inventory management and improved delivery times."
  }
};

// 获取当前激活分类的内容
const currentContent = computed(() => {
  return categoryContent[activeCategory.value];
});

// 获取当前激活分类的索引
const currentCategoryIndex = computed(() => {
  return categories.indexOf(activeCategory.value);
});

// 自动切换到下一个分类
const goToNextCategory = () => {
  const currentIndex = currentCategoryIndex.value;
  const nextIndex = (currentIndex + 1) % categories.length;
  activeCategory.value = categories[nextIndex];

  // 仅在按钮不可见时才滚动
  scrollToActiveButtonIfNeeded();
};

// 仅在按钮不可见时才滚动到当前激活的按钮
const scrollToActiveButtonIfNeeded = () => {
  nextTick(() => {
    const activeButton = document.querySelector('.category-btn.active');
    const sidebar = sidebarRef.value;

    if (!activeButton || !sidebar) return;

    const buttonRect = activeButton.getBoundingClientRect();
    const sidebarRect = sidebar.getBoundingClientRect();

    // 检查按钮是否完全在侧边栏可见区域内
    const isVisible = (
        buttonRect.top >= sidebarRect.top &&
        buttonRect.bottom <= sidebarRect.bottom
    );

    // 只有当按钮不可见时才滚动
    if (!isVisible) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  });
};

// 开始自动滚动
const startAutoRotation = () => {
  // 清除已有计时器
  if (rotationInterval) {
    clearInterval(rotationInterval);
  }

  // 每5秒自动切换一次
  rotationInterval = window.setInterval(goToNextCategory, 5000);
};

// 停止自动滚动
const stopAutoRotation = () => {
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }
};

// 手动选择分类时重置自动滚动计时器
const handleCategoryClick = (category: string) => {
  activeCategory.value = category;
  stopAutoRotation();
  startAutoRotation(); // 重置计时器
  scrollToActiveButtonIfNeeded();
};

// 组件挂载时开始自动滚动
onMounted(() => {
  startAutoRotation();
});

// 组件卸载时停止自动滚动
onUnmounted(() => {
  stopAutoRotation();
});
</script>

<template>
  <section class="use-cases-section">
    <!-- 标题与副标题 -->
    <div class="section-header">
      <h2 class="main-title">
        From Creators to Merchants,
        <span class="highlight">1000+ Use Cases for UUININ</span>
      </h2>
    </div>

    <!-- 左侧分类导航 + 右侧内容展示 -->
    <div class="content-wrapper">
      <aside class="sidebar" ref="sidebarRef">
        <button
            class="category-btn"
            :class="{ active: activeCategory === category }"
            @click="handleCategoryClick(category)"
            v-for="category in categories"
            :key="category"
        >
          {{ category }}
        </button>
      </aside>

      <!-- 右侧内容区 -->
      <div class="main-content">
        <div class="card">
          <!-- 背景图片 -->
          <img
              :src="currentContent.image"
              :alt="`${activeCategory} Use Case Preview`"
              class="card-bg"
          >
          <!-- 评价浮层 -->
          <div class="testimonial-overlay">
            <div class="user-info">
              <img
                  :src="currentContent.avatar"
                  :alt="`${currentContent.name} Avatar`"
                  class="avatar"
              >
              <div class="user-details">
                <span class="user-name">{{ currentContent.name }}</span>
                <span class="user-role">{{ currentContent.role }}</span>
              </div>
            </div>
            <button class="try-free-btn">Try Free</button>
            <p class="testimonial-text">
              {{ currentContent.testimonial }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.use-cases-section {
  background-color: #000;
  color: #fff;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 标题区域 */
.section-header {
  max-width: 1400px;
  width: 100%;
  margin-bottom: 4rem;
}
.main-title {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.5;
  text-align: center;
  padding: 0 1rem;
}
.highlight {
  color: #1d51fe;
  position: relative;
}
.highlight::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: rgba(29, 81, 254, 0.2);
  z-index: -1;
  border-radius: 3px;
}

/* 内容容器 */
.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  max-width: 1400px;
  width: 100%;
  padding: 0 1rem;
}

/* 左侧侧边栏 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 260px;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 1rem;
  scroll-behavior: smooth;
}

/* 自定义滚动条 */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 10px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 10px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.category-btn {
  background-color: #1a1a1a;
  border: 1px solid #333;
  color: #fff;
  padding: 1.25rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.15rem;
  transition: all 0.3s ease;
  text-align: left;
  line-height: 1.4;
}
.category-btn.active,
.category-btn:hover {
  background-color: #1d51fe;
  border-color: #1d51fe;
  transform: translateX(10px);
  box-shadow: 0 4px 12px rgba(29, 81, 254, 0.3);
}

/* 右侧内容区 */
.main-content {
  flex: 1;
  min-width: 350px;
  max-width: 700px;
}
.card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0,0,0,0.5);
  transform: transition 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
}
.card-bg {
  width: 100%;
  height: auto;
  display: block;
  opacity: 0.85;
  transition: transform 0.5s ease;
}
.card:hover .card-bg {
  transform: scale(1.03);
}

/* 评价浮层 */
.testimonial-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.8);
  margin: 1.8rem;
  border-radius: 14px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 用户信息行 */
.user-info {
  display: flex;
  align-items: center;
}
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 1.25rem 1.25rem 0;
  border: 2.5px solid #1d51fe;
  transition: transform 0.3s ease;
}
.user-info:hover .avatar {
  transform: scale(1.05);
}
.user-details {
  display: flex;
  flex-direction: column;
}
.user-name {
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.3;
}
.user-role {
  font-size: 0.95rem;
  color: #ccc;
  line-height: 1.3;
}

/* 按钮 */
.try-free-btn {
  position: absolute;
  top: 1.8rem;
  right: 1.8rem;
  background-color: rgba(51, 63, 255, 1);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}
.try-free-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(51, 63, 255, 0.4);
  background-color: rgba(61, 73, 255, 1);
}

/* 评价文案 */
.testimonial-text {
  font-size: 1rem;
  line-height: 1.8;
  font-weight: 300;
  margin: 1rem 1.25rem 1.8rem 1.25rem;
  transform: translateY(10px);
  animation: fadeInUp 0.6s forwards;
  animation-delay: 0.2s;
}

/* 动画效果 */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式适配 */
@media (max-width: 1024px) {
  .main-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .use-cases-section {
    padding: 4.5rem 1.5rem;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .content-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .sidebar {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: hidden;
    min-width: auto;
    max-height: auto;
    width: 100%;
    padding-right: 0;
    padding-bottom: 1rem;
  }

  /* 移动端横向滚动条 */
  .sidebar::-webkit-scrollbar {
    height: 4px;
  }

  .category-btn {
    flex: 0 0 auto;
    text-align: center;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    margin-right: 0.8rem;
  }

  .main-content {
    max-width: 100%;
    min-width: auto;
  }

  .testimonial-overlay {
    margin: 1.2rem;
  }

  .avatar {
    width: 60px;
    height: 60px;
  }

  .try-free-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.5rem;
  }

  .category-btn {
    font-size: 0.9rem;
    padding: 0.85rem;
  }

  .testimonial-text {
    font-size: 0.9rem;
  }
}
</style>
