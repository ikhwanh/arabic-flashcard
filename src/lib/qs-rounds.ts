import type { QsVerse } from '../types'

// A verse is playable only if it has enough words to make ordering meaningful.
const MIN_WORDS = 2

export interface Round {
  ayah: number
  translation: string
  // Correct Arabic sequence for this round, in order.
  words: string[]
  // Indonesian per-word meanings, aligned by index with `words` — one gloss slot
  // per word, shown in Arabic reading order as the target the player fills.
  meanings: string[]
  // Arabic shown in the "correct order" reveal — the full Uthmani verse (with
  // waqaf marks) for a whole-verse round, or the joined part words for a segment.
  arabic: string
  // Set when the verse was split into parts, so the header can show "Part i/n".
  part?: { index: number; count: number }
}

// A verse's `segments` are a valid partition only if they cover every word,
// in order, with none dropped or duplicated. Otherwise we fall back to a single
// whole-verse round rather than trust a malformed split.
function segmentsCoverWords(v: QsVerse): boolean {
  if (!v.segments || v.segments.length === 0) return false
  const sum = v.segments.reduce((n, s) => n + s.wordCount, 0)
  return sum === v.words.length
}

export function buildRounds(verses: QsVerse[]): Round[] {
  const rounds: Round[] = []
  for (const v of verses) {
    if (v.words.length < MIN_WORDS) continue

    if (segmentsCoverWords(v)) {
      const count = v.segments!.length
      let offset = 0
      v.segments!.forEach((seg, i) => {
        const slice = v.words.slice(offset, offset + seg.wordCount)
        offset += seg.wordCount
        // Skip trivial parts that can't be meaningfully arranged.
        if (slice.length < MIN_WORDS) return
        rounds.push({
          ayah: v.ayah,
          translation: seg.translation,
          words: slice.map(w => w.arabic),
          meanings: slice.map(w => w.meaning),
          arabic: slice.map(w => w.arabic).join(' '),
          part: { index: i + 1, count },
        })
      })
    } else {
      rounds.push({
        ayah: v.ayah,
        translation: v.literalTranslation ?? v.translation,
        words: v.words.map(w => w.arabic),
        meanings: v.words.map(w => w.meaning),
        arabic: v.arabic,
      })
    }
  }
  return rounds
}

// A single verse is worth offering as its own game only if it yields at least
// one round. Reusing buildRounds keeps this in lockstep with the game itself.
export function isVersePlayable(v: QsVerse): boolean {
  return buildRounds([v]).length > 0
}
