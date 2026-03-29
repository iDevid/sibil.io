<template>
  <div class="page-content">
    <section class="hero hero-compact">
      <p class="eyebrow">CV</p>
      <h1>{{ cvPage.title }}</h1>
      <p class="lead">{{ cvPage.lead }}</p>
    </section>

    <section class="section">
      <div class="cv-list">
        <article
          v-for="entry in cvEntries"
          :key="`${entry.period}-${entry.role}-${entry.company}`"
          class="cv-row"
        >
          <p class="cv-period">{{ entry.period }}</p>
          <div>
            <h3>{{ entry.role }}</h3>
            <p class="cv-company">{{ entry.company }}</p>
            <p>{{ entry.summary }}</p>
            <div v-if="entry.stack?.length" class="cv-stack">
              <span v-for="item in entry.stack" :key="item" class="cv-tag">
                {{ item }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { cvEntries, cvPage } from '../models/home'
</script>
