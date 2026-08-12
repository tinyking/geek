import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF7F2" />
      <stop offset="100%" stop-color="#EFE8D8" />
    </linearGradient>
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#171310" stroke-width="1" opacity="0.04" />
    </pattern>
  </defs>

  <!-- 1. 基础纸张背景 -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#gridPattern)" />

  <!-- 2. 外框边线 -->
  <rect x="36" y="36" width="1128" height="558" fill="none" stroke="#C9BEA3" stroke-width="2" />
  <rect x="42" y="42" width="1116" height="546" fill="none" stroke="#171310" stroke-width="1" opacity="0.1" />

  <!-- 3. 四角红章纹饰 -->
  <path d="M 36 60 L 36 36 L 60 36" fill="none" stroke="#C13A2B" stroke-width="5" />
  <path d="M 1164 60 L 1164 36 L 1140 36" fill="none" stroke="#C13A2B" stroke-width="5" />
  <path d="M 36 570 L 36 594 L 60 594" fill="none" stroke="#C13A2B" stroke-width="5" />
  <path d="M 1164 570 L 1164 594 L 1140 594" fill="none" stroke="#C13A2B" stroke-width="5" />

  <!-- 4. 品牌 Header 区域 -->
  <g transform="translate(100, 120)">
    <rect x="0" y="0" width="56" height="56" rx="6" fill="#C13A2B" />
    <text x="28" y="40" text-anchor="middle" font-family="'Noto Serif SC', 'PingFang SC', serif" font-weight="900" font-size="32" fill="#FAF7F2">阅</text>

    <text x="76" y="30" font-family="'Noto Serif SC', 'PingFang SC', serif" font-weight="900" font-size="28" fill="#171310" letter-spacing="1.5">阅微漫记</text>
    <text x="76" y="52" font-family="'IBM Plex Mono', monospace" font-size="13" fill="#8B2A1F" letter-spacing="2">PERSONAL DIGITAL DOSSIER</text>
  </g>

  <line x1="100" y1="210" x2="1100" y2="210" stroke="#171310" stroke-width="2" />
  <line x1="100" y1="214" x2="1100" y2="214" stroke="#C9BEA3" stroke-width="1" />

  <!-- 5. 标语与介绍 -->
  <text x="100" y="300" font-family="'Noto Serif SC', serif" font-weight="900" font-size="46" fill="#171310" letter-spacing="1">
    观禾 · 浮生观禾，静心成长
  </text>

  <text x="100" y="370" font-family="'Noto Serif SC', sans-serif" font-size="22" fill="#554b42" letter-spacing="0.5">
    语霖的个人数字卷宗 — 记录技术探索、架构设计、产品思考与生活感悟
  </text>

  <g transform="translate(100, 420)">
    <rect x="0" y="0" width="320" height="36" fill="#E6DCC4" stroke="#C9BEA3" rx="2" />
    <text x="160" y="23" text-anchor="middle" font-family="'IBM Plex Mono', monospace" font-size="14" font-weight="600" fill="#8B2A1F" letter-spacing="1">FULL-STACK · SYSTEM · LIFE OS</text>
  </g>

  <!-- 底部分割线 -->
  <line x1="100" y1="518" x2="1100" y2="518" stroke="#C9BEA3" stroke-width="1.5" stroke-dasharray="4 4" />

  <!-- 6. Footer 底部信息 -->
  <g transform="translate(100, 554)">
    <text x="0" y="0" font-family="'Noto Serif SC', serif" font-weight="700" font-size="16" fill="#171310">博主：语霖</text>
    <text x="140" y="0" font-family="'IBM Plex Mono', monospace" font-size="15" fill="#6B6B6B">|</text>
    <text x="160" y="0" font-family="'Noto Serif SC', serif" font-size="15" fill="#6B6B6B">执笔为语 · 心落成霖</text>

    <text x="1000" y="0" text-anchor="end" font-family="'IBM Plex Mono', monospace" font-weight="600" font-size="15" fill="#C13A2B" letter-spacing="1">wangjianchao.cn</text>
  </g>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
