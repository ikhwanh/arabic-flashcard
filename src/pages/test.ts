import { loadAllCards } from '../data/flashcards'
import type { Card } from '../types'

const TEST_SIZE = 50
const TEST_SCORE_KEY = 'test_score'

interface Question {
  prompt: string
  promptLabel: string
  correct: string
  options: string[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRandom<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count)
}

function generateWordQuestion(card: Card, allCards: Card[]): Question {
  const distractors = pickRandom(allCards.filter(c => c.id !== card.id), 3).map(c => c.indonesian)
  return {
    prompt: card.arabic,
    promptLabel: 'Apa arti kata ini?',
    correct: card.indonesian,
    options: shuffle([card.indonesian, ...distractors]),
  }
}

function generateAyatQuestion(card: Card, ayatCards: Card[]): Question {
  const distractors = pickRandom(ayatCards.filter(c => c.id !== card.id), 3).map(c => c.quranExample!.translation)
  return {
    prompt: `${card.quranExample!.arabic}\n<span class="quiz-prompt-ref">${card.quranExample!.surah} ${card.quranExample!.ayah}</span>`,
    promptLabel: 'Apa terjemahan ayat ini?',
    correct: card.quranExample!.translation,
    options: shuffle([card.quranExample!.translation, ...distractors]),
  }
}

function buildTestQuestions(cards: Card[]): Question[] {
  const ayatCards = cards.filter(c => c.quranExample)

  const ayatCount = ayatCards.length >= 4 ? Math.min(15, ayatCards.length) : 0
  const wordCount = TEST_SIZE - ayatCount

  const wordQuestions = pickRandom(cards, Math.min(wordCount, cards.length))
    .map(c => generateWordQuestion(c, cards))

  const ayatQuestions = ayatCount > 0
    ? pickRandom(ayatCards, ayatCount).map(c => generateAyatQuestion(c, ayatCards))
    : []

  return shuffle([...wordQuestions, ...ayatQuestions])
}

function saveScore(score: number, total: number) {
  localStorage.setItem(TEST_SCORE_KEY, `${score}/${total}`)
}

export async function renderTest(container: HTMLElement) {
  container.innerHTML = `<div class="fc-loading">Loading test…</div>`

  const cards = await loadAllCards()

  if (cards.length < 4) {
    container.innerHTML = `
      <div class="error-page">
        <p>Not enough cards to generate a test.</p>
        <button class="btn-back" onclick="window.location.hash=''">← Back</button>
      </div>
    `
    return
  }

  const questions = buildTestQuestions(cards)
  let currentIndex = 0
  let score = 0
  let answered = false

  function renderQuestion() {
    const q = questions[currentIndex]
    const total = questions.length
    const isLast = currentIndex === total - 1

    container.innerHTML = `
      <div class="quiz-page">
        <div class="fc-header">
          <button class="btn-back">← Back</button>
          <span class="fc-deck-title">Exam</span>
          <span class="fc-progress">${currentIndex + 1} / ${total}</span>
        </div>

        <div class="quiz-body">
          <p class="quiz-label">${q.promptLabel}</p>
          <div class="quiz-prompt">${q.prompt.replace(/\n/g, '<br>')}</div>

          <div class="quiz-options">
            ${q.options.map(opt => `
              <button class="quiz-option" data-value="${encodeURIComponent(opt)}">${opt}</button>
            `).join('')}
          </div>

          <button class="btn-quiz-next" id="btn-next" style="display:none">
            ${isLast ? 'Lihat Hasil' : 'Soal Berikutnya →'}
          </button>
        </div>
      </div>
    `

    container.querySelector('.btn-back')!.addEventListener('click', () => {
      window.location.hash = ''
    })

    container.querySelectorAll<HTMLButtonElement>('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return
        answered = true

        const chosen = decodeURIComponent(btn.dataset.value!)
        const isCorrect = chosen === q.correct

        if (isCorrect) {
          score++
          btn.classList.add('correct')
        } else {
          btn.classList.add('wrong')
          container.querySelectorAll<HTMLButtonElement>('.quiz-option').forEach(b => {
            if (decodeURIComponent(b.dataset.value!) === q.correct) b.classList.add('correct')
          })
        }

        container.querySelectorAll<HTMLButtonElement>('.quiz-option').forEach(b => b.disabled = true)
        container.querySelector<HTMLButtonElement>('#btn-next')!.style.display = 'block'
      })
    })

    container.querySelector('#btn-next')!.addEventListener('click', () => {
      if (currentIndex < questions.length - 1) {
        currentIndex++
        answered = false
        renderQuestion()
      } else {
        saveScore(score, questions.length)
        renderResult()
      }
    })
  }

  function renderResult() {
    const total = questions.length
    const pct = Math.round((score / total) * 100)
    const label = score === total ? 'Sempurna!' : pct >= 70 ? 'Bagus sekali!' : 'Terus berlatih!'

    container.innerHTML = `
      <div class="quiz-page">
        <div class="fc-header">
          <button class="btn-back">← Back</button>
          <span class="fc-deck-title">Exam</span>
        </div>

        <div class="quiz-result">
          <div class="quiz-result-score">${score} / ${total}</div>
          <p class="quiz-result-label">${label}</p>
          <div class="quiz-result-actions">
            <button class="btn-quiz-retry">Ulangi Test</button>
            <button class="btn-quiz-back">← Kembali</button>
          </div>
        </div>
      </div>
    `

    container.querySelector('.btn-back')!.addEventListener('click', () => {
      window.location.hash = ''
    })

    container.querySelector('.btn-quiz-retry')!.addEventListener('click', () => {
      renderTest(container)
    })

    container.querySelector('.btn-quiz-back')!.addEventListener('click', () => {
      window.location.hash = ''
    })
  }

  renderQuestion()
}
