<template>
  <footer class="custom-footer">
    <!-- 左侧区域：LOGO + 社交图标 -->
    <div class="footer-left">
      <div class="logo">
        <!-- 替换成实际 LOGO 图片或文字 -->
        <img src="/logo.png" alt="UUININ Logo" />
      </div>
      <div class="social-icons">
        <a href="#" class="icon" aria-label="Telegram">
          <img src="/telegram-icon.png" alt="Telegram" />
        </a>
        <a href="#" class="icon" aria-label="X">
          <img src="/x-icon.png" alt="X" />
        </a>
        <a href="#" class="icon" aria-label="Instagram">
          <img src="/instagram-icon.png" alt="Instagram" />
        </a>
        <a href="#" class="icon" aria-label="YouTube">
          <img src="/youtube-icon.png" alt="YouTube" />
        </a>
        <a href="#" class="icon" aria-label="LinkedIn">
          <img src="/linkedin-icon.png" alt="LinkedIn" />
        </a>
        <a href="#" class="icon" aria-label="Discord">
          <img src="/discord-icon.png" alt="Discord" />
        </a>
      </div>
    </div>

    <!-- 右侧区域：菜单列 -->
    <div class="footer-right">
      <div class="menu-column">
        <h3>关于 AstroX</h3>
        <ul>
          <li><a href="#">公司简介</a></li>
          <li><a href="#">合规信息</a></li>
          <li><a href="#">新闻媒体</a></li>
          <li><a href="#">服务条款</a></li>
          <li><a href="#">隐私政策</a></li>
          <li><a href="#">免责声明</a></li>
          <li><a href="#">加入我们</a></li>
        </ul>
      </div>
      <div class="menu-column">
        <h3>产品</h3>
        <ul>
          <li><a href="#">现货交易</a></li>
          <li><a href="#">合约交易</a></li>
          <li><a href="#">极速期权</a></li>
          <li><a href="#">跟单交易</a></li>
          <li><a href="#">P2P 交易</a></li>
          <li><a href="#">理财产品</a></li>
        </ul>
      </div>
      <div class="menu-column">
        <h3>服务</h3>
        <ul>
          <li><a href="#">上市申请</a></li>
          <li><a href="#">代理计划</a></li>
          <li><a href="#">机构 & VIP 服务</a></li>
          <li><a href="#">P2P 商家申请</a></li>
          <li><a href="#">官方验证通道</a></li>
        </ul>
      </div>
      <div class="menu-column">
        <h3>支持</h3>
        <ul>
          <li><a href="#">帮助中心</a></li>
          <li><a href="#">提交建议</a></li>
          <li><a href="#">执法请求</a></li>
          <li><a href="#">举报通道</a></li>
        </ul>
      </div>
    </div>

    <!-- 底部版权（可选，看需求是否保留） -->
    <div class="copyright">
      <p>Copyright © 2020 My Company. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 若需要交互逻辑（比如动态加载菜单），可在此补充
</script>

<style scoped>
/*  Footer 容器基础样式 */
.custom-footer {
  background-color: #000; /* 黑色背景 */
  color: #fff;           /* 文字白色 */
  padding: 40px 20px;    /* 上下内边距，左右留白 */
  display: flex;         /* 让左右区域并排 */
  flex-wrap: wrap;       /* 小屏幕下自动换行 */
  justify-content: space-between; /* 左右区域分散对齐 */
}

/* 左侧区域：LOGO + 社交图标 */
.footer-left {
  margin-left: 10%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo img {
  max-height: 80px; /* 限制 LOGO 高度，可根据实际调整 */
  margin-bottom: 20px;
}

.social-icons {
  display: flex;
  gap: 10px; /* 图标之间间距 */
}

.social-icons .icon img {
  width: 40px; /* 统一图标大小 */
  height: 40px;
  opacity: 0.8; /* 初始透明度，hover 时变亮 */
  transition: opacity 0.3s ease;
}

.social-icons .icon:hover img {
  opacity: 1; /*  hover 时更亮 */
}

/* 右侧区域：多列菜单 */
.footer-right {
  display: flex;
  gap: 40px; /* 列之间间距 */
  flex-wrap: wrap; /* 小屏幕下换行 */
}

.menu-column {
  min-width: 160px; /* 限制列宽，避免太窄 */
}

.menu-column h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff; /* 标题稍浅，区分菜单 */
}

.menu-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-column li {
  margin-bottom: 8px;
}

.menu-column a {
  color: #fff;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.menu-column a:hover {
  opacity: 1;
  text-decoration: underline; /* hover 时下划线，增强交互 */
}

/* 版权信息（可选） */
.copyright {
  width: 100%; /* 占满一行 */
  text-align: center; /* 居中 */
  margin-top: 30px;
  color: #666; /* 浅灰色，弱化版权 */
  font-size: 0.8rem;
}

/* 响应式：小屏幕下布局调整 */
@media (max-width: 768px) {
  .custom-footer {
    flex-direction: column; /* 上下排列 */
    align-items: center;    /* 内容居中 */
    text-align: center;
  }

  .footer-left {
    align-items: center; /* LOGO、图标居中 */
    margin-bottom: 30px; /* 与右侧区域拉开间距 */
  }

  .footer-right {
    justify-content: center; /* 菜单列居中 */
  }
}
</style>