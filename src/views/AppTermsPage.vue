<template>
  <div class="page-content">
    <section class="hero hero-compact">
      <p class="eyebrow">{{ app.name }} Terms</p>
      <h1>Terms of Service</h1>
      <p class="lead">{{ app.terms }}</p>
    </section>

    <section class="section contact-panel">
      <p class="contact-copy">
        For questions about these terms, contact
        <a class="contact-link" href="mailto:info@sibil.io">info@sibil.io</a>.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { App } from '../models/apps'

defineProps<{
  app: App
}>()
</script>
