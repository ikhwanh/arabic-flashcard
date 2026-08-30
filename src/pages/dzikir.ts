import { loadDzikir } from '../data/dzikir'
import type { DzikirWord, DzikirHadith } from '../types'

// A standalone waqaf/pause sign (ۖ ۗ ۘ ۙ ۚ ۛ ۜ …) is a token whose every char
// falls in the Arabic pause-mark range. These sit between words in item.arabic
// but have no entry in words[], so they're rendered as non-interactive spans.
function isWaqaf(token: string): boolean {
  return token.length > 0 && [...token].every(c => {
    const cp = c.codePointAt(0)!
    return cp >= 0x06d6 && cp <= 0x06ed
  })
}

// Build the item line from item.arabic so freestanding waqaf marks survive,
// while each real word stays a tappable button mapped to its words[] entry.
function itemArabic(item: { arabic: string; words: DzikirWord[] }, ii: number): string {
  let wi = 0
  return item.arabic.split(' ').map(token => {
    if (isWaqaf(token) || wi >= item.words.length) {
      return `<span class="qs-waqaf">${token}</span>`
    }
    const html = `<button class="qs-word" data-vi="${ii}" data-wi="${wi}">${item.words[wi].arabic}</button>`
    wi++
    return html
  }).join(' ')
}

function wordDetail(word: DzikirWord): string {
  return `
    <div class="qs-detail">
      <div class="qs-detail-head">
        <span class="qs-detail-arabic">${word.arabic}</span>
        <span class="qs-detail-translit">${word.transliteration}</span>
      </div>
      <span class="qs-detail-meaning">${word.meaning}</span>
    </div>
  `
}

function hadithDetail(hadith: DzikirHadith): string {
  return `
    <div class="dzikir-hadith">
      <span class="dzikir-hadith-ref">📖 ${hadith.reference}</span>
      ${hadith.arabic ? `<p class="dzikir-hadith-arabic" dir="rtl">${hadith.arabic}</p>` : ''}
      <p class="dzikir-hadith-content">${hadith.content}</p>
    </div>
  `
}

export async function renderDzikir(container: HTMLElement, id: string) {
  container.innerHTML = `<div class="fc-loading">Loading…</div>`

  const set = await loadDzikir(id)

  if (!set) {
    container.innerHTML = `
      <div class="error-page">
        <p>Dzikir not found.</p>
        <button class="btn-back" onclick="window.location.hash='dzikir'">← Back</button>
      </div>
    `
    return
  }

  container.innerHTML = `
    <div class="qs-page">
      <div class="qs-header">
        <button class="btn-back">← Back</button>
        <span class="qs-deck-title">${set.title}</span>
      </div>

      <p class="qs-tip">👆 Tap any word to see its meaning</p>

      <div class="qs-verses">
        ${set.items.map((item, ii) => `
          <div class="qs-verse dzikir-item">
            <div class="dzikir-item-head">
              <span class="dzikir-repeat">${item.repeat}×</span>
              ${item.title ? `<span class="dzikir-item-title">${item.title}</span>` : ''}
              ${item.hadith ? `<button class="dzikir-hadith-btn" data-ii="${ii}" aria-label="View source hadith">📖</button>` : ''}
            </div>
            <div class="qs-arabic" dir="rtl">
              ${itemArabic(item, ii)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="qs-sheet" hidden>
      <div class="qs-sheet-backdrop"></div>
      <div class="qs-sheet-panel" role="dialog" aria-modal="true">
        <div class="qs-sheet-handle"></div>
        <button class="qs-sheet-close" aria-label="Close">✕</button>
        <div class="qs-sheet-body"></div>
      </div>
    </div>
  `

  const sheet = container.querySelector<HTMLElement>('.qs-sheet')!
  const sheetBody = container.querySelector<HTMLElement>('.qs-sheet-body')!
  const tip = container.querySelector<HTMLElement>('.qs-tip')

  // The word button currently expanded (so re-tapping it closes the sheet).
  let activeBtn: HTMLButtonElement | null = null

  function closeSheet() {
    sheet.hidden = true
    sheet.classList.remove('open')
    activeBtn?.classList.remove('active')
    activeBtn = null
  }

  function revealSheet(html: string) {
    sheetBody.innerHTML = html
    sheet.hidden = false
    // Force reflow so the transition runs when toggling .open.
    void sheet.offsetWidth
    sheet.classList.add('open')
  }

  function openSheet(btn: HTMLButtonElement, word: DzikirWord) {
    activeBtn?.classList.remove('active')
    activeBtn = btn
    btn.classList.add('active')
    revealSheet(wordDetail(word))
  }

  container.querySelector('.btn-back')!.addEventListener('click', () => {
    window.location.hash = 'dzikir'
  })

  container.querySelectorAll<HTMLButtonElement>('.qs-word').forEach(btn => {
    btn.addEventListener('click', () => {
      tip?.remove()
      if (activeBtn === btn) {
        closeSheet()
        return
      }
      const ii = Number(btn.dataset.vi)
      const wi = Number(btn.dataset.wi)
      openSheet(btn, set.items[ii].words[wi])
    })
  })

  container.querySelectorAll<HTMLButtonElement>('.dzikir-hadith-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tip?.remove()
      // A hadith isn't a word, so drop any active word highlight.
      activeBtn?.classList.remove('active')
      activeBtn = null
      const ii = Number(btn.dataset.ii)
      revealSheet(hadithDetail(set.items[ii].hadith!))
    })
  })

  container.querySelector('.qs-sheet-backdrop')!.addEventListener('click', closeSheet)
  container.querySelector('.qs-sheet-close')!.addEventListener('click', closeSheet)
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Escape' && !sheet.hidden) closeSheet()
    // Detach once the page is replaced (sheet removed from DOM).
    if (!document.contains(sheet)) document.removeEventListener('keydown', onKey)
  })
}
