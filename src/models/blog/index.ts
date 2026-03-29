import type { BlogPost, BlogPostSummary } from './types'

export type { BlogPost, BlogPostSummary } from './types'

const blogModules = import.meta.glob<{ default: BlogPost }>('./*.ts', { eager: true })

export const blogPage = {
  eyebrow: 'Blog',
  title: 'Writing and working notes.',
  lead: 'A small archive of articles, notes, and product observations.',
}

export const blogEntries: BlogPost[] = Object.entries(blogModules)
  .filter(([path]) => !path.endsWith('/index.ts') && !path.endsWith('/types.ts'))
  .map(([, module]) => module.default)

export const blogPosts: BlogPostSummary[] = blogEntries.map(
  ({ slug, dateLabel, title, excerpt }) => ({
    slug,
    dateLabel,
    title,
    excerpt,
  }),
)

export const blogPostBySlug: Record<string, BlogPost> = Object.fromEntries(
  blogEntries.map((entry) => [entry.slug, entry]),
)
