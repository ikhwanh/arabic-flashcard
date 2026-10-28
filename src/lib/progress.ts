import { qsMetas } from '../data/qs-breakdown'

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
  qsMetas.forEach(m => {
    localStorage.removeItem(`qs_score_${m.id}`)
    localStorage.removeItem(`qs_quiz_score_${m.id}`)
  })
}

export function hasAnyProgress(): boolean {
  return qsMetas.some(m => getQsScore(m.id) !== null || getQsQuizScore(m.id) !== null)
}
