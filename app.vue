<template>
  <Header></Header>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Footer></Footer>
</template>

<script setup lang="ts">
// 确保路径正确指向组件文件
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
</script>

<style>
/* 全局样式保持不变 */
:root {
  --color-primary: #2563eb;
  --color-secondary: #4f46e5;
  --color-accent: #f59e0b;
  --color-dark: #1e293b;
  --color-light: #f8fafc;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #fff;
}
</style>
