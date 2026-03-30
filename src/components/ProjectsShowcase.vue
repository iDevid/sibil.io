<template>
  <div
    class="hero-carousel"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div ref="stageRef" class="hero-carousel-stage">
      <button
        v-if="showDebugControls"
        type="button"
        class="hero-carousel-debug-toggle"
        @click="togglePlayback"
      >
        {{ isPaused ? 'Play' : 'Pause' }}
      </button>
      <button
        v-for="(project, index) in orderedProjects"
        :key="project.slug"
        type="button"
        class="hero-card"
        :style="cardStyle(index, project)"
        @click="setActive(index)"
      >
        <div class="hero-card-surface">
          <div v-if="project.media" class="hero-card-media">
            <video
              v-if="project.media.type === 'video'"
              class="hero-card-video"
              :src="project.media.src"
              :poster="project.media.poster"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            ></video>
            <img
              v-else
              class="hero-card-image"
              :src="project.media.src"
              :alt="project.media.alt ?? project.title"
            />
          </div>

          <div v-if="project.badgeLeft" class="hero-card-badge hero-card-badge-left">
            {{ project.badgeLeft }}
          </div>
          <div v-if="project.badgeRight" class="hero-card-badge hero-card-badge-right">
            {{ project.badgeRight }}
          </div>

          <div class="hero-card-frame">
            <div class="hero-card-title">{{ project.title }}</div>
            <div class="hero-card-subtitle">{{ project.surfaceLabel }}</div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import type { Project } from '../models/projects'

const { projects } = defineProps<{
  projects: Project[]
}>()

const showDebugControls = import.meta.env.DEV
const activeProgress = ref(Math.floor(projects.length / 2))
const isPaused = ref(false)
const stageRef = ref<HTMLElement | null>(null)
const stageWidth = ref(1440)
let animationFrame: number | undefined
let lastFrameTime: number | undefined
const scrollSpeed = 0.24

const orderedProjects = computed(() => projects)

function normalizedOffset(index: number) {
  const total = orderedProjects.value.length
  let offset = index - activeProgress.value

  if (offset > total / 2) {
    offset -= total
  }

  if (offset < -total / 2) {
    offset += total
  }

  return offset
}

function cardStyle(index: number, project: Project) {
  const offset = normalizedOffset(index)
  const abs = Math.abs(offset)
  const centerProximity = Math.max(0, 1 - abs)
  const arcStep = Math.max(0.30, Math.min(0.60, 560 / stageWidth.value))
  const radius = stageWidth.value * 0.5
  const angle = offset * arcStep
  const translateX = Math.sin(angle) * radius + offset * 0
  const translateY = Math.abs(Math.cos(angle) - 1) * 40 + abs * 2
  const translateZ = Math.cos(angle) * radius - radius + centerProximity * 1
  const rotateY = 1
  const rotateX = 1
  const scale = 0.92 + centerProximity * 0.01
  const opacityMultiplier = Math.max((1 - Math.abs(angle)), 0) * 1.5
  const opacity = Math.max(0, 1 - abs * 0.05 * opacityMultiplier)  
  const blur = 0//Math.max(0, abs - 1.15) * 1.1
  const zIndex = Math.floor(20 - (abs * 10))
  const shadowAlpha = 0.35 + centerProximity * 0.5
  const saturate = 1 - Math.min(abs * 0.08, 0.2)

  return {
    '--card-bg': project.bg,
    '--card-texture': project.texture ?? 'none',
    '--card-accent': project.accent,
    '--card-shadow-alpha': shadowAlpha.toFixed(3),
    transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    filter: `blur(${blur}px) saturate(${saturate})`,
    zIndex,
  }
}

function updateStageWidth() {
  stageWidth.value = stageRef.value?.clientWidth ?? window.innerWidth
}

function setActive(index: number) {
  activeProgress.value = index
  lastFrameTime = undefined
}

function animateCarousel(timestamp: number) {
  if (lastFrameTime === undefined) {
    lastFrameTime = timestamp
  }

  const deltaSeconds = (timestamp - lastFrameTime) / 1000
  lastFrameTime = timestamp
  activeProgress.value =
    (activeProgress.value + deltaSeconds * scrollSpeed) % orderedProjects.value.length
  animationFrame = window.requestAnimationFrame(animateCarousel)
}

function startRotation() {
  if (orderedProjects.value.length < 2) {
    return
  }

  if (animationFrame === undefined) {
    animationFrame = window.requestAnimationFrame(animateCarousel)
  }
}

function pauseRotation() {
  if (animationFrame !== undefined) {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = undefined
  }
}

function resumeRotation() {
  if (animationFrame === undefined && !isPaused.value) {
    lastFrameTime = undefined
    startRotation()
  }
}

function togglePlayback() {
  isPaused.value = !isPaused.value

  if (isPaused.value) {
    pauseRotation()
    return
  }

  resumeRotation()
}

function handleMouseEnter() {
  pauseRotation()
}

function handleMouseLeave() {
  resumeRotation()
}

onMounted(() => {
  updateStageWidth()
  window.addEventListener('resize', updateStageWidth)
  startRotation()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateStageWidth)
  pauseRotation()
})
</script>
