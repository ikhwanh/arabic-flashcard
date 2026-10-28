<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { qsMetas } from '../data/qs-breakdown'
import IndexCard from '../components/IndexCard.vue'
import { getBookmarks, getBookmarksOnly, setBookmarksOnly, toggleBookmark } from '../lib/bookmarks'
import { getQsQuizScore, getQsScore } from '../lib/progress'

const router = useRouter()

const bookmarks = ref(getBookmarks())
const bookmarksOnly = ref(getBookmarksOnly())

const shown = computed(() => bookmarksOnly.value ? qsMetas.filter(m => bookmarks.value.has(m.id)) : qsMetas)

function toggleBookmarksOnly() {
  bookmarksOnly.value = !bookmarksOnly.value
  setBookmarksOnly(bookmarksOnly.value)
}

function bookmarkLabel(id: string, heading: string) {
  return bookmarks.value.has(id) ? `Remove bookmark from ${heading}` : `Bookmark ${heading}`
}
</script>

<template>
  <div class="nav-page">
    <div class="nav-hero">
      <h2>Surah Breakdown</h2>
      <p class="nav-subtitle">Read verses word by word</p>
    </div>
    <div v-if="qsMetas.length > 0" class="qs-index-filter">
      <button
        class="btn-qs-filter"
        :class="{ active: bookmarksOnly }"
        :aria-pressed="bookmarksOnly"
        @click="toggleBookmarksOnly"
      >
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <path d="M4 2h8v12l-4-3-4 3z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
        </svg>
        Bookmarked only
      </button>
    </div>
    <div class="qs-index-grid">
      <p v-if="qsMetas.length === 0" class="nav-empty">No breakdowns yet. Generate one with the qs-breakdown command.</p>
      <p v-else-if="shown.length === 0" class="nav-empty">No bookmarked passages yet. Tap the bookmark on a card to save it.</p>
      <IndexCard
        v-for="m in shown"
        :key="m.id"
        :to="`/qs/${m.id}`"
        :heading="`QS ${m.surah} · ${m.surahName}`"
        :title="m.title"
        :desc="m.description"
        :count="`Ayat ${m.from}–${m.to} · ${m.verseCount} ayat`"
        :score="getQsScore(m.id)"
      >
        <div class="qs-card-actions">
          <button class="btn-qs-play-card" @click="router.push(`/qs/${m.id}/quiz`)">
            Quiz<template v-if="getQsQuizScore(m.id)"> · {{ getQsQuizScore(m.id) }}</template>
          </button>
          <button class="btn-qs-play-card" @click="router.push(`/qs/${m.id}/game`)">Play ▶</button>
          <button
            class="btn-qs-bookmark"
            :class="{ active: bookmarks.has(m.id) }"
            :aria-pressed="bookmarks.has(m.id)"
            :aria-label="bookmarkLabel(m.id, m.title)"
            :title="bookmarkLabel(m.id, m.title)"
            @click="bookmarks = toggleBookmark(m.id)"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M4 2h8v12l-4-3-4 3z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </IndexCard>
    </div>
  </div>
</template>
