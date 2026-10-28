<script setup lang="ts">
import { ref } from 'vue'
import { loadBreakdown } from '../data/qs-breakdown'
import ErrorPage from '../components/ErrorPage.vue'
import QuizRunner from '../components/QuizRunner.vue'
import { buildQsQuestions, type Question } from '../lib/quiz'
import { saveScore } from '../lib/progress'
import type { QsBreakdown } from '../types'

const props = defineProps<{ id: string }>()

const bd = ref<QsBreakdown | null>()
const questions = ref<Question[]>([])
const run = ref(0)

function start() {
  questions.value = buildQsQuestions(bd.value!)
  run.value++
}

loadBreakdown(props.id).then(b => {
  bd.value = b
  if (b) start()
})

const praise = (score: number, total: number) =>
  score === total ? 'Perfect!' : score >= total * 0.7 ? 'Well done!' : 'Keep practicing!'
</script>

<template>
  <div v-if="bd === undefined" class="fc-loading">Loading…</div>
  <ErrorPage v-else-if="bd === null" message="Breakdown not found." back-to="/qs" />
  <ErrorPage
    v-else-if="questions.length === 0"
    message="Not enough words to generate a quiz (minimum 4)."
    :back-to="`/qs/${id}`"
    back-label="← Back to Breakdown"
  />
  <QuizRunner
    v-else
    :key="run"
    :title="`QS ${bd.surah} · ${bd.surahName}`"
    :questions="questions"
    results-label="Show Results"
    retry-label="Retry Quiz"
    :back-to="`/qs/${id}`"
    :praise="praise"
    @finish="(score, total) => saveScore(`qs_quiz_score_${id}`, score, total)"
    @retry="start"
  />
</template>
