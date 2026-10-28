<script setup lang="ts">
import { useRouter } from 'vue-router'
import { qsMetas } from '../data/qs-breakdown'
import IndexCard from '../components/IndexCard.vue'
import { getQsQuizScore, getQsScore } from '../lib/progress'

const router = useRouter()
</script>

<template>
  <div class="nav-page">
    <div class="nav-hero">
      <h2>Surah Breakdown</h2>
      <p class="nav-subtitle">Read verses word by word</p>
    </div>
    <div class="qs-index-grid">
      <p v-if="qsMetas.length === 0" class="nav-empty">No breakdowns yet. Generate one with the qs-breakdown command.</p>
      <IndexCard
        v-for="m in qsMetas"
        :key="m.id"
        :to="`/qs/${m.id}`"
        :heading="`QS ${m.surah} · ${m.surahName}`"
        :title="m.title"
        :desc="m.description"
        :count="`Ayat ${m.from}–${m.to} · ${m.verseCount} ayat`"
        :score="getQsScore(m.id)"
      >
        <div class="qs-card-actions">
          <button class="btn-qs-play-card" @click="router.push(`/qs/${m.id}/quiz`)">
            Quiz<template v-if="getQsQuizScore(m.id)"> · {{ getQsQuizScore(m.id) }}</template>
          </button>
          <button class="btn-qs-play-card" @click="router.push(`/qs/${m.id}/game`)">Play ▶</button>
        </div>
      </IndexCard>
    </div>
  </div>
</template>
