import type { Deck, GroupedFile, VocabFile } from '../../types'

const GROUP_EMOJI: Record<string, string> = {
  group_preposisi:   '📌',
  group_konjungsi:   '🔗',
  group_kondisional: '🔀',
  group_negatif:     '❌',
  group_kata_tanya:  '❓',
  group_kata_ganti:  '👤',
}

function normalizeGrouped(file: GroupedFile): Deck[] {
  return file.groups.map(group => ({
    id:          group.id,
    title:       group.group_title,
    description: group.group_description,
    emoji:       GROUP_EMOJI[group.id] ?? '📚',
    cards: group.words.map((word, i) => ({
      id:              `${group.id}_${i}`,
      arabic:          word.arabic,
      transliteration: word.transliteration,
      english:         word.translation,
      wordType:        group.group_title,
      quranExample:    word.quran_example,
    })),
  }))
}

function normalizeVocab(file: VocabFile): Deck[] {
  return [{
    id:          file.meta.title.toLowerCase().replace(/\s+/g, '-'),
    title:       file.meta.title,
    description: file.meta.description,
    emoji:       '📖',
    cards: file.cards.map(card => ({
      id:              String(card.id),
      arabic:          card.arabic,
      transliteration: card.transliteration,
      english:         card.translation,
      wordType:        card.word_type,
      root:            card.root,
      forms:           card.forms,
      relatedWords:    card.related_words,
      quranExample:    card.quran_example,
    })),
  }]
}

function isGroupedFile(data: unknown): data is GroupedFile {
  return typeof data === 'object' && data !== null && 'groups' in data
}

function isVocabFile(data: unknown): data is VocabFile {
  return typeof data === 'object' && data !== null && 'cards' in data
}

const modules = import.meta.glob('./*.json', { eager: true, import: 'default' })

export const decks: Deck[] = Object.values(modules).flatMap(raw => {
  if (isGroupedFile(raw)) return normalizeGrouped(raw)
  if (isVocabFile(raw))   return normalizeVocab(raw)
  return []
})
