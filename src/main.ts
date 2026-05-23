import './style.css'
import { initTheme } from './theme'
import { renderNavigation } from './pages/navigation'
import { renderFlashcard } from './pages/flashcard'
import { renderQuiz } from './pages/quiz'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="app-header">
    <h1>Arabic Flashcards <span class="app-version">v${__APP_VERSION__}</span></h1>
    <button class="theme-toggle" aria-label="Toggle theme"></button>
  </header>
  <main class="app-main" id="main-content"></main>
`

initTheme(document.querySelector<HTMLButtonElement>('.theme-toggle')!)

const mainContent = document.getElementById('main-content')!
const appHeader = document.querySelector<HTMLElement>('.app-header')!

function route() {
  const hash = window.location.hash.slice(1) // strip '#'
  const deckMatch = hash.match(/^deck\/(.+)$/)

  const quizMatch = hash.match(/^deck\/(.+)\/quiz$/)

  if (quizMatch) {
    appHeader.hidden = true
    renderQuiz(mainContent, quizMatch[1]).catch(console.error)
  } else if (deckMatch) {
    appHeader.hidden = true
    renderFlashcard(mainContent, deckMatch[1]).catch(console.error)
  } else {
    appHeader.hidden = false
    renderNavigation(mainContent)
  }
}

window.addEventListener('hashchange', route)
route()
