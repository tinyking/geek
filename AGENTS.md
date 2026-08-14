# Project: 阅微漫记

Astro 5.x 静态个人博客，中文内容，Vercel 部署。

## Commands

- `npm run dev` — 启动开发服务器 (localhost:3000)
- `npm run build` — 构建生产版本（含 Pagefind 索引生成）
- `npm run preview` — 预览生产构建

No test framework is configured.

## Architecture

### Tech Stack

- **Astro 5.x** (`output: 'static'`) — 静态站点生成，文件路由
- **Tailwind CSS 3.x** via `@astrojs/tailwind` — 样式系统
- **Astro Content Collections** — 文章内容管理，schema 在 `src/content.config.ts`
  - `posts` — 普通文章（`src/content/posts/*.md`）
  - `seriesArticles` — 系列连载文章（`src/content/series-articles/*.md`）
- **astro:assets** — 图片优化（WebP/AVIF 自动转换，仅 `src/assets/` 下的图片）
- **Pagefind** via `astro-pagefind` — 静态站内搜索，构建时生成索引
- **Vercel Adapter** — 部署适配器
- **highlight.js** — 代码高亮
- **rehype 外链插件** — 自动为外链注入 `target="_blank"` + `rel="noopener noreferrer"`

### Content Collections

- Post schema (`src/content.config.ts`): `title`, `date` (Date), `excerpt`, `tags` (string[]), `readingTime` (number). Posts live in `src/content/posts/` as Markdown files with frontmatter.
- SeriesArticle schema: `title`, `date` (string), `no` (string, 零填充如 "001"), `series`, `seriesTitle`, `seriesTab`, `seriesDesc`, `seriesStatus`. Files live in `src/content/series-articles/`.

### Routing

- `src/pages/index.astro` — 首页
- `src/pages/posts/index.astro` — 文章列表
- `src/pages/posts/[slug].astro` — 文章详情 (uses `getStaticPaths` + `getCollection`)
- `src/pages/tags/index.astro` — 标签索引
- `src/pages/tags/[tag].astro` — 标签详情页
- `src/pages/series/[id].astro` — 系列索引
- `src/pages/series/[id]/[no].astro` — 系列文章详情
- `src/pages/search.astro` — Pagefind 站内搜索
- `src/pages/rss.xml.ts` — RSS 订阅源（含 posts + seriesArticles，带 content:encoded）
- `src/pages/tools/` — 工具页面 (md-to-wechat, md-to-x, qrcode, cover)
- `src/pages/og/` — OG 图片动态生成 (SVG)

### Layout & Components

- `src/layouts/BaseLayout.astro` — 根布局 (HTML shell, global CSS, Google AdSense, JSON-LD)
- `src/components/` — DossierTopbar, AuthorProfileCard, AdUnit, SocialShare (all Astro components)

### Styling

CSS variables in `src/styles/global.css`: `--paper` (#f0e4cd), `--ink` (#171310), `--red` (#c13a2b), `--border` (#c9bea3). Dossier theme tokens on `body.dossier`. Page-level styles in scoped `<style is:global>` blocks.

### Config

- `astro.config.mjs` — 集成: tailwind, sitemap, pagefind; rehype 外链插件; vercel adapter
- `vercel.json` — 安全响应头 (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)

## Custom Commands

- **/post**: 复制目标内容到项目的文章中
