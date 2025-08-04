<template>
  <div class="carousel-container" :class="containerClass" ref="carouselContainer">
    <!-- 调试信息 -->
    <div class="debug-info" v-if="debug">
      Current Index: {{ currentIndex }} | Container Width: {{ containerWidth }} |
      Slide Width: {{ slideWidth }} | Center Offset: {{ centerOffset }} |
      Track Position: {{ trackPosition }}px | Visible Slides: {{ visibleSlides }}
    </div>

    <!-- 标题与描述 -->
    <div class="carousel-header" v-if="showHeader">
      <h2 class="carousel-title">{{ title }}</h2>
      <p class="carousel-description" v-if="description">
        {{ description }}
      </p>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
    </div>

    <!-- 错误状态 -->
    <div v-if="hasError" class="error-state">
      <p>{{ errorMessage }}</p>
      <button @click="onRetry" class="retry-button" v-if="showRetryButton">Retry</button>
    </div>

    <!-- 轮播容器 -->
    <div v-else-if="items.length > 0" class="carousel-wrapper">
      <!-- 左侧箭头 -->
      <button
          class="carousel-arrow left-arrow"
          @click="prevSlide"
          @mouseenter="onArrowHover('left')"
          @mouseleave="onArrowLeave('left')"
          aria-label="Previous slide"
          :style="arrowStyle"
      >
        <span class="arrow-icon" v-html="leftArrowIcon"></span>
      </button>

      <!-- 卡片容器 -->
      <div
          class="carousel-track"
          :style="trackStyle"
          @mouseenter="stopAutoPlay"
          @mouseleave="startAutoPlay"
          ref="carouselTrack"
      >
        <!-- 克隆最后一个元素用于无缝循环 -->
        <div
            class="carousel-slide"
            :style="{ width: `${slideWidth}px`, ...slideStyle }"
            :key="'clone-last'"
        >
          <slot name="item" :item="items[items.length - 1]" :index="items.length - 1" :isClone="true" />
        </div>

        <!-- 主轮播卡片 -->
        <div
            class="carousel-slide"
            v-for="(item, index) in items"
            :key="item.id || index"
            :style="{ width: `${slideWidth}px`, ...slideStyle }"
            :class="{
            active: index === currentIndex,
            hovered: hoveredSlide === index
          }"
            @mouseenter="hoveredSlide = index; stopAutoPlay()"
            @mouseleave="hoveredSlide = null; startAutoPlay()"
            @click="handleSlideClick(item, index)"
        >
          <slot name="item" :item="item" :index="index" :isClone="false" />
        </div>

        <!-- 克隆第一个元素用于无缝循环 -->
        <div
            class="carousel-slide"
            :style="{ width: `${slideWidth}px`, ...slideStyle }"
            :key="'clone-first'"
        >
          <slot name="item" :item="items[0]" :index="0" :isClone="true" />
        </div>
      </div>

      <!-- 右侧箭头 -->
      <button
          class="carousel-arrow right-arrow"
          @click="nextSlide"
          @mouseenter="onArrowHover('right')"
          @mouseleave="onArrowLeave('right')"
          aria-label="Next slide"
          :style="arrowStyle"
      >
        <span class="arrow-icon" v-html="rightArrowIcon"></span>
      </button>

      <!-- 分页指示器 -->
      <div class="carousel-pagination" v-if="showPagination">
        <span
            v-for="(dot, index) in items"
            :key="index"
            class="dot"
            :class="{ active: index === currentIndex }"
            @click="goToSlide(index)"
            @mouseenter="hoveredDot = index; stopAutoPlay()"
            @mouseleave="hoveredDot = null; startAutoPlay()"
            :aria-label="`Go to slide ${index + 1}`"
            :style="paginationDotStyle"
        ></span>
      </div>
    </div>

    <!-- 无数据状态 -->
    <div v-else class="no-data">
      {{ emptyStateMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick, defineProps, defineEmits, computed } from 'vue'

// 定义轮播项接口
export interface CarouselItem {
  id?: string | number;
  [key: string]: any;
}

// 定义组件属性
const props = defineProps<{
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  animationDuration?: number;
  showPagination?: boolean;
  showArrows?: boolean;
  showHeader?: boolean;
  showRetryButton?: boolean;
  debug?: boolean;
  gap?: number;
  mobileBreakpoint?: number;
  tabletBreakpoint?: number;
  mobileSlides?: number;
  tabletSlides?: number;
  desktopSlides?: number;
  title?: string;
  description?: string;
  emptyStateMessage?: string;
  errorMessage?: string;
  isLoading?: boolean;
  hasError?: boolean;
  containerClass?: string;
  slideStyle?: Record<string, any>;
  arrowStyle?: Record<string, any>;
  paginationDotStyle?: Record<string, any>;
  leftArrowIcon?: string;
  rightArrowIcon?: string;
}>();

// 定义事件
const emitEvents = defineEmits<{
  (e: 'slideChange', index: number): void;
  (e: 'slideClick', item: CarouselItem, index: number): void;
  (e: 'retry'): void;
}>();

// 响应式数据
const currentIndex = ref(0);
const autoPlayTimer = ref<number | null>(null);
const slideWidth = ref(320);
const hoveredSlide = ref<number | null>(null);
const hoveredDot = ref<number | null>(null);
const arrowHoverState = ref<{left: boolean, right: boolean}>({left: false, right: false});
const carouselContainer = ref<HTMLElement | null>(null);
const carouselTrack = ref<HTMLElement | null>(null);
const containerWidth = ref(0);
const visibleWidth = ref(0);
const transitionActive = ref(true);
const visibleSlides = ref(3); // 当前可见的幻灯片数量

// 计算属性和默认值
const effectiveGap = props.gap || 20;
const effectiveAutoPlayInterval = props.autoPlayInterval || 5000;
const effectiveAnimationDuration = props.animationDuration || 600;
const effectiveMobileBreakpoint = props.mobileBreakpoint || 768;
const effectiveTabletBreakpoint = props.tabletBreakpoint || 1024;
const effectiveMobileSlides = props.mobileSlides || 1;
const effectiveTabletSlides = props.tabletSlides || 2;
const effectiveDesktopSlides = props.desktopSlides || 3;

// 计算当前可见的幻灯片数量
const calculateVisibleSlides = () => {
  if (window.innerWidth <= effectiveMobileBreakpoint) {
    return effectiveMobileSlides;
  } else if (window.innerWidth <= effectiveTabletBreakpoint) {
    return effectiveTabletSlides;
  } else {
    return effectiveDesktopSlides;
  }
};

// 计算居中偏移量 - 全新的居中逻辑
const centerOffset = computed(() => {
  // 计算容器中心与第一个可见幻灯片位置的偏移
  const offset = (containerWidth.value - (slideWidth.value + effectiveGap * (visibleSlides.value - 1))) / 2;
  return Math.max(0, offset);
});

// 计算轮播轨道位置
const trackPosition = computed(() => {
  // 基础位移 = 当前索引 * (幻灯片宽度 + 间距)
  // 减去居中偏移量确保激活项居中
  return currentIndex.value * (slideWidth.value + effectiveGap) - centerOffset.value;
});

// 轮播轨道样式
const trackStyle = computed(() => {
  return {
    transform: `translateX(-${trackPosition.value}px)`,
    transition: transitionActive.value
        ? `transform ${effectiveAnimationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
        : 'none',
    gap: `${effectiveGap}px`
  };
});

// 处理窗口大小变化 - 更精确的计算
const handleResize = () => {
  if (typeof window === 'undefined' || !carouselContainer.value) return;

  // 更新容器宽度
  const containerRect = carouselContainer.value.getBoundingClientRect();
  containerWidth.value = containerRect.width;
  visibleWidth.value = containerWidth.value;

  // 更新可见幻灯片数量
  visibleSlides.value = calculateVisibleSlides();

  // 计算可用宽度（减去内边距）
  const computedStyle = window.getComputedStyle(carouselContainer.value);
  const paddingLeft = parseFloat(computedStyle.paddingLeft);
  const paddingRight = parseFloat(computedStyle.paddingRight);
  const availableWidth = visibleWidth.value - paddingLeft - paddingRight;

  // 计算幻灯片宽度
  slideWidth.value = Math.floor((availableWidth - effectiveGap * (visibleSlides.value - 1)) / visibleSlides.value);

  // 强制重新计算位置
  forcePositionUpdate();
};

// 强制更新位置，确保居中
const forcePositionUpdate = () => {
  transitionActive.value = false;

  nextTick(() => {
    if (carouselTrack.value) {
      carouselTrack.value.style.transform = `translateX(-${trackPosition.value}px)`;

      nextTick(() => {
        transitionActive.value = true;
      });
    }
  });
};

// 处理箭头悬停
const onArrowHover = (direction: 'left' | 'right') => {
  arrowHoverState.value[direction] = true;
  stopAutoPlay();
};

const onArrowLeave = (direction: 'left' | 'right') => {
  arrowHoverState.value[direction] = false;
  startAutoPlay();
};

// 切换上一页
const prevSlide = () => {
  if (props.items.length === 0) return;

  transitionActive.value = true;
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length;
  emitEvents('slideChange', currentIndex.value);
};

// 切换下一页
const nextSlide = () => {
  if (props.items.length === 0) return;

  transitionActive.value = true;
  currentIndex.value = (currentIndex.value + 1) % props.items.length;
  emitEvents('slideChange', currentIndex.value);
};

// 跳转到指定页
const goToSlide = (index: number) => {
  if (index >= 0 && index < props.items.length && index !== currentIndex.value) {
    transitionActive.value = true;
    currentIndex.value = index;
    emitEvents('slideChange', currentIndex.value);
  }
};

// 处理轮播项点击
const handleSlideClick = (item: CarouselItem, index: number) => {
  emitEvents('slideClick', item, index);
};

// 处理重试按钮点击
const onRetry = () => {
  emitEvents('retry');
};

// 自动播放控制
const startAutoPlay = () => {
  if (autoPlayTimer.value) {
    clearInterval(autoPlayTimer.value);
  }

  if (props.autoPlay !== false &&
      props.items.length > 1 &&
      hoveredSlide.value === null &&
      hoveredDot.value === null &&
      !arrowHoverState.value.left &&
      !arrowHoverState.value.right) {
    autoPlayTimer.value = window.setInterval(() => {
      nextSlide();
    }, effectiveAutoPlayInterval) as unknown as number;
  }
};

const stopAutoPlay = () => {
  if (autoPlayTimer.value) {
    clearInterval(autoPlayTimer.value);
    autoPlayTimer.value = null;
  }
};

// 监听窗口大小变化和数据变化
watch([() => window.innerWidth, () => props.items], () => {
  handleResize();
});

watch([slideWidth, containerWidth, visibleSlides], () => {
  forcePositionUpdate();
});

// 监听鼠标交互状态
watch([hoveredSlide, hoveredDot, () => arrowHoverState.value.left, () => arrowHoverState.value.right], () => {
  if (hoveredSlide.value !== null || hoveredDot.value !== null || arrowHoverState.value.left || arrowHoverState.value.right) {
    stopAutoPlay();
  } else if (props.autoPlay !== false && props.items.length > 1) {
    startAutoPlay();
  }
});

// 初始化
onMounted(() => {
  if (carouselContainer.value) {
    const containerRect = carouselContainer.value.getBoundingClientRect();
    containerWidth.value = containerRect.width;
    visibleWidth.value = containerWidth.value;
    visibleSlides.value = calculateVisibleSlides();
  }

  handleResize();
  window.addEventListener('resize', handleResize);

  if (props.autoPlay !== false && props.items.length > 1) {
    startAutoPlay();
  }
});

onUnmounted(() => {
  stopAutoPlay();
  window.removeEventListener('resize', handleResize);
});

// 暴露公共方法
defineExpose({
  nextSlide,
  prevSlide,
  goToSlide,
  startAutoPlay,
  stopAutoPlay,
  forcePositionUpdate
});
</script>

<style scoped>
/* 整体容器 */
.carousel-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  background-color: #000;
  padding: 40px;
  box-sizing: border-box;
}

/* 标题与描述 */
.carousel-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 0 20px;
}

.carousel-title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
  white-space: nowrap;
}

.carousel-description {
  font-size: 0.9rem;
  color: #ccc;
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 加载状态 */
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #2b59ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 错误状态样式 */
.error-state {
  text-align: center;
  padding: 40px;
  color: #ff4444;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.retry-button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #2b59ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background-color: #1a47e0;
}

/* 轮播容器 */
.carousel-wrapper {
  position: relative;
  height: auto;
  min-height: 480px;
  overflow: hidden; /* 改为hidden确保只显示容器内内容 */
  margin: 0 auto;
  padding: 20px 0;
  width: 100%;
  box-sizing: border-box;
}

/* 轨道样式 */
.carousel-track {
  display: flex;
  height: 100%;
  will-change: transform;
  padding: 10px 0;
}

/* 卡片样式 */
.carousel-slide {
  flex-shrink: 0;
  background-color: #121212;
  border-radius: 8px;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
  /* 基础状态与过渡效果 */
  transform: scale(var(--scale, 0.95));
  opacity: var(--opacity, 0.8);
  z-index: var(--z-index, 1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 当前激活项放大效果 - 确保在容器中间视觉突出 */
.carousel-slide.active {
  --scale: 1.08;
  --opacity: 1;
  --z-index: 3;
  box-shadow: 0 8px 24px rgba(255,255,255,0.15);
}

/* 非激活项样式 */
.carousel-slide:not(.active) {
  transition-delay: 0.1s;
}

/* 悬停效果 */
.carousel-slide:hover,
.carousel-slide.hovered {
  --scale: 1.05;
  --opacity: 0.95;
  --z-index: 2;
  box-shadow: 0 6px 20px rgba(255,255,255,0.12);
}

/* 箭头样式 */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scale(1);
  background: rgba(0,0,0,0.7);
  color: #fff;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.8;
}

/* 箭头位置 */
.left-arrow {
  left: 20px;
}

.right-arrow {
  right: 20px;
}

.carousel-arrow:hover {
  background: rgba(43, 89, 255, 0.9);
  transform: translateY(-50%) scale(1.15);
  opacity: 1;
  box-shadow: 0 4px 12px rgba(43, 89, 255, 0.4);
}

.arrow-icon {
  font-size: 1.2rem;
}

/* 分页指示器 */
.carousel-pagination {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
  padding-bottom: 10px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #666;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1);
}

.dot.active {
  width: 24px;
  height: 8px;
  border-radius: 4px;
  background: #2b59ff;
  transform: scale(1);
  box-shadow: 0 0 0 2px rgba(43, 89, 255, 0.3);
}

.dot:hover:not(.active) {
  background: #aaa;
  transform: scale(1.2);
}

/* 无数据状态 */
.no-data {
  text-align: center;
  padding: 40px;
  color: #666;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 调试信息 */
.debug-info {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.7);
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 4px;
  z-index: 100;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .carousel-container {
    padding: 40px 30px;
  }
}

@media (max-width: 992px) {
  .carousel-slide {
    min-width: 290px;
  }
}

@media (max-width: 768px) {
  .carousel-container {
    padding: 30px 20px;
  }

  .carousel-slide {
    min-width: 280px;
  }

  .carousel-title {
    font-size: 1.6rem;
  }

  .carousel-arrow {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .carousel-container {
    padding: 20px 15px;
  }

  .carousel-slide {
    min-width: calc(100% - 30px);
  }

  .carousel-description {
    font-size: 0.8rem;
  }

  .carousel-arrow {
    width: 36px;
    height: 36px;
  }
}
</style>
