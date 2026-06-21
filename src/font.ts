export type ArabicFont = 'amiri' | 'scheherazade' | 'noto-naskh' | 'lateef' | 'markazi'

const STORAGE_KEY = 'arabic_font'

// Shared fallback chain appended after the chosen family
const FALLBACK = "'Scheherazade New', 'Noto Naskh Arabic', serif"

export const ARABIC_FONTS: { id: ArabicFont; label: string; family: string }[] = [
  { id: 'amiri', label: 'Amiri', family: "'Amiri'" },
  { id: 'scheherazade', label: 'Scheherazade New', family: "'Scheherazade New'" },
  { id: 'noto-naskh', label: 'Noto Naskh Arabic', family: "'Noto Naskh Arabic'" },
  { id: 'lateef', label: 'Lateef', family: "'Lateef'" },
  { id: 'markazi', label: 'Markazi Text', family: "'Markazi Text'" },
]

const DEFAULT_FONT: ArabicFont = 'noto-naskh'

function getStoredFont(): ArabicFont {
  const stored = localStorage.getItem(STORAGE_KEY)
  return ARABIC_FONTS.some(f => f.id === stored) ? (stored as ArabicFont) : DEFAULT_FONT
}

/** The CSS font stack for a given font id, including the shared fallback. */
export function fontStack(id: ArabicFont): string {
  const font = ARABIC_FONTS.find(f => f.id === id) ?? ARABIC_FONTS[0]
  return `${font.family}, ${FALLBACK}`
}

let current: ArabicFont = getStoredFont()

function applyFont() {
  document.documentElement.style.setProperty('--font-arabic', fontStack(current))
}

// Apply persisted font as early as this module is imported
applyFont()

export function getFont(): ArabicFont {
  return current
}

export function setFont(id: ArabicFont) {
  current = id
  localStorage.setItem(STORAGE_KEY, id)
  applyFont()
}
