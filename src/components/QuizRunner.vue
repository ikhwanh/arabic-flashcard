<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Question } from '../lib/quiz'

const props = defineProps<{
  title: string
  questions: Question[]
  resultsLabel: string
  retryLabel: string
  praise: (score: number, total: number) => string
}>()

const emit = defineEmits<{ finish: [score: number, total: number]; retry: [] }>()

const router = useRouter()

const index = ref(0)
const score = ref(0)
const chosen = ref<string | null>(null)
const hintShown = ref(false)
const done = ref(false)

const q = computed(() => props.questions[index.value])
const total = computed(() => props.questions.length)
const answered = computed(() => chosen.value !== null)
const isLast = computed(() => index.value === total.value - 1)

function choose(opt: string) {
  if (answered.value) return
  chosen.value = opt
  if (opt === q.value.correct) score.value++
}

function optionClass(opt: string) {
  if (!answered.value) return {}
  return { correct: opt === q.value.correct, wrong: opt === chosen.value && opt !== q.value.correct }
}

function next() {
  if (!isLast.value) {
    index.value++
    chosen.value = null
    hintShown.value = false
  } else {
    emit('finish', score.value, total.value)
    done.value = true
  }
}

const back = () => router.push('/')
</script>

<template>
  <div class="quiz-page">
    <div class="fc-header">
      <button class="btn-back" @click="back">← Back</button>
      <span class="fc-deck-title">{{ title }}</span>
      <span v-if="!done" class="fc-progress">{{ index + 1 }} / {{ total }}</span>
    </div>

    <div v-if="!done" class="quiz-body">
      <p class="quiz-label">{{ q.promptLabel }}</p>
      <div class="quiz-prompt">
        <button v-if="q.ayatArabic && !hintShown && !answered" class="btn-quiz-hint" @click="hintShown = true">💡 Hint</button>
        <span class="quiz-word">{{ q.prompt }}</span>
        <div v-if="q.ayatArabic" class="quiz-ayat">
          <span class="quiz-ayat-arabic">{{ q.ayatArabic }}</span>
          <span class="quiz-ayat-ref">{{ q.ayatRef }}</span>
          <span v-if="hintShown || answered" class="quiz-ayat-translation" style="display:block">{{ q.ayatTranslation }}</span>
        </div>
      </div>

      <div class="quiz-options">
        <button
          v-for="(opt, i) in q.options"
          :key="i"
          class="quiz-option"
          :class="optionClass(opt)"
          :disabled="answered"
          @click="choose(opt)"
        >{{ opt }}</button>
      </div>

      <button v-if="answered" class="btn-quiz-next" style="display:block" @click="next">
        {{ isLast ? resultsLabel : 'Next Question →' }}
      </button>
    </div>

    <div v-else class="quiz-result">
      <div class="quiz-result-score">{{ score }} / {{ total }}</div>
      <p class="quiz-result-label">{{ praise(score, total) }}</p>
      <div class="quiz-result-actions">
        <button class="btn-quiz-retry" @click="emit('retry')">{{ retryLabel }}</button>
        <button class="btn-quiz-back" @click="back">← Back</button>
      </div>
    </div>
  </div>
</template>
