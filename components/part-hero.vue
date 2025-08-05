<template>
  <div class="page-container">
    <!-- 主内容区域：文字左，图片右 -->
    <section class="main-content">
      <!-- 左侧文字区域 -->
      <div class="text-section">
        <h1 class="hero-title">
          <span class="title-line">One-Stop AI Smart Shopping</span>
          <span class="for-tag-container">
            Solution for
            <div class="tag-container">
              <span
                  class="merchant-tag"
                  :class="{ active: index === currentTagIndex }"
                  v-for="(tag, index) in tags"
                  :key="index"
              >
                {{ tag }}
              </span>
            </div>
          </span>
        </h1>
        <p class="hero-subtitle">Spend Less with More Fun</p>
        <div class="hero-desc">
          <p>Personal AI Shopping Assistant.</p>
          <p>Next Generation AI-Driven E-commerce Platform</p>
          <p>24/7 AI Live Streamers to Score the Best Products</p>
        </div>
        <div class="app-buttons">
          <button class="app-btn android-btn">
            <img src="/android-icon.png" alt="Android icon" class="app-icon" />
            Android版
          </button>
          <button class="app-btn ios-btn">
            <img src="/ios-icon.png" alt="iOS icon" class="app-icon" />
            App Store版
          </button>
        </div>
      </div>

      <!-- 右侧手机图片区域 -->
      <div class="image-section">
        <img src="/phone-demo.png" alt="Mobile app demonstration" class="phone-img" />
      </div>
    </section>

    <!-- 合作品牌区域（扩大显示） -->
    <section class="partners-section">
      <!-- 背景容器居中 -->
      <div class="partner-text-wrapper">
        <div class="partner-text-container">
          <p class="partner-text">
            Join thousands of users on UUININ to discover better deals and enjoy more fun
          </p>
        </div>
      </div>
      <div class="partner-logos">
        <img src="/zapier.png" alt="Zapier logo" class="partner-logo" />
        <img src="/spotify.png" alt="Spotify logo" class="partner-logo" />
        <img src="/zoom.png" alt="Zoom logo" class="partner-logo" />
        <img src="/slack.png" alt="Slack logo" class="partner-logo" />
        <img src="/amazon.png" alt="Amazon logo" class="partner-logo" />
        <img src="/adobe.png" alt="Adobe logo" class="partner-logo" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 定义要循环的标签列表
const tags = ['Shoppers', 'Merchants', 'Sales', 'Influencers', 'Streamers'];
const currentTagIndex = ref(0);
let tagInterval: number | null = null;

// 自动切换标签的函数
const startTagRotation = () => {
  // 每2秒切换一次标签
  tagInterval = window.setInterval(() => {
    currentTagIndex.value = (currentTagIndex.value + 1) % tags.length;
  }, 2000);
};

// 组件挂载时开始自动切换
onMounted(() => {
  startTagRotation();
});

// 组件卸载时清除定时器
onUnmounted(() => {
  if (tagInterval) {
    clearInterval(tagInterval);
  }
});
</script>

<style scoped>
.page-container {
  background-color: #000;
  color: #fff;
  min-height: calc(100vh - 72px); /* 减去Header高度 */
  box-sizing: border-box;
  padding: 60px 40px 0; /* 上下内边距，左右保持与Header一致 */
}

