import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: '观禾·浮生观禾，静心成长',
    description: '语霖的个人博客 — 记录技术探索、产品思考与生活感悟',
    site: context.site ?? 'https://www.wangjianchao.cn',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? post.data.excerpt,
      link: `/posts/${post.slug}/`,
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: '<language>zh-CN</language>',
  });
}
