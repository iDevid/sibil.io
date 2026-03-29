export type ProjectMedia =
  | {
      type: 'video'
      src: string
      poster?: string
    }
  | {
      type: 'image'
      src: string
      alt?: string
    }

export interface Project {
  slug: string
  title: string
  brandMark: string
  category: string
  surfaceLabel: string
  bg: string
  texture?: string
  media?: ProjectMedia
  accent: string
  accentSoft: string
  badgeLeft?: string
  badgeRight?: string
}

export const projectsIntro = undefined

export const projects: Project[] = [
]
