# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

阅微漫记 - 一个基于 Astro 5.x 构建的静态个人博客，支持 Markdown 内容管理和 Vercel 部署。站点使用中文内容。

## Commands

```bash
npm run dev       # 启动开发服务器 (localhost:4321)
npm run build     # 构建生产版本
npm run preview   # 预览生产构建
```

## Architecture

### Directory Structure

- `src/pages/` - 文件路由
  - `index.astro` - 首页
  - `posts/` - 文章列表与详情页
  - `tools/` - 工具页面 (md-to-wechat, qrcode 等)
  - `about.astro`, `skills.astro`, `contact.astro` - 其他页面
- `src/components/` - Astro 组件 (Navbar, Hero, Footer, Projects)
- `src/layouts/` - 页面布局 (BaseLayout.astro)
- `src/content/posts/` - Markdown 文章内容
- `src/styles/` - 全局样式

### Key Technologies

- **Astro 5.x** - 静态站点生成，`output: 'static'`
- **React 19** - 通过 `@astrojs/react` 集成，用于交互式组件
- **Tailwind CSS 3.x** - 通过 `@astrojs/tailwind` 集成
- **Astro Content Collections** - 文章内容管理，schema 定义在 `src/content/config.ts`
- **Vercel Adapter** - 部署适配器

### Path Aliases

`@/*` 映射到 `src/*` (tsconfig.json)，如 `@/components/Navbar`。

### Styling

CSS 变量定义在 `src/styles/global.css`：
- `--bg-warm`, `--text-primary`, `--text-secondary`, `--accent`, `--border`

自定义 Tailwind 组件类：`.btn-primary`, `.btn-secondary`, `.section-padding`

## 文章写作

在 `src/content/posts/` 创建 Markdown 文件：

```markdown
---
title: 文章标题
date: 2026-04-24
excerpt: 文章摘要
tags:
  - 标签1
readingTime: 5
---

文章内容...
```

## 自定义命令约定

- **/post**: 复制目标内容到项目的文章中
