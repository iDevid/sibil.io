<template>
  <div class="page-content">
    <section class="hero hero-home">
      <h1 class="hero-home-title">
        {{ hero.titleParts.prefix }}
        <span class="hero-emphasis">{{ hero.titleParts.emphasisOne }}</span>
        {{ hero.titleParts.middle }}
        <span class="hero-emphasis">{{ hero.titleParts.emphasisTwo }}</span>
        {{ hero.titleParts.suffix }}
      </h1>
      <p class="lead hero-home-lead">{{ hero.lead }}</p>
      <ProjectsShowcase v-if="projects.length" :projects="projects" />
    </section>
  </div>
</template>

<script setup lang="ts">
import ProjectsShowcase from '../components/ProjectsShowcase.vue'
import { hero } from '../models/home'
import { projects } from '../models/projects'
</script>
