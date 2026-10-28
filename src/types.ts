// ── QS Breakdown types (verse-by-verse grammatical reader) ────────────────────

export type WordType = 'ism' | "fi'l" | 'harf'

// Verb conjugation forms (3rd person masc. singular), only for type "fi'l"
export interface VerbForms {
  past?: string            // madhi, e.g. نَزَّلَ
  present?: string         // mudhari', e.g. يُنَزِّلُ
  future?: string         // mudhari' + سـ, e.g. سَيُنَزِّلُ
  command?: string        // amr, e.g. نَزِّلْ
}

export interface QsWord {
  arabic: string
  transliteration: string
  meaning: string          // Indonesian, contextual
  type: WordType
  root?: string            // 3-letter root, e.g. "ب ر ك" (omit for harf with no root)
  forms?: VerbForms        // only for fi'l — past/present/future/command
  notes?: string           // optional single gentle Indonesian note
}

export interface QsSegment {
  translation: string        // Indonesian gloss for just this clause (a slice of literalTranslation)
  wordCount: number          // words consumed from the verse's words[], in reading order
}

export interface QsVerse {
  ayah: number
  arabic: string             // uthmani full verse
  translation: string        // Indonesian — official Kemenag (from API)
  literalTranslation?: string // Indonesian — AI-generated word-aligned gloss (optional)
  words: QsWord[]
  segments?: QsSegment[]     // present only for long verses; the game plays one round per segment
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

// ── Quran Reading types (fluent reader, tap a word for its meaning) ───────────

export interface ReadingWord {
  arabic: string
  transliteration: string
  meaning: string          // Indonesian, contextual
}

export interface ReadingVerse {
  ayah: number
  arabic: string           // uthmani full verse
  words: ReadingWord[]
}

export interface ReadingSurah {
  id: string               // e.g. "36_1-83"
  surah: number
  surahName: string
  from: number
  to: number
  title: string
  description: string      // Indonesian
  verses: ReadingVerse[]
}

export interface ReadingMeta {
  id: string
  surah: number
  surahName: string
  from: number
  to: number
  title: string
  description: string
  verseCount: number
}

// ── Dzikir types (morning/evening remembrance, tap a word for its meaning) ────

export interface DzikirWord {
  arabic: string
  transliteration: string
  meaning: string          // Indonesian, contextual
}

export interface DzikirHadith {
  reference: string        // e.g. "HR. Muslim no. 2708"
  arabic?: string          // optional hadith Arabic text
  content: string          // Indonesian narration / virtue of the dzikir
}

export interface DzikirRukun {
  part: 'action' | 'recitation' | 'both'  // which part is the rukun (Shafi'i)
  note: string             // Indonesian explanation
}

export interface DzikirItem {
  title?: string           // optional label, e.g. "Ayat Kursi"
  repeat: number           // how many times to recite
  hadith?: DzikirHadith    // optional source hadith, shown behind an icon
  rukun?: DzikirRukun      // prayer only: set when this step is an essential element
  arabic: string           // full remembrance text
  words: DzikirWord[]
}

export type DzikirTime = 'prayer' | 'morning' | 'evening'

export interface DzikirSet {
  id: string               // e.g. "1"
  time: DzikirTime
  title: string            // e.g. "Dzikir Pagi"
  description: string       // Indonesian
  items: DzikirItem[]
}

export interface DzikirMeta {
  id: string
  time: DzikirTime
  title: string
  description: string
  itemCount: number
}
