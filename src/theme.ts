type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : null
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

export function initTheme(button: HTMLButtonElement) {
  let current: Theme = getStoredTheme() ?? getSystemTheme()
  applyTheme(current)

  const updateIcon = () => {
    button.textContent = current === 'dark' ? '☀️' : '🌙'
    button.setAttribute('aria-label', `Switch to ${current === 'dark' ? 'light' : 'dark'} theme`)
  }

  updateIcon()

  button.addEventListener('click', () => {
    current = current === 'dark' ? 'light' : 'dark'
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
