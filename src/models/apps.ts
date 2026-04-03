export interface App {
  slug: string
  name: string
  privacy: string
  support: string
}

export const lupia: App = {
  slug: 'lupia',
  name: 'Lupia',
  privacy:
    'Lupia does not collect personal data directly. If analytics, crash reporting, or third-party services are introduced, this page will be updated to describe what is collected and why.',
  support: 'Having trouble with Lupia? Get in touch and we will help you out.',
}

export const sequence: App = {
  slug: 'sequence',
  name: 'Sequence!',
  privacy:
    'Sequence does not collect personal data directly. The app displays ads, which may be served by third-party ad networks that collect data in accordance with their own privacy policies.',
  support: 'Having trouble with Sequence? Get in touch and we will help you out.',
}

export const apps: App[] = [lupia, sequence]
