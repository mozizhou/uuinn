export default defineEventHandler(async (event) => {
    // 设置响应内容类型
    setHeader(event, 'Content-Type', 'application/xml');

    // 网站域名
    const baseUrl = 'https://yourcompany.com';

    // 网站页面列表
    const pages = [
        {path: '/', lastmod: new Date().toISOString()},
        {path: '/about', lastmod: new Date().toISOString()},
        {path: '/products', lastmod: new Date().toISOString()},
        {path: '/services', lastmod: new Date().toISOString()},
        {path: '/blog', lastmod: new Date().toISOString()},
        {path: '/contact', lastmod: new Date().toISOString()}
    ];

    // 生成XML内容
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${baseUrl}${page.path}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page.path === '/' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

    return xml;
});
