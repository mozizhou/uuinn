<template>
  <div class="home-page">
    <!-- 顶部横幅 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Drive More Sales with UUINN AI Ecommerce</h1>
        <button class="hero-btn feature-btn primary" @click="handleHeroBtn">Get Started</button>
        <div class="stats">
          <div class="stat-item">
            <span class="stat-value">75,000+</span>
            <span class="stat-label">Stores</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">35%</span>
            <span class="stat-label">Sales Increase</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">42%</span>
            <span class="stat-label">Cost Reduction</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 内容区块 -->
    <FeatureBlock
        title="AI-Powered Customer Targeting"
        subTitle="Reach the Right Customers with Precision AI"
        description="UUININ’s intelligent algorithms analyze behavioral
and transactional data to help you identify and target the most valuable customers automatically and in real time."
        imageUrl="/images/ai-targeting.png"
        imageAlt="AI Targeting"
        :buttons="[]"
    />

    <FeatureBlock
        title="AI Streamer to Reduce Marketing Cost"
        subTitle="24/7 Lives Online, Never Miss A Customer"
        description="Replace costly human streamers with intelligent digital agents.
Let your AI host livestream across platforms, answer questions,
and showcase products around the clock — with no additional headcount."
        imageUrl="/images/ai-merchandising.png"
        imageAlt="AI Merchandising"
        :buttons="[]"
        reverse
    />

    <FeatureBlock
        title="Smart & Direct Supplier Matching"
        subTitle="Spend Less on Supply Chain, Focus More on Product Discounts"
        description="Replace costly human streamers with intelligent digital agents.
Let your AI host livestream across platforms, answer questions, and showcase products around the clock — with no additional headcount."
        imageUrl="/images/supply-chain.png"
        imageAlt="Supply Chain"
        :buttons="[]"
    />

    <FeatureBlock
        title="AI-Driven Inventory Management & Delivery Tracking"
        subTitle="Smarter Inventory, Faster Delivery"
        description="Automate your warehouse and streamline fulfillment with AI-based inventory tracking,
restocking predictions, and delivery optimizations  all from a single dashboard."
        imageUrl="/images/business-intel.png"
        imageAlt="Business Intelligence"
        :buttons="[]"
        reverse
    />

    <!-- 案例研究区块 -->
    <!--    <section class="case-study-section">-->
    <!--      <h2 class="section-title">UUINN AI Ecommerce Case Study</h2>-->
    <!--      <div class="case-grid">-->
    <!--        <div class="case-item">-->
    <!--          <img src="/images/case-1.png" alt="Case Study 1" class="case-img">-->
    <!--          <h3 class="case-title">Fashion Retailer</h3>-->
    <!--          <p class="case-desc">30% sales growth with AI personalization</p>-->
    <!--        </div>-->
    <!--        <div class="case-item">-->
    <!--          <img src="/images/case-2.png" alt="Case Study 2" class="case-img">-->
    <!--          <h3 class="case-title">Electronics Store</h3>-->
    <!--          <p class="case-desc">25% cost reduction with AI supply chain</p>-->
    <!--        </div>-->
    <!--        <div class="case-item">-->
    <!--          <img src="/images/case-3.png" alt="Case Study 3" class="case-img">-->
    <!--          <h3 class="case-title">Beauty Brand</h3>-->
    <!--          <p class="case-desc">40% engagement boost with AI campaigns</p>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </section>-->

    <!-- 底部CTA -->
    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Join UUINN Today and Boost Your Sales</h2>
        <div class="cta-btns">
          <button class="feature-btn primary" @click="handleCtaBtn">Get Started</button>
          <button class="feature-btn ghost" @click="handleDemoBtn">Request Demo</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

import FeatureBlock from "~/components/common/FeatureBlock.vue";

const handleHeroBtn = () => {
  // 处理按钮点击逻辑
};

const handleCtaBtn = () => {
  // 处理CTA按钮逻辑
};

const handleDemoBtn = () => {
  // 处理演示请求逻辑
};
</script>

<style scoped>
.home-page {
  background-color: #000;
  color: #fff;
  min-height: 100vh;
}

/* 顶部横幅 */
.hero-section {
  background: url('/images/hero-bg.png') no-repeat center/cover;
  padding: 120px 20px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 36px;
  font-weight: 800;
  line-height: 1.4;
  margin-bottom: 40px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  display: block;
  color: #007bff;
}

.stat-label {
  color: #ccc;
  font-size: 14px;
}

/* 案例研究区块 */
.case-study-section {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.case-item {
  background-color: #111;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease;
}

.case-item:hover {
  transform: translateY(-5px);
}

.case-img {
  max-width: 100%;
  border-radius: 6px;
  margin-bottom: 20px;
}

.case-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.case-desc {
  color: #ccc;
  font-size: 14px;
}

/* 底部CTA */
.cta-section {
  background-color: #111;
  padding: 80px 20px;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 24px;
  margin-bottom: 40px;
}

.cta-btns {
  display: flex;
  justify-content: center;
  gap: 20px;
}

@media (max-width: 992px) {
  .case-grid {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 28px;
  }
}
</style>