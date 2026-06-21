export type KasraPosition = 'low' | 'high'

const KASRA_KEY = 'arabic_kasra'

// The app uses a single self-hosted Arabic face (see the @font-face in style.css).
const FONT_STACK = "'Scheherazade New', serif"

const DEFAULT_KASRA: KasraPosition = 'low'

function getStoredKasra(): KasraPosition {
  const stored = localStorage.getItem(KASRA_KEY)
  return stored === 'low' || stored === 'high' ? stored : DEFAULT_KASRA
}

/**
 * cv62 controls Shadda+kasra placement in Scheherazade New: `1` lowers the
 * kasra below the letter (Indonesian / Indo-Pak convention), while the default
 * keeps it under the shadda (Uthmani convention).
 */
function kasraFeature(pos: KasraPosition): string {
  return pos === 'low' ? '"cv62" 1' : 'normal'
}

let currentKasra = getStoredKasra()

function applyFont() {
  const root = document.documentElement.style
  root.setProperty('--font-arabic', FONT_STACK)
  root.setProperty('--font-feature', kasraFeature(currentKasra))
}

// Apply persisted settings as early as this module is imported
applyFont()

export function getKasra(): KasraPosition {
  return currentKasra
}

export function setKasra(pos: KasraPosition) {
  currentKasra = pos
  localStorage.setItem(KASRA_KEY, pos)
  applyFont()
}
