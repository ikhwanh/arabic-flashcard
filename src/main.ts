import './style.css'
import { initTheme } from './theme'
import { renderNavigation } from './pages/navigation'
import { renderFlashcard } from './pages/flashcard'
import { renderQuiz } from './pages/quiz'
import { renderTest } from './pages/test'
import { renderQsBreakdown } from './pages/qs-breakdown'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="app-header">
    <nav class="header-tabs" role="tablist">
      <button class="header-tab" data-tab="flashcard" role="tab">Flashcard</button>
      <button class="header-tab" data-tab="breakdown" role="tab">Surah Breakdown</button>
    </nav>
    <button class="theme-toggle" aria-label="Toggle theme"></button>
  </header>
  <main class="app-main" id="main-content"></main>
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

function setActiveTab(tab: 'flashcard' | 'breakdown') {
  headerTabs.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab))
}

function route() {
  const hash = window.location.hash.slice(1) // strip '#'
  const deckMatch = hash.match(/^deck\/(.+)$/)

  const quizMatch = hash.match(/^deck\/(.+)\/quiz$/)
  const testMatch = hash.match(/^test(?:\/(.+))?$/)
  const qsReaderMatch = hash.match(/^qs\/(.+)$/)
  const qsIndexMatch = hash === 'qs'

  if (qsReaderMatch) {
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
