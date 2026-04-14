<template>
  <div v-if="post" class="page-content">
    <section class="hero hero-compact">
      <p class="eyebrow">{{ post.eyebrow ?? 'Article' }}</p>
      <h1>{{ post.title }}</h1>
      <p class="lead article-date">{{ post.dateLabel }}</p>
    </section>

    <article class="section article-body">
      <template v-for="(block, i) in post.content" :key="i">
        <JustifiedParagraph v-if="block.type === 'paragraph' && !hasHtml(block.text)" :text="block.text" />
        <p v-else-if="block.type === 'paragraph'" v-html="block.text" />
        <h2 v-else-if="block.type === 'heading'" class="article-section-heading">{{ block.text }}</h2>
        <aside v-else-if="block.type === 'callout'" class="article-callout">{{ block.text }}</aside>
        <CodeBlock v-else-if="block.type === 'code'" :language="block.language" :code="block.code" />
        <component :is="block.component" v-else-if="block.type === 'component'" />
      </template>
    </article>
  </div>

</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { blogPostBySlug } from '../models/blog'
import CodeBlock from '../components/CodeBlock.vue'
import JustifiedParagraph from '../components/JustifiedParagraph.vue'
import { useSeoMeta } from '../composables/useSeoMeta'

function hasHtml(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text)
}

const route = useRoute()
const router = useRouter()

const post = computed(() => {
  const slug = route.params.slug
  return typeof slug === 'string' ? blogPostBySlug[slug] : undefined
})

watchEffect(() => {
  if (route.params.slug && !post.value) {
    router.replace({ path: '/404' })
  }
})

useSeoMeta({
  title: computed(() => post.value?.title ?? ''),
  description: computed(() => post.value?.excerpt),
})
</script>

<style scoped>
:deep(.justified-para),
:deep(p) {
  color: var(--muted);
  font-size: clamp(1rem, 1.35vw, 1.18rem);
  line-height: 1.7;
}

:deep(p) {
  text-align: justify;
  hyphens: auto;
  text-align-last: left;
}

.article-section-heading {
  font-family: var(--serif);
  font-size: clamp(1.3rem, 2vw, 1.7rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-top: 12px;
}

:deep(mark) {
  background: rgba(184, 249, 127, 0.15);
  color: var(--accent);
  border-radius: 3px;
  padding: 0 3px;
  font-style: inherit;
}

:deep(ul) {
  padding-left: 1.4rem;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

:deep(li) {
  color: var(--muted);
  font-size: clamp(1rem, 1.35vw, 1.18rem);
  line-height: 1.6;
}

.article-callout {
  margin: 0;
  padding: 18px 22px;
  border-left: 3px solid var(--accent);
  background: rgba(184, 249, 127, 0.05);
  border-radius: 0 8px 8px 0;
  color: var(--muted);
  font-style: italic;
  font-size: clamp(1rem, 1.35vw, 1.15rem);
  line-height: 1.6;
}
</style>
