<template>
  <div class="page-content">
    <section class="hero hero-compact">
      <p class="eyebrow">404</p>
      <h1>Page not found.</h1>
      <p class="lead">This page doesn't exist or has been moved.</p>
      <RouterLink to="/" class="back-link">Go home</RouterLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSeoMeta } from '../composables/useSeoMeta'

useSeoMeta({ title: 'Page not found' })
</script>

<style scoped>
.back-link {
  display: inline-block;
  margin-top: 8px;
  color: var(--accent);
  text-decoration: none;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
}

.back-link:hover {
  text-decoration: underline;
}
</style>
