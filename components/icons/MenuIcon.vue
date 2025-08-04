<!-- components/icons/MenuIcon.vue -->
<template>
  <svg
      class="menu-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :width="size"
      :height="size"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
</template>

<script setup lang="ts">
// 支持动态调整图标大小
const props = defineProps({
  size: {
    type: Number,
    default: 24
  }
})
</script>

<style scoped>
.menu-icon {
  /* 继承父元素颜色，方便适配不同场景 */
  color: inherit;
}
</style>