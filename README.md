# 阅微漫记

一个基于 [Astro](https://astro.build) 构建的静态个人博客，支持 Markdown 内容管理和 Vercel 部署。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── components/        # Astro 组件
│   ├── Navbar.astro
│   ├── Hero.astro
│   ├── Footer.astro
│   └── Projects.astro
├── content/posts/     # Markdown 文章
├── layouts/           # 页面布局
├── pages/             # 页面路由
│   ├── index.astro    # 首页
│   ├── posts/         # 文章列表与详情
│   └── tools/         # 工具页面
└── styles/            # 全局样式
```

## 技术栈

- **框架**: Astro 5.x (静态站点生成)
- **UI**: React 组件 (交互式部分)
- **样式**: Tailwind CSS 3.x
- **内容**: Astro Content Collections
- **部署**: Vercel

## 文章写作

在 `src/content/posts/` 目录下创建 Markdown 文件：

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

## 部署

项目已配置 Vercel Adapter，推送到 GitHub 后会自动部署。

## License

MIT
