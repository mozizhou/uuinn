<template>
  <main class="features-section">
    <!-- 遍历特征配置生成所有板块 -->
    <FeatureBlock
        v-for="(feature, index) in featuresConfig"
        :key="index"
        :title="feature.title"
        :description="feature.description"
        :imageUrl="feature.imageUrl"
        :imageAlt="feature.imageAlt"
        :imageStyle="feature?.imageStyle"
        :buttons="feature.buttons"
        :reverse="feature.reverse"
    />
  </main>
</template>

<script setup lang="ts">
// 特征板块配置接口
import FeatureBlock from "~/components/common/FeatureBlock.vue";

interface FeatureButton {
  text: string;
  type: 'primary' | 'ghost' | 'outline';
  action?: () => void; // 按钮点击事件
}

interface FeatureConfig {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageStyle?: string;
  buttons: FeatureButton[];
  reverse?: boolean; // 是否反向排列
}

// 特征板块配置数据
const featuresConfig: FeatureConfig[] = [
  {
    title: 'Smarter Shopping, Better Prices',
    description: `Enjoy an AI-enhanced shopping experience with lower costs,
      price comparisons, and random free product giveaways.  Let AI help you shop smarter.`,
    imageUrl: '/images/feature-1.png',
    imageAlt: 'Smarter Shopping Preview',
    imageStyle: 'width: 450px',
    buttons: [
      { text: 'Shop Now', type: 'primary' }
    ]
  },
  {
    title: 'Watch Your Favorite Hosts Anytime',
    description: `Enjoy seamless access to your favorite livestreamers whenever you want.<br/>
      Never miss a deal or a moment of entertainment.`,
    imageUrl: '/images/feature-2.png',
    imageAlt: 'Hosts Preview',
    buttons: [
      { text: 'Show Now', type: 'primary' }
    ],
    reverse: true
  },
  {
    title: 'Create Videos, Earn Rewards',
    description: `Everyone can be a creator.<br/>
      Watch or generate videos using our AI tools
      and start earning through your content.`,
    imageUrl: '/images/feature-3.png',
    imageAlt: 'Video Creation Preview',
    buttons: [
      { text: 'Get UUINN', type: 'ghost' },
      { text: 'Create Video Now', type: 'ghost' }
    ]
  }
];
</script>

<style scoped>
.features-section {
  background-color: #000;
  color: #fff;
  padding: 0 0;
  display: flex;
  flex-direction: column;
}
</style>
