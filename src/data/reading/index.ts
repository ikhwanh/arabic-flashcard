import type { ReadingSurah, ReadingMeta, ReadingVerse } from '../../types'
import manifestData from './reading-manifest.json'

export const readingMetas: ReadingMeta[] = manifestData

interface ReadingFile {
  meta: {
    surah: number
    surahName: string
    from: number
    to: number
    title: string
    description: string
  }
  verses: ReadingVerse[]
}

// Match reading files (e.g. "36_1-83.json"), not reading-manifest.json
const loaders = import.meta.glob<ReadingFile>('./[0-9]*.json', { eager: false, import: 'default' })

function fileFor(id: string): string {
  return `./${id}.json`
}

export async function loadReading(id: string): Promise<ReadingSurah | null> {
  const loader = loaders[fileFor(id)]
  if (!loader) return null

  const raw = await loader()
  return {
    id,
    surah:       raw.meta.surah,
    surahName:   raw.meta.surahName,
    from:        raw.meta.from,
    to:          raw.meta.to,
    title:       raw.meta.title,
    description: raw.meta.description,
    verses:      raw.verses,
  }
}
