<script setup lang="ts">
import { ref, onMounted, nextTick, computed, onUnmounted } from 'vue';

interface Testimonial {
  id: number;
  avatar: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

// 关键修复：定义明确的滚动状态接口
interface ScrollState {
  animationId: number | null;
  startTime: number;
  pausedAt: number;
  isPaused: boolean;
  baseWidth: number;
  totalWidth: number;
  currentPosition: number;
  initialOffset: number; // 设为必需属性，确保始终有值
}

// 第一行数据集
const baseTestimonials1 = ref<Testimonial[]>([
  {
    id: 1,
    avatar: 'https://picsum.photos/id/1005/200/200',
    name: 'Alex Wang',
    role: 'Content Creator',
    content: '“UUININ helped me create amazing product videos in seconds.”',
    rating: 5.0
  },
  {
    id: 2,
    avatar: 'https://picsum.photos/id/1012/200/200',
    name: 'Sarah Chen',
    role: 'Influencer',
    content: '“My followers love the AI-generated content. Engagement up 30%!”',
    rating: 4.5
  },
  {
    id: 3,
    avatar: 'https://picsum.photos/id/1025/200/200',
    name: 'Michael Zhang',
    role: 'Merchant',
    content: '“Boosted my sales with smart pricing. Best decision!”',
    rating: 4.0
  },
  {
    id: 4,
    avatar: 'https://picsum.photos/id/1027/200/200',
    name: 'Emma Liu',
    role: 'Shopper',
    content: '“Personalized recommendations are spot on. Great experience!”',
    rating: 3.5
  },
]);

// 第二行数据集
const baseTestimonials2 = ref<Testimonial[]>([
  {
    id: 11,
    avatar: 'https://picsum.photos/id/1074/200/200',
    name: 'David Wu',
    role: 'Supplier',
    content: '“Streamlined inventory management. UUININ is a game changer.”',
    rating: 3.0
  },
  {
    id: 12,
    avatar: 'https://picsum.photos/id/1062/200/200',
    name: 'Lisa Zhang',
    role: 'Marketer',
    content: '“Campaign performance improved with UUININ\'s analytics.”',
    rating: 2.5
  },
  {
    id: 13,
    avatar: 'https://picsum.photos/id/1066/200/200',
    name: 'Kevin Lee',
    role: 'Designer',
    content: '“AI design suggestions cut my workflow time in half.”',
    rating: 5.0
  },
  {
    id: 14,
    avatar: 'https://picsum.photos/id/1083/200/200',
    name: 'Nancy Wang',
    role: 'Blogger',
    content: '“Content generation helped me publish 3x more articles.”',
    rating: 4.5
  },
]);

// 元素引用
const leftTrack = ref<HTMLElement | null>(null);
const rightTrack = ref<HTMLElement | null>(null);
const leftList = ref<HTMLElement | null>(null);
const rightList = ref<HTMLElement | null>(null);

// 关键修复：使用明确的类型定义并初始化所有属性
const scrollStates = ref<{
  left: ScrollState;
  right: ScrollState;
}>({
  left: {
    animationId: null,
    startTime: 0,
    pausedAt: 0,
    isPaused: false,
    baseWidth: 0,
    totalWidth: 0,
    currentPosition: 0,
    initialOffset: 0 // 第一行也初始化该属性，虽然不使用
  },
  right: {
    animationId: null,
    startTime: 0,
    pausedAt: 0,
    isPaused: false,
    baseWidth: 0,
    totalWidth: 0,
    currentPosition: 0,
    initialOffset: 0 // 确保初始值为number类型
  }
});

// 扩展数据
const extendedTestimonials1 = computed<Testimonial[]>(() => {
  return getExtendedTestimonials(baseTestimonials1.value, 4, false);
});

const extendedTestimonials2 = computed<Testimonial[]>(() => {
  return getExtendedTestimonials(baseTestimonials2.value, 4, true);
});

function getExtendedTestimonials(
    baseData: Testimonial[],
    minCopies: number,
    reverse: boolean = false
): Testimonial[] {
  const processedData = reverse ? [...baseData].reverse() : baseData;

  let copies = minCopies;

  if (typeof window !== 'undefined') {
    const containerWidth = window.innerWidth > 1400 ? 1400 : window.innerWidth - 40;
    const cardWidth = 240 + 40;
    const baseSetWidth = processedData.length * cardWidth;
    const requiredCopies = Math.ceil((containerWidth * 2) / baseSetWidth);
    copies = Math.max(minCopies, requiredCopies);
  }

  const extendedData = Array.from({ length: copies }, (_, i) =>
      processedData.map(item => ({
        ...item,
        id: item.id + i * 1000
      }))
  ).flat();

  return extendedData;
}

// 星级判断逻辑
const isFullStar = (star: number, rating: number) => rating >= star;
const isHalfStar = (star: number, rating: number) => rating >= star - 0.5 && rating < star;
const isEmptyStar = (star: number, rating: number) => rating < star - 0.5;

// 滚动配置
const pixelsPerSecond = 30;

onMounted(async () => {
  await nextTick();

  if (!leftTrack.value || !rightTrack.value || !leftList.value || !rightList.value) {
    console.warn('Some track elements are missing');
    return;
  }

  // 计算基础宽度和总宽度
  const base1Width = calculateBaseWidth(leftList.value, baseTestimonials1.value.length);
  const base2Width = calculateBaseWidth(rightList.value, baseTestimonials2.value.length);

  scrollStates.value.left.baseWidth = base1Width;
  scrollStates.value.left.totalWidth = leftList.value.offsetWidth;

  scrollStates.value.right.baseWidth = base2Width;
  scrollStates.value.right.totalWidth = rightList.value.offsetWidth;

  // 设置第二行初始偏移量 - 直接使用已验证的元素引用
  scrollStates.value.right.initialOffset = - (scrollStates.value.right.totalWidth - scrollStates.value.right.baseWidth);
  // 这里已经通过前面的if判断确保了rightTrack.value存在，所以可以安全使用
  rightTrack.value.style.transform = `translateX(${scrollStates.value.right.initialOffset}px)`;
  scrollStates.value.right.currentPosition = scrollStates.value.right.initialOffset;

  // 启动滚动
  startScroll('left');
  startScroll('right');

  // 设置悬停处理
  setupHoverHandlers();

  window.addEventListener('resize', handleResize);
});

// 计算单组数据宽度
function calculateBaseWidth(list: HTMLElement, baseItemCount: number): number {
  const cardWidth = 240 + 40;
  return baseItemCount * cardWidth;
}

// 处理窗口大小变化
function handleResize() {
  if (!leftList.value || !rightList.value) return;

  scrollStates.value.left.baseWidth = calculateBaseWidth(leftList.value, baseTestimonials1.value.length);
  scrollStates.value.left.totalWidth = leftList.value.offsetWidth;

  scrollStates.value.right.baseWidth = calculateBaseWidth(rightList.value, baseTestimonials2.value.length);
  scrollStates.value.right.totalWidth = rightList.value.offsetWidth;

  // 重新计算第二行初始偏移量
  scrollStates.value.right.initialOffset = - (scrollStates.value.right.totalWidth - scrollStates.value.right.baseWidth);

  restartScroll('left');
  restartScroll('right');
}

// 重启滚动
function restartScroll(direction: 'left' | 'right') {
  const state = scrollStates.value[direction];

  if (state.animationId) {
    cancelAnimationFrame(state.animationId);
    state.animationId = null;
  }

  state.startTime = performance.now();
  state.pausedAt = 0;

  // 重启时恢复初始位置 - 修复可选链赋值问题
  if (direction === 'right') {
    state.currentPosition = state.initialOffset;
    // 先检查元素是否存在，再进行赋值
    const rightTrackEl = rightTrack.value;
    if (rightTrackEl) {
      rightTrackEl.style.transform = `translateX(${state.initialOffset}px)`;
    }
  } else {
    state.currentPosition = 0;
    // 先检查元素是否存在，再进行赋值
    const leftTrackEl = leftTrack.value;
    if (leftTrackEl) {
      leftTrackEl.style.transform = `translateX(0)`;
    }
  }

  startScroll(direction);
}

// 启动滚动
function startScroll(direction: 'left' | 'right') {
  const track = direction === 'left' ? leftTrack.value : rightTrack.value;
  if (!track) {
    console.warn(`Track for ${direction} is null`);
    return;
  }

  const state = scrollStates.value[direction];
  state.startTime = performance.now() - state.pausedAt;
  state.isPaused = false;

  function animate(timestamp: number) {
    if (state.isPaused) return;

    const elapsed = timestamp - state.startTime;
    const scrollDistance = (elapsed / 1000) * pixelsPerSecond;
    let position;

    if (direction === 'left') {
      // 第一行：向左滚动
      position = -scrollDistance;

      if (Math.abs(position) >= state.baseWidth) {
        const offset = Math.floor(Math.abs(position) / state.baseWidth) * state.baseWidth;
        position = - (Math.abs(position) - offset);
        state.startTime = timestamp;
      }
    } else {
      // 第二行：向右滚动（从尾部开始）
      position = state.initialOffset + scrollDistance;

      // 当滚动超过基础宽度时重置位置
      if (position >= 0) {
        const cycleOffset = Math.floor((position - state.initialOffset) / state.baseWidth) * state.baseWidth;
        position = state.initialOffset + (scrollDistance - cycleOffset);
        state.startTime = timestamp;
      }
    }

    state.currentPosition = position;
    track.style.transform = `translateX(${position}px)`;
    state.animationId = requestAnimationFrame(animate);
  }

  state.animationId = requestAnimationFrame(animate);
}

// 设置悬停处理
function setupHoverHandlers() {
  const rows = document.querySelectorAll('.testimonial-row') as NodeListOf<HTMLElement>;
  rows.forEach(row => {
    const direction = row.dataset.direction as 'left' | 'right';
    if (!direction) return;

    const state = scrollStates.value[direction];

    row.addEventListener('mouseenter', () => {
      if (state.isPaused) return;

      state.isPaused = true;
      state.pausedAt = performance.now() - state.startTime;

      if (state.animationId) {
        cancelAnimationFrame(state.animationId);
        state.animationId = null;
      }
    });

    row.addEventListener('mouseleave', () => {
      if (!state.isPaused) return;

      startScroll(direction);
    });
  });
}

// 组件卸载时清理
onUnmounted(() => {
  Object.values(scrollStates.value).forEach(state => {
    if (state.animationId) {
      cancelAnimationFrame(state.animationId);
    }
  });

  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <section class="testimonial-section">
    <h2 class="section-title">What Customers Say About Us</h2>

    <!-- 滚动容器：两行布局 -->
    <div class="scroll-container">
      <!-- 第一行：向左滚动（正常顺序） -->
      <div class="testimonial-row" data-direction="left">
        <div class="testimonial-track left-track" ref="leftTrack">
          <div class="testimonial-list" ref="leftList">
            <div
                v-for="(item, index) in extendedTestimonials1"
                :key="`left-${index}`"
                class="testimonial-card"
            >
              <!-- 卡片内容保持不变 -->
              <div class="gloss-overlay"></div>
              <div class="stars">
                <div
                    class="star"
                    v-for="star in 5"
                    :key="star"
                    :class="{
                    'full': isFullStar(star, item.rating),
                    'half': isHalfStar(star, item.rating),
                    'empty': isEmptyStar(star, item.rating)
                  }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star-icon">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <div class="half-mask" v-if="isHalfStar(star, item.rating)"></div>
                </div>
              </div>
              <div class="user-info">
                <img :src="item.avatar" alt="User Avatar" class="avatar">
                <div class="details">
                  <span class="name">{{ item.name }}</span>
                  <span class="role">{{ item.role }}</span>
                </div>
              </div>
              <p class="content">{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 第二行：向右滚动（反向顺序，从尾部开始） -->
      <div class="testimonial-row" data-direction="right">
        <div class="testimonial-track right-track" ref="rightTrack">
          <div class="testimonial-list" ref="rightList">
            <div
                v-for="(item, index) in extendedTestimonials2"
                :key="`right-${index}`"
                class="testimonial-card"
            >
              <!-- 卡片内容保持不变 -->
              <div class="gloss-overlay"></div>
              <div class="stars">
                <div
                    class="star"
                    v-for="star in 5"
                    :key="star"
                    :class="{
                    'full': isFullStar(star, item.rating),
                    'half': isHalfStar(star, item.rating),
                    'empty': isEmptyStar(star, item.rating)
                  }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="star-icon">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <div class="half-mask" v-if="isHalfStar(star, item.rating)"></div>
                </div>
              </div>
              <div class="user-info">
                <img :src="item.avatar" alt="User Avatar" class="avatar">
                <div class="details">
                  <span class="name">{{ item.name }}</span>
                  <span class="role">{{ item.role }}</span>
                </div>
              </div>
              <p class="content">{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 样式保持不变 */
.testimonial-section {
  background-color: #000;
  color: #fff;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 4rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background-color: #1d51fe;
}

.scroll-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: 1400px;
}

.testimonial-row {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 1rem 0;
}

.testimonial-track {
  display: flex;
  width: fit-content;
  will-change: transform;
  transform: translateX(0);
}

.testimonial-list {
  display: flex;
  gap: 2rem;
  width: fit-content;
  min-width: 100%;
}

.testimonial-card {
  background: linear-gradient(
      180deg,
      rgba(30, 30, 30, 1) 0%,
      rgb(0, 0, 0) 100%
  );
  border-radius: 10px;
  min-width: 240px;
  padding: 1.2rem;
  box-shadow:
      0 4px 12px rgba(0,0,0,0.4),
      inset 0 0 5px rgba(255,255,255,0.05);
  transition: all 0.3s ease;
  flex-shrink: 0;
  border: 1px solid rgba(255,215,0,0.15);
  position: relative;
  overflow: hidden;
}

.gloss-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      180deg,
      rgba(255,255,255,0.12) 0%,
      rgba(255,255,255,0.05) 30%,
      rgba(255,255,255,0) 70%,
      rgba(255,255,255,0.02) 100%
  );
  pointer-events: none;
  z-index: 1;
}

