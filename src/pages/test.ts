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
  '1-10':  { key: 'test_score_1_10',  title: 'Exam 1', range: [1, 10] },
  '11-20': { key: 'test_score_11_20', title: 'Exam 2', range: [11, 20] },
  '21-30': { key: 'test_score_21_30', title: 'Exam 3', range: [21, 30] },
  '31-40': { key: 'test_score_31_40', title: 'Exam 4', range: [31, 40] },
  '41-50': { key: 'test_score_41_50', title: 'Exam 5', range: [41, 50] },
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
  ayatArabic?: string
  ayatRef?: string
  ayatTranslation?: string
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
    ayatArabic: card.quranExample?.arabic,
    ayatRef: card.quranExample ? `${card.quranExample.surah} ${card.quranExample.ayah}` : undefined,
    ayatTranslation: card.quranExample?.translation,
  }
}

function buildTestQuestions(cards: Card[], size: number): Question[] {
  return pickRandom(cards, Math.min(size, cards.length))
    .map(c => generateWordQuestion(c, cards))
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
          <div class="quiz-prompt">
            ${q.ayatArabic ? `<button class="btn-quiz-hint" id="btn-hint">💡 Hint</button>` : ''}
            <span class="quiz-word">${q.prompt}</span>
            ${q.ayatArabic ? `
              <div class="quiz-ayat">
                <span class="quiz-ayat-arabic">${q.ayatArabic}</span>
                <span class="quiz-ayat-ref">${q.ayatRef}</span>
                <span class="quiz-ayat-translation" id="ayat-translation" style="display:none">${q.ayatTranslation}</span>
              </div>` : ''}
          </div>

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

    const revealAyat = () => {
      const translation = container.querySelector<HTMLElement>('#ayat-translation')
      if (translation) translation.style.display = 'block'
      const hint = container.querySelector<HTMLElement>('#btn-hint')
      if (hint) hint.style.display = 'none'
    }

    container.querySelector('#btn-hint')?.addEventListener('click', revealAyat)

    container.querySelectorAll<HTMLButtonElement>('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return
        answered = true
        revealAyat()

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
