import { deckMetas } from '../data/flashcards'
import { THEMES, THEME_META, getTheme, setTheme } from '../theme'
import { getKasra, setKasra } from '../font'

// Has a shadda + kasra (رَبِّ) so the two positions are visibly different
const KASRA_SAMPLE = 'رَبِّ'
const KASRA_OPTIONS = [
  { id: 'low' as const, label: 'Low (under letter)', feature: '"cv62" 1' },
  { id: 'high' as const, label: 'High (under shadda)', feature: 'normal' },
]

function deckLabel(title: string): string {
  return title.replace(/^Kosakata Al-Quran - /, '')
}

function relativeTime(ts: number): string {
  const diff = Date.now() - ts
  const min = 60_000, hour = 60 * min, day = 24 * hour
  if (diff < min) return 'just now'
  if (diff < hour) return `${Math.floor(diff / min)}m ago`
  if (diff < day) return `${Math.floor(diff / hour)}h ago`
  if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`
  return new Date(ts).toLocaleDateString()
}

function getVisitedDecks() {
  return deckMetas
    .map(d => ({ deck: d, visited: Number(localStorage.getItem(`last_visited_${d.id}`) ?? 0) }))
    .filter(x => x.visited > 0)
    .sort((a, b) => b.visited - a.visited)
}

export function renderSettings(container: HTMLElement) {
  const visited = getVisitedDecks()

  const themeOptions = THEMES.map(t => `
    <button class="settings-option theme-option ${getTheme() === t ? 'active' : ''}" data-theme="${t}">
      <span class="settings-option-icon">${THEME_META[t].icon}</span>
      <span class="settings-option-label">${THEME_META[t].label}</span>
    </button>
  `).join('')

  const kasraOptions = KASRA_OPTIONS.map(k => `
    <button class="settings-option kasra-option ${getKasra() === k.id ? 'active' : ''}" data-kasra="${k.id}">
      <span class="settings-option-sample" style="font-family: 'Scheherazade New', serif; font-feature-settings: ${k.feature}">${KASRA_SAMPLE}</span>
      <span class="settings-option-label">${k.label}</span>
    </button>
  `).join('')

  const historyList = visited.length === 0
    ? `<p class="nav-empty">No decks visited yet.</p>`
    : visited.map(({ deck, visited }) => `
        <button class="settings-history-item" data-deck-id="${deck.id}">
          <span class="settings-history-title">${deckLabel(deck.title)}</span>
          <span class="settings-history-time">${relativeTime(visited)}</span>
        </button>
      `).join('')

  container.innerHTML = `
    <div class="nav-page settings-page">
      <div class="nav-hero">
        <h2>Settings</h2>
        <p class="nav-subtitle">Personalize your appearance and review your history</p>
      </div>

      <section class="settings-section">
        <h3 class="settings-heading">Theme</h3>
        <div class="settings-options">${themeOptions}</div>
      </section>

      <section class="settings-section">
        <h3 class="settings-heading">Kasra Position</h3>
        <div class="settings-options">${kasraOptions}</div>
      </section>

      <section class="settings-section">
        <h3 class="settings-heading">Recently Visited</h3>
        <div class="settings-history">${historyList}</div>
      </section>
    </div>
  `

  const themeButtons = container.querySelectorAll<HTMLButtonElement>('.theme-option')
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setTheme(btn.dataset.theme as typeof THEMES[number])
      themeButtons.forEach(b => b.classList.toggle('active', b === btn))
    })
  })

  const kasraButtons = container.querySelectorAll<HTMLButtonElement>('.kasra-option')
  kasraButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setKasra(btn.dataset.kasra as Parameters<typeof setKasra>[0])
      kasraButtons.forEach(b => b.classList.toggle('active', b === btn))
    })
  })

  container.querySelectorAll<HTMLButtonElement>('.settings-history-item').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = `deck/${btn.dataset.deckId!}`
    })
  })
}
