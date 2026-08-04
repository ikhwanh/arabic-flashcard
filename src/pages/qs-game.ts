import { loadBreakdown } from '../data/qs-breakdown'
import type { QsVerse } from '../types'

// A verse is playable only if it has enough words to make ordering meaningful.
const MIN_WORDS = 2

interface Round {
  ayah: number
  translation: string
  // Correct Arabic sequence for the whole verse, in order.
  words: string[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildRounds(verses: QsVerse[]): Round[] {
  return verses
    .filter(v => v.words.length >= MIN_WORDS)
    .map(v => ({
      ayah: v.ayah,
      translation: v.translation,
      words: v.words.map(w => w.arabic),
    }))
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

  function startRound() {
    const round = rounds[currentIndex]
    pool = shuffle(round.words.map((_, i) => i))
    answer = []
    checked = false
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
      .map(i => `<button class="qs-game-chip" data-from="answer" data-idx="${i}">${round.words[i]}</button>`)
      .join('')

    container.innerHTML = `
      <div class="qs-game-page">
        <div class="qs-header">
          <button class="btn-back">← Back</button>
          <span class="qs-deck-title">${bd!.surahName} · Ayat ${round.ayah}</span>
          <span class="qs-range">${currentIndex + 1} / ${total}</span>
        </div>

        <p class="qs-game-label">Arrange the Arabic to match this translation</p>
        <p class="qs-game-translation">${round.translation}</p>

        <div class="qs-game-answer${checked ? (isRoundCorrect() ? ' correct' : ' wrong') : ''}" dir="rtl">
          ${answerChips || '<span class="qs-game-placeholder">Tap words below to build the verse</span>'}
        </div>

        <div class="qs-game-pool" dir="rtl">${poolChips}</div>

        ${checked ? `
          <div class="qs-game-feedback">
            ${isRoundCorrect()
              ? '<p class="qs-game-result-ok">✔ Correct!</p>'
              : `<p class="qs-game-result-bad">✗ Not quite. Correct order:</p>
                 <p class="qs-game-correct" dir="rtl">${round.words.join(' ')}</p>`}
          </div>
          <button class="btn-quiz-next" id="btn-next">${isLast ? 'Show Results' : 'Next Verse →'}</button>
        ` : `
          <button class="btn-quiz-next" id="btn-check" ${answer.length === round.words.length ? '' : 'disabled'}>Check</button>
        `}
      </div>
    `

    container.querySelector('.btn-back')!.addEventListener('click', () => {
      window.location.hash = `qs/${id}`
    })

    if (!checked) {
      container.querySelectorAll<HTMLButtonElement>('.qs-game-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const idx = Number(chip.dataset.idx)
          if (chip.dataset.from === 'pool') {
            pool = pool.filter(i => i !== idx)
            answer.push(idx)
          } else {
            answer = answer.filter(i => i !== idx)
            pool.push(idx)
          }
          renderRound()
        })
      })

      container.querySelector('#btn-check')?.addEventListener('click', () => {
        checked = true
        if (isRoundCorrect()) score++
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
