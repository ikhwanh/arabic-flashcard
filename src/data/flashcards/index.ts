import type { Deck, DeckMeta, GroupedFile, VocabFile } from '../../types'
import manifestData from './manifest.json'

export const deckMetas: DeckMeta[] = manifestData

const loaders = import.meta.glob<GroupedFile | VocabFile>('./[0-9]*.json', { eager: false, import: 'default' })

function normalizeGrouped(file: GroupedFile, targetId: string): Deck | null {
  const group = file.groups.find(g => g.id === targetId)
  if (!group) return null
  return {
    id:          group.id,
    title:       group.group_title,
    description: group.group_description,
    emoji:       deckMetas.find(m => m.id === targetId)?.emoji ?? '📚',
    cards: group.words.map((word, i) => ({
      id:              `${group.id}_${i}`,
      arabic:          word.arabic,
      transliteration: word.transliteration,
      indonesian:      word.translation,
      wordType:        group.group_title,
      quranExample:    word.quran_example,
    })),
  }
}

function normalizeVocab(file: VocabFile): Deck {
  return {
    id:          file.meta.title.toLowerCase().replace(/\s+/g, '-'),
    title:       file.meta.title,
    description: file.meta.description,
    emoji:       '📖',
    cards: file.cards.map(card => ({
      id:              String(card.id),
      arabic:          card.arabic,
      transliteration: card.transliteration,
      indonesian:      card.translation,
      wordType:        card.word_type,
      root:            card.root,
      forms:           card.forms,
      relatedWords:    card.related_words,
      quranExample:    card.quran_example,
    })),
  }
}

function isGroupedFile(data: unknown): data is GroupedFile {
  return typeof data === 'object' && data !== null && 'groups' in data
}

function isVocabFile(data: unknown): data is VocabFile {
  return typeof data === 'object' && data !== null && 'cards' in data
}

export async function loadDeck(id: string): Promise<Deck | null> {
  const meta = deckMetas.find(m => m.id === id)
  if (!meta) return null

  const loader = loaders[`./${meta.file}`]
  if (!loader) return null

  const raw = await loader()

  if (isGroupedFile(raw)) return normalizeGrouped(raw, id)
  if (isVocabFile(raw))   return normalizeVocab(raw)
  return null
}
