import { loadBreakdown } from '../data/qs-breakdown'
import type { QsVerse } from '../types'

// A verse is playable only if it has enough words to make ordering meaningful.
const MIN_WORDS = 2

interface Round {
  ayah: number
  translation: string
  // Correct Arabic sequence for this round, in order.
  words: string[]
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

// Work out where a dropped word should land: which list, and the insertion index
// within it. The word being dragged is excluded from the calculation. RTL + wrap
// aware — a chip counts as "before" the pointer if it sits on an earlier row, or
// on the same row further to the right (reading order).
function resolveDrop(
  x: number, y: number,
  dragged: HTMLElement,
  poolEl: HTMLElement, answerEl: HTMLElement,
  fallback: 'pool' | 'answer',
): { list: 'pool' | 'answer'; index: number } {
  const within = (el: HTMLElement, pad = 24) => {
    const r = el.getBoundingClientRect()
    return x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad
  }
  const list = within(answerEl) ? 'answer' : within(poolEl) ? 'pool' : fallback
  const el = list === 'answer' ? answerEl : poolEl
  const chips = [...el.querySelectorAll<HTMLElement>('.qs-game-chip')].filter(c => c !== dragged)

  let index = 0
  for (const c of chips) {
    const r = c.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const sameRow = Math.abs(cy - y) < r.height * 0.6
    const earlierRow = cy < y - r.height * 0.6
    if (earlierRow || (sameRow && cx > x)) index++
  }
  return { list, index }
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
          arabic: slice.map(w => w.arabic).join(' '),
          part: { index: i + 1, count },
        })
      })
    } else {
      rounds.push({
        ayah: v.ayah,
        translation: v.literalTranslation ?? v.translation,
        words: v.words.map(w => w.arabic),
        arabic: v.arabic,
      })
    }
  }
  return rounds
}

function saveScore(id: string, score: number, total: number) {
  localStorage.setItem(`qs_score_${id}`, `${score}/${total}`)
}

export async function renderQsGame(container: HTMLElement, id: string) {
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

  const rounds = buildRounds(bd.verses)

  if (rounds.length === 0) {
    container.innerHTML = `
      <div class="error-page">
        <p>Not enough words in this passage to play.</p>
        <button class="btn-back" onclick="window.location.hash='qs/${id}'">← Back to Reader</button>
      </div>
    `
    return
  }

  let currentIndex = 0
  let score = 0
  // Original word indices still available in the pool.
  let pool: number[] = []
  // Original word indices placed in the answer row, in order.
  let answer: number[] = []
  let checked = false
  let skipped = false

  function startRound() {
    const round = rounds[currentIndex]
    pool = shuffle(round.words.map((_, i) => i))
    answer = []
    checked = false
    skipped = false
    renderRound()
  }

  function renderRound() {
    const round = rounds[currentIndex]
    const total = rounds.length
    const isLast = currentIndex === total - 1

    const poolChips = pool
      .map(i => `<button class="qs-game-chip" data-from="pool" data-idx="${i}">${round.words[i]}</button>`)
      .join('')

    const answerChips = answer
      .map((i, pos) => {
        let cls = 'qs-game-chip'
        if (checked && !skipped) cls += round.words[i] === round.words[pos] ? ' chip-correct' : ' chip-wrong'
        return `<button class="${cls}" data-from="answer" data-idx="${i}">${round.words[i]}</button>`
      })
      .join('')

    container.innerHTML = `
      <div class="qs-game-page">
        <div class="qs-header">
          <button class="btn-back">← Back</button>
          <span class="qs-deck-title">${bd!.surahName} · Ayat ${round.ayah}${round.part ? ` · Part ${round.part.index}/${round.part.count}` : ''}</span>
          <span class="qs-range">${currentIndex + 1} / ${total}</span>
        </div>

        <p class="qs-game-label">Arrange the Arabic to match this translation</p>
        <p class="qs-game-translation">${round.translation}</p>

        <div class="qs-game-answer${checked && !skipped ? (isRoundCorrect() ? ' correct' : ' wrong') : ''}" dir="rtl">
          ${answerChips || '<span class="qs-game-placeholder">Tap words below to build the verse</span>'}
        </div>

        <div class="qs-game-pool" dir="rtl">${poolChips}</div>

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
            <button class="btn-quiz-next" id="btn-check" ${answer.length > 0 ? '' : 'disabled'}>Check</button>
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
      const answerEl = container.querySelector<HTMLElement>('.qs-game-answer')!

      // Tap toggles a word between pool and answer; press-and-drag drops it at a
      // precise spot. Nothing reflows during the drag (no live "shadow" swap that
      // would flicker on this wrapping RTL row) — the list only changes on drop.
      const wireChip = (chip: HTMLButtonElement, from: 'pool' | 'answer') => {
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
              // Plain tap → toggle between lists.
              if (from === 'pool') { pool = pool.filter(i => i !== idx); answer.push(idx) }
              else { answer = answer.filter(i => i !== idx); pool.push(idx) }
              renderRound()
              return
            }

            const drop = resolveDrop(ev.clientX, ev.clientY, chip, poolEl, answerEl, from)
            // Remove the word from wherever it was, then insert it at the drop slot.
            pool = pool.filter(i => i !== idx)
            answer = answer.filter(i => i !== idx)
            if (drop.list === 'answer') answer.splice(drop.index, 0, idx)
            else pool.splice(drop.index, 0, idx)
            renderRound()
          }

          document.addEventListener('pointermove', onMove)
          document.addEventListener('pointerup', onUp)
        })
      }

      poolEl.querySelectorAll<HTMLButtonElement>('.qs-game-chip').forEach(c => wireChip(c, 'pool'))
      answerEl.querySelectorAll<HTMLButtonElement>('.qs-game-chip').forEach(c => wireChip(c, 'answer'))

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
          saveScore(id, score, rounds.length)
          renderResult()
        }
      })
    }
  }

  function isRoundCorrect(): boolean {
    const round = rounds[currentIndex]
    if (answer.length !== round.words.length) return false
    return answer.every((wordIdx, pos) => round.words[wordIdx] === round.words[pos])
  }

  function renderResult() {
    const total = rounds.length
    container.innerHTML = `
      <div class="qs-game-page">
        <div class="qs-header">
          <button class="btn-back">← Back</button>
          <span class="qs-deck-title">${bd!.surahName} · Ayat ${bd!.from}–${bd!.to}</span>
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
      renderQsGame(container, id)
    })
    container.querySelector('.btn-quiz-back')!.addEventListener('click', () => {
      window.location.hash = `qs/${id}`
    })
  }

  startRound()
}
