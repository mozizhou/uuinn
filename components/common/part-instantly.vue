<script setup lang="ts">

</script>

<template>
  <main class="features-section">
    <!-- 板块1：Smarter Shopping, Better Prices -->
    <section class="feature-block">
      <div class="text-group">
        <h2 class="feature-title">Smarter Shopping, Better Prices</h2>
        <p class="feature-desc">
          Enjoy an AI-enhanced shopping experience with lower costs,
          price comparisons, and random free product giveaways.  Let AI help you shop smarter.
        </p>
        <button class="feature-btn">Shop Now</button>
      </div>
      <div class="image-group">
        <img
            src="/images/feature-1.png"
            alt="Smarter Shopping Preview"
            class="feature-img"
        >
      </div>
    </section>

    <!-- 板块2：Watch Your Favorite Hosts Anytime -->
    <section class="feature-block reverse">
      <div class="text-group">
        <h2 class="feature-title" style="font-size: 26px">Watch Your Favorite Hosts Anytime</h2>
        <p class="feature-desc">
          Enjoy seamless access to your favorite livestreamers whenever you want.<br/>
          Never miss a deal or a moment of entertainment.
        </p>
        <button class="feature-btn">Show Now</button>
      </div>
      <div class="image-group">
        <img
            src="/images/feature-2.png"
            alt="Hosts Preview"
            class="feature-img"
        >
      </div>
    </section>

    <!-- 板块3：Create Videos, Earn Rewards -->
    <section class="feature-block">
      <div class="text-group">
        <h2 class="feature-title">Create Videos, Earn Rewards</h2>
        <p class="feature-desc">
          Everyone can be a creator.<br/>
          Watch or generate videos using our AI tools
          and start earning through your content.
        </p>
        <div class="btn-group">
          <button class="feature-btn ghost">Get UUINN</button>
          <button class="feature-btn ghost">Create Video Now</button>
        </div>
      </div>
      <div class="image-group">
        <img
            src="/images/feature-3.png"
            alt="Video Creation Preview"
            class="feature-img"
        >
      </div>
    </section>
  </main>
</template>

<style scoped>
.features-section {
  background-color: #000;
  color: #fff;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 120px; /* 增大板块之间的垂直距离，避免拥挤 */
}

/* 单个板块布局 - 核心调整：加大间距+拓宽文字区域 */
.feature-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 120px; /* 大幅增加文字与图片的水平间距（原60px） */
  max-width: 1200px; /* 拓宽整个板块的最大宽度（原1200px） */
  margin: 0 auto;
  width: 100%; /* 确保在宽屏上能占满可用空间 */
}

/* 反向排列（用于左右切换） */
.feature-block.reverse {
  flex-direction: row-reverse;
}

/* 文字组通用样式 - 核心调整：取消宽度限制 */
.text-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0; /* 避免flex布局下文字区域被压缩 */
  padding: 0 40px; /* 保留轻微内边距，避免文字贴边 */
}

.feature-title {
  font-size: 28px; /* 标题适当放大，提升视觉权重 */
  font-weight: 600;
  line-height: 1.4;
  color: #fff;
  margin: 0;
}

.feature-desc {
  font-size: 16px;
  line-height: 1.8; /* 加大行高，提升可读性 */
  color: #ccc;
  max-width: none; /* 完全取消文字描述的宽度限制（原400px） */
  width: 100%; /* 让文字占满文字区域的宽度 */
}

/* 按钮组（适配多按钮场景） */
.btn-group {
  display: flex;
  gap: 16px;
  align-self: flex-start; /* 按钮左对齐，与文字保持一致 */
}

/* 按钮通用样式 */
.feature-btn {
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
}

/* 实心按钮 */
.feature-btn:not(.outline):not(.ghost) {
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 125px;
  font-size: 14px;
}

.feature-btn:not(.outline):not(.ghost):hover {
  background-color: #005fe8;
  transform: translateY(-2px);
}

/* outline 按钮 */
.feature-btn.outline {
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}

.feature-btn.outline:hover {
  background-color: #007bff1a;
  transform: translateY(-2px);
}

/* 幽灵按钮（仅文字） */
.feature-btn.ghost {
  background-color: transparent;
  color: #ccc;
  border: 2px solid #444;
}

.feature-btn.ghost:hover {
  border-color: #ccc;
  color: #fff;
  transform: translateY(-2px);
}

/* 图片组通用样式 - 控制图片占比，避免挤压文字空间 */
.image-group {
  flex: 0 0 45%; /* 固定图片区域占比（45%），确保文字区域有足够空间 */
  display: flex;
  justify-content: center;
  padding: 0 20px;
}

.feature-img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0, 123, 255, 0.1);
}

/* 响应式适配 - 确保小屏幕体验 */
@media (max-width: 1200px) {
  .feature-block {
    gap: 80px; /* 中等屏幕适当减小间距 */
    max-width: 1400px;
  }
}

@media (max-width: 992px) {
  .feature-block,
  .feature-block.reverse {
    flex-direction: column;
    text-align: left; /* 移动端保持文字左对齐，更符合阅读习惯 */
    gap: 40px; /* 垂直排列时减小间距 */
  }

  .text-group {
    align-items: flex-start; /* 按钮和文字左对齐 */
    padding: 0;
  }

  .image-group {
    flex: 1;
    width: 100%;
    justify-content: flex-start; /* 图片左对齐，与文字呼应 */
  }

  .feature-img {
    max-width: 100%; /* 移动端图片占满宽度 */
  }
}
</style>