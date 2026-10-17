<script setup lang="ts">
import { readingMetas } from '../data/reading'
import ReadingPage from './ReadingPage.vue'

// The tab opens the surah itself rather than an index of one card.
const first = readingMetas[0]
</script>

<template>
  <ReadingPage v-if="first" :id="first.id" embedded />
  <div v-else class="nav-page">
    <div class="nav-hero">
      <h2>Yasin</h2>
      <p class="nav-subtitle">Read the Quran, tap a word for its meaning</p>
    </div>
    <div class="qs-index-grid">
      <p class="nav-empty">No surahs yet. Generate one with the quran-reading command.</p>
    </div>
  </div>
</template>
