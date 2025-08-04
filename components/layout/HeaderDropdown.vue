<template>
  <div class="header-dropdown" :style="{ left: leftPosition + 'px', top: topPosition + 'px' }" v-show="isVisible">
    <div class="dropdown-item">
      <span class="icon case-study-icon"></span>
      <div class="text">
        <h3>Case Study</h3>
        <p>See how others use it</p>
      </div>
    </div>
    <div class="dropdown-item">
      <span class="icon merchant-store-icon"></span>
      <div class="text">
        <h3>Merchant Store</h3>
        <p>Open your store</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);
const leftPosition = ref(0);
const topPosition = ref(0);

// 监听鼠标移动事件来控制弹出框显示（也可结合导航栏 hover 逻辑）
let mouseMoveHandler: (event: MouseEvent) => void;

onMounted(() => {
  mouseMoveHandler = (event) => {
    // 这里简单演示根据鼠标位置设置弹出框位置，实际可结合导航栏元素位置计算
    leftPosition.value = event.clientX;
    topPosition.value = event.clientY;
  };
  document.addEventListener('mousemove', mouseMoveHandler);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', mouseMoveHandler);
});

// 对外暴露控制显示的方法
defineExpose({
  show: () => {
    isVisible.value = true;
  },
  hide: () => {
    isVisible.value = false;
  }
});
</script>

<style scoped>
.header-dropdown {
  position: absolute;
  background-color: #2b2b2b;
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 999;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-size: contain;
}

.case-study-icon {
  background-image: url('/icons/case-study-icon.svg');
}

.merchant-store-icon {
  background-image: url('/icons/merchant-store-icon.svg');
}

.text h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.text p {
  font-size: 12px;
  color: #ccc;
  margin: 0;
}
</style>