// ── App display types (used by pages) ────────────────────────────────────────

export interface RelatedWord {
  arabic: string
  translation: string
}

export interface Card {
  id: string
  arabic: string
  transliteration: string
  english: string
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
