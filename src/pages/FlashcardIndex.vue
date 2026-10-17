<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { deckMetas } from '../data/flashcards'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { deckLabel, getContinueState, getLastVisited, getQuizScore, hasAnyProgress, resetAll } from '../lib/progress'

const EXAMS = [
  { slug: '1-10', label: 'Exam 1', sub: 'Part 1–10' },
  { slug: '11-20', label: 'Exam 2', sub: 'Part 11–20' },
  { slug: '21-30', label: 'Exam 3', sub: 'Part 21–30' },
  { slug: '31-40', label: 'Exam 4', sub: 'Part 31–40' },
  { slug: '41-50', label: 'Exam 5', sub: 'Part 41–50' },
  { slug: 'all', label: 'Final Exam', sub: 'Semua part' },
]

const router = useRouter()

const filterUnfinished = ref(false)
const menuOpen = ref(false)
const confirming = ref(false)
const menu = ref<HTMLElement>()
// Progress lives in localStorage, which Vue can't observe; bumping this
// re-evaluates everything derived from it after a reset.
const progressVersion = ref(0)

const progress = computed(() => {
  void progressVersion.value
  const sorted = [...deckMetas].sort((a, b) => getLastVisited(b.id) - getLastVisited(a.id))
  return {
    continueState: getContinueState(),
    anyProgress: hasAnyProgress(),
    decks: sorted.map(deck => ({ deck, score: getQuizScore(deck.id) })),
  }
})

const visibleDecks = computed(() => filterUnfinished.value
  ? progress.value.decks.filter(d => d.score === null)
  : progress.value.decks)

const continueCards = computed(() => {
  const { resume, next } = progress.value.continueState
  const cards: { id: string; kind: 'resume' | 'next'; kicker: string; title: string }[] = []
  if (resume) cards.push({ id: resume.id, kind: 'resume', kicker: '▶ Resume', title: deckLabel(resume.title) })
  if (next && next.id !== resume?.id) {
    cards.push({ id: next.id, kind: 'next', kicker: resume ? 'Next up' : 'Start here', title: deckLabel(next.title) })
  }
  return cards
})

function onDocClick(e: MouseEvent) {
  if (!menu.value?.contains(e.target as Node)) closeMenu()
}

function closeMenu() {
  menuOpen.value = false
  document.removeEventListener('click', onDocClick)
}

function toggleMenu() {
  if (menuOpen.value) return closeMenu()
  menuOpen.value = true
  document.addEventListener('click', onDocClick)
}

onUnmounted(() => document.removeEventListener('click', onDocClick))

function openExam(slug: string) {
  closeMenu()
  router.push(slug === 'all' ? '/test' : `/test/${slug}`)
}

function askReset() {
  closeMenu()
  confirming.value = true
}

function confirmReset() {
  confirming.value = false
  resetAll()
  filterUnfinished.value = false
  progressVersion.value++
}
</script>

<template>
  <div class="nav-page">
    <div class="nav-hero">
      <h2>Kosakata Al-Quran</h2>
      <p class="nav-subtitle">Kata-kata bermakna yang paling sering muncul di Al-Quran</p>
    </div>
    <div class="nav-toolbar">
      <div class="nav-filters">
        <button class="nav-filter-chip" :class="{ active: filterUnfinished }" @click="filterUnfinished = !filterUnfinished">Unfinished</button>
      </div>
      <div ref="menu" class="nav-menu">
        <button class="nav-menu-trigger" aria-label="Options" aria-haspopup="true" :aria-expanded="menuOpen" @click="toggleMenu">⋮</button>
        <div class="nav-menu-dropdown" :hidden="!menuOpen">
          <button v-for="e in EXAMS" :key="e.slug" class="nav-menu-item" @click="openExam(e.slug)">
            {{ e.label }} <span class="nav-menu-item-sub">{{ e.sub }}</span>
          </button>
          <div class="nav-menu-divider"></div>
          <button class="nav-menu-item btn-reset-all" :disabled="!progress.anyProgress" @click="askReset">Reset all progress</button>
        </div>
      </div>
    </div>
    <div class="nav-continue" :hidden="continueCards.length === 0">
      <button
        v-for="c in continueCards"
        :key="c.kind"
        class="nav-continue-card"
        :class="c.kind"
        @click="router.push(`/deck/${c.id}`)"
      >
        <span class="nav-continue-kicker">{{ c.kicker }}</span>
        <span class="nav-continue-title">{{ c.title }}</span>
      </button>
    </div>
    <div class="deck-grid">
      <p v-if="visibleDecks.length === 0" class="nav-empty">All decks have been quizzed. Well done!</p>
      <template v-else>
        <div v-for="{ deck, score } in visibleDecks" :key="deck.id" class="deck-card">
          <button class="deck-card-study" :aria-label="`Study ${deck.title}`" @click="router.push(`/deck/${deck.id}`)">
            <span v-if="score !== null" class="deck-score-chip">{{ score }}</span>
            <h3 class="deck-title">{{ deckLabel(deck.title) }}</h3>
            <p class="deck-preview">{{ deck.preview.join(' · ') }}</p>
          </button>
          <div class="deck-card-footer">
            <span class="deck-count">{{ deck.cardCount }} cards</span>
            <button class="btn-quiz" :aria-label="`Take quiz for ${deck.title}`" @click="router.push(`/deck/${deck.id}/quiz`)">Quiz →</button>
          </div>
        </div>
      </template>
    </div>

    <ConfirmDialog
      v-if="confirming"
      title="Reset all progress?"
      message="This will clear all quiz scores and visit history."
      @confirm="confirmReset"
      @cancel="confirming = false"
    />
  </div>
</template>
