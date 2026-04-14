#!/usr/bin/env node
// Post-build script: generates per-route index.html files with correct OG tags.
// Required because this is a static SPA on GitHub Pages — crawlers don't run JS.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const BLOG_SRC = join(ROOT, 'src/models/blog')
const SITE_URL = 'https://sibil.io'

const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildHtml({ title, description, url }) {
  const fullTitle = title ? `${title} · Davide Sibilio` : 'Davide Sibilio'
  const desc = description || 'iOS developer, indie maker.'

  let html = baseHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(fullTitle)}</title>`)
    .replace(/(property="og:title"\s+content=")[^"]*"/, `$1${esc(fullTitle)}"`)
    .replace(/(property="og:description"\s+content=")[^"]*"/, `$1${esc(desc)}"`)
    .replace(/(name="twitter:title"\s+content=")[^"]*"/, `$1${esc(fullTitle)}"`)
    .replace(/(name="twitter:description"\s+content=")[^"]*"/, `$1${esc(desc)}"`)

  if (url) {
    html = html.replace('</head>', `    <meta property="og:url" content="${esc(url)}" />\n  </head>`)
  }

  return html
}

function writeRoute(relPath, meta) {
  const dir = join(DIST, relPath)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), buildHtml(meta))
  console.log(`  prerendered /${relPath}`)
}

function scanBlogPosts() {
  const posts = []

  for (const entry of readdirSync(BLOG_SRC)) {
    const entryPath = join(BLOG_SRC, entry)
    if (!statSync(entryPath).isDirectory()) continue

    for (const file of readdirSync(entryPath)) {
      if (!file.endsWith('.ts')) continue

      const content = readFileSync(join(entryPath, file), 'utf-8')

      const slug = content.match(/\bslug:\s*['"]([^'"]+)['"]/)?.[1]

      const titleMatch =
        content.match(/\btitle:\s*\n?\s*'((?:[^'\\]|\\.)*)'\s*,/) ??
        content.match(/\btitle:\s*\n?\s*"((?:[^"\\]|\\.)*)"\s*,/)
      const title = titleMatch?.[1]?.replace(/\\'/g, "'").replace(/\\"/g, '"')

      const excerptMatch =
        content.match(/\bexcerpt:\s*\n?\s*'((?:[^'\\]|\\.)*)'\s*,/) ??
        content.match(/\bexcerpt:\s*\n?\s*"((?:[^"\\]|\\.)*)"\s*,/)
      const excerpt = excerptMatch?.[1]?.replace(/\\'/g, "'").replace(/\\"/g, '"')

      if (slug && title) {
        posts.push({ slug, title, excerpt })
      }
    }
  }

  return posts
}

console.log('Prerendering routes for OG tags...')

// Static routes
writeRoute('blog', {
  title: 'Writing and working notes',
  description: 'A small archive of articles, notes, and product observations.',
  url: `${SITE_URL}/blog`,
})
writeRoute('cv', { title: 'CV', url: `${SITE_URL}/cv` })
writeRoute('contact', { title: 'Contact', url: `${SITE_URL}/contact` })

// App routes
const appMeta = {
  lupia: 'Lupia',
  sequence: 'Sequence!',
}
for (const [slug, name] of Object.entries(appMeta)) {
  for (const page of ['privacy', 'support', 'terms']) {
    writeRoute(`${slug}/${page}`, {
      title: `${page.charAt(0).toUpperCase() + page.slice(1)} · ${name}`,
      url: `${SITE_URL}/${slug}/${page}`,
    })
  }
}

// Blog posts — auto-discovered from src/models/blog/*/
const posts = scanBlogPosts()
for (const post of posts) {
  writeRoute(`blog/${post.slug}`, {
    title: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
  })
}

console.log(`Done. ${posts.length} blog post(s) prerendered.`)
