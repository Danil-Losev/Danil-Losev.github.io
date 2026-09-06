import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),

    pubDate: z.coerce.date(),

    updatedDate: z.coerce.date().optional(),

    heroImage: z.string().optional(),

    tags: z.array(z.string()).default([]),

    category: z.string().default('General'),

    draft: z.boolean().default(false),
  }),
});


const projects = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/projects',
  }),

  schema: z.object({
    title: z.string(),

    description: z.string(),

    status: z
      .enum([
        'active',
        'completed',
        'archived',
      ])
      .default('active'),

    category: z.string().default('Other'),

    tags: z.array(z.string()).default([]),

    draft: z.boolean().default(false),

    featured: z.boolean().default(false),

    github: z.string().url().optional(),

    demo: z.string().url().optional(),

    website: z.string().url().optional(),

    icon: z
      .discriminatedUnion('type', [
        z.object({
          type: z.literal('image'),

          src: z.string(),

          alt: z.string().optional(),
        }),

        z.object({
          type: z.literal('icon'),

          name: z.string(),
        }),
      ])
      .default({
        type: 'icon',
        name: 'folder',
      }),
  }),
});


export const collections = {
  blog,
  projects,
};