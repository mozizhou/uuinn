<template>
  <NuxtLink
      v-bind="attrs"
      class="text-gray-700 hover:text-blue-600 transition font-medium"
      :class="{
      'text-blue-600': isActive
    }"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAttrs, computed } from 'vue';

const attrs = useAttrs();
const route = useRoute(); // 获取路由对象

// 安全获取 href 和 route.path，添加非空检查
const href = (attrs.href as string) || '';
const currentPath = computed(() => route?.path || '');

// 检查链接是否为当前活跃路由（添加完整的安全检查）
const isActive = computed(() => {
  // 处理 href 或 route.path 可能为 undefined 的情况
  if (!href || !currentPath.value) {
    return false;
  }

  // 精确匹配根路径
  if (href === '/' && currentPath.value === '/') {
    return true;
  }

  // 不匹配根路径但当前路径是根路径时
  if (href !== '/' && currentPath.value === '/') {
    return false;
  }

  // 检查当前路由是否以链接路径开头
  return currentPath.value.startsWith(href);
});
</script>
