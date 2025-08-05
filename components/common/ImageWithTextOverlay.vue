<template>
  <div class="image-overlay-container">
    <!-- 图片容器 - 使用Nuxt图片组件优化性能和SEO -->
    <div class="image-wrapper">
      <NuxtImg
          :src="imageUrl"
          :alt="imageAlt"
          class="overlay-image"
          :width="imageWidth"
          :height="imageHeight"
          loading="lazy"
      />
    </div>

    <!-- 文字悬浮层 -->
    <div class="text-overlay" :class="overlayPosition">
      <div class="text-content">
        <h2 class="overlay-title" v-if="title" v-text="title"></h2>
        <p class="overlay-description" v-if="description" v-text="description"></p>
        <div class="overlay-actions" v-if="actions.length">
          <button
              class="action-button"
              :class="action.type"
              v-for="(action, index) in actions"
              :key="index"
              @click="handleActionClick(action)"
              v-text="action.text"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';

// 定义组件属性
interface ActionButton {
  text: string;
  type: 'primary' | 'secondary' | 'text';
  action?: () => void;
}

const props = defineProps<{
  imageUrl: string;
  imageAlt: string;
  title?: string;
  description?: string;
  actions?: ActionButton[];
  overlayPosition?: 'top-left' | 'top-center' | 'top-right' |
      'center-left' | 'center-center' | 'center-right' |
      'bottom-left' | 'bottom-center' | 'bottom-right';
  imageWidth?: number;
  imageHeight?: number;
  overlayPadding?: string;
  overlayBackground?: string;
}>();

// 默认属性
const defaultPosition = props.overlayPosition || 'center-center';
const defaultPadding = props.overlayPadding || '1.5rem';

// SEO优化 - 为图片添加结构化数据
if (props.title && props.imageAlt) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "name": props.title,
          "description": props.description || "",
          "contentUrl": props.imageUrl,
          "encodingFormat": props.imageUrl.split('.').pop() || "image/jpeg"
        })
      }
    ]
  });
}

// 处理按钮点击事件
const handleActionClick = (action: ActionButton) => {
  action.action?.();
};
</script>

<style scoped>
.image-overlay-container {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.image-wrapper {
  position: relative;
  width: 100%;
  line-height: 0; /* 消除图片底部间隙 */
}

.overlay-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.5s ease;
}

/* 鼠标悬停时图片轻微放大 */
.image-overlay-container:hover .overlay-image {
  transform: scale(1.03);
}

.text-overlay {
  position: absolute;
  color: #fff;
  padding: v-bind(defaultPadding);
  background: v-bind(overlayBackground);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: background 0.3s ease;
}

/* 悬停时增强背景对比度 */
.image-overlay-container:hover .text-overlay {
  background: v-bind(overlayBackground);
}

.text-content {
  text-align: center;
  max-width: 80%;
  z-index: 2;
}

.overlay-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.overlay-description {
  font-size: 1rem;
  margin: 0 0 1.25rem 0;
  line-height: 1.6;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.overlay-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-shadow: none;
}

.action-button.primary {
  background-color: #005eff;
  color: white;
}

.action-button.primary:hover {
  background-color: #0047cc;
  transform: translateY(-2px);
}

.action-button.secondary {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.action-button.secondary:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.action-button.text {
  background: transparent;
  color: white;
  text-decoration: underline;
}

.action-button.text:hover {
  color: #e0e0e0;
}

/* 位置定位类 */
.top-left {
  align-items: flex-start;
  justify-content: flex-start;
}

.top-center {
  align-items: flex-start;
  justify-content: center;
}

.top-right {
  align-items: flex-start;
  justify-content: flex-end;
}

.center-left {
  align-items: center;
  justify-content: flex-start;
}

.center-center {
  align-items: center;
  justify-content: center;
}

.center-right {
  align-items: center;
  justify-content: flex-end;
}

.bottom-left {
  align-items: flex-end;
  justify-content: flex-start;
}

.bottom-center {
  align-items: flex-end;
  justify-content: center;
}

.bottom-right {
  align-items: flex-end;
  justify-content: flex-end;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .overlay-title {
    font-size: 1.4rem;
  }

  .overlay-description {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .action-button {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .text-content {
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .overlay-actions {
    flex-direction: column;
    width: 100%;
  }

  .action-button {
    width: 100%;
  }
}
</style>
