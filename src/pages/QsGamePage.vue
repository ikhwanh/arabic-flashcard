<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loadBreakdown } from '../data/qs-breakdown'
import ErrorPage from '../components/ErrorPage.vue'
import { shuffle } from '../lib/random'
import { buildRounds, isVersePlayable, type Round } from '../lib/qs-rounds'
import { saveScore } from '../lib/progress'
import type { QsBreakdown } from '../types'

// `ayah` narrows the game to a single verse of the passage; omitted, it plays
// the whole passage.
const props = defineProps<{ id: string; ayah?: number }>()

const router = useRouter()

const bd = ref<QsBreakdown | null>()
const rounds = ref<Round[]>([])
// For a single-ayah run, the next playable ayah after `ayah` in this passage
// (in verse order), so the result screen can offer to continue. Undefined for
// a whole-passage run or when nothing playable follows.
const nextAyah = ref<number>()

const index = ref(0)
const score = ref(0)
const done = ref(false)
// Word index placed in each gloss slot, in Arabic reading order (null = empty).
const slots = ref<(number | null)[]>([])
// Word indices not yet placed into a slot, always laid out in `poolOrder`.
const pool = ref<number[]>([])
// The fixed shuffled layout of the pool for this round. A word that comes back
// to the pool returns to its own place here, so the pool never reshuffles
// itself under the player.
let poolOrder: number[] = []
const checked = ref(false)
const skipped = ref(false)

const slotEls: HTMLElement[] = []
const poolEl = ref<HTMLElement>()

const verses = computed(() => {
  if (!bd.value) return []
  return props.ayah === undefined ? bd.value.verses : bd.value.verses.filter(v => v.ayah === props.ayah)
})

loadBreakdown(props.id).then(b => {
  bd.value = b
  if (!b) return
  rounds.value = buildRounds(verses.value)
  if (props.ayah !== undefined) {
    const i = b.verses.findIndex(v => v.ayah === props.ayah)
    if (i !== -1) nextAyah.value = b.verses.slice(i + 1).find(isVersePlayable)?.ayah
  }
  if (rounds.value.length > 0) startRound()
})

const round = computed(() => rounds.value[index.value])
const isLast = computed(() => index.value === rounds.value.length - 1)

function startRound() {
  slotEls.length = 0
  slots.value = new Array(round.value.words.length).fill(null)
  poolOrder = shuffle(round.value.words.map((_, i) => i))
  pool.value = [...poolOrder]
  checked.value = false
  skipped.value = false
}

function restart() {
  index.value = 0
  score.value = 0
  done.value = false
  startRound()
}

// A slot holds the correct word when the placed word's meaning matches the
// slot's own meaning — by value, so duplicate-meaning words are interchangeable.
function slotCorrect(pos: number): boolean {
  const wIdx = slots.value[pos]
  return wIdx !== null && round.value.meanings[wIdx] === round.value.meanings[pos]
}

function isRoundCorrect(): boolean {
  if (slots.value.some(s => s === null)) return false
  return slots.value.every((_, pos) => slotCorrect(pos))
}

// Put a word back in the pool, in its fixed layout position.
function returnToPool(idx: number) {
  if (pool.value.includes(idx)) return
  pool.value.push(idx)
  pool.value.sort((a, b) => poolOrder.indexOf(a) - poolOrder.indexOf(b))
}

// Detach a word from wherever it currently sits (pool or a slot).
function removeWord(idx: number) {
  pool.value = pool.value.filter(i => i !== idx)
  const s = slots.value.indexOf(idx)
  if (s !== -1) slots.value[s] = null
}

// True if the pointer sits within (a padded box around) the element.
function within(el: HTMLElement, x: number, y: number, pad = 12): boolean {
  const r = el.getBoundingClientRect()
  return x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad
}

let cancelDrag: (() => void) | null = null
onUnmounted(() => cancelDrag?.())

