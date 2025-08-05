<template>
  <div class="home-page">
    <!-- 顶部横幅 -->
    <section class="hero-section">
<!--      &lt;!&ndash; SEO 关键元素：标题、描述 &ndash;&gt;-->
<!--      <h1 class="hero-title">Drive More Sales with UUININ AI Ecommerce</h1>-->
<!--      <p class="hero-subtitle">The ultimate AI-driven solution to empower your brand and boost sales</p>-->

<!--      &lt;!&ndash; 按钮组 &ndash;&gt;-->
<!--      <div class="btn-group">-->
<!--        <button-->
<!--            class="btn btn-primary"-->
<!--            @click="handleGetStarted"-->
<!--        >-->
<!--          Get Started-->
<!--        </button>-->
<!--        <button-->
<!--            class="btn btn-secondary"-->
<!--            @click="handleContactUs"-->
<!--        >-->
<!--          Contact Us-->
<!--        </button>-->
<!--      </div>-->

      <!--      &lt;!&ndash; 3D 图形容器（可替换为实际 3D 实现或静态图） &ndash;&gt;-->
      <!--      <div class="hero-graphic">-->
      <!--        &lt;!&ndash; 这里先用背景图模拟，如需动态 3D 可集成 three.js 等 &ndash;&gt;-->
      <!--        <div class="graphic-placeholder"></div>-->
      <!--      </div>-->

      <!--      &lt;!&ndash; 说明文本 &ndash;&gt;-->
      <!--      <p class="hero-desc">-->
      <!--        Discover how UUININ AI ecommerce tool can help merchants increase sales with less marketing costs-->
      <!--        with smarter customer targeting, AI livestreaming, automated logistics, and supplier optimization.-->
      <!--      </p>-->
      <ImageWithTextOverlay
          imageUrl="/background-2.png"
          imageAlt="AI E-commerce Dashboard"
          title="Drive More Sales with AI"
          description="Boost your revenue with intelligent marketing automation"
          overlayPosition="center-center"
          :actions="[
        { text: 'Get Started', type: 'primary', action: () => navigateTo('/signup') },
        { text: 'Learn More', type: 'secondary' }]"
          :imageWidth="1200"
          :imageHeight="600"
      />

      <!-- 数据统计卡片 -->
      <div class="stats-container">
        <div class="stat-card">
          <span class="stat-value">15,000+</span>
          <span class="stat-label">Merchants</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">38%</span>
          <span class="stat-label">Increase in Sales</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">52%</span>
          <span class="stat-label">Saved in Marketing Cost</span>
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

    <div class="blog-section">
      <UniversalCarousel
          :items="blogPosts"
          :is-loading="isLoading"
          :has-error="hasError"
          :show-header="true"
          :auto-play="true"
          :showArrows="true"
          :showPagination="true"
          :left-arrow-icon="'&lt;'"
          :showRetryButton="true"
          right-arrow-icon="&gt;"
          title="UUININ AI Ecommerce Case Study"
          description="UUININ helps merchants cut customer acquisition costs, automate operations,
 and boost sales with AI digital humans, AIGC short videos, and smart supply chain solutions."
          @retry="fetchBlogPosts"
          @slide-click="handleSlideClick"
      >
        <!-- 自定义轮播项内容 -->
        <template #item="{ item }">
          <div class="post-image" :style="{ backgroundImage: `url(${item.featured_media_src})` }"></div>
          <div class="post-content">
            <h3 class="post-title" v-html="item.title.rendered"></h3>
            <p class="post-excerpt" v-html="item.excerpt.rendered"></p>
          </div>
        </template>
      </UniversalCarousel>
    </div>

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
    <section class="merchant-hero-section">
      <div class="logo-container">
        <img src="/logo-mini.png" alt="UUININ Logo" class="banner-logo"/>
      </div>
      <!-- 标题 -->
      <h2 class="merchant-hero-title">Join UUININ Today and Boost Your Sales</h2>
      <h2>Empower your business with AI tools made for growth. Start now or talk to our team.</h2>
      <!-- 按钮组 -->
      <div class="merchant-button-group">
        <button class="merchant-btn merchant-get-inspired">Get UUININ</button>
        <button class="merchant-btn merchant-create-now">Contact</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

import FeatureBlock from "~/components/common/FeatureBlock.vue";
import UniversalCarousel from "~/components/common/UniversalCarousel.vue";
import ImageWithTextOverlay from "~/components/common/ImageWithTextOverlay.vue";

