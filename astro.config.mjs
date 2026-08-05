import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.wangjianchao.cn',
  output: 'static',
  integrations: [
    react(),
    tailwind(),
    sitemap(),
  ],
  adapter: vercel(),
  vite: {
    ssr: {
      noExternal: ['lucide-react'],
    },
  },
});
