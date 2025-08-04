<template>
  <section class="feature-block" :class="{ reverse }">
    <div class="text-group">
      <h2 class="feature-title">{{ title }}</h2>
      <p class="feature-desc" v-html="description"></p>
      <div class="btn-group">
        <button
            class="feature-btn"
            :class="button.type"
            v-for="(button, btnIndex) in buttons"
            :key="btnIndex"
            @click="handleButtonClick(button)"
        >
          {{ button.text }}
        </button>
      </div>
    </div>
    <div class="image-group">
      <img
          :src="imageUrl"
          :alt="imageAlt"
          class="feature-img"
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// 定义按钮接口
interface Button {
  text: string;
  type: 'primary' | 'ghost' | 'outline';
  action?: () => void;
}

// 定义组件props
const props = defineProps<{
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  buttons: Button[];
  reverse?: boolean;
}>();

// 处理按钮点击事件
const handleButtonClick = (button: Button) => {
  if (button.action) {
    button.action();
  } else {
    // 默认行为可以在这里定义，比如打印日志
    console.log(`Button clicked: ${button.text}`);
  }
};
</script>

<style scoped>
/* 单个板块布局 */
.feature-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 120px; /* 文字与图片的水平间距 */
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 反向排列（用于左右切换） */
.reverse {
  flex-direction: row-reverse;
}

/* 文字组样式 */
.text-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  padding: 0 40px;
}

.feature-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 1.4;
  color: #fff;
  margin: 0;
}

.feature-desc {
  font-size: 16px;
  line-height: 1.8;
  color: #ccc;
  width: 100%;
}

/* 按钮组 */
.btn-group {
  display: flex;
  gap: 16px;
  align-self: flex-start;
}

/* 按钮样式 */
.feature-btn {
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
}

/* 按钮类型样式 */
.feature-btn.primary {
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 125px;
  font-size: 14px;
}

.feature-btn.primary:hover {
  background-color: #005fe8;
  transform: translateY(-2px);
}

.feature-btn.outline {
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}

.feature-btn.outline:hover {
  background-color: #007bff1a;
  transform: translateY(-2px);
}

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

/* 图片组样式 */
.image-group {
  flex: 0 0 45%;
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

/* 响应式适配 */
@media (max-width: 1200px) {
  .feature-block {
    gap: 80px;
    max-width: 1400px;
  }
}

@media (max-width: 992px) {
  .feature-block {
    flex-direction: column;
    text-align: left;
    gap: 40px;
  }

  .text-group {
    align-items: flex-start;
    padding: 0;
  }

  .image-group {
    flex: 1;
    width: 100%;
    justify-content: flex-start;
  }

  .feature-img {
    max-width: 100%;
  }
}
</style>
