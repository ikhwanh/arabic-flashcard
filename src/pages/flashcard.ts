import { loadDeck } from '../data/flashcards'
import type { Card } from '../types'

export async function renderFlashcard(container: HTMLElement, deckId: string) {
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

  let currentIndex = 0
  let isFlipped = false

  function render() {
    const card: Card = deck!.cards[currentIndex]
    const total = deck!.cards.length

    container.innerHTML = `
      <div class="fc-page">
        <div class="fc-header">
          <button class="btn-back">← Back</button>
          <span class="fc-deck-title">${deck!.emoji} ${deck!.title}</span>
          <span class="fc-progress">${currentIndex + 1} / ${total}</span>
        </div>

        <div class="fc-area">
          <div class="fc-card ${isFlipped ? 'flipped' : ''}" id="fc-card" role="button" tabindex="0" aria-label="Flip card">
            <div class="fc-face fc-front">
              <span class="fc-arabic">${card.arabic}</span>
            </div>
            <div class="fc-face fc-back">
              ${card.wordType ? `<span class="fc-badge">${card.wordType}</span>` : ''}
              <span class="fc-transliteration">${card.transliteration}</span>
              <span class="fc-english">${card.indonesian}</span>
              ${card.root ? `<span class="fc-root">Root: ${card.root}</span>` : ''}
              ${card.forms ? `
                <div class="fc-forms">
                  ${Object.entries(card.forms)
                    .filter(([, v]) => v)
                    .map(([k, v]) => `<span class="fc-form"><em>${k}</em> ${v}</span>`)
                    .join('')}
                </div>` : ''}
              ${card.relatedWords?.length ? `
                <div class="fc-related">
                  <span class="fc-related-label">Related</span>
                  ${card.relatedWords.map(w => `
                    <span class="fc-related-word"><span class="fc-related-arabic">${w.arabic}</span> — ${w.translation}</span>
                  `).join('')}
                </div>` : ''}
              ${card.quranExample ? `
                <div class="fc-quran">
                  <span class="fc-quran-arabic">${card.quranExample.arabic}</span>
                  <span class="fc-quran-translation">${card.quranExample.translation}</span>
                  <span class="fc-quran-ref">${card.quranExample.surah} ${card.quranExample.ayah}</span>
                </div>` : ''}
            </div>
          </div>
          <p class="fc-hint">${isFlipped ? 'Click card to flip back' : 'Click card to reveal'}</p>
        </div>

        <div class="fc-controls">
          <button class="btn-nav" id="btn-prev" ${currentIndex === 0 ? 'disabled' : ''}>← Prev</button>
          <button class="btn-nav" id="btn-next" ${currentIndex === total - 1 ? 'disabled' : ''}>Next →</button>
        </div>

        <div class="fc-dots">
          ${deck!.cards.map((_, i) => `
            <span class="fc-dot ${i === currentIndex ? 'active' : ''}" data-index="${i}"></span>
          `).join('')}
        </div>
      </div>
    `

    bindEvents()
  }

  function bindEvents() {
    container.querySelector('.btn-back')!.addEventListener('click', () => {
      window.location.hash = ''
    })

    const card = container.querySelector<HTMLElement>('#fc-card')!
    const flip = () => {
      isFlipped = !isFlipped
      render()
    }
    card.addEventListener('click', flip)
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip() }
    })

    container.querySelector('#btn-prev')?.addEventListener('click', () => {
      if (currentIndex > 0) { currentIndex--; isFlipped = false; render() }
    })

    container.querySelector('#btn-next')?.addEventListener('click', () => {
      if (currentIndex < deck!.cards.length - 1) { currentIndex++; isFlipped = false; render() }
    })

    container.querySelectorAll<HTMLElement>('.fc-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        currentIndex = Number(dot.dataset.index)
        isFlipped = false
        render()
      })
    })
  }

  render()
}
