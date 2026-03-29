<template>
  <div class="page-content">
    <section class="hero hero-compact">
      <p class="eyebrow">{{ blogPage.eyebrow }}</p>
      <h1>{{ blogPage.title }}</h1>
      <p class="lead">{{ blogPage.lead }}</p>
    </section>

    <section class="section">
      <div v-if="blogPosts.length" class="article-list">
        <article
          v-for="post in blogPosts"
          :key="post.slug"
          class="article-row"
        >
          <p class="article-meta">{{ post.dateLabel }}</p>
          <div>
            <h3>
              <RouterLink :to="`/blog/${post.slug}`">{{ post.title }}</RouterLink>
            </h3>
            <p>{{ post.excerpt }}</p>
          </div>
        </article>
      </div>

      <p v-else class="lead">No articles published yet.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { blogPage, blogPosts } from '../models/blog'
</script>
