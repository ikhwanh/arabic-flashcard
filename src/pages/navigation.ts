import { deckMetas } from '../data/flashcards'
import { qsMetas } from '../data/qs-breakdown'
import { readingMetas } from '../data/reading'
import { dzikirMetas } from '../data/dzikir'

type NavTab = 'flashcard' | 'breakdown' | 'reading' | 'dzikir'

function getQuizScore(deckId: string): string | null {
  return localStorage.getItem(`quiz_score_${deckId}`)
}

function getLastVisited(deckId: string): number {
  return Number(localStorage.getItem(`last_visited_${deckId}`) ?? 0)
}

function getQsScore(id: string): string | null {
  return localStorage.getItem(`qs_score_${id}`)
}

// Part index of a numbered vocab deck (e.g. "…-part-12" → 12).
// Grouped/other decks have no part number → null (excluded from curriculum).
function numericId(id: string): number | null {
  const m = id.match(/part-(\d+)$/)
  return m ? Number(m[1]) : null
}

// Resume = the most recently visited deck (by timestamp). Next up = the next
// sequential part after it that hasn't been quizzed yet.
function getContinueState(): { resume: typeof deckMetas[number] | null; next: typeof deckMetas[number] | null } {
  const resume = deckMetas
    .map(d => ({ deck: d, t: getLastVisited(d.id) }))
    .filter(x => x.t > 0)
    .sort((a, b) => b.t - a.t)[0]?.deck ?? null

  const numbered = deckMetas
    .map(d => ({ deck: d, n: numericId(d.id) }))
    .filter((x): x is { deck: typeof deckMetas[number]; n: number } => x.n !== null)
    .sort((a, b) => a.n - b.n)

  let next: typeof deckMetas[number] | null
  if (!resume) {
    next = numbered[0]?.deck ?? null
  } else {
    const rn = numericId(resume.id)
    next = rn === null
      ? null
      : numbered.find(x => x.n > rn && getQuizScore(x.deck.id) === null)?.deck ?? null
  }

  return { resume, next }
}

function resetAll() {
  deckMetas.forEach(d => {
    localStorage.removeItem(`quiz_score_${d.id}`)
    localStorage.removeItem(`last_visited_${d.id}`)
  })
  qsMetas.forEach(m => localStorage.removeItem(`qs_score_${m.id}`))
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
    || qsMetas.some(m => getQsScore(m.id) !== null)
}

function deckLabel(deck: { title: string }): string {
  return deck.title.replace(/^Kosakata Al-Quran - /, '')
}

function renderContinueStrip(container: HTMLElement) {
  const strip = container.querySelector<HTMLElement>('.nav-continue')
  if (!strip) return

  const { resume, next } = getContinueState()

  const cards: string[] = []
  if (resume) {
    cards.push(`
      <button class="nav-continue-card resume" data-deck-id="${resume.id}">
        <span class="nav-continue-kicker">▶ Resume</span>
        <span class="nav-continue-title">${deckLabel(resume)}</span>
      </button>
    `)
  }
  if (next && next.id !== resume?.id) {
    cards.push(`
      <button class="nav-continue-card next" data-deck-id="${next.id}">
        <span class="nav-continue-kicker">${resume ? 'Next up' : 'Start here'}</span>
        <span class="nav-continue-title">${deckLabel(next)}</span>
      </button>
    `)
  }

  if (cards.length === 0) {
    strip.hidden = true
    return
  }

  strip.hidden = false
  strip.innerHTML = cards.join('')
  strip.querySelectorAll<HTMLButtonElement>('.nav-continue-card').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = `deck/${btn.dataset.deckId!}`
    })
  })
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
            <h3 class="deck-title">${deckLabel(deck)}</h3>
            <p class="deck-preview">${deck.preview.join(' · ')}</p>
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

