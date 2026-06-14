// ── App display types (used by pages) ────────────────────────────────────────

export interface RelatedWord {
  arabic: string
  translation: string
}

export interface Card {
  id: string
  arabic: string
  transliteration: string
  indonesian: string
  // vocab-only extras
  wordType?: string
  root?: string
  forms?: Record<string, string | null>
  relatedWords?: RelatedWord[]
  quranExample?: { arabic: string; translation: string; surah: string; ayah: number }
}

export interface DeckMeta {
  id: string
  file: string
  title: string
  description: string
  emoji: string
  cardCount: number
}

export interface Deck {
  id: string
  title: string
  description: string
  emoji: string
  cards: Card[]
}

// ── QS Breakdown types (verse-by-verse grammatical reader) ────────────────────

export type WordType = 'ism' | "fi'l" | 'harf'

export interface QsWord {
  arabic: string
  transliteration: string
  meaning: string          // Indonesian, contextual
  type: WordType
  root?: string            // 3-letter root, e.g. "ب ر ك" (omit for harf with no root)
  notes?: string           // optional single gentle Indonesian note
}

export interface QsVerse {
  ayah: number
  arabic: string           // uthmani full verse
  translation: string      // Indonesian
  words: QsWord[]
}

export interface QsBreakdown {
  id: string               // e.g. "25_1-10"
  surah: number
  surahName: string
  from: number
  to: number
  title: string
  description: string      // Indonesian
  verses: QsVerse[]
}

export interface QsMeta {
  id: string
  surah: number
  surahName: string
  from: number
  to: number
  title: string
  description: string
  verseCount: number
}

// ── Raw JSON types ────────────────────────────────────────────────────────────

interface QuranExample {
  arabic: string
  translation: string
  surah: string
  ayah: number
}

// 0.json — grouped format
interface RawWord {
  arabic: string
  transliteration: string
  translation: string
  quran_example?: QuranExample
}

export interface RawGroup {
  id: string
  type: string
  group_title: string
  group_description: string
  words: RawWord[]
  quran_example: QuranExample
}

export interface GroupedFile {
  meta: { title: string; description: string; notes: string }
  groups: RawGroup[]
}

// 1.json — vocab card format
interface RawRelatedWord {
  arabic: string
  translation: string
}

export interface RawVocabCard {
  id: number
  arabic: string
  transliteration: string
  translation: string
  word_type: string
  root: string
  forms: Record<string, string | null>
  related_words: RawRelatedWord[]
  quran_example: QuranExample
}

export interface VocabFile {
  meta: { title: string; description: string; range?: string; notes: string }
  cards: RawVocabCard[]
}
