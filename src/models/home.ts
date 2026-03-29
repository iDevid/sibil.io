export interface CvEntry {
  period: string
  role: string
  company: string
  summary: string
  stack?: string[]
}

export const hero = {
  eyebrow: 'Davide Sibilio · Senior iOS Developer · Italy',
  titleParts: {
    prefix: 'I',
    emphasisOne: 'build',
    middle: 'and',
    emphasisTwo: 'improve',
    suffix: 'mobile products',
  },
  lead:
    'Senior iOS developer with experience across Goodnotes, Vorwerk, Neato Robotics, and high-scale consumer apps, focused on product quality, architecture, and modern Apple-platform engineering.',
}

export const cvEntries: CvEntry[] = [
  {
    period: 'Jan 2025 — Mar 2026',
    role: 'Senior iOS Developer',
    company: 'Goodnotes',
    summary:
      'Contributed to one of the highest-rated productivity apps on the App Store, leading UX improvements across iPad and Mac, driving architectural decoupling from Apple UI frameworks, and championing AI-augmented engineering workflows.',
    stack: ['Swift', 'SwiftUI', 'RxSwift', 'iPad', 'Mac Catalyst', 'Objective-C'],
  },
  {
    period: 'Apr 2023 — Dec 2024',
    role: 'Lead iOS Developer',
    company: 'Vorwerk',
    summary:
      'Owned the iOS team technical direction for Vorwerk cleaning products, defining architecture standards, guiding cross-functional delivery, and acting as the main escalation point for platform decisions.',
    stack: ['Swift', 'SwiftUI', 'TCA', 'Combine', 'Architecture', 'Team Lead'],
  },
  {
    period: 'Jun 2021 — Mar 2023',
    role: 'Senior iOS Developer',
    company: 'Neato Robotics @ Vorwerk',
    summary:
      'Architected major features for a consumer robot application, led migration toward TCA and SwiftUI, and designed the interactive map system with complex geometry, drag, resize, rotation, and intersection logic.',
    stack: ['Swift', 'SwiftUI', 'TCA', 'Combine', 'MapKit'],
  },
  {
    period: 'Aug 2018 — Mar 2021',
    role: 'Lead iOS Developer',
    company: 'Quadronica s.r.l.',
    summary:
      'Led iOS development for Italy’s most popular fantasy football ecosystem, including large-scale consumer apps, rewrites toward MVVM and RxSwift, and greenfield showcases using modern Apple APIs.',
    stack: ['Swift', 'SwiftUI', 'RxSwift', 'MVVM', 'Combine', 'WidgetKit'],
  },
  {
    period: 'Dec 2017 — Jul 2018',
    role: 'iOS Developer',
    company: 'Open Reply — Reply s.p.a.',
    summary:
      'Worked on consulting projects spanning navigation, MapBox integrations, Bluetooth LE companion apps, and B2B/B2C mobile experiences for major Italian brands.',
    stack: ['Swift', 'Objective-C', 'MapBox', 'Bluetooth LE'],
  },
]

export const cvPage = {
  title: 'Experience across consumer apps, productivity, and connected products.',
  lead:
    'From Apple Developer Academy to senior roles at Goodnotes and Vorwerk, with a focus on iOS architecture, UI modernisation, technical leadership, and high-quality product delivery.',
}

export const contact = {
  title: 'If you would like to talk about iOS, architecture, or product work, get in touch.',
  copy: '',
  email: 'info@sibil.io',
}
