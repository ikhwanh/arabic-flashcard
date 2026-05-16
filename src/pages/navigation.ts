import { deckMetas } from '../data/flashcards'

export function renderNavigation(container: HTMLElement) {
  container.innerHTML = `
    <div class="nav-page">
      <div class="nav-hero">
        <h2>Choose a Deck</h2>
        <p class="nav-subtitle">Select a category to start studying</p>
      </div>
      <div class="deck-grid">
        ${deckMetas.map(deck => `
          <button class="deck-card" data-deck-id="${deck.id}" aria-label="Study ${deck.title}">
            <span class="deck-emoji">${deck.emoji}</span>
            <h3 class="deck-title">${deck.title}</h3>
            <p class="deck-desc">${deck.description}</p>
            <span class="deck-count">${deck.cardCount} cards</span>
          </button>
        `).join('')}
      </div>
    </div>
  `

  container.querySelectorAll<HTMLButtonElement>('.deck-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.deckId!
      window.location.hash = `deck/${id}`
    })
  })
}
