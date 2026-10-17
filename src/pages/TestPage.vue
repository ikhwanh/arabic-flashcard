<script setup lang="ts">
import { ref } from 'vue'
import { loadAllCards } from '../data/flashcards'
import ErrorPage from '../components/ErrorPage.vue'
import QuizRunner from '../components/QuizRunner.vue'
import { buildQuestions, type Question } from '../lib/quiz'
import { saveScore } from '../lib/progress'
import type { Card } from '../types'

const DEFAULT_TEST_SIZE = 50

interface ExamConfig {
  key: string
  title: string
  range?: [number, number]
  size?: number
}

const EXAMS: Record<string, ExamConfig> = {
  '1-10':  { key: 'test_score_1_10',  title: 'Exam 1', range: [1, 10] },
  '11-20': { key: 'test_score_11_20', title: 'Exam 2', range: [11, 20] },
  '21-30': { key: 'test_score_21_30', title: 'Exam 3', range: [21, 30] },
  '31-40': { key: 'test_score_31_40', title: 'Exam 4', range: [31, 40] },
  '41-50': { key: 'test_score_41_50', title: 'Exam 5', range: [41, 50] },
  all:     { key: 'test_score',       title: 'Final Exam', size: 100 },
}

const props = defineProps<{ slug?: string }>()

const exam = (props.slug && EXAMS[props.slug]) || EXAMS.all

const cards = ref<Card[]>()
const questions = ref<Question[]>([])
const run = ref(0)

function start() {
  questions.value = buildQuestions(cards.value!, exam.size ?? DEFAULT_TEST_SIZE)
  run.value++
}

loadAllCards(exam.range).then(c => {
  cards.value = c
  start()
})

const praise = (score: number, total: number) =>
  score === total ? 'Perfect!' : Math.round((score / total) * 100) >= 70 ? 'Great job!' : 'Keep practicing!'
</script>

<template>
  <div v-if="cards === undefined" class="fc-loading">Loading test…</div>
  <ErrorPage v-else-if="questions.length === 0" message="Not enough cards to generate a test." back-to="/" />
  <QuizRunner
    v-else
    :key="run"
    :title="exam.title"
    :questions="questions"
    results-label="See Results"
    retry-label="Retry Test"
    :praise="praise"
    @finish="(score, total) => saveScore(exam.key, score, total)"
    @retry="start"
  />
</template>
