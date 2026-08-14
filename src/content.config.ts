import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()),
    readingTime: z.number(),
    ogImage: z.string().optional(),
    cover: z.string().optional(),
    updatedDate: z.date().optional(),
    author: z.string().default('语霖'),
    draft: z.boolean().default(false),
    canonicalURL: z.string().url().optional(),
  }),
});

const seriesArticles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series-articles' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    no: z.string(),
    series: z.string(),
    seriesTitle: z.string(),
    seriesTab: z.string(),
    seriesDesc: z.string(),
    seriesStatus: z.string(),
  }),
});

export const collections = { posts, seriesArticles };
