<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loadReading } from '../data/reading'
import ArabicLine from '../components/ArabicLine.vue'
import ErrorPage from '../components/ErrorPage.vue'
import WordDetail from '../components/WordDetail.vue'
import WordSheet from '../components/WordSheet.vue'
import type { ReadingSurah } from '../types'

// `embedded` renders the surah straight into the Yasin tab: the app header
// already names it, so the page drops its own back/title row.
const props = defineProps<{ id: string; embedded?: boolean }>()

const router = useRouter()

const surah = ref<ReadingSurah | null>()
const tipVisible = ref(true)
const active = ref<{ vi: number; wi: number } | null>(null)

loadReading(props.id).then(s => { surah.value = s })

function tapWord(vi: number, wi: number) {
  tipVisible.value = false
  const same = active.value?.vi === vi && active.value.wi === wi
  active.value = same ? null : { vi, wi }
}
</script>

<template>
  <div v-if="surah === undefined" class="fc-loading">Loading…</div>
  <ErrorPage v-else-if="surah === null" message="Surah not found." back-to="/read" />
  <template v-else>
    <div class="qs-page">
      <div v-if="!embedded" class="qs-header">
        <button class="btn-back" @click="router.push('/read')">← Back</button>
        <span class="qs-deck-title">QS {{ surah.surah }} · {{ surah.surahName }}</span>
      </div>

      <p v-if="tipVisible" class="qs-tip">👆 Tap any word to see its meaning</p>

      <div class="qs-verses">
        <div v-for="(verse, vi) in surah.verses" :key="verse.ayah" class="qs-verse">
          <span class="qs-ayah-num">{{ verse.ayah }}</span>
          <ArabicLine
            :arabic="verse.arabic"
            :words="verse.words"
            :active-wi="active?.vi === vi ? active.wi : null"
            @word="wi => tapWord(vi, wi)"
          />
        </div>
      </div>
    </div>

    <WordSheet :open="active !== null" @close="active = null">
      <WordDetail v-if="active" :word="surah.verses[active.vi].words[active.wi]" />
    </WordSheet>
  </template>
</template>