// 定义博客文章类型
interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media_src: string;
}

// 状态管理
const blogPosts = ref<BlogPost[]>([]);
const isLoading = ref(true);
const hasError = ref(false);

// 获取博客文章数据
const fetchBlogPosts = async () => {
  try {
    isLoading.value = true;
    hasError.value = false;

    // 替换为实际的API地址
    const response = await fetch('http://47.99.32.217/wp-json/wp/v2/posts?per_page=5&status=publish&_embed=1');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawPosts = await response.json();

    // 处理数据格式
    blogPosts.value = rawPosts.map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      featured_media_src: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
          `https://picsum.photos/seed/${post.id}/600/400`
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    hasError.value = true;
    blogPosts.value = [];
  } finally {
    isLoading.value = false;
  }
};

// 处理轮播项点击
const handleSlideClick = (item: BlogPost, index: number) => {
  console.log('Clicked on blog post:', item, 'at index:', index);
  // 可以添加导航到文章详情页的逻辑
};

// 初始化
onMounted(() => {
  fetchBlogPosts();
});

const handleGetStarted = () => {
  // 示例：跳转到注册页或功能介绍页
  console.log('Get Started clicked');
  // 如需路由跳转：
  // useRouter().push('/get-started')
};

const handleContactUs = () => {
  console.log('Contact Us clicked');
  // useRouter().push('/contact')
};

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

.logo-container {
  max-width: 75px;
  padding-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-page {
  background-color: #000;
  color: #fff;
  min-height: 100vh;
}

.hero-section {
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  box-sizing: border-box;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  /* SEO 友好：确保标题层级合理 */
  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.hero-subtitle {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 2rem;
}

.btn-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #000;
  color: #fff;
  border: 1px solid #fff;
}

.btn-primary:hover {
  background-color: #fff;
  color: #000;
}

.btn-secondary {
  background-color: #005eff;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #0047cc;
}

.hero-graphic {
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
}

.graphic-placeholder {
  width: 100%;
  padding-top: 30%; /* 模拟 3D 图形比例 */
  background: url('/background-2.png') center/cover no-repeat;
  /* 替换为实际 3D 图形或动态渲染 */
  border-radius: 12px;
}

.hero-desc {
  max-width: 800px;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: 3rem;
}

.stats-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.stat-card {
  background-color: #111;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  text-align: center;
  min-width: 180px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-label {
  opacity: 0.8;
  font-size: 0.9rem;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .graphic-placeholder {
    padding-top: 50%;
  }
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

@media (max-width: 992px) {
  .hero-title {
    font-size: 28px;
  }
}

.merchant-hero-section {
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
.merchant-hero-title {
  color: #ffffff;
  font-size: clamp(2rem, 5vw, 2.5rem); /* 响应式字体大小 */
  font-weight: 600;
  margin-bottom: 30px;
  line-height: 1.4;
}

/* 按钮组：水平排列、居中 */
.merchant-button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

/* 通用按钮基础样式 */
.merchant-btn {
  padding: 14px 36px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
}

/* “Get Inspired” 按钮样式 */
.merchant-get-inspired {
  background-color: #2b59ff;
  color: #ffffff;
  border: none;
}

.merchant-get-inspired:hover {
  background-color: #4b73ff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(43, 89, 255, 0.3);
}

/* “Create Now” 按钮样式 */
.merchant-create-now {
  background-color: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;
}

.merchant-create-now:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
}

/* 响应式适配：小屏幕下调整标题大小、按钮间距等 */
@media (max-width: 768px) {
  .merchant-hero-section {
    min-height: 70vh;
    padding: 60px 15px;
  }

  .merchant-hero-title {
    font-size: clamp(1.6rem, 4vw, 2.5rem);
  }

  .merchant-button-group {
    flex-direction: column;
    gap: 15px;
    width: 90%;
  }

  .merchant-btn {
    width: 100%;
    max-width: none;
    padding: 12px 24px;
  }
}

.blog-section {
  background-color: #000;
  padding: 20px 0;
}

/* 博客文章卡片样式 */
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

.carousel-slide:hover .post-image {
  transform: scale(1.03);
}

.post-content {
  padding: 22px;
  text-align: left;
}

.post-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #fff;
  line-height: 1.4;
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
</style>