export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'callout'; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'component'; component: object }

export interface BlogPostSummary {
  slug: string
  dateLabel: string
  title: string
  excerpt: string
}

export interface BlogPost extends BlogPostSummary {
  eyebrow?: string
  content: ContentBlock[]
}
