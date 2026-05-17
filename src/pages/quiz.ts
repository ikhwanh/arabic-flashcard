import { loadDeck } from '../data/flashcards'
import type { Card } from '../types'

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
  const distractorPool = allCards.filter(c => c.id !== card.id)
  const distractors = pickRandom(distractorPool, 3).map(c => c.indonesian)
  return {
    prompt: card.arabic,
    promptLabel: 'What does this word mean?',
    correct: card.indonesian,
    options: shuffle([card.indonesian, ...distractors]),
  }
}

function generateAyatQuestion(card: Card, ayatCards: Card[]): Question {
  const distractorPool = ayatCards.filter(c => c.id !== card.id)
  const distractors = pickRandom(distractorPool, 3).map(c => c.quranExample!.translation)
  return {
    prompt: `${card.quranExample!.arabic}\n<span class="quiz-prompt-ref">${card.quranExample!.surah} ${card.quranExample!.ayah}</span>`,
    promptLabel: 'What is the translation of this verse?',
    correct: card.quranExample!.translation,
    options: shuffle([card.quranExample!.translation, ...distractors]),
  }
}

function buildQuestions(cards: Card[]): Question[] {
  if (cards.length < 4) return []

  const wordCards = pickRandom(cards, Math.min(10, cards.length))
  const wordQuestions = wordCards.map(c => generateWordQuestion(c, cards))

  const ayatCards = cards.filter(c => c.quranExample)
  const ayatQuestions = ayatCards.length >= 4
    ? pickRandom(ayatCards, Math.min(5, ayatCards.length)).map(c => generateAyatQuestion(c, ayatCards))
    : []

  return shuffle([...wordQuestions, ...ayatQuestions])
}

function saveScore(deckId: string, score: number, total: number) {
  localStorage.setItem(`quiz_score_${deckId}`, `${score}/${total}`)
}

export async function renderQuiz(container: HTMLElement, deckId: string) {
  container.innerHTML = `<div class="fc-loading">Loading…</div>`

  const deck = await loadDeck(deckId)

  if (!deck) {
    container.innerHTML = `
      <div class="error-page">
        <p>Deck not found.</p>
        <button class="btn-back" onclick="window.location.hash=''">← Back</button>
      </div>
    `
    return
  }

  const questions = buildQuestions(deck.cards)

  if (questions.length === 0) {
    container.innerHTML = `
      <div class="error-page">
        <p>Not enough cards to generate a quiz (minimum 4).</p>
        <button class="btn-back" onclick="window.location.hash='deck/${deckId}'">← Back to Deck</button>
      </div>
    `
    return
  }

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
          <span class="fc-deck-title">${deck!.emoji} ${deck!.title}</span>
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
            ${isLast ? 'Show Results' : 'Next Question →'}
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
        saveScore(deckId, score, questions.length)
        renderResult()
      }
    })
  }

  function renderResult() {
    const total = questions.length
    container.innerHTML = `
      <div class="quiz-page">
        <div class="fc-header">
          <button class="btn-back">← Back</button>
          <span class="fc-deck-title">${deck!.emoji} ${deck!.title}</span>
        </div>

        <div class="quiz-result">
          <div class="quiz-result-score">${score} / ${total}</div>
          <p class="quiz-result-label">${score === total ? 'Perfect!' : score >= total * 0.7 ? 'Well done!' : 'Keep practicing!'}</p>
          <div class="quiz-result-actions">
            <button class="btn-quiz-retry">Retry Quiz</button>
            <button class="btn-quiz-back">← Back</button>
          </div>
        </div>
      </div>
    `

    container.querySelector('.btn-back')!.addEventListener('click', () => {
      window.location.hash = ''
    })

    container.querySelector('.btn-quiz-retry')!.addEventListener('click', () => {
      renderQuiz(container, deckId)
    })

    container.querySelector('.btn-quiz-back')!.addEventListener('click', () => {
      window.location.hash = ''
    })
  }

  renderQuestion()
}
