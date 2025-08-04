<template>
  <section class="feature-block" :class="{ reverse }">
    <div class="text-group">
      <h2 class="feature-title">{{ title }}</h2>
      <h4 class="sub-title">{{ subTitle }}</h4>
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
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 60px 20px;
}

.reverse {
  flex-direction: row-reverse;
}

.text-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.feature-title {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  margin: 0;
}

.sub-title {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  opacity: 0.8;
  color: #fff;
  margin: 0;
}

.feature-desc {
  font-size: 16px;
  line-height: 1.6;
  color: #ccc;
  width: 100%;
}

.btn-group {
  display: flex;
  gap: 12px;
  align-self: flex-start;
}

.feature-btn {
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  border: none;
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
  flex: 0 0 40%;
  display: flex;
  justify-content: center;
}

.feature-img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.1);
}

@media (max-width: 992px) {
  .feature-block {
    flex-direction: column;
    text-align: left;
    gap: 30px;
    padding: 40px 20px;
  }

  .text-group {
    align-items: flex-start;
  }

  .image-group {
    flex: 1;
    width: 100%;
    justify-content: flex-start;
  }
}
</style>