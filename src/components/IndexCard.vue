<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{ to: string; heading: string; title?: string; desc: string; count: string; score?: string | null }>()

const router = useRouter()
</script>

<template>
  <div class="qs-index-card">
    <span v-if="score != null" class="deck-score-chip">{{ score }}</span>
    <button class="qs-index-open" @click="router.push(to)">
      <span class="qs-index-surah">{{ heading }}</span>
      <span v-if="title" class="qs-index-title">{{ title }}</span>
      <span class="qs-index-desc">{{ desc }}</span>
      <span class="qs-index-count">{{ count }}</span>
    </button>
    <slot />
  </div>
</template>
