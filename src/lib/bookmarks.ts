const KEY = 'qs_bookmarks'
const ONLY_KEY = 'qs_bookmarks_only'

export function getBookmarks(): Set<string> {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return new Set(Array.isArray(parsed) ? parsed.filter(id => typeof id === 'string') : [])
  } catch {
    return new Set()
  }
}

export function toggleBookmark(id: string): Set<string> {
  const bookmarks = getBookmarks()
  if (!bookmarks.delete(id)) bookmarks.add(id)
  localStorage.setItem(KEY, JSON.stringify([...bookmarks]))
  return bookmarks
}

export function getBookmarksOnly(): boolean {
  return localStorage.getItem(ONLY_KEY) === '1'
}

export function setBookmarksOnly(only: boolean) {
  localStorage.setItem(ONLY_KEY, only ? '1' : '0')
}
