import type { QsBreakdown, QsMeta, QsVerse } from '../../types'
import manifestData from './qs-manifest.json'

export const qsMetas: QsMeta[] = manifestData

interface QsFile {
  meta: {
    surah: number
    surahName: string
    from: number
    to: number
    title: string
    description: string
  }
  verses: QsVerse[]
}

// Match breakdown files (e.g. "25_1-10.json"), not qs-manifest.json
const loaders = import.meta.glob<QsFile>('./[0-9]*.json', { eager: false, import: 'default' })

function fileFor(id: string): string {
  return `./${id}.json`
}

export async function loadBreakdown(id: string): Promise<QsBreakdown | null> {
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
