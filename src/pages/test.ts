import { loadAllCards } from '../data/flashcards'
import type { Card } from '../types'

const DEFAULT_TEST_SIZE = 50

export interface ExamConfig {
  key: string
  title: string
  range?: [number, number]
  size?: number
}

const EXAMS: Record<string, ExamConfig> = {
  '1-15':  { key: 'test_score_1_15',  title: 'Exam 1', range: [1, 15] },
  '16-30': { key: 'test_score_16_30', title: 'Exam 2', range: [16, 30] },
  all:     { key: 'test_score',       title: 'Final Exam', size: 100 },
}

function resolveExam(slug?: string): ExamConfig {
  return (slug && EXAMS[slug]) || EXAMS.all
}

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
    promptLabel: 'What does this word mean?',
    correct: card.indonesian,
    options: shuffle([card.indonesian, ...distractors]),
  }
}

function generateAyatQuestion(card: Card, ayatCards: Card[]): Question {
  const distractors = pickRandom(ayatCards.filter(c => c.id !== card.id), 3).map(c => c.quranExample!.translation)
  return {
    prompt: `${card.quranExample!.arabic}\n<span class="quiz-prompt-ref">${card.quranExample!.surah} ${card.quranExample!.ayah}</span>`,
    promptLabel: 'What is the translation of this verse?',
    correct: card.quranExample!.translation,
    options: shuffle([card.quranExample!.translation, ...distractors]),
  }
}

function buildTestQuestions(cards: Card[], size: number): Question[] {
  const ayatCards = cards.filter(c => c.quranExample)

  const ayatCap = Math.round(size * 0.3)
  const ayatCount = ayatCards.length >= 4 ? Math.min(ayatCap, ayatCards.length) : 0
  const wordCount = size - ayatCount

  const wordQuestions = pickRandom(cards, Math.min(wordCount, cards.length))
    .map(c => generateWordQuestion(c, cards))

  const ayatQuestions = ayatCount > 0
    ? pickRandom(ayatCards, ayatCount).map(c => generateAyatQuestion(c, ayatCards))
    : []

  return shuffle([...wordQuestions, ...ayatQuestions])
}

function saveScore(key: string, score: number, total: number) {
  localStorage.setItem(key, `${score}/${total}`)
}

export async function renderTest(container: HTMLElement, slug?: string) {
  const exam = resolveExam(slug)
  container.innerHTML = `<div class="fc-loading">Loading test…</div>`

  const cards = await loadAllCards(exam.range)

  if (cards.length < 4) {
    container.innerHTML = `
      <div class="error-page">
        <p>Not enough cards to generate a test.</p>
        <button class="btn-back" onclick="window.location.hash=''">← Back</button>
      </div>
    `
    return
  }

  const questions = buildTestQuestions(cards, exam.size ?? DEFAULT_TEST_SIZE)
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
          <span class="fc-deck-title">${exam.title}</span>
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
            ${isLast ? 'See Results' : 'Next Question →'}
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
        saveScore(exam.key, score, questions.length)
        renderResult()
      }
    })
  }

  function renderResult() {
    const total = questions.length
    const pct = Math.round((score / total) * 100)
    const label = score === total ? 'Perfect!' : pct >= 70 ? 'Great job!' : 'Keep practicing!'

    container.innerHTML = `
      <div class="quiz-page">
        <div class="fc-header">
          <button class="btn-back">← Back</button>
          <span class="fc-deck-title">${exam.title}</span>
        </div>

        <div class="quiz-result">
          <div class="quiz-result-score">${score} / ${total}</div>
          <p class="quiz-result-label">${label}</p>
          <div class="quiz-result-actions">
            <button class="btn-quiz-retry">Retry Test</button>
            <button class="btn-quiz-back">← Back</button>
          </div>
        </div>
      </div>
    `

    container.querySelector('.btn-back')!.addEventListener('click', () => {
      window.location.hash = ''
    })

    container.querySelector('.btn-quiz-retry')!.addEventListener('click', () => {
      renderTest(container, slug)
    })

    container.querySelector('.btn-quiz-back')!.addEventListener('click', () => {
      window.location.hash = ''
    })
  }

  renderQuestion()
}
