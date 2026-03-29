<template>
  <div class="page-content">
    <section class="hero hero-compact">
      <p class="eyebrow">Contact</p>
      <h1>{{ contact.title }}</h1>
      <p class="lead">{{ contact.copy }}</p>
    </section>

    <section class="section contact-panel">
      <a class="contact-link" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
    </section>
  </div>
</template>

<script setup lang="ts">
import { contact } from '../models/home'
</script>
