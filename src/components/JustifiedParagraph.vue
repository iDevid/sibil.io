<template>
  <div ref="containerRef" class="justified-para">
    <span
      v-for="(line, i) in lines"
      :key="i"
      class="justified-line"
      :style="lineStyle(line, i)"
    >{{ line.text }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { prepareWithSegments, layoutWithLines, type LayoutLine } from '@chenglou/pretext'

const props = defineProps<{ text: string }>()

const containerRef = ref<HTMLElement | null>(null)
const lines = ref<LayoutLine[]>([])
const containerWidth = ref(0)

let ro: ResizeObserver | undefined

function relayout() {
  const el = containerRef.value
  if (!el || !props.text) return
  const width = el.clientWidth
  if (width === 0) return
  containerWidth.value = width
  const cs = window.getComputedStyle(el)
  const font = `${cs.fontSize} ${cs.fontFamily}`
  const lineHeight = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5
  const prepared = prepareWithSegments(props.text, font)
  lines.value = layoutWithLines(prepared, width, lineHeight).lines
}

onMounted(async () => {
  await nextTick()
  if (containerRef.value) {
    ro = new ResizeObserver(relayout)
    ro.observe(containerRef.value)
  }
  relayout()
})

onUnmounted(() => ro?.disconnect())

watch(() => props.text, async () => {
  await nextTick()
  relayout()
})

function lineStyle(line: LayoutLine, index: number): Record<string, string> {
  const isLast = index === lines.value.length - 1
  if (isLast) return {}
  const spaceCount = (line.text.match(/ /g) ?? []).length
  if (spaceCount === 0) return {}
  const extra = containerWidth.value - line.width
  return { wordSpacing: `${extra / spaceCount}px` }
}
</script>

<style scoped>
.justified-para {
  display: block;
}

.justified-line {
  display: block;
  white-space: nowrap;
  overflow: visible;
}
</style>
