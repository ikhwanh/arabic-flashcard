<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loadBreakdown } from '../data/qs-breakdown'
import ArabicLine from '../components/ArabicLine.vue'
import ErrorPage from '../components/ErrorPage.vue'
import WordDetail from '../components/WordDetail.vue'
import WordSheet from '../components/WordSheet.vue'
import { isVersePlayable } from '../lib/qs-rounds'
import type { QsBreakdown } from '../types'

const props = defineProps<{ id: string }>()

const router = useRouter()

const bd = ref<QsBreakdown | null>()
const tipVisible = ref(true)
const active = ref<{ vi: number; wi: number } | null>(null)

loadBreakdown(props.id).then(b => { bd.value = b })

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
        <div v-for="(verse, vi) in bd.verses" :key="verse.ayah" class="qs-verse">
          <span class="qs-ayah-num">{{ verse.ayah }}</span>
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
    </div>

    <WordSheet :open="active !== null" @close="active = null">
      <WordDetail v-if="active" :word="bd.verses[active.vi].words[active.wi]" />
    </WordSheet>
  </template>
</template>
