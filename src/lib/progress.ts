import { deckMetas } from '../data/flashcards'
import { qsMetas } from '../data/qs-breakdown'
import type { DeckMeta } from '../types'

export function getQuizScore(deckId: string): string | null {
  return localStorage.getItem(`quiz_score_${deckId}`)
}

export function getLastVisited(deckId: string): number {
  return Number(localStorage.getItem(`last_visited_${deckId}`) ?? 0)
}

export function markVisited(deckId: string) {
  localStorage.setItem(`last_visited_${deckId}`, Date.now().toString())
}

export function getQsScore(id: string): string | null {
  return localStorage.getItem(`qs_score_${id}`)
}

export function getQsQuizScore(id: string): string | null {
  return localStorage.getItem(`qs_quiz_score_${id}`)
}

export function saveScore(key: string, score: number, total: number) {
  localStorage.setItem(key, `${score}/${total}`)
}

export function resetAll() {
  deckMetas.forEach(d => {
    localStorage.removeItem(`quiz_score_${d.id}`)
    localStorage.removeItem(`last_visited_${d.id}`)
  })
  qsMetas.forEach(m => {
    localStorage.removeItem(`qs_score_${m.id}`)
    localStorage.removeItem(`qs_quiz_score_${m.id}`)
  })
}

export function hasAnyProgress(): boolean {
  return deckMetas.some(d => getQuizScore(d.id) !== null || getLastVisited(d.id) > 0)
    || qsMetas.some(m => getQsScore(m.id) !== null || getQsQuizScore(m.id) !== null)
}

export function deckLabel(title: string): string {
  return title.replace(/^Kosakata Al-Quran - /, '')
}

// Part index of a numbered vocab deck (e.g. "…-part-12" → 12).
// Grouped/other decks have no part number → null (excluded from curriculum).
function numericId(id: string): number | null {
  const m = id.match(/part-(\d+)$/)
  return m ? Number(m[1]) : null
}

// Resume = the most recently visited deck (by timestamp). Next up = the next
// sequential part after it that hasn't been quizzed yet.
export function getContinueState(): { resume: DeckMeta | null; next: DeckMeta | null } {
  const resume = deckMetas
    .map(d => ({ deck: d, t: getLastVisited(d.id) }))
    .filter(x => x.t > 0)
    .sort((a, b) => b.t - a.t)[0]?.deck ?? null

  const numbered = deckMetas
    .map(d => ({ deck: d, n: numericId(d.id) }))
    .filter((x): x is { deck: DeckMeta; n: number } => x.n !== null)
    .sort((a, b) => a.n - b.n)

  let next: DeckMeta | null
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
