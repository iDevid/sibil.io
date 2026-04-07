export interface App {
  slug: string
  name: string
  privacy: string
  support: string
  terms: string
}

export const lupia: App = {
  slug: 'lupia',
  name: 'Lupia',
  privacy:
    'Lupia does not collect personal data directly. If analytics, crash reporting, or third-party services are introduced, this page will be updated to describe what is collected and why.',
  support: 'Having trouble with Lupia? Get in touch and we will help you out.',
  terms:
    'By downloading or using Lupia, you agree to use the app in accordance with applicable laws. The app is provided as-is without warranties of any kind. We reserve the right to update these terms at any time.',
}

export const sequence: App = {
  slug: 'sequence',
  name: 'Sequence!',
  privacy:
    'Sequence! does not collect personal data directly. The app displays ads, which may be served by third-party ad networks that collect data in accordance with their own privacy policies.',
  support: 'Having trouble with `Sequence!`? Get in touch and we will help you out.',
  terms:
    'By downloading or using Sequence, you agree to use the app in accordance with applicable laws. The app is provided as-is without warranties of any kind. We reserve the right to update these terms at any time.',
}

export const apps: App[] = [lupia, sequence]
