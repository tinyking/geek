import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

const SITE = 'https://www.wangjianchao.cn';

type FeedItem = {
  title: string;
  pubDate: Date;
  description: string;
  link: string;
  categories: string[];
  author: string;
  content: string; // content:encoded 全文摘要 HTML
};

/**
 * 构造 RSS item 的 content:encoded。
 * 从原始 Markdown body 提取纯文本摘要（前 500 字），并附"阅读全文"链接。
 * 完整 HTML 渲染会显著增加构建复杂度与体积，摘要 + 链接已满足 RSS 阅读器需求。
 */
function buildContent(body: string | undefined, description: string, link: string): string {
  if (!body) {
    return `<p>${escapeHtml(description)}</p><p><a href="${SITE}${link}">阅读全文 →</a></p>`;
  }
  // 去除 frontmatter 与 HTML 注释/标签，提取纯文本
  const text = body
    .replace(/^---[\s\S]*?---/, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#>*_`~\-]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const excerpt = text.slice(0, 500) + (text.length > 500 ? '…' : '');
  return `<p>${escapeHtml(excerpt)}</p><p><a href="${SITE}${link}">阅读全文 →</a></p>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseDate(dateStr: string | Date): Date {
  if (dateStr instanceof Date) return dateStr;
  // frontmatter 中 date 为 "2026.04.26" 或 "2026-04-26"
  const normalized = dateStr.replace(/\./g, '-');
  const d = new Date(normalized);
  return isNaN(d.getTime()) ? new Date() : d;
}

export async function GET(context: APIContext) {
  const [posts, seriesArticles] = await Promise.all([
    getCollection('posts'),
    getCollection('seriesArticles'),
  ]);

  // 1) 普通文章
  const postItems: FeedItem[] = posts.map((post) => {
    const description = post.data.description ?? post.data.excerpt;
    return {
      title: post.data.title,
      pubDate: post.data.date,
      description,
      link: `/posts/${post.id}/`,
      categories: post.data.tags,
      author: post.data.author,
      content: buildContent(post.body, description, `/posts/${post.id}/`),
    };
  });

  // 2) 系列文章（含全部 23 篇，audit 7.3）
  const seriesItems: FeedItem[] = seriesArticles.map((entry) => {
    const d = entry.data;
    const description = `${d.seriesTitle} · ${d.title}`;
    const link = `/series/${d.series}/${d.no}/`;
    return {
      title: `${d.seriesTitle} · ${d.title}`,
      pubDate: parseDate(d.date),
      description,
      link,
      categories: [d.seriesTitle, d.seriesStatus],
      author: '语霖',
      content: buildContent(entry.body, description, link),
    };
  });

  // 合并并按日期倒序
  const items = [...postItems, ...seriesItems].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
  );

  return rss({
    title: '语霖·执笔为语，心落成霖',
    description: '语霖的个人博客 — 记录技术探索、产品思考与生活感悟，含人生 Debug、马伯庸式日记、请教员当老师 三个连载系列',
    site: context.site ?? SITE,
    items: items.map((item) => ({
      title: item.title,
      pubDate: item.pubDate,
      description: item.description,
      link: item.link,
      categories: item.categories,
      author: item.author,
      content: item.content,
    })),
    customData: '<language>zh-CN</language>',
  });
}