.testimonial-card:hover {
  transform: translateY(-6px);
  box-shadow:
      0 8px 20px rgba(29, 81, 254, 0.3),
      inset 0 0 10px rgba(255,215,0,0.25);
  border-color: rgba(255,215,0,0.3);
}

.stars {
  display: flex;
  gap: 0.3rem;
  margin-bottom: 0.8rem;
  height: 20px;
  align-items: center;
  position: relative;
  z-index: 2;
}

.star {
  position: relative;
  width: 20px;
  height: 20px;
}

.star-icon {
  width: 100%;
  height: 100%;
  fill: #555;
  transition: fill 0.3s ease;
}

.star.full .star-icon {
  fill: #ffd700;
}

.star.half .star-icon {
  fill: #ffd700;
}

.half-mask {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(180deg, rgba(30, 30, 30, 1) 0%, rgb(0, 0, 0) 100%);
  z-index: 1;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  position: relative;
  z-index: 2;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(255,215,0,0.3);
  object-fit: cover;
  box-shadow: 0 0 8px rgba(255,215,0,0.2);
}

.name {
  font-weight: 600;
  font-size: 1rem;
  color: #f0e6d2;
}

.role {
  font-size: 0.8rem;
  color: #c8b99e;
}

.content {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #e0d6c2;
  margin: 0;
  text-shadow: 0 0 2px rgba(0,0,0,0.5);
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  .testimonial-section {
    padding: 4rem 1.5rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  .testimonial-card {
    min-width: 200px;
    padding: 1rem;
  }
}
</style>