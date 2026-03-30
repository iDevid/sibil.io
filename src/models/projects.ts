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
  {
    slug: 'goodnotes',
    title: 'Goodnotes',
    brandMark: 'GN',
    category: 'Senior iOS Developer',
    surfaceLabel: 'productivity app at global scale',
    bg: 'linear-gradient(135deg, #2437f2 0%, #0d1022 100%)',
    texture: 'radial-gradient(circle at 24% 22%, rgba(255,255,255,0.14), transparent 30%)',
    media: {
      type: 'video',
      src: '/videos/gn.mp4',
    },
    accent: '#6ea8ff',
    accentSoft: 'rgba(110, 168, 255, 0.2)',
    badgeRight: '4.7★',
  },
  {
    slug: 'vorwerk',
    title: 'Vorwerk',
    brandMark: 'VW',
    category: 'Lead iOS Developer',
    surfaceLabel: 'team leadership and architecture',
    bg: 'linear-gradient(135deg, #0b0d12 0%, #2e313b 100%)',
    texture: 'linear-gradient(120deg, rgba(255,255,255,0.08), transparent 44%)',
    media: {
      type: 'video',
      src: '/videos/vorwerk.mp4',
    },
    accent: '#d3d7e0',
    accentSoft: 'rgba(211, 215, 224, 0.16)',
    badgeRight: 'Lead',
  },
  {
    slug: 'neato',
    title: 'Neato',
    brandMark: 'NT',
    category: 'Senior iOS Developer',
    surfaceLabel: 'interactive robot map system',
    bg: 'linear-gradient(135deg, #f1f1f1 0%, #ff5900 100%)',
    texture: 'linear-gradient(110deg, rgba(255,255,255,0.08), transparent 45%)',
    media: {
      type: 'video',
      src: '/videos/neato.mp4',
    },
    accent: '#ffb45c',
    accentSoft: 'rgba(255, 180, 92, 0.18)',
  },
  {
    slug: 'fantacalcio',
    title: 'Fantacalcio',
    brandMark: 'FC',
    category: 'Lead iOS Developer',
    surfaceLabel: '3M users and 4.7★ rating',
    bg: 'linear-gradient(135deg, #1761ff 0%, #0d3ca9 100%)',
    texture:
      'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.14), transparent 50%), linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.06) 100%)',
    media: {
      type: 'video',
      src: '/videos/fantacalcio.mp4',
    },
    accent: '#86efac',
    accentSoft: 'rgba(134, 239, 172, 0.16)',
    badgeLeft: '3M',
    badgeRight: '4.7★',
  },
  {
    slug: 'open-reply',
    title: 'Open Reply',
    brandMark: 'OR',
    category: 'iOS Developer',
    surfaceLabel: 'Consultancy and open source',
    bg: 'linear-gradient(135deg, #2c2c2c 0%, #000000 100%)',
    texture: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.18) 100%)',
    media: {
      type: 'image',
      src: '/videos/open-reply.webp',
      alt: 'Open Reply product preview',
    },
    accent: '#fde047',
    accentSoft: 'rgba(253, 224, 71, 0.18)',
  },
]
