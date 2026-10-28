<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { loadBreakdown } from '../data/qs-breakdown'
import ArabicLine from '../components/ArabicLine.vue'
import ErrorPage from '../components/ErrorPage.vue'
import WordDetail from '../components/WordDetail.vue'
import WordSheet from '../components/WordSheet.vue'
import { isVersePlayable } from '../lib/qs-rounds'
import { RECITER, useAyahAudio } from '../lib/ayah-audio'
import type { QsBreakdown } from '../types'

const props = defineProps<{ id: string }>()

const router = useRouter()

const bd = ref<QsBreakdown | null>()
const tipVisible = ref(true)
const active = ref<{ vi: number; wi: number } | null>(null)
const { current: audio, toggle: toggleAudio } = useAyahAudio()

loadBreakdown(props.id).then(b => { bd.value = b })

function audioStatus(ayah: number) {
  return audio.value?.ayah === ayah ? audio.value.status : null
}

function listenLabel(ayah: number) {
  const status = audioStatus(ayah)
  if (status === 'playing') return `Stop ayah ${ayah}`
  if (status === 'error') return `Ayah ${ayah} audio failed to load, tap to retry`
  return `Listen to ayah ${ayah}`
}

function tapWord(vi: number, wi: number) {
  tipVisible.value = false
  const same = active.value?.vi === vi && active.value.wi === wi
  active.value = same ? null : { vi, wi }
}
</script>

<template>
  <div v-if="bd === undefined" class="fc-loading">Loading…</div>
  <ErrorPage v-else-if="bd === null" message="Breakdown not found." back-to="/qs" />
  <template v-else>
    <div class="qs-page">
      <div class="qs-header">
        <button class="btn-back" @click="router.push('/qs')">← Back</button>
        <span class="qs-deck-title">QS {{ bd.surah }} · {{ bd.surahName }}</span>
        <span class="qs-header-actions">
          <button class="btn-qs-play" @click="router.push(`/qs/${id}/quiz`)">Quiz</button>
          <button class="btn-qs-play" @click="router.push(`/qs/${id}/game`)">Play ▶</button>
        </span>
      </div>

      <p v-if="tipVisible" class="qs-tip">👆 Tap any word to see its meaning and grammar</p>

      <div class="qs-verses">
        <div
          v-for="(verse, vi) in bd.verses"
          :key="verse.ayah"
          class="qs-verse"
          :class="{ 'is-playing': audioStatus(verse.ayah) === 'playing' }"
        >
          <span class="qs-ayah-num">{{ verse.ayah }}</span>
          <button
            class="btn-qs-ayah-listen"
            :class="audioStatus(verse.ayah)"
            :aria-label="listenLabel(verse.ayah)"
            :title="listenLabel(verse.ayah)"
            @click="toggleAudio(bd.surah, verse.ayah)"
          >
            <svg v-if="audioStatus(verse.ayah) === 'playing'" viewBox="0 0 16 16" width="10" height="10" aria-hidden="true" fill="currentColor">
              <rect x="3" y="3" width="10" height="10" rx="1.5" />
            </svg>
            <span v-else-if="audioStatus(verse.ayah) === 'error'" aria-hidden="true">!</span>
            <svg v-else viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" fill="currentColor">
              <path d="M2 6h2.5L8 3v10L4.5 10H2z" />
              <path d="M10.5 5.2a3.5 3.5 0 0 1 0 5.6M12.3 3.3a6 6 0 0 1 0 9.4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>
          </button>
          <button
            v-if="isVersePlayable(verse)"
            class="btn-qs-ayah-play"
            :aria-label="`Play ayah ${verse.ayah}`"
            @click="router.push(`/qs/${id}/game/${verse.ayah}`)"
          >▶</button>
          <ArabicLine
            :arabic="verse.arabic"
            :words="verse.words"
            :active-wi="active?.vi === vi ? active.wi : null"
            @word="wi => tapWord(vi, wi)"
          />
          <p class="qs-translation">{{ verse.literalTranslation ?? verse.translation }}</p>
        </div>
      </div>

      <p class="qs-audio-credit">
        Recitation: {{ RECITER }} · <RouterLink to="/credits">Audio credits</RouterLink>
      </p>
    </div>

    <WordSheet :open="active !== null" @close="active = null">
      <WordDetail v-if="active" :word="bd.verses[active.vi].words[active.wi]" />
    </WordSheet>
  </template>
</template>
