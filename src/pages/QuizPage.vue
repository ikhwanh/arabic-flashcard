<script setup lang="ts">
import { ref } from 'vue'
import { loadDeck } from '../data/flashcards'
import ErrorPage from '../components/ErrorPage.vue'
import QuizRunner from '../components/QuizRunner.vue'
import { buildQuestions, type Question } from '../lib/quiz'
import { saveScore } from '../lib/progress'
import type { Deck } from '../types'

const props = defineProps<{ id: string }>()

const deck = ref<Deck | null>()
const questions = ref<Question[]>([])
const run = ref(0)

function start() {
  questions.value = buildQuestions(deck.value!.cards)
  run.value++
}

loadDeck(props.id).then(d => {
  deck.value = d
  if (d) start()
})

const praise = (score: number, total: number) =>
  score === total ? 'Perfect!' : score >= total * 0.7 ? 'Well done!' : 'Keep practicing!'
</script>

<template>
  <div v-if="deck === undefined" class="fc-loading">Loading…</div>
  <ErrorPage v-else-if="deck === null" message="Deck not found." back-to="/" />
  <ErrorPage
    v-else-if="questions.length === 0"
    message="Not enough cards to generate a quiz (minimum 4)."
    :back-to="`/deck/${id}`"
    back-label="← Back to Deck"
  />
  <QuizRunner
    v-else
    :key="run"
    :title="`${deck.emoji} ${deck.title}`"
    :questions="questions"
    results-label="Show Results"
    retry-label="Retry Quiz"
    :praise="praise"
    @finish="(score, total) => saveScore(`quiz_score_${id}`, score, total)"
    @retry="start"
  />
</template>
