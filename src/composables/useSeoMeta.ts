import { watchEffect, onUnmounted, type Ref, type ComputedRef } from 'vue'

interface SeoMeta {
  title: string | Ref<string> | ComputedRef<string>
  description?: string | Ref<string | undefined> | ComputedRef<string | undefined>
}

function setMeta(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
    ?? document.querySelector<HTMLMetaElement>(`meta[name="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    const attr = property.startsWith('og:') || property.startsWith('twitter:') ? 'property' : 'name'
    el.setAttribute(attr, property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const defaultTitle = 'Davide Sibilio'
const defaultDescription = 'iOS developer, indie maker.'

export function useSeoMeta({ title, description }: SeoMeta) {
  const stop = watchEffect(() => {
    const t = typeof title === 'object' && 'value' in title ? title.value : title as string
    const d = description
      ? (typeof description === 'object' && 'value' in description ? description.value : description as string)
      : undefined

    if (!t) return

    const fullTitle = `${t} · Davide Sibilio`
    document.title = fullTitle
    setMeta('og:title', fullTitle)
    setMeta('twitter:title', fullTitle)
    if (d) setMeta('og:description', d)
  })

  onUnmounted(() => {
    stop()
    document.title = defaultTitle
    setMeta('og:title', defaultTitle)
    setMeta('twitter:title', defaultTitle)
    setMeta('og:description', defaultDescription)
  })
}
