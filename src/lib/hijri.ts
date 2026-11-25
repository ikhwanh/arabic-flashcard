const ADJUST_KEY = 'hijri_adjust'
const DAY_MS = 86_400_000

export const HIJRI_MONTHS: { name: string; arabic: string }[] = [
  { name: 'Muharram', arabic: 'مُحَرَّم' },
  { name: 'Safar', arabic: 'صَفَر' },
  { name: 'Rabiul Awal', arabic: 'رَبِيع الأَوَّل' },
  { name: 'Rabiul Akhir', arabic: 'رَبِيع الآخِر' },
  { name: 'Jumadil Awal', arabic: 'جُمَادَى الأُولَى' },
  { name: 'Jumadil Akhir', arabic: 'جُمَادَى الآخِرَة' },
  { name: 'Rajab', arabic: 'رَجَب' },
  { name: "Sya'ban", arabic: 'شَعْبَان' },
  { name: 'Ramadhan', arabic: 'رَمَضَان' },
  { name: 'Syawal', arabic: 'شَوَّال' },
  { name: "Dzulqa'dah", arabic: 'ذُو القَعْدَة' },
  { name: 'Dzulhijjah', arabic: 'ذُو الحِجَّة' },
]

export interface HijriDate {
  year: number
  month: number
  day: number
}

// Calendar days are represented as UTC-noon Dates so that adding whole days
// and formatting with timeZone: 'UTC' never slips across a day boundary.
export function dayUTC(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day, 12))
}

export function todayUTC(now = new Date()): Date {
  return dayUTC(now.getFullYear(), now.getMonth() + 1, now.getDate())
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS)
}

export function getHijriAdjust(): number {
  const n = Number(localStorage.getItem(ADJUST_KEY))
  return Number.isInteger(n) ? Math.max(-2, Math.min(2, n)) : 0
}

export function setHijriAdjust(n: number) {
  localStorage.setItem(ADJUST_KEY, String(Math.max(-2, Math.min(2, n))))
}

const umalqura = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
  timeZone: 'UTC',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
})

function rawHijri(date: Date): HijriDate {
  const parts = umalqura.formatToParts(date)
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value)
  return { year: get('year'), month: get('month'), day: get('day') }
}

export function toHijri(date: Date, adjust = getHijriAdjust()): HijriDate {
  return rawHijri(addDays(date, adjust))
}

export function hijriMonth(year: number, month: number, adjust = getHijriAdjust()): { start: Date; length: number } {
  const target = year * 12 + month
  // Mean-lunation estimate from the Hijri epoch (16 July 622), then corrected below.
  let start = new Date(Date.UTC(622, 6, 16, 12) + Math.round(((year - 1) * 12 + month - 1) * 29.530589) * DAY_MS)
  for (let i = 0; i < 6; i++) {
    const h = rawHijri(start)
    const diff = target - (h.year * 12 + h.month)
    if (diff === 0 && h.day === 1) break
    start = addDays(start, Math.round(diff * 29.5) - (h.day - 1))
  }
  const length = rawHijri(addDays(start, 29)).day === 30 ? 30 : 29
  return { start: addDays(start, -adjust), length }
}

export function formatHijri(h: HijriDate): string {
  return `${h.day} ${HIJRI_MONTHS[h.month - 1].name} ${h.year} H`
}

export function formatGregorian(date: Date, options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }): string {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...options }).format(date)
}
