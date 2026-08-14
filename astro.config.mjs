import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

/**
 * 内联 rehype 插件：为外链自动注入 target="_blank" 与 rel="noopener noreferrer"
 * 仅对 http/https 且非本站域名生效，避免影响站内相对链接与锚点。
 */
const rehypeExternalLinks = () => (tree) => {
  const SITE_HOST = 'www.wangjianchao.cn';
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'a' && node.properties) {
      const href = node.properties.href;
      if (typeof href === 'string' && /^https?:\/\//i.test(href)) {
        try {
          const u = new URL(href);
          if (u.hostname !== SITE_HOST) {
            node.properties.target = '_blank';
            node.properties.rel = 'noopener noreferrer';
          }
        } catch {
          /* 解析失败的外链也补 rel，保守处理 */
          node.properties.rel = 'noopener noreferrer';
        }
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };
  walk(tree);
  return tree;
};

export default defineConfig({
  site: 'https://www.wangjianchao.cn',
  output: 'static',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  markdown: {
    rehypePlugins: [rehypeExternalLinks],
  },
  integrations: [
    tailwind(),
    sitemap(),
    pagefind(),
  ],
  adapter: vercel(),
});
