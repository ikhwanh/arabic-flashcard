export type Theme = 'light' | 'dark' | 'sand' | 'tundra'

const STORAGE_KEY = 'theme'

export const THEMES: Theme[] = ['light', 'dark', 'sand', 'tundra']

export const THEME_META: Record<Theme, { icon: string; label: string }> = {
  light: { icon: '☀️', label: 'Light' },
  dark: { icon: '🌙', label: 'Dark' },
  sand: { icon: '🏜️', label: 'Melancholy Sand' },
  tundra: { icon: '🌲', label: 'Greeny Tundra' },
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  return THEMES.includes(stored as Theme) ? (stored as Theme) : null
}

let current: Theme = getStoredTheme() ?? getSystemTheme()
const listeners = new Set<(theme: Theme) => void>()

function applyTheme() {
  document.documentElement.setAttribute('data-theme', current)
}

// Apply persisted/system theme as early as this module is imported
applyTheme()

export function getTheme(): Theme {
  return current
}

export function setTheme(theme: Theme) {
  current = theme
  localStorage.setItem(STORAGE_KEY, theme)
  applyTheme()
  listeners.forEach(fn => fn(current))
}

export function onThemeChange(fn: (theme: Theme) => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function initTheme(button: HTMLButtonElement) {
  const updateIcon = () => {
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]
    button.textContent = THEME_META[current].icon
    button.setAttribute('aria-label', `Theme: ${THEME_META[current].label}. Switch to ${THEME_META[next].label}`)
  }

  updateIcon()
  onThemeChange(updateIcon)

  button.addEventListener('click', () => {
    setTheme(THEMES[(THEMES.indexOf(current) + 1) % THEMES.length])
  })

  // Sync with OS-level changes when no manual preference is saved
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getStoredTheme()) setTheme(e.matches ? 'dark' : 'light')
  })
}
