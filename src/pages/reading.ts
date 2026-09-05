import { loadReading } from '../data/reading'
import type { ReadingWord } from '../types'

// A standalone waqaf/pause sign (ۖ ۗ ۘ ۙ ۚ ۛ ۜ …) is a token whose every char
// falls in the Arabic pause-mark range. These sit between words in verse.arabic
// but have no entry in words[], so they're rendered as non-interactive spans.
function isWaqaf(token: string): boolean {
  return token.length > 0 && [...token].every(c => {
    const cp = c.codePointAt(0)!
    return cp >= 0x06d6 && cp <= 0x06ed
  })
}

// Build the verse line from verse.arabic so freestanding waqaf marks survive,
// while each real word stays a tappable button mapped to its words[] entry.
function verseArabic(verse: { arabic: string; words: ReadingWord[] }, vi: number): string {
  let wi = 0
  return verse.arabic.split(' ').map(token => {
    if (isWaqaf(token) || wi >= verse.words.length) {
      return `<span class="qs-waqaf">${token}</span>`
    }
    const html = `<button class="qs-word" data-vi="${vi}" data-wi="${wi}">${verse.words[wi].arabic}</button>`
    wi++
    return html
  }).join(' ')
}

function wordDetail(word: ReadingWord): string {
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

// `embedded` renders the surah straight into the Yasin tab: the app header
// already names it, so the page drops its own back/title row.
export async function renderReading(container: HTMLElement, id: string, embedded = false) {
  container.innerHTML = `<div class="fc-loading">Loading…</div>`

  const surah = await loadReading(id)

  if (!surah) {
    container.innerHTML = `
      <div class="error-page">
        <p>Surah not found.</p>
        <button class="btn-back" onclick="window.location.hash='read'">← Back</button>
      </div>
    `
    return
  }

  container.innerHTML = `
    <div class="qs-page">
      ${embedded ? '' : `
        <div class="qs-header">
          <button class="btn-back">← Back</button>
          <span class="qs-deck-title">QS ${surah.surah} · ${surah.surahName}</span>
        </div>
      `}

      <p class="qs-tip">👆 Tap any word to see its meaning</p>

      <div class="qs-verses">
        ${surah.verses.map((verse, vi) => `
          <div class="qs-verse">
            <span class="qs-ayah-num">${verse.ayah}</span>
            <div class="qs-arabic" dir="rtl">
              ${verseArabic(verse, vi)}
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

  function openSheet(btn: HTMLButtonElement, word: ReadingWord) {
    activeBtn?.classList.remove('active')
    activeBtn = btn
    btn.classList.add('active')
    sheetBody.innerHTML = wordDetail(word)
    sheet.hidden = false
    // Force reflow so the transition runs when toggling .open.
    void sheet.offsetWidth
    sheet.classList.add('open')
  }

  container.querySelector('.btn-back')?.addEventListener('click', () => {
    window.location.hash = 'read'
  })

  container.querySelectorAll<HTMLButtonElement>('.qs-word').forEach(btn => {
    btn.addEventListener('click', () => {
      tip?.remove()
      if (activeBtn === btn) {
        closeSheet()
        return
      }
      const vi = Number(btn.dataset.vi)
      const wi = Number(btn.dataset.wi)
      openSheet(btn, surah.verses[vi].words[wi])
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
