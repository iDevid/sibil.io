<template>
  <div class="page-content">
    <section class="hero hero-compact">
      <p class="eyebrow">{{ app.name }} Support</p>
      <h1>Support</h1>
      <p class="lead">{{ app.support }}</p>
    </section>

    <section class="section contact-panel">
      <a class="contact-link" href="mailto:info@sibil.io">info@sibil.io</a>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { App } from '../models/apps'

defineProps<{
  app: App
}>()
</script>