// Tap places a pooled word into the first empty slot (or returns a placed
// word to the pool); press-and-drag drops it onto a specific slot. A drag
// that lands nowhere leaves the word exactly where it was. Nothing reflows
// during the drag — the layout only changes on drop.
function onChipDown(e: PointerEvent, idx: number, from: 'pool' | 'slot') {
  if (checked.value) return
  if (e.button !== 0 && e.pointerType === 'mouse') return
  e.preventDefault()
  const chip = e.currentTarget as HTMLElement
  const startX = e.clientX, startY = e.clientY
  let dragging = false
  let clone: HTMLElement | null = null
  let grabX = 0, grabY = 0

  const onMove = (ev: PointerEvent) => {
    if (!dragging) {
      if (Math.hypot(ev.clientX - startX, ev.clientY - startY) < 6) return
      dragging = true
      const r = chip.getBoundingClientRect()
      grabX = startX - r.left
      grabY = startY - r.top
      clone = chip.cloneNode(true) as HTMLElement
      clone.className = 'qs-game-chip chip-drag-clone'
      clone.style.width = `${r.width}px`
      clone.style.height = `${r.height}px`
      document.body.appendChild(clone)
      chip.classList.add('chip-drag-source')
    }
    clone!.style.left = `${ev.clientX - grabX}px`
    clone!.style.top = `${ev.clientY - grabY}px`
  }

  const cleanup = () => {
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerup', onUp)
    clone?.remove()
    chip.classList.remove('chip-drag-source')
    cancelDrag = null
  }

  const onUp = (ev: PointerEvent) => {
    cleanup()

    if (!dragging) {
      // Plain tap → place into first empty slot, or return to the pool.
      if (from === 'pool') {
        const empty = slots.value.indexOf(null)
        if (empty !== -1) { removeWord(idx); slots.value[empty] = idx }
      } else {
        removeWord(idx); returnToPool(idx)
      }
      return
    }

    // Drop onto a slot → place there, bumping any occupant back to pool.
    // Drop onto the pool area → return to pool. Elsewhere → no change.
    const targetSlot = slotEls.findIndex(el => within(el, ev.clientX, ev.clientY))
    if (targetSlot !== -1) {
      const occupant = slots.value[targetSlot]
      removeWord(idx)
      if (occupant !== null && occupant !== idx) returnToPool(occupant)
      slots.value[targetSlot] = idx
    } else if (poolEl.value && within(poolEl.value, ev.clientX, ev.clientY)) {
      removeWord(idx); returnToPool(idx)
    }
  }

  cancelDrag = cleanup
  document.addEventListener('pointermove', onMove)
  document.addEventListener('pointerup', onUp)
}

function check() {
  checked.value = true
  if (isRoundCorrect()) score.value++
}

function skip() {
  skipped.value = true
  checked.value = true
}

function next() {
  if (!isLast.value) {
    index.value++
    startRound()
    return
  }
  // A single-ayah run must not overwrite the passage's score chip.
  if (props.ayah === undefined) saveScore(`qs_score_${props.id}`, score.value, rounds.value.length)
  done.value = true
}

function slotClass(pos: number) {
  if (!checked.value || skipped.value || slots.value[pos] === null) return {}
  return slotCorrect(pos) ? 'correct' : 'wrong'
}

function chipClass(pos: number) {
  if (!checked.value || skipped.value) return {}
  return slotCorrect(pos) ? 'chip-correct' : 'chip-wrong'
}

const praise = computed(() => {
  const total = rounds.value.length
  return score.value === total ? 'Perfect!' : score.value >= total * 0.7 ? 'Well done!' : 'Keep practicing!'
})

const backToReader = () => router.push(`/qs/${props.id}`)
</script>

