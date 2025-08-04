<script setup lang="ts">
import { ref } from 'vue';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const faqList = ref<FaqItem[]>([
  {
    question: 'What is UUININ?',
    answer: 'UUININ is an AI-powered shopping platform that offers digital humans, smart pricing, and 24/7 content automation. Our platform connects creators, merchants, and shoppers through innovative AI technology.',
    isOpen: true
  },
  {
    question: 'Can I use the videos for commercial services?',
    answer: 'Yes, you can use the videos for commercial services as long as you comply with our usage terms. All content generated through UUININ comes with a commercial use license.',
    isOpen: false
  },
  {
    question: 'How does the AI pricing work?',
    answer: 'Our AI pricing algorithm analyzes market trends, competitor prices, and customer behavior to suggest optimal pricing for your products.',
    isOpen: false
  },
  {
    question: 'Do I need technical skills to use UUININ?',
    answer: 'No technical skills are required to use UUININ. Our platform is designed with a user-friendly interface that allows anyone to create content.',
    isOpen: false
  }
]);

// 切换展开/收起状态
const toggleItem = (index: number) => {
  faqList.value.forEach((item, i) => {
    item.isOpen = i === index ? !item.isOpen : false;
  });
};
</script>

<template>
  <section class="faq-section">
    <PartHero></PartHero>
    <PartInstantly></PartInstantly>
    <PartUsersSaying></PartUsersSaying>
    <h2 class="faq-title">FAQ</h2>
    <div
        v-for="(item, index) in faqList"
        :key="index"
        class="faq-item"
    >
      <!-- 问题区域 -->
      <div
          class="faq-question"
          @click="toggleItem(index)"
      >
        <span>{{ item.question }}</span>
        <!-- 带旋转效果的图标 -->
        <span class="toggle-icon" :class="{ 'open': item.isOpen }">
          <span class="icon-inner">+</span>
        </span>
      </div>

      <!-- 答案区域 -->
      <div
          class="faq-answer-wrapper"
          :class="{ 'open': item.isOpen }"
      >
        <div class="faq-answer">
          {{ item.answer }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  background-color: #000;
  color: #fff;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.faq-title {
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 4rem;
  position: relative;
  padding-bottom: 1.5rem;
}

.faq-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background-color: #1d51fe;
}

.faq-item {
  width: 100%;
  max-width: 850px;
  border-bottom: 1px solid #222;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 500;
  padding: 1.8rem 0;
  transition: color 0.3s ease;
  line-height: 1.5;
}

.faq-question:hover {
  color: #1d51fe;
}

/* 图标样式 - 核心旋转效果 */
.toggle-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  background: #fff;
  border-radius: 8px;
}

/* 白色底边 */
.toggle-icon::after {
  position: absolute;
  transition: all 0.3s ease;
}

/* 图标符号样式 */
.icon-inner {
  color: #000000;
  font-size: 1.8rem;
  font-weight: 300;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, color 0.3s ease; /* 仅旋转符号 */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 展开状态 - 倾斜45度 */
.toggle-icon.open .icon-inner {
  transform: rotate(45deg); /* 关键：旋转45度 */
}

.toggle-icon.open::after {
  transform: scaleX(0.8);
}

/* 答案区域样式 */
.faq-answer-wrapper {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0, 1, 0, 1);
}

.faq-answer-wrapper.open {
  max-height: 800px;
  transition: max-height 0.6s ease-in-out;
}

.faq-answer {
  font-size: 1.15rem;
  color: #bbb;
  line-height: 1.8;
  padding-bottom: 2rem;
  padding-top: 0.8rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.faq-answer-wrapper.open .faq-answer {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.1s;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .faq-question {
    font-size: 1.15rem;
  }

  .toggle-icon {
    width: 32px;
    height: 32px;
  }

  .icon-inner {
    font-size: 1.6rem;
  }
}
</style>