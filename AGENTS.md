# Project: 阅微漫记

Astro 5.x 静态个人博客，中文内容，Vercel 部署。

## Commands

- `npm run dev` — 启动开发服务器 (localhost:4321)
- `npm run build` — 构建生产版本
- `npm run preview` — 预览生产构建

No test framework is configured.

## Architecture

### Tech Stack

- **Astro 5.x** (`output: 'static'`) — 静态站点生成，文件路由
- **React 19** via `@astrojs/react` — 仅用于交互式组件
- **Tailwind CSS 3.x** via `@astrojs/tailwind` — 样式系统
- **Astro Content Collections** — 文章内容管理，schema 在 `src/content/config.ts`
- **Vercel Adapter** — 部署适配器
- **highlight.js** — 代码高亮

### Path Aliases

`@/*` → `src/*` (defined in tsconfig.json)

### Content Collections

Post schema (`src/content/config.ts`): `title` (string), `date` (Date), `excerpt` (string), `tags` (string[]), `readingTime` (number). Posts live in `src/content/posts/` as Markdown files with frontmatter.

### Routing

- `src/pages/index.astro` — 首页
- `src/pages/posts/index.astro` — 文章列表
- `src/pages/posts/[slug].astro` — 文章详情 (uses `getStaticPaths` + `getCollection`)
- `src/pages/tools/` — 工具页面 (md-to-wechat, md-to-x, qrcode, cover)
- `src/pages/about.astro`, `skills.astro`, `contact.astro`, `projects.astro` — 其他页面

### Layout & Components

- `src/layouts/BaseLayout.astro` — 根布局 (HTML shell, global CSS, Google AdSense)
- `src/components/` — Navbar, Hero, Footer, Projects (all Astro components)
- 每个页面手动组合 Navbar + content + Footer

### Styling

CSS variables in `src/styles/global.css`: `--bg-warm` (#fafaf8), `--text-primary` (#1a1a1a), `--text-secondary` (#6b6b6b), `--accent` (#e57035), `--border` (#e5e5e0). Custom Tailwind component classes: `.btn-primary`, `.btn-secondary`, `.section-padding`. Post prose styles defined in `[slug].astro` scoped `<style>`.

### Vite Config

SSR `noExternal` includes `lucide-react` (in astro.config.mjs).

## Custom Commands

- **/post**: 复制目标内容到项目的文章中
