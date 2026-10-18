<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { deckMetas } from '../data/flashcards'
import { THEMES, THEME_META, getTheme, setTheme, type Theme } from '../theme'
import { deckLabel, getLastVisited } from '../lib/progress'

const router = useRouter()

const theme = ref(getTheme())

function chooseTheme(t: Theme) {
  setTheme(t)
  theme.value = t
}

function relativeTime(ts: number): string {
  const diff = Date.now() - ts
  const min = 60_000, hour = 60 * min, day = 24 * hour
  if (diff < min) return 'just now'
  if (diff < hour) return `${Math.floor(diff / min)}m ago`
  if (diff < day) return `${Math.floor(diff / hour)}h ago`
  if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`
  return new Date(ts).toLocaleDateString()
}

const visited = deckMetas
  .map(d => ({ deck: d, visited: getLastVisited(d.id) }))
  .filter(x => x.visited > 0)
  .sort((a, b) => b.visited - a.visited)
</script>

<template>
  <div class="nav-page settings-page">
    <div class="nav-hero">
      <h2>Settings</h2>
      <p class="nav-subtitle">Personalize your appearance and review your history</p>
    </div>

    <section class="settings-section">
      <h3 class="settings-heading">Theme</h3>
      <div class="settings-options">
        <button
          v-for="t in THEMES"
          :key="t"
          class="settings-option theme-option"
          :class="{ active: theme === t }"
          @click="chooseTheme(t)"
        >
          <span class="settings-option-icon">{{ THEME_META[t].icon }}</span>
          <span class="settings-option-label">{{ THEME_META[t].label }}</span>
        </button>
      </div>
    </section>

    <section class="settings-section">
      <h3 class="settings-heading">Recently Visited</h3>
      <div class="settings-history">
        <p v-if="visited.length === 0" class="nav-empty">No decks visited yet.</p>
        <button
          v-for="v in visited"
          :key="v.deck.id"
          class="settings-history-item"
          @click="router.push(`/deck/${v.deck.id}`)"
        >
          <span class="settings-history-title">{{ deckLabel(v.deck.title) }}</span>
          <span class="settings-history-time">{{ relativeTime(v.visited) }}</span>
        </button>
      </div>
    </section>
  </div>
</template>
