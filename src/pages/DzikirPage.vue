<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loadDzikir } from '../data/dzikir'
import ArabicLine from '../components/ArabicLine.vue'
import ErrorPage from '../components/ErrorPage.vue'
import WordDetail from '../components/WordDetail.vue'
import WordSheet from '../components/WordSheet.vue'
import type { DzikirRukun, DzikirSet } from '../types'

const props = defineProps<{ id: string }>()

const RUKUN_LABELS: Record<DzikirRukun['part'], string> = {
  action: 'Rukun · action',
  recitation: 'Rukun · recitation',
  both: 'Rukun',
}

type SheetContent =
  | { kind: 'word'; ii: number; wi: number }
  | { kind: 'hadith' | 'rukun'; ii: number }

const router = useRouter()

const set = ref<DzikirSet | null>()
const counts = ref<number[]>([])
const tipVisible = ref(true)
const sheet = ref<SheetContent | null>(null)
const bumped = ref<number | null>(null)

loadDzikir(props.id).then(s => {
  set.value = s
  counts.value = s ? s.items.map(() => 0) : []
})

// Tapping anywhere on a card counts one recitation; tapping again once the
// target is reached resets to 0. Word/hadith/rukun taps stop propagation so they
// do their own thing without also counting.
async function count(ii: number) {
  tipVisible.value = false
  const target = set.value!.items[ii].repeat
  counts.value[ii] = counts.value[ii] >= target ? 0 : counts.value[ii] + 1
  // Brief bump so the tap registers visually. Dropping the class and forcing a
  // reflow before re-adding it restarts the animation on repeated taps.
  bumped.value = null
  await nextTick()
  void document.body.offsetWidth
  bumped.value = ii
}

function tapWord(ii: number, wi: number) {
  tipVisible.value = false
  const s = sheet.value
  const same = s?.kind === 'word' && s.ii === ii && s.wi === wi
  sheet.value = same ? null : { kind: 'word', ii, wi }
}

function openItemSheet(kind: 'hadith' | 'rukun', ii: number) {
  tipVisible.value = false
  sheet.value = { kind, ii }
}

function activeWi(ii: number): number | null {
  const s = sheet.value
  return s?.kind === 'word' && s.ii === ii ? s.wi : null
}
</script>

<template>
  <div v-if="set === undefined" class="fc-loading">Loading…</div>
  <ErrorPage v-else-if="set === null" message="Dzikir not found." back-to="/dzikir" />
  <template v-else>
    <div class="qs-page">
      <div class="qs-header">
        <button class="btn-back" @click="router.push('/dzikir')">← Back</button>
        <span class="qs-deck-title">{{ set.title }}</span>
      </div>

      <p v-if="tipVisible" class="qs-tip">👆 Tap the card to count · tap a word for its meaning</p>

      <div class="qs-verses">
        <div v-for="(item, ii) in set.items" :key="ii" class="qs-verse dzikir-item" @click="count(ii)">
          <div class="dzikir-item-head">
            <span
              class="dzikir-counter"
              :class="{ done: counts[ii] >= item.repeat, bump: bumped === ii }"
            >{{ counts[ii] >= item.repeat ? '✓ ' : '' }}{{ counts[ii] }} / {{ item.repeat }}</span>
            <span v-if="item.title" class="dzikir-item-title">{{ item.title }}</span>
            <button v-if="item.rukun" class="dzikir-rukun-tag" @click.stop="openItemSheet('rukun', ii)">{{ RUKUN_LABELS[item.rukun.part] }}</button>
            <button v-if="item.hadith" class="dzikir-hadith-btn" aria-label="View source hadith" @click.stop="openItemSheet('hadith', ii)">📖</button>
          </div>
          <ArabicLine
            :arabic="item.arabic"
            :words="item.words"
            :active-wi="activeWi(ii)"
            ayah-sep
            @word="wi => tapWord(ii, wi)"
          />
        </div>
      </div>
    </div>

    <WordSheet :open="sheet !== null" @close="sheet = null">
      <template v-if="sheet">
        <WordDetail v-if="sheet.kind === 'word'" :word="set.items[sheet.ii].words[sheet.wi]" />
        <div v-else-if="sheet.kind === 'hadith'" class="dzikir-hadith">
          <span class="dzikir-hadith-ref">📖 {{ set.items[sheet.ii].hadith!.reference }}</span>
          <p v-if="set.items[sheet.ii].hadith!.arabic" class="dzikir-hadith-arabic" dir="rtl">{{ set.items[sheet.ii].hadith!.arabic }}</p>
          <p class="dzikir-hadith-content">{{ set.items[sheet.ii].hadith!.content }}</p>
        </div>
        <div v-else class="dzikir-hadith">
          <span class="dzikir-hadith-ref">Essential element of prayer (Shafi'i)</span>
          <p class="dzikir-hadith-content">{{ set.items[sheet.ii].rukun!.note }}</p>
        </div>
      </template>
    </WordSheet>
  </template>
</template>
