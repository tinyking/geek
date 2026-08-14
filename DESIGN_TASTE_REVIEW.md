# 阅微漫记 · 设计味觉评审（taste-skill）

> 评审视角：设计质量 / anti-slop 前端（taste-skill），与既有 `website-audit-2026-08-12.md`（工程/SEO/性能）和 `OPTIMIZATION_SUGGESTIONS.md`（UX/运营）互补，不重复。
> 评审方式：静态代码全量阅读（global.css / BaseLayout / index / posts/* / 404 等）。
> 日期：2026-08-14

---

## 0. Design Read（设计判读）

**Reading this as:** editorial / 个人卷宗博客（中文长文 + 系列连载），面向技术读者与私域读者，语言为「档案 / 手稿 / 印章」式的编辑型（dossier / manuscript），设计系统倾向 Astro + 原生 CSS 变量（paper / ink / red / manila 卷宗令牌）。

**模式判定：Redesign - Preserve（保留式演进）。** 卷宗视觉语言已成型、辨识度高，不应推翻，应做「统一 + 收紧」。

**三档 Dials 实测：**

| Dial | 建议值 | 当前实测 | 评价 |
|---|---|---|---|
| `DESIGN_VARIANCE` | 6（editorial 基线） | ~7-8（绝对定位侧栏、sticky 双栏、zigzag 项目、时间线） | 略高但符合编辑型，可接受 |
| `MOTION_INTENSITY` | 4 | ~4-5（滚动显现 + scrollspy + 进度条，已处理 reduced-motion） | 合理，动机清晰 |
| `VISUAL_DENSITY` | 3 | ~3（py-120 大留白） | 良好 |

---

## 1. 🔴 P0 — 必须修：双设计系统 + 品牌名分裂

这是当前**最大的设计问题**，不是细节。

### 1.1 强调色分裂：橙 vs 红 同页共存

- `:root`（`src/styles/global.css:7-16`）定义 `--accent: #e57035`（橙）。
- `body.dossier`（`global.css:749-784`）定义 `--red: #c13a2b`（红）。
- 文章页 `posts/[slug].astro` 用 `bodyClass="dossier"`，但 `.prose` 内联样式仍引用 `var(--accent)`：
  - `.prose a { color: var(--accent) }`（global.css:263）→ 橙
  - `.prose code { color: var(--accent) }`（global.css:179）→ 橙
  - `.prose blockquote { border-left: 4px solid var(--accent) }`（global.css:246）→ 橙
  - `.prose td code / td strong { color: var(--accent) }`（global.css:243）
- 而同一文章页的卷宗外壳（topbar、标题、TOC 高亮、章头红线）全是 `#c13a2b` 红。

**结果：一篇文章页上同时出现橙 + 红两个强调色。** 这直接违反 taste-skill 的 Color Consistency Lock（4.2）与 Page Theme Lock（4.11）。

**改法（二选一，推荐 A）：**
- A. 让卷宗成为唯一品牌：在 `body.dossier` 作用域内重定义 `--accent: var(--red)`（或全局把 `--accent` 改为 `#c13a2b`），并同步 `tailwind.config.mjs` 的 `accent.DEFAULT` 与 `<meta name="theme-color">`（BaseLayout.astro:78，当前 `#e57035`）。
- B. 若坚持保留橙色作为次要强调，必须建立「红=结构 / 橙=交互」的明确层级规则并全站一致，否则就是失控。

### 1.2 品牌名分裂：观禾 vs 语霖 / 阅微漫记

- `BaseLayout.astro` 默认值：`title = '观禾·浮生观禾，静心成长'`、`siteName = '观禾·浮生观禾...'`、`description` 同（行 16-28）。
- 非 dossier 页面（tools / search / tags / 默认）会渲染「观禾」品牌。
- 但 dossier 页面用的是「语霖·人生 Debug / 阅微漫记」。例如 `posts/index.astro:43` 标题仍是「全部文章 | 观禾·浮生观禾...」，与首页「语霖·人生 Debug」冲突。

**结果：读者在不同页面看到两个品牌名。** 这是品牌识别硬伤，比配色更严重。

**改法：** 统一 `BaseLayout.astro` 的 `siteName` / 默认 `title` / `description` 为「阅微漫记 / 语霖」，并排查所有 `观禾` 残留（grep `观禾`）。

---

## 2. 🟠 P1 — 收紧：装饰性 AI-Tell

以下按 taste-skill 的 Pre-Flight 规则逐条核对，多为「在卷宗语境下勉强成立，但需克制」。

### 2.1 章节编号 / eyebrow 密度过高

- 首页 7 个 section 全部带 `ch-head`：`ch-no`（01…06）+ `ch-en`（ORIGIN / SERIES / LIFE OS / BUILDS / TOOLS / STORY）+ `ch-line`（index.astro:110-115 等）。
- 右侧还有 `.rail` 00-06 编号（index.astro:51-59）。
- Hero 还有 `kicker`「LIFE OS · V1.0 — RUNNING — BEIJING · UPTIME 40Y」（index.astro:81）。

taste-skill 机械规则：eyebrow 数量 ≤ ceil(section/3) = 2，当前 ≈ 7+。

**判读：** 编号章节是「卷宗/手稿」的核心品牌装置，**可以保留**；但风险是它已漂移到「agency 作品集」Tell 区。建议：
- 保留 `ch-no` + `ch-en` 作为唯一签名装置，**删除其它竞争性装饰**：`kicker` 精简（去掉 `— RUNNING — BEIJING · UPTIME 40Y` 这类氛围串），`.rail` 编号与 `ch-no` 二选一或视觉去重。
- 不要在非章节位置再叠加 `stamp` / `PRJ.01` / `TLS-*` 等 mono 编号，避免「到处都是编号」。

### 2.2 Scroll cue 禁用

- `scroll-hint`「SCROLL — 01 / 起源」（index.astro:89）属 taste-skill 明令禁止的 scroll cue（9.F）。**直接删除或改为无文字的细箭头**。

### 2.3 拉丁标签中的 em-dash

- `kicker` 与 `scroll-hint` 用了 `—`（em-dash）作装饰分隔。taste-skill 对 eyebrow/pill/button 文本禁用 em-dash。
- **中文正文里的 `——` 是合法标点，不在此列，勿误改。**
- **改法：** 上述 Latin mono 标签中的 `—` 改为 `·`（middot）或空格，例如 `LIFE OS · V1.0 · RUNNING · BEIJING`。

---

## 3. 🟠 P1 — 对比度：小号 mono 标签在米色底上偏灰

卷宗底为 `--paper: #f0e4cd`（米色），但多处小字用低对比灰：

- `--los-ink2: #52607a`（蓝灰）用于 `kicker` / `lede` / `ch-en` / `scroll-hint` / `r-pct small` 等 10-12px 文字（index.astro 多处）。
- dossier `--ink-soft: #736b5e` 用于 TOC 链接等。

按 WCAG AA，小字需 ≥ 4.5:1。蓝灰 #52607a 在米色 #f0e4cd 上约 4.2:1（临界/不达标），且蓝灰与整体「墨/红」色调不协调（偏冷）。

**改法：** 把小号次要文字统一到暖墨灰（如 `#5b5346` 或更深），并避免蓝灰 `#52607a` 出现在卷宗暖色系里；或把小字加粗到 600 以放宽到 3:1（大字号阈值）。同时修掉既有审计已标记的 `#9ca3af`（`--ink-muted`，仅用于装饰，绝不可作正文）。

---

## 4. 🟡 P2 — 演进：让卷宗更耐看

### 4.1 暗色模式（night desk）

taste-skill 要求消费级页面默认双模。卷宗是「纸」隐喻，硬套通用 dark 会破坏概念。**正确做法：** 做「夜案」反相——`--paper` 变深墨 `#1c1814`，文字变米色 `#f0e4cd`，红线/印章保留。这既满足暗色需求，又不背离卷宗隐喻。需同步 `prefers-color-scheme` 与手动切换。

### 4.2 硬阴影语言需统一

卷宗的签名是「硬偏移阴影」（`box-shadow: Npx Npx 0 var(--ink)`）：folder 卡 6px（posts/index.astro:256）、qr-card 8px（index.astro:1069）、code-block 4px（global.css:330）。但工具卡 `.t-card` 用的是**柔和阴影** `0 8px 24px rgba(...)`（index.astro:938）——与卷宗语言不一致。

**改法：** 工具卡改为硬阴影或至少统一圆角/边框语言；或反过来全站统一为柔和阴影。二选一，别混用。

### 4.3 真实视觉资产

taste-skill：即便编辑型也需真实图片。当前 posts 列表（folder 卡）与文章卡为纯文字 + 牛皮纸标签，符合「档案」概念、可接受；但**文章正文 / 首页项目区**应保证有真实配图（已有 `sitepage.svg` 预览，良好）。建议：每篇文章补一张封面（接入 `<Image>` 优化，见既有审计 4.6），列表卡可加小缩略图提升扫读效率。

### 4.4 侧栏碰撞（900-1100px）

首页 `.side`（绝对定位，right:32px，含竖排文字 + 印章，index.astro:478-489）与 `.rail`（right:26px，行 400-419）在 900-1100px 区间可能重叠。`.side` 在 ≤900px 隐藏，`.rail` 在 ≤1100px 隐藏——但 900-1100 段两者都在。

**改法：** 把 `.rail` 隐藏断点提到与 `.side` 一致（≤1100 隐藏 rail 没问题，但需确保 900-1100 时 side 不压到 h1/lede；或让 side 在 ≤1100 即隐藏，仅留 rail 到 1100）。

---

## 5. Pre-Flight 速查（taste 视角）

| 检查项 | 状态 | 备注 |
|---|---|---|
| 强调色唯一（Color Lock） | ❌ | 橙/红同页（1.1） |
| 页面主题锁定（Theme Lock） | ⚠️ | 双系统（:root 暖白 vs body.dossier 米色） |
| 品牌一致性 | ❌ | 观禾 vs 语霖（1.2） |
| em-dash（Latin 标签） | ⚠️ | kicker/scroll-hint（2.3） |
| scroll cue | ❌ | scroll-hint（2.2） |
| eyebrow 密度 | ⚠️ | 编号章节可保留，需去重（2.1） |
| 小字对比度 AA | ⚠️ | 蓝灰 on 米色（3） |
| 暗色模式 | ❌ | 缺（4.1） |
| 硬阴影一致性 | ⚠️ | t-card 柔和阴影（4.2） |
| 真实图片 | ✅ | 项目区有预览，列表可补 |
| 动画动机 / reduced-motion | ✅ | 良好 |
| 布局多样性（首页） | ✅ | hero/分栏/网格/zigzag/时间线，丰富 |
| 衬线使用正当性 | ✅ | 编辑/手稿语境，非 AI 默认 |

---

## 6. 落地优先级

| 优先级 | 任务 | 文件 |
|---|---|---|
| 🔴 P0 | 统一强调色：卷宗为唯一品牌，`--accent` 对齐 `--red`；改 `theme-color` 与 tailwind `accent` | global.css / BaseLayout.astro:78 / tailwind.config.mjs |
| 🔴 P0 | 统一品牌名：grep `观禾` → 改为「阅微漫记 / 语霖」，修 BaseLayout 默认 title/siteName/description | BaseLayout.astro / posts/index.astro 等 |
| 🟠 P1 | 删除 scroll-hint；精简 kicker 氛围串；Latin 标签 em-dash → `·` | index.astro:81,89 |
| 🟠 P1 | 小号 mono 文字对比度：蓝灰 `#52607a` → 暖墨灰；`#9ca3af` 仅装饰 | global.css / index.astro |
| 🟡 P2 | 暗色「夜案」反相模式 | global.css tokens |
| 🟡 P2 | 工具卡阴影统一为卷宗硬阴影语言 | index.astro:938 |
| 🟡 P2 | 侧栏/导轨碰撞断点对齐 | index.astro:419,490 |
| 🟡 P2 | 文章封面图 + `<Image>` 优化 | content / [slug].astro |

> 与既有审计关系：工程/SEO/性能项见 `website-audit-2026-08-12.md`；UX/运营项见 `OPTIMIZATION_SUGGESTIONS.md`。本文仅覆盖**设计味觉层**。
