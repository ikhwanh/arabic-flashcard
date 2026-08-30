import type { DzikirSet, DzikirMeta, DzikirItem } from '../../types'
import manifestData from './dzikir-manifest.json'

export const dzikirMetas: DzikirMeta[] = manifestData as DzikirMeta[]

interface DzikirFile {
  meta: {
    id: string
    time: 'morning' | 'evening'
    title: string
    description: string
  }
  items: DzikirItem[]
}

// Match dzikir files (e.g. "1.json"), not dzikir-manifest.json
const loaders = import.meta.glob<DzikirFile>('./[0-9]*.json', { eager: false, import: 'default' })

function fileFor(id: string): string {
  return `./${id}.json`
}

export async function loadDzikir(id: string): Promise<DzikirSet | null> {
  const loader = loaders[fileFor(id)]
  if (!loader) return null

  const raw = await loader()
  return {
    id,
    time:        raw.meta.time,
    title:       raw.meta.title,
    description: raw.meta.description,
    items:       raw.items,
  }
}
