<script setup lang="ts">
import { dzikirMetas } from '../data/dzikir'
import IndexCard from '../components/IndexCard.vue'
import type { DzikirTime } from '../types'

const DZIKIR_EMOJI: Record<DzikirTime, string> = {
  prayer: '🕌',
  morning: '🌅',
  evening: '🌇',
}
</script>

<template>
  <div class="nav-page">
    <div class="nav-hero">
      <h2>Prayer and Dzikir</h2>
      <p class="nav-subtitle">Prayer recitations &amp; morning/evening remembrance, tap a word for its meaning</p>
    </div>
    <div class="qs-index-grid">
      <p v-if="dzikirMetas.length === 0" class="nav-empty">Nothing here yet.</p>
      <IndexCard
        v-for="m in dzikirMetas"
        :key="m.id"
        :to="`/dzikir/${m.id}`"
        :heading="`${DZIKIR_EMOJI[m.time]} ${m.title}`"
        :desc="m.description"
        :count="`${m.itemCount} ${m.time === 'prayer' ? 'recitations' : 'dzikir'}`"
      />
    </div>
  </div>
</template>
