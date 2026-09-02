import { loadBreakdown } from '../data/qs-breakdown'
import type { QsVerse } from '../types'

// A verse is playable only if it has enough words to make ordering meaningful.
const MIN_WORDS = 2

interface Round {
  ayah: number
  translation: string
  // Correct Arabic sequence for this round, in order.
  words: string[]
  // Indonesian per-word meanings, aligned by index with `words` — one gloss slot
  // per word, shown in Arabic reading order as the target the player fills.
  meanings: string[]
  // Arabic shown in the "correct order" reveal — the full Uthmani verse (with
  // waqaf marks) for a whole-verse round, or the joined part words for a segment.
  arabic: string
  // Set when the verse was split into parts, so the header can show "Part i/n".
  part?: { index: number; count: number }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// True if the pointer sits within (a padded box around) the element.
function within(el: HTMLElement, x: number, y: number, pad = 12): boolean {
  const r = el.getBoundingClientRect()
  return x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad
}

// A verse's `segments` are a valid partition only if they cover every word,
// in order, with none dropped or duplicated. Otherwise we fall back to a single
// whole-verse round rather than trust a malformed split.
function segmentsCoverWords(v: QsVerse): boolean {
  if (!v.segments || v.segments.length === 0) return false
  const sum = v.segments.reduce((n, s) => n + s.wordCount, 0)
  return sum === v.words.length
}

function buildRounds(verses: QsVerse[]): Round[] {
  const rounds: Round[] = []
  for (const v of verses) {
    if (v.words.length < MIN_WORDS) continue

    if (segmentsCoverWords(v)) {
      const count = v.segments!.length
      let offset = 0
      v.segments!.forEach((seg, i) => {
        const slice = v.words.slice(offset, offset + seg.wordCount)
        offset += seg.wordCount
        // Skip trivial parts that can't be meaningfully arranged.
        if (slice.length < MIN_WORDS) return
        rounds.push({
          ayah: v.ayah,
          translation: seg.translation,
          words: slice.map(w => w.arabic),
          meanings: slice.map(w => w.meaning),
          arabic: slice.map(w => w.arabic).join(' '),
          part: { index: i + 1, count },
        })
      })
    } else {
      rounds.push({
        ayah: v.ayah,
        translation: v.literalTranslation ?? v.translation,
        words: v.words.map(w => w.arabic),
        meanings: v.words.map(w => w.meaning),
        arabic: v.arabic,
      })
    }
  }
  return rounds
}

// A single verse is worth offering as its own game only if it yields at least
// one round. Reusing buildRounds keeps this in lockstep with the game itself.
export function isVersePlayable(v: QsVerse): boolean {
  return buildRounds([v]).length > 0
}

function saveScore(id: string, score: number, total: number) {
  localStorage.setItem(`qs_score_${id}`, `${score}/${total}`)
}

// `ayah` narrows the game to a single verse of the passage; omitted, it plays
// the whole passage.
export async function renderQsGame(container: HTMLElement, id: string, ayah?: number) {
  container.innerHTML = `<div class="fc-loading">Loading…</div>`

  const bd = await loadBreakdown(id)

  if (!bd) {
    container.innerHTML = `
      <div class="error-page">
        <p>Breakdown not found.</p>
        <button class="btn-back" onclick="window.location.hash='qs'">← Back</button>
      </div>
    `
    return
  }

  const verses = ayah === undefined ? bd.verses : bd.verses.filter(v => v.ayah === ayah)

  if (verses.length === 0) {
    container.innerHTML = `
      <div class="error-page">
        <p>Ayat ${ayah} is not in this passage.</p>
        <button class="btn-back" onclick="window.location.hash='qs/${id}'">← Back to Reader</button>
      </div>
    `
    return
  }

  const rounds = buildRounds(verses)

  if (rounds.length === 0) {
    container.innerHTML = `
      <div class="error-page">
        <p>Not enough words ${ayah === undefined ? 'in this passage' : `in ayat ${ayah}`} to play.</p>
        <button class="btn-back" onclick="window.location.hash='qs/${id}'">← Back to Reader</button>
      </div>
    `
    return
  }

  let currentIndex = 0
  let score = 0
  // Word index placed in each gloss slot, in Arabic reading order (null = empty).
  let slots: (number | null)[] = []
  // Word indices not yet placed into a slot.
  let pool: number[] = []
  let checked = false
  let skipped = false

  // A slot holds the correct word when the placed word's meaning matches the
  // slot's own meaning — by value, so duplicate-meaning words are interchangeable.
  function slotCorrect(round: Round, pos: number): boolean {
    const wIdx = slots[pos]
    return wIdx !== null && round.meanings[wIdx] === round.meanings[pos]
  }

  function startRound() {
    const round = rounds[currentIndex]
    slots = new Array(round.words.length).fill(null)
    pool = shuffle(round.words.map((_, i) => i))
    checked = false
    skipped = false
    renderRound()
  }

  // Detach a word from wherever it currently sits (pool or a slot).
  function removeWord(idx: number) {
    pool = pool.filter(i => i !== idx)
    const s = slots.indexOf(idx)
    if (s !== -1) slots[s] = null
  }

  function renderRound() {
    const round = rounds[currentIndex]
    const total = rounds.length
    const isLast = currentIndex === total - 1

    const slotEls = round.meanings
      .map((meaning, pos) => {
        const wIdx = slots[pos]
        let slotCls = 'qs-slot'
        if (checked && !skipped && wIdx !== null) slotCls += slotCorrect(round, pos) ? ' correct' : ' wrong'
        let chip = ''
        if (wIdx !== null) {
          let chipCls = 'qs-game-chip'
          if (checked && !skipped) chipCls += slotCorrect(round, pos) ? ' chip-correct' : ' chip-wrong'
          chip = `<button class="${chipCls}" data-from="slot" data-idx="${wIdx}">${round.words[wIdx]}</button>`
        }
        return `
          <div class="${slotCls}">
            <span class="qs-slot-label">${meaning}</span>
            <div class="qs-slot-drop" dir="rtl">${chip}</div>
          </div>
        `
      })
      .join('')

    const poolChips = pool
      .map(i => `<button class="qs-game-chip" data-from="pool" data-idx="${i}">${round.words[i]}</button>`)
      .join('')

    container.innerHTML = `
      <div class="qs-game-page">
        <div class="qs-header">
          <button class="btn-back">← Back</button>
          <span class="qs-deck-title">${bd!.surahName} · Ayat ${round.ayah}${round.part ? ` · Part ${round.part.index}/${round.part.count}` : ''}</span>
          <span class="qs-range">${currentIndex + 1} / ${total}</span>
        </div>

        <p class="qs-game-label">Drop each Arabic word onto its meaning</p>

        <div class="qs-slots" dir="rtl">${slotEls}</div>

        <div class="qs-game-pool" dir="rtl">
          ${poolChips || '<span class="qs-game-placeholder">All words placed — tap Check</span>'}
        </div>

        ${checked ? `
          <div class="qs-game-feedback">
            ${skipped
              ? `<p class="qs-game-result-bad">Skipped. Correct order:</p>
                 <p class="qs-game-correct" dir="rtl">${round.arabic}</p>`
              : isRoundCorrect()
              ? '<p class="qs-game-result-ok">✔ Correct!</p>'
              : `<p class="qs-game-result-bad">✗ Not quite. Correct order:</p>
                 <p class="qs-game-correct" dir="rtl">${round.arabic}</p>`}
          </div>
          <button class="btn-quiz-next" id="btn-next">${isLast ? 'Show Results' : 'Next Verse →'}</button>
        ` : `
          <div class="qs-game-actions">
            <button class="btn-quiz-next" id="btn-check" ${pool.length === 0 ? '' : 'disabled'}>Check</button>
            <button class="btn-quiz-skip" id="btn-skip">Skip</button>
          </div>
        `}
      </div>
    `

    container.querySelector('.btn-back')!.addEventListener('click', () => {
      window.location.hash = `qs/${id}`
    })

    if (!checked) {
      const poolEl = container.querySelector<HTMLElement>('.qs-game-pool')!
      const slotDoms = [...container.querySelectorAll<HTMLElement>('.qs-slot')]

      // Tap places a pooled word into the first empty slot (or returns a placed
      // word to the pool); press-and-drag drops it onto a specific slot. Nothing
      // reflows during the drag — the layout only changes on drop.
      const wireChip = (chip: HTMLButtonElement, from: 'pool' | 'slot') => {
        chip.addEventListener('pointerdown', e => {
          if (e.button !== 0 && e.pointerType === 'mouse') return
          e.preventDefault()
          const idx = Number(chip.dataset.idx)
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

          const onUp = (ev: PointerEvent) => {
            document.removeEventListener('pointermove', onMove)
            document.removeEventListener('pointerup', onUp)
            clone?.remove()
            chip.classList.remove('chip-drag-source')

            if (!dragging) {
              // Plain tap → place into first empty slot, or return to the pool.
              if (from === 'pool') {
                const empty = slots.indexOf(null)
                if (empty !== -1) { removeWord(idx); slots[empty] = idx }
              } else {
                removeWord(idx); pool.push(idx)
              }
              renderRound()
              return
            }

            // Drop onto a slot → place there, bumping any occupant back to pool.
            // Drop onto the pool area → return to pool. Elsewhere → no change.
            const targetSlot = slotDoms.findIndex(el => within(el, ev.clientX, ev.clientY))
            if (targetSlot !== -1) {
              const occupant = slots[targetSlot]
              removeWord(idx)
              if (occupant !== null && occupant !== idx) pool.push(occupant)
              slots[targetSlot] = idx
            } else if (within(poolEl, ev.clientX, ev.clientY)) {
              removeWord(idx); pool.push(idx)
            }
            renderRound()
          }

          document.addEventListener('pointermove', onMove)
          document.addEventListener('pointerup', onUp)
        })
      }

      container.querySelectorAll<HTMLButtonElement>('.qs-game-chip').forEach(c =>
        wireChip(c, c.dataset.from === 'slot' ? 'slot' : 'pool'))

      container.querySelector('#btn-check')?.addEventListener('click', () => {
        checked = true
        if (isRoundCorrect()) score++
        renderRound()
      })

      container.querySelector('#btn-skip')?.addEventListener('click', () => {
        skipped = true
        checked = true
        renderRound()
      })
    } else {
      container.querySelector('#btn-next')!.addEventListener('click', () => {
        if (currentIndex < rounds.length - 1) {
          currentIndex++
          startRound()
        } else {
          // A single-ayah run must not overwrite the passage's score chip.
          if (ayah === undefined) saveScore(id, score, rounds.length)
          renderResult()
        }
      })
    }
  }

  function isRoundCorrect(): boolean {
    const round = rounds[currentIndex]
    if (slots.some(s => s === null)) return false
    return slots.every((_, pos) => slotCorrect(round, pos))
  }

  function renderResult() {
    const total = rounds.length
    container.innerHTML = `
      <div class="qs-game-page">
        <div class="qs-header">
          <button class="btn-back">← Back</button>
          <span class="qs-deck-title">${bd!.surahName} · ${ayah !== undefined ? `Ayat ${ayah}` : `Ayat ${bd!.from}–${bd!.to}`}</span>
        </div>

        <div class="quiz-result">
          <div class="quiz-result-score">${score} / ${total}</div>
          <p class="quiz-result-label">${score === total ? 'Perfect!' : score >= total * 0.7 ? 'Well done!' : 'Keep practicing!'}</p>
          <div class="quiz-result-actions">
            <button class="btn-quiz-retry">Play Again</button>
            <button class="btn-quiz-back">← Back to Reader</button>
          </div>
        </div>
      </div>
    `

    container.querySelector('.btn-back')!.addEventListener('click', () => {
      window.location.hash = `qs/${id}`
    })
    container.querySelector('.btn-quiz-retry')!.addEventListener('click', () => {
      renderQsGame(container, id, ayah)
    })
    container.querySelector('.btn-quiz-back')!.addEventListener('click', () => {
      window.location.hash = `qs/${id}`
    })
  }

  startRound()
}
