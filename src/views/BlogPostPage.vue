<template>
  <div v-if="post" class="page-content">
    <section class="hero hero-compact">
      <p class="eyebrow">{{ post.eyebrow ?? 'Article' }}</p>
      <h1>{{ post.title }}</h1>
      <p class="lead article-date">{{ post.dateLabel }}</p>
    </section>

    <article class="section article-body">
      <p v-for="paragraph in post.content" :key="paragraph">
        {{ paragraph }}
      </p>
    </article>
  </div>

  <div v-else class="page-content">
    <section class="hero hero-compact">
      <p class="eyebrow">Article</p>
      <h1>Not found.</h1>
      <p class="lead">The requested article does not exist.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { blogPostBySlug } from '../models/blog'

const route = useRoute()

const post = computed(() => {
  const slug = route.params.slug
  return typeof slug === 'string' ? blogPostBySlug[slug] : undefined
})
</script>
