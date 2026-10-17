<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const sheet = ref<HTMLElement>()
const shown = ref(false)

watch(() => props.open, async open => {
  if (!open) {
    shown.value = false
    return
  }
  await nextTick()
  // Force reflow after un-hiding so the transition runs when toggling .open.
  void sheet.value?.offsetWidth
  shown.value = true
})

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) emit('close')
}

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <div ref="sheet" class="qs-sheet" :class="{ open: shown }" :hidden="!open">
    <div class="qs-sheet-backdrop" @click="emit('close')"></div>
    <div class="qs-sheet-panel" role="dialog" aria-modal="true">
      <div class="qs-sheet-handle"></div>
      <button class="qs-sheet-close" aria-label="Close" @click="emit('close')">✕</button>
      <div class="qs-sheet-body"><slot /></div>
    </div>
  </div>
</template>
