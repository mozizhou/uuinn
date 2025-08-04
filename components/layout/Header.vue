<template>
  <header class="header">
    <!-- Logo区域 -->
    <div class="logo">
      <img src="/logo.png" alt="UUININ Logo" />
    </div>

    <!-- 导航菜单 - 基于配置动态生成 -->
    <nav class="nav">
      <ul class="nav-list">
        <!-- 遍历导导航配置生成所有导航项 -->
        <li
            v-for="(item, index) in navigationConfig"
            :key="index"
            class="nav-item"
            :class="{ 'dropdown-container': item.hasDropdown }"
        >
          <!-- 导航项触发器 -->
          <div
              class="dropdown-trigger"
              @mouseenter="handleMouseEnter(index)"
              @mouseleave="handleMouseLeave(index)"
              @click="handleNavigationClick(item)"
          >
            {{ item.label }}
            <span class="dropdown-indicator" v-if="item.hasDropdown">▼</span>
          </div>

          <!-- 下拉框内容 - 仅当配置了下拉且处于打开状态时显示 -->
          <div
              class="header-dropdown"
              v-if="item.hasDropdown && isDropdownOpen[index]"
              @mouseenter="handleMouseEnter(index)"
              @mouseleave="handleMouseLeave(index)"
              :data-index="index"
          >
            <div
                class="dropdown-item"
                v-for="(subItem, subIndex) in item.dropdownItems"
                :key="subIndex"
                :style="{ animationDelay: `${subIndex * 50}ms` }"
                @click="handleDropdownItemClick(subItem)"
            >
              <span class="icon" :class="subItem.iconClass"></span>
              <div class="text">
                <h3>{{ subItem.title }}</h3>
                <p>{{ subItem.description }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>

    <!-- 右侧操作区 -->
    <div class="action-buttons">
      <!-- Get UUININ按钮及二维码弹出框 -->
      <div class="qrcode-container">
        <button
            class="btn get-uuinin"
            @mouseenter="showQrcode = true"
            @mouseleave="showQrcode = false"
            @click="handleButtonClick('get-uuinin')"
        >
          Get UUININ
        </button>

        <!-- 二维码弹出框 - 向下弹出 -->
        <div
            class="qrcode-popup"
            v-if="showQrcode"
            @mouseenter="showQrcode = true"
            @mouseleave="showQrcode = false"
        >
          <div class="qrcode-content">
            <img src="/qrcode-uuinin.png" alt="UUININ 二维码" class="qrcode-img" />
            <p class="qrcode-text">Scan to download</p>
          </div>
          <!-- 小三角指示器 - 向上指向按钮 -->
          <div class="qrcode-arrow"></div>
        </div>
      </div>

      <button class="btn log-in" @click="handleButtonClick('log-in')">Log In</button>
      <button class="btn sign-up" @click="handleButtonClick('sign-up')">Sign Up</button>
      <!-- 语言/地区切换按钮 -->
      <button class="lang-toggle" @click="handleButtonClick('language')">
        <img src="/globe-icon.png" alt="Language" class="lang-icon" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 导航配置对象 - 新增url字段用于跳转
const navigationConfig = [
  {
    label: 'For Merchant',
    hasDropdown: true,
    url: '/merchant', // 可选：如果没有下拉项时的跳转链接
    dropdownItems: [
      {
        title: 'Case Study',
        description: 'See how others use it',
        iconClass: 'case-study-icon',
        url: '/merchant/case-study'
      },
      {
        title: 'Merchant Store',
        description: 'Open your store',
        iconClass: 'merchant-store-icon',
        url: '/merchant/xxx/'
      }
    ]
  },
  {
    label: 'For Influencer',
    hasDropdown: true,
    url: '#',
    dropdownItems: [
      {
        title: 'AI Avatar',
        description: 'See how others use it',
        iconClass: 'case-study-icon',
        url: '/ai-avatar'
      },
      {
        title: 'AI Streamer',
        description: 'Open your store',
        iconClass: 'merchant-store-icon',
        url: '/ai-streamer'
      },
      {
        title: 'AI Product Video',
        description: 'Open your store',
        iconClass: 'merchant-store-icon',
        url: '/ai-product-video'
      }
    ]
  },
  {
    label: 'Free AI Tools',
    hasDropdown: true,
    url: '#',
    dropdownItems: [
      {
        title: 'Face Swapper',
        description: 'See how others use it',
        iconClass: 'case-study-icon',
        url: '/face-swapper'
      },
      {
        title: 'Clothes Changer',
        description: 'Open your store',
        iconClass: 'merchant-store-icon',
        url: '/clothes-changer'
      },
      {
        title: 'Video Translator',
        description: 'Open your store',
        iconClass: 'merchant-store-icon',
        url: '/video-translator'
      },
      {
        title: 'Avatar Generator',
        description: 'Open your store',
        iconClass: 'merchant-store-icon',
        url: '/avatar-generator'
      }
    ]
  },
  {
    label: 'Company',
    hasDropdown: true,
    url: '#',
    dropdownItems: [
      {
        title: 'About us',
        description: 'See how others use it',
        iconClass: 'case-study-icon',
        url: '/about-us'
      },
      {
        title: 'Blog',
        description: 'Open your store',
        iconClass: 'merchant-store-icon',
        url: '/blog'
      },
      {
        title: 'News & Events',
        description: 'Open your store',
        iconClass: 'merchant-store-icon',
        url: '/news-events'
      },
      {
        title: 'Affiliate Program',
        description: 'Open your store',
        iconClass: 'merchant-store-icon',
        url: '/affiliate-program'
      },
      {
        title: 'Help Center',
        description: 'Open your store',
        iconClass: 'merchant-store-icon',
        url: '/help-center'
      }
    ]
  }
];

// 按钮跳转配置
const buttonUrls = {
  'get-uuinin': '/download',
  'log-in': '/login',
  'sign-up': '/register',
  'language': '/language-settings'
};

// 下拉框状态管理
const isDropdownOpen = ref<boolean[]>(
    navigationConfig.map(item => item.hasDropdown ? false : false)
);
const hideTimers = ref<(number | null)[]>(
    navigationConfig.map(() => null)
);

// 二维码弹出框状态
const showQrcode = ref(false);

/**
 * 处理导航项鼠标进入事件
 * @param index 导航项索引
 */
const handleMouseEnter = (index: number) => {
  if (hideTimers.value[index]) {
    window.clearTimeout(hideTimers.value[index]!);
    hideTimers.value[index] = null;
  }

  if (navigationConfig[index].hasDropdown) {
    isDropdownOpen.value[index] = true;
  }
};

/**
 * 处理导航项鼠标离开事件
 * @param index 导航项索引
 */
const handleMouseLeave = (index: number) => {
  if (hideTimers.value[index]) {
    window.clearTimeout(hideTimers.value[index]!);
  }

  if (navigationConfig[index].hasDropdown) {
    hideTimers.value[index] = window.setTimeout(() => {
      isDropdownOpen.value[index] = false;
      hideTimers.value[index] = null;
    }, 50); // 延长延迟时间，确保动画完成
  }
};

/**
 * 处理导航项点击事件
 * @param item 导航项配置
 */
const handleNavigationClick = (item: any) => {
  // 如果没有下拉项且配置了url，则跳转
  if (item.url && item.url !== '#') {
    window.location.href = item.url;
  }
};

/**
 * 处理下拉项点击事件
 * @param subItem 下拉项配置
 */
const handleDropdownItemClick = (subItem: any) => {
  if (subItem.url && subItem.url !== '#') {
    window.location.href = subItem.url;
  }
};

/**
 * 处理按钮点击事件
 * @param key 按钮标识
 */
const handleButtonClick = (key: string) => {
  const url = buttonUrls[key as keyof typeof buttonUrls];
  if (url && url !== '#') {
    window.location.href = url;
  }
};

onMounted(() => {
  const dropdowns = document.querySelectorAll('.header-dropdown');
  if (dropdowns.length > 0) {
    console.log(`已找到 ${dropdowns.length} 个下拉框元素`);
  } else {
    console.error('未找到下拉框元素');
  }
});
</script>

<style scoped>
/* 基础样式重置 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 80px;
  background-color: #1a1a1a;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 9999;
  overflow: visible !important;
}

.logo img {
  height: 40px;
  width: auto;
}

.nav {
  flex: 1;
  margin: 0 2rem;
  overflow: visible !important;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 2.5rem;
}

.nav-item {
  color: #e0e0e0;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.nav-item:hover {
  color: #4b73ff;
}

/* 下拉容器 */
.dropdown-container {
  position: relative;
  padding: 8px 0;
  z-index: 10000;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
}

.dropdown-indicator {
  font-size: 12px;
  transition: transform 0.2s ease;
}

.dropdown-container:hover .dropdown-indicator {
  transform: rotate(180deg);
}

/* 下拉框样式 - 添加动画 */
.header-dropdown {
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 8px;
  min-width: 240px;
  background-color: #2b2b2b;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  padding: 16px 0;
  z-index: 10001 !important;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px) scale(0.95);
  pointer-events: none;
  transition:
      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 下拉框显示状态 */
:deep(.header-dropdown) {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

/* 下拉项动画 */
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.3s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.icon {
  width: 28px;
  height: 28px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;
  opacity: 0.9;
}

/* 图标定义 */
.case-study-icon {
  background-image: url('/icons/case-study-icon.svg');
}

.merchant-store-icon {
  background-image: url('/icons/merchant-store-icon.svg');
}

.text h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 3px 0;
  color: #fff;
}

.text p {
  font-size: 12px;
  color: #ccc;
  margin: 0;
  line-height: 1.4;
}

/* 操作按钮区域样式 */
.action-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.get-uuinin,
.log-in {
  background-color: rgba(29, 81, 254, 1);
  color: #fff;
}

.get-uuinin:hover,
.log-in:hover {
  background-color: #4e90ef;
  transform: translateY(-2px);
}

.sign-up {
  background-color: rgba(255, 255, 255, 0.3);
  color: #000;
}

.sign-up:hover {
  background-color: #f0f8ff;
  color: #000;
  transform: translateY(-2px);
}

.lang-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.lang-toggle:hover {
  transform: translateY(-2px);
}

.lang-icon {
  height: 32px;
  width: auto;
}

/* 二维码弹出框样式 - 向下弹出并添加动画 */
.qrcode-container {
  position: relative;
}

.qrcode-popup {
  position: absolute;
  top: 100%; /* 从按钮底部开始 */
  right: 0;
  margin-top: 10px; /* 与按钮保持间距 */
  z-index: 10002;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
  animation: popIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* 弹出动画 */
@keyframes popIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.qrcode-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.qrcode-img {
  width: 160px;
  height: 160px;
  margin-bottom: 8px;
  opacity: 0;
  transform: scale(0.9);
  animation: imageFadeIn 0.4s ease 0.1s forwards;
}

@keyframes imageFadeIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.qrcode-text {
  color: #333;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  opacity: 0;
  animation: textFadeIn 0.4s ease 0.2s forwards;
}

@keyframes textFadeIn {
  to {
    opacity: 1;
  }
}

/* 小三角指示器 - 向上指向按钮 */
.qrcode-arrow {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white; /* 三角形指向上方 */
  position: absolute;
  top: -8px; /* 位于弹出框顶部 */
  right: 24px; /* 水平位置调整 */
  opacity: 0;
  animation: arrowFadeIn 0.3s ease forwards;
}

@keyframes arrowFadeIn {
  to {
    opacity: 1;
  }
}

/* 响应式适配 */
@media (max-width: 768px) {
  .header {
    padding: 0 1rem;
  }

  .nav {
    display: none;
  }
}
</style>
