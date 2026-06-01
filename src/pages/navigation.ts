import { deckMetas } from '../data/flashcards'

function getQuizScore(deckId: string): string | null {
  return localStorage.getItem(`quiz_score_${deckId}`)
}

function getLastVisited(deckId: string): number {
  return Number(localStorage.getItem(`last_visited_${deckId}`) ?? 0)
}

function resetAll() {
  deckMetas.forEach(d => {
    localStorage.removeItem(`quiz_score_${d.id}`)
    localStorage.removeItem(`last_visited_${d.id}`)
  })
}

function showConfirm(title: string, message: string, onConfirm: () => void) {
  const overlay = document.createElement('div')
  overlay.className = 'confirm-overlay'
  overlay.innerHTML = `
    <div class="confirm-dialog">
      <p class="confirm-title">${title}</p>
      <p class="confirm-message">${message}</p>
      <div class="confirm-actions">
        <button class="confirm-cancel">Cancel</button>
        <button class="confirm-ok">Reset</button>
      </div>
    </div>
  `

  const close = () => document.body.removeChild(overlay)

  overlay.querySelector('.confirm-cancel')!.addEventListener('click', close)
  overlay.querySelector('.confirm-ok')!.addEventListener('click', () => { close(); onConfirm() })
  overlay.addEventListener('click', e => { if (e.target === overlay) close() })

  document.body.appendChild(overlay)
  ;(overlay.querySelector('.confirm-cancel') as HTMLButtonElement).focus()
}

function hasAnyProgress(): boolean {
  return deckMetas.some(d => getQuizScore(d.id) !== null || getLastVisited(d.id) > 0)
}

function renderDeckGrid(container: HTMLElement, filterUnfinished: boolean) {
  const sorted = [...deckMetas].sort((a, b) => getLastVisited(b.id) - getLastVisited(a.id))
  const visible = filterUnfinished ? sorted.filter(d => getQuizScore(d.id) === null) : sorted

  const grid = container.querySelector<HTMLElement>('.deck-grid')!
  grid.innerHTML = visible.length === 0
    ? `<p class="nav-empty">All decks have been quizzed. Well done!</p>`
    : visible.map(deck => {
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
      `
      }).join('')

  grid.querySelectorAll<HTMLButtonElement>('.deck-card-study').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = `deck/${btn.dataset.deckId!}`
    })
  })

  grid.querySelectorAll<HTMLButtonElement>('.btn-quiz').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = `deck/${btn.dataset.quizId!}/quiz`
    })
  })

}

function syncResetAllButton(container: HTMLElement) {
  const btn = container.querySelector<HTMLButtonElement>('.btn-reset-all')
  if (btn) btn.disabled = !hasAnyProgress()
}

export function renderNavigation(container: HTMLElement) {
  let filterUnfinished = false

  container.innerHTML = `
    <div class="nav-page">
      <div class="nav-hero">
        <h2>Choose a Deck</h2>
        <p class="nav-subtitle">Select a category to start studying</p>
      </div>
      <div class="nav-toolbar">
        <div class="nav-filters">
          <button class="nav-filter-chip" data-filter="unfinished">Unfinished</button>
        </div>
        <div class="nav-toolbar-right">
          <button class="btn-start-test">Take Exam</button>
          <button class="btn-reset-all" ${hasAnyProgress() ? '' : 'disabled'}>Reset all progress</button>
        </div>
      </div>
      <div class="deck-grid"></div>
    </div>
  `

  renderDeckGrid(container, filterUnfinished)

  container.querySelector<HTMLButtonElement>('.btn-start-test')!.addEventListener('click', () => {
    window.location.hash = 'test'
  })

  container.querySelector<HTMLButtonElement>('[data-filter="unfinished"]')!.addEventListener('click', e => {
    const btn = e.currentTarget as HTMLButtonElement
    filterUnfinished = !filterUnfinished
    btn.classList.toggle('active', filterUnfinished)
    renderDeckGrid(container, filterUnfinished)
  })

  container.querySelector<HTMLButtonElement>('.btn-reset-all')!.addEventListener('click', () => {
    showConfirm('Reset all progress?', 'This will clear all quiz scores and visit history.', () => {
      resetAll()
      filterUnfinished = false
      const chip = container.querySelector<HTMLButtonElement>('[data-filter="unfinished"]')!
      chip.classList.remove('active')
      syncResetAllButton(container)
      renderDeckGrid(container, filterUnfinished)
    })
  })
}
