import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

// 辅助函数：按字符数安全换行中文字符串
function wrapText(text: string, maxCharsPerLine: number = 22): string[] {
  if (!text) return [];
  const lines: string[] = [];
  let currentLine = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    currentLine += char;
    // 双字节/中文算1，单字节/英文算0.5
    const length = currentLine.replace(/[^\x00-\xff]/g, 'aa').length / 2;
    if (length >= maxCharsPerLine || i === text.length - 1) {
      lines.push(currentLine);
      currentLine = '';
    }
  }
  return lines;
}

// 转义 XML 特殊字符
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ props }) => {
  const post = props.post;
  const title = escapeXml(post.data.title || '阅微漫记文章');
  const excerpt = escapeXml(post.data.excerpt || post.data.description || '阅读全文探索更多精彩内容...');
  const author = escapeXml(post.data.author || '语霖');
  const dateStr = post.data.date ? new Date(post.data.date).toISOString().split('T')[0] : '2026-08-11';
  const readingTime = post.data.readingTime ? `${post.data.readingTime} 分钟阅读` : '深度好文';
  const tags = post.data.tags || [];
  const tagsStr = escapeXml(tags.slice(0, 3).map((t: string) => `#${t}`).join(' '));

  // 标题换行，最多 2 行
  const rawTitleLines = wrapText(title, 20);
  const titleLines = rawTitleLines.slice(0, 2);
  if (rawTitleLines.length > 2) {
    titleLines[1] = titleLines[1].substring(0, titleLines[1].length - 2) + '...';
  }

  // 摘要换行，最多 2 行
  const rawExcerptLines = wrapText(excerpt, 32);
  const excerptLines = rawExcerptLines.slice(0, 2);
  if (rawExcerptLines.length > 2) {
    excerptLines[1] = excerptLines[1].substring(0, excerptLines[1].length - 2) + '...';
  }

  const titleSvgText = titleLines
    .map((line, i) => `<tspan x="100" dy="${i === 0 ? 0 : 54}">${line}</tspan>`)
    .join('');

  const excerptSvgText = excerptLines
    .map((line, i) => `<tspan x="100" dy="${i === 0 ? 0 : 32}">${line}</tspan>`)
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- 背景渐变 -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF7F2" />
      <stop offset="100%" stop-color="#EFE8D8" />
    </linearGradient>
    
    <!-- 网格纹理 -->
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#171310" stroke-width="1" opacity="0.04" />
    </pattern>

    <!-- 阴影滤镜 -->
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="8" dy="12" stdDeviation="12" flood-color="#171310" flood-opacity="0.08" />
    </filter>
  </defs>

  <!-- 1. 基础纸张背景 -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#gridPattern)" />

  <!-- 2. 外框边线 (档案卷宗风格) -->
  <rect x="36" y="36" width="1128" height="558" fill="none" stroke="#C9BEA3" stroke-width="2" />
  <rect x="42" y="42" width="1116" height="546" fill="none" stroke="#171310" stroke-width="1" opacity="0.1" />

  <!-- 3. 四角红章纹饰 -->
  <path d="M 36 60 L 36 36 L 60 36" fill="none" stroke="#C13A2B" stroke-width="5" />
  <path d="M 1164 60 L 1164 36 L 1140 36" fill="none" stroke="#C13A2B" stroke-width="5" />
  <path d="M 36 570 L 36 594 L 60 594" fill="none" stroke="#C13A2B" stroke-width="5" />
  <path d="M 1164 570 L 1164 594 L 1140 594" fill="none" stroke="#C13A2B" stroke-width="5" />

  <!-- 4. 品牌 Header 区域 -->
  <g transform="translate(100, 96)">
    <!-- 红色品牌印章 -->
    <rect x="0" y="0" width="44" height="44" rx="4" fill="#C13A2B" />
    <text x="22" y="31" text-anchor="middle" font-family="'Noto Serif SC', 'PingFang SC', serif" font-weight="900" font-size="24" fill="#FAF7F2">阅</text>
    
    <!-- 站点名称 -->
    <text x="60" y="24" font-family="'Noto Serif SC', 'PingFang SC', serif" font-weight="900" font-size="22" fill="#171310" letter-spacing="1">阅微漫记</text>
    <text x="60" y="42" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#8B2A1F" letter-spacing="2">DOSSIER · ARTICLE SHARE</text>
    
    <!-- 右侧编号 -->
    <rect x="880" y="6" width="120" height="28" fill="#171310" rx="2" />
    <text x="940" y="25" text-anchor="middle" font-family="'IBM Plex Mono', monospace" font-size="12" font-weight="700" fill="#FAF7F2" letter-spacing="1.5">NO. ${post.id.slice(0, 8).toUpperCase()}</text>
  </g>

  <!-- 分割线条 -->
  <line x1="100" y1="168" x2="1100" y2="168" stroke="#171310" stroke-width="2" />
  <line x1="100" y1="172" x2="1100" y2="172" stroke="#C9BEA3" stroke-width="1" />

  <!-- 5. 文章标题 -->
  <text x="100" y="245" font-family="'Noto Serif SC', 'Source Han Serif SC', serif" font-weight="900" font-size="42" fill="#171310" letter-spacing="0.5">
    ${titleSvgText}
  </text>

  <!-- 6. 文章摘要 -->
  <text x="100" y="385" font-family="'Noto Serif SC', 'PingFang SC', sans-serif" font-size="20" fill="#554b42" letter-spacing="0.2">
    ${excerptSvgText}
  </text>

  <!-- 7. 标签与修饰 -->
  ${tagsStr ? `<g transform="translate(100, 465)">
    <rect x="0" y="0" width="${Math.max(120, tagsStr.length * 14)}" height="30" fill="#E6DCC4" stroke="#C9BEA3" rx="2" />
    <text x="12" y="20" font-family="'IBM Plex Mono', 'PingFang SC', monospace" font-size="14" font-weight="600" fill="#8B2A1F">${tagsStr}</text>
  </g>` : ''}

  <!-- 底部分割线 -->
  <line x1="100" y1="518" x2="1100" y2="518" stroke="#C9BEA3" stroke-width="1.5" stroke-dasharray="4 4" />

  <!-- 8. Footer 底部作者与时间信息 -->
  <g transform="translate(100, 554)">
    <!-- 作者 -->
    <text x="0" y="0" font-family="'Noto Serif SC', serif" font-weight="700" font-size="16" fill="#171310">作者：${author}</text>
    <text x="140" y="0" font-family="'IBM Plex Mono', monospace" font-size="15" fill="#6B6B6B">|</text>
    <text x="160" y="0" font-family="'IBM Plex Mono', monospace" font-size="15" fill="#6B6B6B">日期：${dateStr}</text>
    <text x="310" y="0" font-family="'IBM Plex Mono', monospace" font-size="15" fill="#6B6B6B">|</text>
    <text x="330" y="0" font-family="'Noto Serif SC', serif" font-size="15" fill="#6B6B6B">${readingTime}</text>

    <!-- 右侧网址 -->
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
