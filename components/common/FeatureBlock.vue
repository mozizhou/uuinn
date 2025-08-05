<template>
  <section class="feature-block" :class="{ reverse }">
    <div class="text-group">
      <h2 class="feature-title">{{ title }}</h2>
      <h4 class="sub-title" v-if="subTitle">{{ subTitle }}</h4>
      <p class="feature-desc" v-html="description"></p>
      <div class="btn-group" v-if="buttons.length">
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
          :style="imageStyle"
          class="feature-img"
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Button {
  text: string;
  type: 'primary' | 'ghost' | 'outline';
  action?: () => void;
}

const props = defineProps<{
  title: string;
  subTitle?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageStyle?: string;
  buttons: Button[];
  reverse?: boolean;
}>();

const handleButtonClick = (button: Button) => {
  button.action?.();
};
</script>

<style scoped>
.feature-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px; /* 减少间距使内容更紧凑 */
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px; /* 增加上下内边距，减少左右内边距 */
}

.reverse {
  flex-direction: row-reverse;
}

.text-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px; /* 减少文本块之间的间距 */
  min-width: 0;
  max-width: 580px; /* 限制最大宽度，防止文本过宽 */
}

.feature-title {
  font-size: 26px; /* 略微减小标题大小 */
  font-weight: 700;
  line-height: 1.25; /* 优化行高 */
  color: #fff;
  margin: 0;
  letter-spacing: -0.02em; /* 微调字间距 */
}

.sub-title {
  font-size: 18px; /* 减小副标题大小 */
  font-weight: 500;
  line-height: 1.3;
  opacity: 0.8;
  color: #fff;
  margin: 0;
  padding-bottom: 4px; /* 增加与描述的分离感 */
}

.feature-desc {
  font-size: 15px; /* 减小描述文本大小 */
  line-height: 1.55; /* 优化行高，提升可读性 */
  color: #ccc;
  width: 100%;
  margin: 0;
}

.btn-group {
  display: flex;
  gap: 12px;
  align-self: flex-start;
  margin-top: 8px; /* 增加与描述的距离 */
}

.feature-btn {
  padding: 9px 18px; /* 略微减小按钮内边距 */
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  border: none;
  white-space: nowrap; /* 防止按钮文本换行 */
}

.feature-btn.primary {
  background-color: #007bff;
  color: #fff;
}

.feature-btn.primary:hover {
  background-color: #005fe8;
  transform: translateY(-2px);
}

.feature-btn.ghost {
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.feature-btn.ghost:hover {
  background-color: #007bff1a;
  transform: translateY(-2px);
}

.image-group {
  display: flex;
  justify-content: center;
  flex: 1;
  max-width: 580px; /* 限制图片最大宽度，保持平衡 */
}

.feature-img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.1);
}

/* 平板设备优化 */
@media (max-width: 992px) {
  .feature-block {
    flex-direction: column;
    text-align: left;
    gap: 24px; /* 进一步减小间距 */
    padding: 30px 16px;
  }

  .text-group {
    align-items: flex-start;
    max-width: 100%;
  }

  .feature-title {
    font-size: 24px;
  }

  .image-group {
    width: 100%;
    justify-content: flex-start;
    max-width: 100%;
  }
}

/* 移动设备优化 */
@media (max-width: 576px) {
  .text-group {
    gap: 12px;
  }

  .feature-title {
    font-size: 22px;
  }

  .sub-title {
    font-size: 16px;
  }

  .feature-desc {
    font-size: 14px;
    line-height: 1.5;
  }

  .btn-group {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }

  .feature-btn {
    width: 100%;
    padding: 10px;
    text-align: center;
  }
}
</style>
