import type { APIRoute } from 'astro';
import { SERIES } from '../../../../data/series';

export async function getStaticPaths() {
  const paths = [];
  for (const series of SERIES) {
    for (const article of series.articles) {
      paths.push({
        params: { id: series.id, no: article.no },
        props: { series, article },
      });
    }
  }
  return paths;
}

function wrapText(text: string, maxCharsPerLine: number = 22): string[] {
  if (!text) return [];
  const lines: string[] = [];
  let currentLine = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    currentLine += char;
    const length = currentLine.replace(/[^\x00-\xff]/g, 'aa').length / 2;
    if (length >= maxCharsPerLine || i === text.length - 1) {
      lines.push(currentLine);
      currentLine = '';
    }
  }
  return lines;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ props }) => {
  const { series, article } = props;
  const seriesTitle = escapeXml(series.title);
  const articleTitle = escapeXml(article.title);
  const articleNo = escapeXml(article.no);
  const dateStr = escapeXml(article.date || '2026.08.11');

  const rawTitleLines = wrapText(articleTitle, 20);
  const titleLines = rawTitleLines.slice(0, 2);
  if (rawTitleLines.length > 2) {
    titleLines[1] = titleLines[1].substring(0, titleLines[1].length - 2) + '...';
  }

  const titleSvgText = titleLines
    .map((line, i) => `<tspan x="100" dy="${i === 0 ? 0 : 56}">${line}</tspan>`)
    .join('');

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
  <g transform="translate(100, 96)">
    <rect x="0" y="0" width="44" height="44" rx="4" fill="#C13A2B" />
    <text x="22" y="31" text-anchor="middle" font-family="'Noto Serif SC', 'PingFang SC', serif" font-weight="900" font-size="24" fill="#FAF7F2">阅</text>

    <text x="60" y="24" font-family="'Noto Serif SC', 'PingFang SC', serif" font-weight="900" font-size="22" fill="#171310" letter-spacing="1">阅微漫记</text>
    <text x="60" y="42" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#8B2A1F" letter-spacing="2">SERIES · 专栏卷宗</text>

    <rect x="850" y="6" width="150" height="28" fill="#171310" rx="2" />
    <text x="925" y="25" text-anchor="middle" font-family="'IBM Plex Mono', monospace" font-size="12" font-weight="700" fill="#FAF7F2" letter-spacing="1.5">VOL. ${series.id.toUpperCase()} · NO.${articleNo}</text>
  </g>

  <line x1="100" y1="168" x2="1100" y2="168" stroke="#171310" stroke-width="2" />
  <line x1="100" y1="172" x2="1100" y2="172" stroke="#C9BEA3" stroke-width="1" />

  <!-- 专栏分类标签 -->
  <g transform="translate(100, 205)">
    <rect x="0" y="0" width="180" height="32" fill="#C13A2B" rx="2" />
    <text x="90" y="21" text-anchor="middle" font-family="'Noto Serif SC', serif" font-weight="700" font-size="14" fill="#FAF7F2" letter-spacing="1">专栏 · ${seriesTitle}</text>
  </g>

  <!-- 5. 文章标题 -->
  <text x="100" y="300" font-family="'Noto Serif SC', 'Source Han Serif SC', serif" font-weight="900" font-size="40" fill="#171310" letter-spacing="0.5">
    ${titleSvgText}
  </text>

  <!-- 底部分割线 -->
  <line x1="100" y1="518" x2="1100" y2="518" stroke="#C9BEA3" stroke-width="1.5" stroke-dasharray="4 4" />

  <!-- 6. Footer 底部作者与时间信息 -->
  <g transform="translate(100, 554)">
    <text x="0" y="0" font-family="'Noto Serif SC', serif" font-weight="700" font-size="16" fill="#171310">作者：语霖</text>
    <text x="140" y="0" font-family="'IBM Plex Mono', monospace" font-size="15" fill="#6B6B6B">|</text>
    <text x="160" y="0" font-family="'IBM Plex Mono', monospace" font-size="15" fill="#6B6B6B">归档日期：${dateStr}</text>
    <text x="360" y="0" font-family="'IBM Plex Mono', monospace" font-size="15" fill="#6B6B6B">|</text>
    <text x="380" y="0" font-family="'Noto Serif SC', serif" font-size="15" fill="#6B6B6B">序号：NO.${articleNo}</text>

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
