import { loadBreakdown } from '../data/qs-breakdown'
import type { QsWord, WordType } from '../types'

const TYPE_LABEL: Record<WordType, string> = {
  ism:    'kata benda (ism)',
  "fi'l": 'kata kerja (fi\'l)',
  harf:   'kata tugas (harf)',
}

function wordDetail(word: QsWord): string {
  return `
    <div class="qs-detail">
      <div class="qs-detail-head">
        <span class="qs-detail-arabic">${word.arabic}</span>
        <span class="qs-detail-translit">${word.transliteration}</span>
      </div>
      <span class="qs-detail-meaning">${word.meaning}</span>
      <div class="qs-detail-tags">
        <span class="qs-type-badge qs-type-${word.type === "fi'l" ? 'fil' : word.type}">${TYPE_LABEL[word.type]}</span>
        ${word.root ? `<span class="qs-detail-root">Akar: ${word.root}</span>` : ''}
      </div>
      ${word.notes ? `<p class="qs-detail-notes">${word.notes}</p>` : ''}
    </div>
  `
}

export async function renderQsBreakdown(container: HTMLElement, id: string) {
  container.innerHTML = `<div class="fc-loading">Loading…</div>`

  const bd = await loadBreakdown(id)

  if (!bd) {
    container.innerHTML = `
      <div class="error-page">
        <p>Breakdown not found.</p>
        <button class="btn-back" onclick="window.location.hash='qs'">← Back</button>
      </div>
    `
    return
  }

  // active[verseIndex] = wordIndex currently expanded, or undefined
  const active: Record<number, number | undefined> = {}
  let hasInteracted = false

  function render() {
    container.innerHTML = `
      <div class="qs-page">
        <div class="qs-header">
          <button class="btn-back">← Back</button>
          <span class="qs-deck-title">QS ${bd!.surah} · ${bd!.surahName}</span>
          <span class="qs-range">${bd!.from}–${bd!.to}</span>
        </div>

        ${hasInteracted ? '' : `
          <p class="qs-tip">👆 Tap any word to see its meaning and grammar</p>
        `}

        <div class="qs-verses">
          ${bd!.verses.map((verse, vi) => `
            <div class="qs-verse">
              <span class="qs-ayah-num">${verse.ayah}</span>
              <div class="qs-arabic" dir="rtl">
                ${verse.words.map((w, wi) => `
                  <button class="qs-word ${active[vi] === wi ? 'active' : ''}"
                          data-vi="${vi}" data-wi="${wi}">${w.arabic}</button>
                `).join(' ')}
              </div>
              ${active[vi] !== undefined ? wordDetail(verse.words[active[vi]!]) : ''}
              <p class="qs-translation">${verse.translation}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `

    container.querySelector('.btn-back')!.addEventListener('click', () => {
      window.location.hash = 'qs'
    })

    container.querySelectorAll<HTMLButtonElement>('.qs-word').forEach(btn => {
      btn.addEventListener('click', () => {
        const vi = Number(btn.dataset.vi)
        const wi = Number(btn.dataset.wi)
        active[vi] = active[vi] === wi ? undefined : wi
        hasInteracted = true
        render()
      })
    })
  }

  render()
}
