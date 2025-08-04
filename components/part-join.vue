<script setup lang="ts">

</script>

<template>
  <section class="hero-section">
    <!-- 标题 -->
    <h2 class="hero-title">Join UUINN Community Today</h2>
    <!-- 按钮组 -->
    <div class="button-group">
      <button class="btn get-inspired">Get Inspired</button>
      <button class="btn create-now">Create Now</button>
    </div>
  </section>
</template>

<style scoped>
/* 容器基础样式：深色背景、曲线装饰、居中内容 */
.hero-section {
  background-image: url('/background.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; /* 保持图片比例并完整显示 */
  text-align: center;
  padding: 80px 20px;
  position: relative;
  overflow: hidden;

  /* 增加最小高度以确保图片完整显示 */
  min-height: 80vh; /* 占视口高度的80% */

  /* 使用flexbox垂直居中内容 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 标题样式：居中、白色、较大字号 */
.hero-title {
  color: #ffffff;
  font-size: clamp(2rem, 5vw, 3.5rem); /* 响应式字体大小 */
  font-weight: 600;
  margin-bottom: 30px;
  line-height: 1.4;
}

/* 按钮组：水平排列、居中 */
.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

/* 通用按钮基础样式 */
.btn {
  padding: 14px 36px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
}

/* “Get Inspired” 按钮样式 */
.get-inspired {
  background-color: #2b59ff;
  color: #ffffff;
  border: none;
}

.get-inspired:hover {
  background-color: #4b73ff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(43, 89, 255, 0.3);
}

/* “Create Now” 按钮样式 */
.create-now {
  background-color: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;
}

.create-now:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
}

/* 响应式适配：小屏幕下调整标题大小、按钮间距等 */
@media (max-width: 768px) {
  .hero-section {
    min-height: 70vh;
    padding: 60px 15px;
  }

  .hero-title {
    font-size: clamp(1.6rem, 4vw, 2.5rem);
  }

  .button-group {
    flex-direction: column;
    gap: 15px;
    width: 90%;
  }

  .btn {
    width: 100%;
    max-width: none;
    padding: 12px 24px;
  }
}
</style>