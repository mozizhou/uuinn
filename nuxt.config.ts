export default defineNuxtConfig({
  // 启用 TypeScript 类型检查
  typescript: {
    strict: true
  },

  // 应用元信息配置（全局 SEO 基础）
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      // 全局元标签
      meta: [
        { name: 'description', content: '我们提供高质量的产品和服务，满足您的各种需求' },
        { name: 'keywords', content: '优质产品,专业服务,行业解决方案' },
        { name: 'author', content: 'Your Company' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Your Company Name' }
      ],
      // 全局链接
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },

  // 模块配置
  modules: [
    // SEO 模块
    '@nuxtjs/seo',
    // 图片优化模块
    '@nuxt/image',
    // 样式模块
    '@nuxtjs/tailwindcss'
  ],

  // 图片优化配置
  image: {
    domains: ['your-domain.com', 'picsum.photos'],
    formats: ['webp']
  },

  // 路由配置
  routeRules: {
    // 对所有页面启用静态生成（SSG）
    '/**': { prerender: true },
    // 动态页面使用服务端渲染
    '/blog/**': { ssr: true }
  }
})
