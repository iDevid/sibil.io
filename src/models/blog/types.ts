export interface BlogPostSummary {
  slug: string
  dateLabel: string
  title: string
  excerpt: string
}

export interface BlogPost extends BlogPostSummary {
  eyebrow?: string
  content: string[]
}
