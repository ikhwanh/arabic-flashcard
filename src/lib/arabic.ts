export type ArabicToken =
  | { kind: 'word'; wi: number }
  | { kind: 'waqaf'; text: string }
  | { kind: 'sep'; text: string }

// A standalone waqaf/pause sign (ۖ ۗ ۘ ۙ ۚ ۛ ۜ …) is a token whose every char
// falls in the Arabic pause-mark range. These sit between words in the line's
// arabic but have no entry in words[], so they're rendered as non-interactive spans.
function isWaqaf(token: string): boolean {
  return token.length > 0 && [...token].every(c => {
    const cp = c.codePointAt(0)!
    return cp >= 0x06d6 && cp <= 0x06ed
  })
}

// Split the full line so freestanding waqaf marks survive, while each real word
// maps (by `wi`) to its words[] entry.
export function tokenize(arabic: string, wordCount: number, { ayahSep = false } = {}): ArabicToken[] {
  let wi = 0
  return arabic.split(' ').map((token): ArabicToken => {
    // Ayah separator: a token starting with the end-of-ayah mark ۝ (U+06DD),
    // optionally followed by the ayah number — shown as a badge, not a word.
    if (ayahSep && token.codePointAt(0) === 0x06dd) {
      return { kind: 'sep', text: token.slice(1) || '۝' }
    }
    if (isWaqaf(token) || wi >= wordCount) return { kind: 'waqaf', text: token }
    return { kind: 'word', wi: wi++ }
  })
}
