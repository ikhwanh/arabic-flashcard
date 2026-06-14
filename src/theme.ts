type Theme = 'light' | 'dark' | 'sand' | 'tundra'

const STORAGE_KEY = 'theme'

const THEMES: Theme[] = ['light', 'dark', 'sand', 'tundra']

const THEME_META: Record<Theme, { icon: string; label: string }> = {
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

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

export function initTheme(button: HTMLButtonElement) {
  let current: Theme = getStoredTheme() ?? getSystemTheme()
  applyTheme(current)

  const updateIcon = () => {
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]
    button.textContent = THEME_META[current].icon
    button.setAttribute('aria-label', `Theme: ${THEME_META[current].label}. Switch to ${THEME_META[next].label}`)
  }

  updateIcon()

  button.addEventListener('click', () => {
    current = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]
    applyTheme(current)
    updateIcon()
  })

  // Sync with OS-level changes when no manual preference is saved
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getStoredTheme()) {
      current = e.matches ? 'dark' : 'light'
      applyTheme(current)
      updateIcon()
    }
  })
}
