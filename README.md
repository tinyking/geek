# 阅微漫记

一个基于 [Astro](https://astro.build) 构建的中文静态个人博客，包含普通文章、系列连载、站内搜索与多款写作工具，部署于 Vercel。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器 (localhost:3000)
npm run dev

# 构建生产版本（含 Pagefind 搜索索引生成）
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── assets/              # 本地图片（经 astro:assets 优化为 WebP/AVIF）
├── components/          # Astro 组件
│   ├── DossierTopbar.astro
│   ├── AuthorProfileCard.astro
│   ├── AdUnit.astro
│   └── SocialShare.astro
├── content/             # 内容集合（Markdown）
│   ├── config.ts        # Collection schema 定义
│   ├── posts/           # 普通文章
│   └── series-articles/ # 系列连载文章
├── layouts/             # 页面布局
│   └── BaseLayout.astro # 根布局 (SEO, JSON-LD, AdSense)
├── pages/               # 页面路由
│   ├── index.astro      # 首页
│   ├── posts/           # 文章列表与详情
│   ├── series/          # 系列索引与连载详情
│   ├── tags/            # 标签索引与详情
│   ├── search.astro     # Pagefind 站内搜索
│   ├── rss.xml.ts       # RSS 订阅源
│   ├── og/              # OG 图片动态生成 (SVG)
│   └── tools/           # 工具页面 (md-to-wechat, md-to-x, qrcode, cover)
└── styles/              # 全局样式 (dossier 主题 tokens)
```

## 技术栈

- **框架**: Astro 5.x (静态站点生成)
- **样式**: Tailwind CSS 3.x + 自定义 dossier 主题变量
- **内容**: Astro Content Collections（`posts` + `seriesArticles` 双集合）
- **图片**: astro:assets 自动优化（WebP/AVIF）
- **搜索**: Pagefind 静态站内搜索（构建时生成索引，零运行时成本）
- **SEO**: sitemap、RSS、JSON-LD 结构化数据、OG 图片
- **部署**: Vercel Adapter + 安全响应头

## 内容管理

内容统一使用 Markdown + frontmatter 管理，由 Astro Content Collections 校验类型。

### 普通文章（`src/content/posts/`）

```markdown
---
title: 文章标题
date: 2026-04-24
excerpt: 文章摘要
tags:
  - 标签1
  - 标签2
readingTime: 5
---

文章内容...
```

### 系列连载（`src/content/series-articles/`）

```markdown
---
title: 第 N 篇标题
date: 2026.04.26
no: "001"            # 注意：零填充编号需加引号
series: "life-debug" # 系列 slug，与首页/系列页对应
seriesTitle: 人生 Debug
seriesTab: SERIES 01
seriesDesc: 系列介绍
seriesStatus: 连载中
---

正文 Markdown，特殊视觉块（日记格式、流程图、引用等）可内嵌 HTML。
```

## 部署

项目已配置 Vercel Adapter，推送到 GitHub 后自动构建部署。`vercel.json` 定义了安全响应头（X-Frame-Options、X-Content-Type-Options、Referrer-Policy、Permissions-Policy）。

## License

MIT