<template>
  <div v-if="bd === undefined" class="fc-loading">Loading…</div>
  <ErrorPage v-else-if="bd === null" message="Breakdown not found." back-to="/qs" />
  <ErrorPage
    v-else-if="verses.length === 0"
    :message="`Ayat ${ayah} is not in this passage.`"
    :back-to="`/qs/${id}`"
    back-label="← Back to Reader"
  />
  <ErrorPage
    v-else-if="rounds.length === 0"
    :message="`Not enough words ${ayah === undefined ? 'in this passage' : `in ayat ${ayah}`} to play.`"
    :back-to="`/qs/${id}`"
    back-label="← Back to Reader"
  />

  <div v-else-if="done" class="qs-game-page">
    <div class="qs-header">
      <button class="btn-back" @click="backToReader">← Back</button>
      <span class="qs-deck-title">{{ bd.surahName }} · {{ ayah !== undefined ? `Ayat ${ayah}` : `Ayat ${bd.from}–${bd.to}` }}</span>
    </div>

    <div class="quiz-result">
      <div class="quiz-result-score">{{ score }} / {{ rounds.length }}</div>
      <p class="quiz-result-label">{{ praise }}</p>
      <div class="quiz-result-actions">
        <button v-if="nextAyah !== undefined" class="btn-quiz-next-ayah" @click="router.push(`/qs/${id}/game/${nextAyah}`)">Next Verse →</button>
        <button class="btn-quiz-retry" @click="restart">Play Again</button>
        <button class="btn-quiz-back" @click="backToReader">← Back to Reader</button>
      </div>
    </div>
  </div>

  <div v-else class="qs-game-page">
    <div class="qs-header">
      <button class="btn-back" @click="backToReader">← Back</button>
      <span class="qs-deck-title">{{ bd.surahName }} · Ayat {{ round.ayah }}{{ round.part ? ` · Part ${round.part.index}/${round.part.count}` : '' }}</span>
      <span class="qs-range">{{ index + 1 }} / {{ rounds.length }}</span>
    </div>

    <p class="qs-game-label">Drop each Arabic word onto its meaning</p>

    <div class="qs-slots" dir="rtl">
      <div
        v-for="(meaning, pos) in round.meanings"
        :key="pos"
        :ref="el => { if (el) slotEls[pos] = el as HTMLElement }"
        class="qs-slot"
        :class="slotClass(pos)"
      >
        <span class="qs-slot-label">{{ meaning }}</span>
        <div class="qs-slot-drop" dir="rtl">
          <button
            v-if="slots[pos] !== null"
            class="qs-game-chip"
            :class="chipClass(pos)"
            @pointerdown="onChipDown($event, slots[pos]!, 'slot')"
          >{{ round.words[slots[pos]!] }}</button>
        </div>
      </div>
    </div>

    <div ref="poolEl" class="qs-game-pool" dir="rtl">
      <button
        v-for="i in pool"
        :key="i"
        class="qs-game-chip"
        @pointerdown="onChipDown($event, i, 'pool')"
      >{{ round.words[i] }}</button>
      <span v-if="pool.length === 0" class="qs-game-placeholder">All words placed — tap Check</span>
    </div>

    <template v-if="checked">
      <div class="qs-game-feedback">
        <template v-if="skipped">
          <p class="qs-game-result-bad">Skipped. Correct order:</p>
          <p class="qs-game-correct" dir="rtl">{{ round.arabic }}</p>
        </template>
        <p v-else-if="isRoundCorrect()" class="qs-game-result-ok">✔ Correct!</p>
        <template v-else>
          <p class="qs-game-result-bad">✗ Not quite. Correct order:</p>
          <p class="qs-game-correct" dir="rtl">{{ round.arabic }}</p>
        </template>
      </div>
      <button class="btn-quiz-next" @click="next">{{ isLast ? 'Show Results' : 'Next Verse →' }}</button>
    </template>
    <div v-else class="qs-game-actions">
      <button class="btn-quiz-next" :disabled="pool.length > 0" @click="check">Check</button>
      <button class="btn-quiz-skip" @click="skip">Skip</button>
    </div>
  </div>
</template>
