<!-- 默认布局 -->
<script setup lang="ts">
import "primeicons/primeicons.css";
import Header from "./Header.vue";
</script>

<template>
  <div class="layout flex min-h-screen flex-col">
    <!-- 顶部 -->
    <Header />
    <!-- 内容 -->
    <div class="layout-content flex flex-grow justify-center">
      <!-- 默认插槽 -->
      <slot />
    </div>
    <!-- 底部 -->
<!--    <Footer />-->
  </div>
</template>

<style lang="less">
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  /* filter: blur(1rem); */
}
</style>
