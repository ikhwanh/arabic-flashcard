import type { Card } from '../types'
import { pickRandom, shuffle } from './random'

export interface Question {
  prompt: string
  promptLabel: string
  correct: string
  options: string[]
  ayatArabic?: string
  ayatRef?: string
  ayatTranslation?: string
}

function generateWordQuestion(card: Card, allCards: Card[]): Question {
  const distractors = pickRandom(allCards.filter(c => c.id !== card.id), 3).map(c => c.indonesian)
  return {
    prompt: card.arabic,
    promptLabel: 'What does this word mean?',
    correct: card.indonesian,
    options: shuffle([card.indonesian, ...distractors]),
    ayatArabic: card.quranExample?.arabic,
    ayatRef: card.quranExample ? `${card.quranExample.surah} ${card.quranExample.ayah}` : undefined,
    ayatTranslation: card.quranExample?.translation,
  }
}

// One question per card (in random order), or a random `size`-card sample.
export function buildQuestions(cards: Card[], size = cards.length): Question[] {
  if (cards.length < 4) return []
  return pickRandom(cards, Math.min(size, cards.length)).map(c => generateWordQuestion(c, cards))
}