function renderBreakdownGrid(container: HTMLElement) {
  const grid = container.querySelector<HTMLElement>('.qs-index-grid')!
  grid.innerHTML = qsMetas.length === 0
    ? `<p class="nav-empty">No breakdowns yet. Generate one with the qs-breakdown command.</p>`
    : qsMetas.map(m => {
        const score = getQsScore(m.id)
        return `
        <div class="qs-index-card">
          ${score !== null ? `<span class="deck-score-chip">${score}</span>` : ''}
          <button class="qs-index-open" data-id="${m.id}">
            <span class="qs-index-surah">QS ${m.surah} · ${m.surahName}</span>
            <span class="qs-index-title">${m.title}</span>
            <span class="qs-index-desc">${m.description}</span>
            <span class="qs-index-count">Ayat ${m.from}–${m.to} · ${m.verseCount} ayat</span>
          </button>
          <button class="btn-qs-play-card" data-play-id="${m.id}">Play ▶</button>
        </div>
      `
      }).join('')

  grid.querySelectorAll<HTMLButtonElement>('.qs-index-open').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = `qs/${btn.dataset.id!}`
    })
  })

  grid.querySelectorAll<HTMLButtonElement>('.btn-qs-play-card').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = `qs/${btn.dataset.playId!}/game`
    })
  })
}

function renderReadingGrid(container: HTMLElement) {
  const grid = container.querySelector<HTMLElement>('.qs-index-grid')!
  grid.innerHTML = readingMetas.length === 0
    ? `<p class="nav-empty">No surahs yet. Generate one with the quran-reading command.</p>`
    : readingMetas.map(m => `
        <div class="qs-index-card">
          <button class="qs-index-open" data-id="${m.id}">
            <span class="qs-index-surah">QS ${m.surah} · ${m.surahName}</span>
            <span class="qs-index-title">${m.title}</span>
            <span class="qs-index-desc">${m.description}</span>
            <span class="qs-index-count">Ayat ${m.from}–${m.to} · ${m.verseCount} ayat</span>
          </button>
        </div>
      `).join('')

  grid.querySelectorAll<HTMLButtonElement>('.qs-index-open').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = `read/${btn.dataset.id!}`
    })
  })
}

function renderDzikirGrid(container: HTMLElement) {
  const grid = container.querySelector<HTMLElement>('.qs-index-grid')!
  grid.innerHTML = dzikirMetas.length === 0
    ? `<p class="nav-empty">No dzikir yet.</p>`
    : dzikirMetas.map(m => `
        <div class="qs-index-card">
          <button class="qs-index-open" data-id="${m.id}">
            <span class="qs-index-surah">${m.time === 'morning' ? '🌅' : '🌇'} ${m.title}</span>
            <span class="qs-index-desc">${m.description}</span>
            <span class="qs-index-count">${m.itemCount} dzikir</span>
          </button>
        </div>
      `).join('')

  grid.querySelectorAll<HTMLButtonElement>('.qs-index-open').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = `dzikir/${btn.dataset.id!}`
    })
  })
}

function syncResetAllButton(container: HTMLElement) {
  const btn = container.querySelector<HTMLButtonElement>('.btn-reset-all')
  if (btn) btn.disabled = !hasAnyProgress()
}

