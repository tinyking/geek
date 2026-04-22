# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

This is a Next.js 16 personal portfolio website built with React 19, TypeScript, and Tailwind CSS 4. The site is a single-page portfolio for a designer/developer with Chinese language content.

## Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Build & Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## Architecture

### Directory Structure

- `app/` - Next.js App Router directory
  - `layout.tsx` - Root layout with Geist fonts and global styles
  - `page.tsx` - Main page composing all section components
  - `globals.css` - Global styles including Tailwind and custom CSS variables
  - `components/` - React components for each page section (Navbar, Hero, Skills, About, Projects, Contact, Footer)

### Key Technologies

- **Next.js 16** - App Router with React Server Components
- **React 19** - Latest React version
- **Tailwind CSS 4** - Using `@tailwindcss/postcss` plugin (new PostCSS-based approach)
- **TypeScript** - Strict mode enabled
- **lucide-react** - Icon library

### Styling

The project uses CSS custom properties for theming (`:root` in globals.css):
- `--bg-warm`, `--text-primary`, `--text-secondary`, `--accent`, `--border`

Custom Tailwind component classes defined in `globals.css`:
- `.btn-primary`, `.btn-secondary`, `.section-padding`

### Path Aliases

`@/*` maps to the project root (configured in tsconfig.json), enabling imports like `@/components/Navbar`.

## Notes

- Some component files (Skills, About, Contact, Footer) are currently empty placeholders
- The site uses smooth scrolling navigation between sections
- ESLint is configured with Next.js core web vitals and TypeScript rules

## 自定义命令约定
当我在对话中使用以下斜杠快捷词时，请执行对应操作：

- **/post**: 复制目标内容到项目的文章中。
