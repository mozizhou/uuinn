<template>
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
        title="Recommended Blogs"
        description="Stay Updated With The Latest in AI Shopping Trends, Creator Economy Insights, And Smart E-Commerce Strategies."
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UniversalCarousel from "~/components/common/UniversalCarousel.vue";

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
</script>

<style scoped>
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