<template>
  <div class="page-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/">
        <img class="brand-mark" src="/vesuvius-mark.svg" alt="" aria-hidden="true" />
        <span>Davide Sibilio</span>
      </RouterLink>
      <nav class="site-nav" aria-label="Primary">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/cv">CV</RouterLink>
        <RouterLink to="/blog">Blog</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
    </header>

    <main id="top">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