export function renderNavigation(container: HTMLElement, activeTab: NavTab = 'flashcard') {
  let filterUnfinished = false

  const flashcardSection = `
    <div class="nav-hero">
      <h2>Kosakata Al-Quran</h2>
      <p class="nav-subtitle">Kata-kata bermakna yang paling sering muncul di Al-Quran</p>
    </div>
    <div class="nav-toolbar">
      <div class="nav-filters">
        <button class="nav-filter-chip" data-filter="unfinished">Unfinished</button>
      </div>
      <div class="nav-menu">
        <button class="nav-menu-trigger" aria-label="Options" aria-haspopup="true" aria-expanded="false">⋮</button>
        <div class="nav-menu-dropdown" hidden>
          <button class="nav-menu-item" data-exam="1-10">Exam 1 <span class="nav-menu-item-sub">Part 1–10</span></button>
          <button class="nav-menu-item" data-exam="11-20">Exam 2 <span class="nav-menu-item-sub">Part 11–20</span></button>
          <button class="nav-menu-item" data-exam="21-30">Exam 3 <span class="nav-menu-item-sub">Part 21–30</span></button>
          <button class="nav-menu-item" data-exam="31-40">Exam 4 <span class="nav-menu-item-sub">Part 31–40</span></button>
          <button class="nav-menu-item" data-exam="41-50">Exam 5 <span class="nav-menu-item-sub">Part 41–50</span></button>
          <button class="nav-menu-item" data-exam="all">Final Exam <span class="nav-menu-item-sub">Semua part</span></button>
          <div class="nav-menu-divider"></div>
          <button class="nav-menu-item btn-reset-all" ${hasAnyProgress() ? '' : 'disabled'}>Reset all progress</button>
        </div>
      </div>
    </div>
    <div class="nav-continue" hidden></div>
    <div class="deck-grid"></div>
  `

  const breakdownSection = `
    <div class="nav-hero">
      <h2>Surah Breakdown</h2>
      <p class="nav-subtitle">Read verses word by word</p>
    </div>
    <div class="qs-index-grid"></div>
  `

  const readingSection = `
    <div class="nav-hero">
      <h2>Yasin</h2>
      <p class="nav-subtitle">Read the Quran, tap a word for its meaning</p>
    </div>
    <div class="qs-index-grid"></div>
  `

  const dzikirSection = `
    <div class="nav-hero">
      <h2>Dzikir</h2>
      <p class="nav-subtitle">Morning & evening remembrance, tap a word for its meaning</p>
    </div>
    <div class="qs-index-grid"></div>
  `

  const section = activeTab === 'breakdown' ? breakdownSection
    : activeTab === 'reading' ? readingSection
    : activeTab === 'dzikir' ? dzikirSection
    : flashcardSection

  container.innerHTML = `
    <div class="nav-page">
      ${section}
    </div>
  `

  if (activeTab === 'breakdown') {
    renderBreakdownGrid(container)
    return
  }

  if (activeTab === 'reading') {
    renderReadingGrid(container)
    return
  }

  if (activeTab === 'dzikir') {
    renderDzikirGrid(container)
    return
  }

  renderContinueStrip(container)
  renderDeckGrid(container, filterUnfinished)

  const menu = container.querySelector<HTMLElement>('.nav-menu')!
  const menuTrigger = menu.querySelector<HTMLButtonElement>('.nav-menu-trigger')!
  const menuDropdown = menu.querySelector<HTMLElement>('.nav-menu-dropdown')!

  const closeMenu = () => {
    menuDropdown.hidden = true
    menuTrigger.setAttribute('aria-expanded', 'false')
    document.removeEventListener('click', onDocClick)
  }
  const onDocClick = (e: MouseEvent) => {
    if (!menu.contains(e.target as Node)) closeMenu()
  }
  menuTrigger.addEventListener('click', () => {
    const willOpen = menuDropdown.hidden
    menuDropdown.hidden = !willOpen
    menuTrigger.setAttribute('aria-expanded', String(willOpen))
    if (willOpen) {
      document.addEventListener('click', onDocClick)
    } else {
      document.removeEventListener('click', onDocClick)
    }
  })

  menu.querySelectorAll<HTMLButtonElement>('[data-exam]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeMenu()
      const exam = btn.dataset.exam!
      window.location.hash = exam === 'all' ? 'test' : `test/${exam}`
    })
  })

  container.querySelector<HTMLButtonElement>('[data-filter="unfinished"]')!.addEventListener('click', e => {
    const btn = e.currentTarget as HTMLButtonElement
    filterUnfinished = !filterUnfinished
    btn.classList.toggle('active', filterUnfinished)
    renderDeckGrid(container, filterUnfinished)
  })

  container.querySelector<HTMLButtonElement>('.btn-reset-all')!.addEventListener('click', () => {
    closeMenu()
    showConfirm('Reset all progress?', 'This will clear all quiz scores and visit history.', () => {
      resetAll()
      filterUnfinished = false
      const chip = container.querySelector<HTMLButtonElement>('[data-filter="unfinished"]')!
      chip.classList.remove('active')
      syncResetAllButton(container)
      renderContinueStrip(container)
      renderDeckGrid(container, filterUnfinished)
    })
  })
}
