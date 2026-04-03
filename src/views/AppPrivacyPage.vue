<template>
  <div class="page-content">
    <section class="hero hero-compact">
      <p class="eyebrow">{{ app.name }} Privacy</p>
      <h1>Privacy Policy</h1>
      <p class="lead">{{ app.privacy }}</p>
    </section>

    <section class="section contact-panel">
      <p class="contact-copy">
        For privacy questions or data requests, contact
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
