import { deckMetas } from '../data/flashcards'

function getQuizScore(deckId: string): string | null {
  return localStorage.getItem(`quiz_score_${deckId}`)
}

function getLastVisited(deckId: string): number {
  return Number(localStorage.getItem(`last_visited_${deckId}`) ?? 0)
}

export function renderNavigation(container: HTMLElement) {
  const sorted = [...deckMetas].sort((a, b) => getLastVisited(b.id) - getLastVisited(a.id))

  container.innerHTML = `
    <div class="nav-page">
      <div class="nav-hero">
        <h2>Choose a Deck</h2>
        <p class="nav-subtitle">Select a category to start studying</p>
      </div>
      <div class="deck-grid">
        ${sorted.map(deck => {
          const score = getQuizScore(deck.id)
          return `
          <div class="deck-card">
            <button class="deck-card-study" data-deck-id="${deck.id}" aria-label="Study ${deck.title}">
              ${score !== null ? `<span class="deck-score-chip">${score}</span>` : ''}
              <span class="deck-emoji">${deck.emoji}</span>
              <h3 class="deck-title">${deck.title}</h3>
              <p class="deck-desc">${deck.description}</p>
            </button>
            <div class="deck-card-footer">
              <span class="deck-count">${deck.cardCount} cards</span>
              <button class="btn-quiz" data-quiz-id="${deck.id}" aria-label="Take quiz for ${deck.title}">Quiz →</button>
            </div>
          </div>
        `}).join('')}
      </div>
    </div>
  `

  container.querySelectorAll<HTMLButtonElement>('.deck-card-study').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.deckId!
      window.location.hash = `deck/${id}`
    })
  })

  container.querySelectorAll<HTMLButtonElement>('.btn-quiz').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.quizId!
      window.location.hash = `deck/${id}/quiz`
    })
  })
}
