import type { QsBreakdown, QsWord } from '../types'
import { pickRandom, shuffle } from './random'

export interface Question {
  prompt: string
  promptLabel: string
  correct: string
  options: string[]
  ayatArabic?: string
  ayatRef?: string
  ayatTranslation?: string
  word?: QsWord
}

// harf meanings ("dan", "di") are too generic to quiz. Candidates are deduped
// by meaning so a distractor can never equal the correct answer.
export function buildQsQuestions(bd: QsBreakdown, size = 15): Question[] {
  const seen = new Set<string>()
  const candidates = bd.verses.flatMap(verse =>
    verse.words
      .filter(w => w.type !== 'harf' && !seen.has(w.meaning) && seen.add(w.meaning))
      .map(word => ({ verse, word })),
  )
  if (candidates.length < 4) return []
  return pickRandom(candidates, Math.min(size, candidates.length)).map(({ verse, word }) => {
    const distractors = pickRandom(candidates.filter(c => c.word !== word), 3).map(c => c.word.meaning)
    return {
      prompt: word.arabic,
      promptLabel: 'What does this word mean here?',
      correct: word.meaning,
      options: shuffle([word.meaning, ...distractors]),
      ayatArabic: verse.arabic,
      ayatRef: `QS ${bd.surah}:${verse.ayah}`,
      ayatTranslation: verse.translation,
      word,
    }
  })
}
