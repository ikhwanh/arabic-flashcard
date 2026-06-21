import './style.css'
import './font'
import { initTheme } from './theme'
import { renderNavigation } from './pages/navigation'
import { renderFlashcard } from './pages/flashcard'
import { renderQuiz } from './pages/quiz'
import { renderTest } from './pages/test'
import { renderQsBreakdown } from './pages/qs-breakdown'
import { renderSettings } from './pages/settings'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="app-header">
    <nav class="header-tabs" role="tablist">
      <button class="header-tab" data-tab="flashcard" role="tab">Flashcard</button>
      <button class="header-tab" data-tab="breakdown" role="tab">Surah Breakdown</button>
    </nav>
    <div class="header-actions">
      <button class="theme-toggle" aria-label="Toggle theme"></button>
      <button class="settings-toggle" aria-label="Settings">⚙️</button>
    </div>
  </header>
  <main class="app-main" id="main-content"></main>
  <footer class="app-footer">
    <a class="github-link" href="https://github.com/ikhwanh/arabic-flashcard" target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      <span>Source on GitHub</span>
    </a>
    <span class="app-version">v${__APP_VERSION__}</span>
  </footer>
`

initTheme(document.querySelector<HTMLButtonElement>('.theme-toggle')!)

const mainContent = document.getElementById('main-content')!
const appHeader = document.querySelector<HTMLElement>('.app-header')!

const headerTabs = appHeader.querySelectorAll<HTMLButtonElement>('.header-tab')
headerTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.hash = btn.dataset.tab === 'breakdown' ? 'qs' : ''
  })
})

appHeader.querySelector<HTMLButtonElement>('.settings-toggle')!.addEventListener('click', () => {
  window.location.hash = 'settings'
})

function setActiveTab(tab: 'flashcard' | 'breakdown' | null) {
  headerTabs.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab))
}

function route() {
  const hash = window.location.hash.slice(1) // strip '#'
  const deckMatch = hash.match(/^deck\/(.+)$/)

  const quizMatch = hash.match(/^deck\/(.+)\/quiz$/)
  const testMatch = hash.match(/^test(?:\/(.+))?$/)
  const qsReaderMatch = hash.match(/^qs\/(.+)$/)
  const qsIndexMatch = hash === 'qs'
  const settingsMatch = hash === 'settings'

  if (settingsMatch) {
    appHeader.hidden = false
    setActiveTab(null)
    renderSettings(mainContent)
  } else if (qsReaderMatch) {
    appHeader.hidden = true
    renderQsBreakdown(mainContent, qsReaderMatch[1]).catch(console.error)
  } else if (qsIndexMatch) {
    appHeader.hidden = false
    setActiveTab('breakdown')
    renderNavigation(mainContent, 'breakdown')
  } else if (testMatch) {
    appHeader.hidden = true
    renderTest(mainContent, testMatch[1]).catch(console.error)
  } else if (quizMatch) {
    appHeader.hidden = true
    renderQuiz(mainContent, quizMatch[1]).catch(console.error)
  } else if (deckMatch) {
    appHeader.hidden = true
    renderFlashcard(mainContent, deckMatch[1]).catch(console.error)
  } else {
    appHeader.hidden = false
    setActiveTab('flashcard')
    renderNavigation(mainContent, 'flashcard')
  }
}

window.addEventListener('hashchange', route)
route()
