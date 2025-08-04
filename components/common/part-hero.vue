<template>
  <div class="page-container">
    <!-- 主内容区域：文字左，图片右 -->
    <section class="main-content">
      <!-- 左侧文字区域 -->
      <div class="text-section">
        <h1 class="hero-title">
          One-Stop AI Smart Shopping Solution for
          <span class="merchant-tag">Merchant</span>
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
// 页面逻辑可以在这里添加
</script>

<style scoped>
.page-container {
  background-color: #000;
  color: #fff;
  min-height: calc(100vh - 72px); /* 减去Header高度 */
  box-sizing: border-box;
  padding: 60px 40px 80px; /* 上下内边距，左右保持与Header一致 */
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
}

.merchant-tag {
  background-color: #007bff;
  color: #fff;
  padding: 4px 12px;
  border-radius: 8px;
  margin-left: 8px;
  font-size: 28px;
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
