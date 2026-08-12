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
    updatedDate: z.date().optional(),
    author: z.string().default('语霖'),
    draft: z.boolean().default(false),
    canonicalURL: z.string().url().optional(),
  }),
});

export const collections = { posts };
