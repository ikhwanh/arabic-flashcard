<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loadDeck } from '../data/flashcards'
import ErrorPage from '../components/ErrorPage.vue'
import { markVisited } from '../lib/progress'
import type { Deck } from '../types'

const props = defineProps<{ id: string }>()

const router = useRouter()

const deck = ref<Deck | null>()
const index = ref(0)
const flipped = ref(false)

loadDeck(props.id).then(d => {
  deck.value = d
  if (d) markVisited(props.id)
})

const card = computed(() => deck.value!.cards[index.value])
const total = computed(() => deck.value!.cards.length)

const formEntries = computed(() => Object.entries(card.value.forms ?? {}).filter(([, v]) => v))

function go(i: number) {
  index.value = i
  flipped.value = false
}
</script>

<template>
  <div v-if="deck === undefined" class="fc-loading">Loading…</div>
  <ErrorPage v-else-if="deck === null" message="Deck not found." back-to="/" />
  <div v-else class="fc-page">
    <div class="fc-header">
      <button class="btn-back" @click="router.push('/')">← Back</button>
      <span class="fc-deck-title">{{ deck.emoji }} {{ deck.title }}</span>
      <span class="fc-progress">{{ index + 1 }} / {{ total }}</span>
    </div>

    <div class="fc-area">
      <div
        class="fc-card"
        :class="{ flipped }"
        id="fc-card"
        role="button"
        tabindex="0"
        aria-label="Flip card"
        @click="flipped = !flipped"
        @keydown.enter.prevent="flipped = !flipped"
        @keydown.space.prevent="flipped = !flipped"
      >
        <div class="fc-face fc-front">
          <span class="fc-arabic">{{ card.arabic }}</span>
        </div>
        <div class="fc-face fc-back">
          <span v-if="card.wordType" class="fc-badge">{{ card.wordType }}</span>
          <span class="fc-transliteration">{{ card.transliteration }}</span>
          <span class="fc-english">{{ card.indonesian }}</span>
          <span v-if="card.root" class="fc-root">Root: {{ card.root }}</span>
          <div v-if="card.forms" class="fc-forms">
            <span v-for="[k, v] in formEntries" :key="k" class="fc-form"><em>{{ k }}</em> {{ v }}</span>
          </div>
          <div v-if="card.relatedWords?.length" class="fc-related">
            <span class="fc-related-label">Related</span>
            <span v-for="(w, i) in card.relatedWords" :key="i" class="fc-related-word">
              <span class="fc-related-arabic">{{ w.arabic }}</span> — {{ w.translation }}
            </span>
          </div>
          <div v-if="card.quranExample" class="fc-quran">
            <span class="fc-quran-arabic">{{ card.quranExample.arabic }}</span>
            <span class="fc-quran-translation">{{ card.quranExample.translation }}</span>
            <span class="fc-quran-ref">{{ card.quranExample.surah }} {{ card.quranExample.ayah }}</span>
          </div>
        </div>
      </div>
      <p class="fc-hint">{{ flipped ? 'Click card to flip back' : 'Click card to reveal' }}</p>
    </div>

    <div class="fc-controls">
      <button class="btn-nav" id="btn-prev" :disabled="index === 0" @click="go(index - 1)">← Prev</button>
      <button class="btn-nav" id="btn-next" :disabled="index === total - 1" @click="go(index + 1)">Next →</button>
    </div>

    <div class="fc-dots">
      <span
        v-for="(_, i) in deck.cards"
        :key="i"
        class="fc-dot"
        :class="{ active: i === index }"
        @click="go(i)"
      ></span>
    </div>
  </div>
</template>