/* 主内容区域：文字左，图片右 */
.main-content {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  gap: 40px; /* 文字与图片之间的间距 */
  margin-bottom: 120px; /* 增加与下方品牌区域的距离 */
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

/* 左侧文字区域 - 居左显示 */
.text-section {
  flex: 1;
  text-align: left;
  padding-right: 20px;
}

.hero-title {
  font-size: 42px;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px; /* 两行之间的间距 */
}

.title-line {
  display: block; /* 确保第一行文字单独成行 */
}

.for-tag-container {
  display: flex;
  align-items: center; /* 垂直居中对齐for和标签 */
  gap: 8px; /* for与标签之间的间距 */
  white-space: nowrap; /* 防止for和标签换行 */
}

/* 标签容器样式 - 实现上下滚动效果 */
.tag-container {
  position: relative;
  height: 48px; /* 与文字高度匹配 */
  min-width: 120px; /* 确保标签文字不会被截断 */
  display: inline-block;
}

.merchant-tag {
  background-color: #007bff;
  color: #fff;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 28px;
  position: absolute;
  left: 0;
  top: 0;
  white-space: nowrap; /* 防止标签文字换行 */
  transition: transform 0.5s ease, opacity 0.5s ease;
  opacity: 0;
  transform: translateY(100%);
}

/* 激活状态的标签 - 显示在容器中 */
.merchant-tag.active {
  opacity: 1;
  transform: translateY(0);
  z-index: 1;
}

/* 上一个标签的退出动画 */
.merchant-tag:not(.active) {
  z-index: 0;
}

.hero-subtitle {
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 32px;
  opacity: 0.8;
  color: #ccc;
}

.hero-desc {
  font-size: 18px;
  font-weight: 50;
  line-height: 1.8;
  opacity: 0.6;
  margin-bottom: 40px;
  color: #ddd;
}

/* 下载按钮 - 扩大尺寸并添加悬停效果 */
.app-buttons {
  display: flex;
  gap: 20px; /* 增大按钮间距 */
}

.app-btn {
  display: flex;
  align-items: center;
  gap: 10px; /* 增大图标与文字间距 */
  padding: 16px 32px; /* 扩大按钮内边距 */
  border-radius: 16px; /* 增大圆角 */
  cursor: pointer;
  font-size: 18px; /* 增大文字 */
  transition: all 0.3s ease; /* 延长过渡时间，使放大更明显 */
  transform-origin: center; /* 确保从中心放大 */
}

/* 悬停时明显放大效果 */
.app-btn:hover {
  transform: scale(1.1); /* 放大10% */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* 添加阴影增强立体感 */
}

.android-btn {
  background-color: #4caf50;
  border: none;
  color: #fff;
}

.android-btn:hover {
  background-color: #43a047;
}

.ios-btn {
  background-color: #000;
  border: 1px solid #444;
  color: #fff;
}

.ios-btn:hover {
  background-color: #1a1a1a;
  border-color: #666; /* 悬停时加深边框色 */
}

.app-icon {
  height: 28px; /* 增大图标 */
  width: auto;
}

/* 右侧图片区域 - 居右显示 */
.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

.phone-img {
  max-width: 380px;
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* 合作品牌区域（扩大显示） */
.partners-section {
  width: 100%;
  max-width: 1600px; /* 扩大最大宽度 */
  margin-left: auto;
  margin-right: auto;
  padding: 60px 40px; /* 增加内边距 */
  border-top: 1px solid #222;
  background-color: #0a0a0a; /* 轻微背景色区分 */
  border-radius: 12px; /* 增加圆角 */
}

/* 新增外层容器用于居中 */
.partner-text-wrapper {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-bottom: 40px; /* 与下方Logo的间距 */
}

/* 文字背景容器 */
.partner-text-container {
  display: inline-block; /* 使容器大小适应文字 */
  background-color: rgba(26, 26, 26, 1); /* 灰色背景 */
  padding: 8px 16px; /* 上下8px，左右16px的内边距，与文字大小匹配 */
  border-radius: 20px; /* 轻微圆角 */
}

.partner-text {
  font-size: 18px;
  font-weight: 300;
  color: #ccc;
  text-align: center; /* 文字在容器内居中 */
  margin: 0; /* 清除默认margin，避免影响容器大小 */
}

.partner-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px; /* 增大图标间距 */
}

.partner-logo {
  height: 80px; /* 显著增大Logo尺寸 */
  width: auto;
  filter: brightness(0) invert(1);
  transition: all 0.3s ease; /* 增强过渡效果 */
  padding: 10px; /* 增加点击区域 */
}

.partner-logo:hover {
  opacity: 1;
  transform: scale(1.05); /* 悬停时轻微放大 */
}

/* 响应式调整 */
@media (max-width: 992px) {
  .main-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .image-section {
    justify-content: flex-start;
    margin-top: 40px;
    width: 100%;
  }

  .phone-img {
    max-width: 320px;
  }

  .hero-title {
    font-size: 32px;
  }

  .merchant-tag {
    font-size: 24px;
  }

  /* 移动端按钮调整 */
  .app-btn {
    padding: 14px 24px;
    font-size: 16px;
  }

  .app-btn:hover {
    transform: scale(1.05); /* 移动端放大效果稍弱 */
  }

  /* 移动端品牌区域调整 */
  .partners-section {
    padding: 40px 20px;
  }

  .partner-text-container {
    padding: 6px 12px;
  }

  .partner-text {
    font-size: 16px;
  }

  .partner-logos {
    gap: 30px;
  }

  .partner-logo {
    height: 40px;
  }
}
</style>
