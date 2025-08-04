<script setup lang="ts">
import { ref } from 'vue';

const activeCategory = ref('Content Creators');
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
      <aside class="sidebar">
        <button
            class="category-btn active"
            @click="activeCategory = 'Content Creators'"
        >
          Content Creators
        </button>
        <button
            class="category-btn"
            @click="activeCategory = 'Influencers'"
        >
          Influencers
        </button>
        <button
            class="category-btn"
            @click="activeCategory = 'Shoppers'"
        >
          Shoppers
        </button>
        <button
            class="category-btn"
            @click="activeCategory = 'Merchants'"
        >
          Merchants
        </button>
        <button
            class="category-btn"
            @click="activeCategory = 'Suppliers'"
        >
          Suppliers
        </button>
      </aside>

      <!-- 右侧内容区 -->
      <div class="main-content">
        <div class="card">
          <!-- 背景图片 -->
          <img
              src="/assets/feature-1.jpg"
              alt="Use Case Preview"
              class="card-bg"
          >
          <!-- 评价浮层 -->
          <div class="testimonial-overlay">
            <div class="user-info">
              <img
                  src="/assets/user-avatar.png"
                  alt="User Avatar"
                  class="avatar"
              >
              <div class="user-details">
                <span class="user-name">Alex Wang</span>
                <span class="user-role">Content Creators</span>
              </div>
            </div>
            <button class="try-free-btn">Try Free</button>
            <p class="testimonial-text">
              “I use UUININ to generate product videos in seconds—it saved me so much time.”
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
  padding: 6rem 2rem; /* 扩大上下内边距 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 标题区域 - 扩大尺寸 */
.section-header {
  max-width: 1400px; /* 加宽容器 */
  width: 100%;
  margin-bottom: 4rem; /* 增加底部间距 */
}
.main-title {
  font-size: 2.5rem; /* 增大标题字体 */
  font-weight: 600;
  line-height: 1.5; /* 增加行高 */
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

/* 内容容器 - 扩大间距 */
.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem; /* 增大左右区域间距 */
  max-width: 1400px; /* 加宽整体容器 */
  width: 100%;
  padding: 0 1rem;
}

/* 左侧侧边栏 - 扩大按钮 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* 增大按钮间距 */
  min-width: 260px; /* 加宽侧边栏 */
}
.category-btn {
  background-color: #1a1a1a;
  border: 1px solid #333;
  color: #fff;
  padding: 1.25rem 1.5rem; /* 加大按钮内边距 */
  border-radius: 10px; /* 加大圆角 */
  cursor: pointer;
  font-size: 1.15rem; /* 增大按钮字体 */
  transition: all 0.3s ease;
  text-align: left;
  line-height: 1.4;
}
.category-btn.active,
.category-btn:hover {
  background-color: #1d51fe;
  border-color: #1d51fe;
  transform: translateX(10px); /* 加大位移效果 */
  box-shadow: 0 4px 12px rgba(29, 81, 254, 0.3); /* 增加阴影 */
}

/* 右侧内容区 - 整体放大 */
.main-content {
  flex: 1;
  min-width: 350px; /* 加大最小宽度 */
  max-width: 700px; /* 加宽最大宽度 */
}
.card {
  position: relative;
  border-radius: 16px; /* 加大圆角 */
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0,0,0,0.5); /* 加深阴影 */
  transform: transition 0.3s ease;
}
.card:hover {
  transform: translateY(-5px); /* 增加悬停上浮效果 */
}
.card-bg {
  width: 100%;
  height: auto;
  display: block;
  opacity: 0.85;
  transition: transform 0.5s ease;
}
.card:hover .card-bg {
  transform: scale(1.03); /* 图片轻微放大效果 */
}

/* 评价浮层 - 扩大尺寸 */
.testimonial-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.8); /* 稍加深背景 */
  margin: 1.8rem; /* 加大边距 */
  border-radius: 14px; /* 加大圆角 */
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 用户信息行 - 放大元素 */
.user-info {
  display: flex;
  align-items: center;
}
.avatar {
  width: 70px; /* 加大头像 */
  height: 70px;
  border-radius: 50%;
  margin: 1.25rem 1.25rem 0; /* 加大边距 */
  border: 2.5px solid #1d51fe; /* 加粗边框 */
  transition: transform 0.3s ease;
}
.user-info:hover .avatar {
  transform: scale(1.05); /* 头像悬停放大 */
}
.user-details {
  display: flex;
  flex-direction: column;
}
.user-name {
  font-weight: 600;
  font-size: 1.2rem; /* 加大姓名字体 */
  line-height: 1.3;
}
.user-role {
  font-size: 0.95rem; /* 加大角色字体 */
  color: #ccc;
  line-height: 1.3;
}

/* 按钮 - 放大尺寸 */
.try-free-btn {
  position: absolute;
  top: 1.8rem;
  right: 1.8rem;
  background-color: rgba(51, 63, 255, 1);
  color: #fff;
  padding: 0.75rem 1.5rem; /* 加大按钮 */
  border-radius: 10px; /* 加大圆角 */
  border: none;
  cursor: pointer;
  font-size: 1rem; /* 加大按钮字体 */
  font-weight: 500;
  transition: all 0.3s ease;
}
.try-free-btn:hover {
  transform: translateY(-3px); /* 加大上浮效果 */
  box-shadow: 0 4px 12px rgba(51, 63, 255, 0.4); /* 增加按钮阴影 */
  background-color: rgba(61, 73, 255, 1);
}

/* 评价文案 - 放大字体 */
.testimonial-text {
  font-size: 1rem; /* 加大文案字体 */
  line-height: 1.8; /* 增加行高 */
  font-weight: 300;
  margin: 1rem 1.25rem 1.8rem 1.25rem; /* 调整边距 */
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

/* 响应式适配 - 按比例调整 */
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
    flex-wrap: wrap;
    justify-content: center;
    min-width: auto;
    gap: 0.8rem;
  }

  .category-btn {
    flex: 1;
    text-align: center;
    padding: 1rem;
    font-size: 1rem;
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
