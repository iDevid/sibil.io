<template>
  <div v-if="highlighted" v-html="highlighted" class="code-block" />
  <pre v-else class="code-block code-block-fallback"><code>{{ code }}</code></pre>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getHighlighter } from '../composables/useHighlighter'

const props = defineProps<{ language: string; code: string }>()

const highlighted = ref<string | null>(null)

async function highlight() {
  const hl = await getHighlighter()
  highlighted.value = hl.codeToHtml(props.code, {
    lang: props.language,
    theme: 'github-dark',
    colorReplacements: { '#0d1117': '#0d0f12' },
  })
}

onMounted(highlight)
watch(() => props.code, highlight)
</script>
