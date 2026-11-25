import type { HijriDate } from '../lib/hijri'

export interface HijriEvent {
  name: string
  kind: 'holiday' | 'observance' | 'fasting'
}

const EVENTS: Record<string, HijriEvent> = {
  '1-1': { name: 'Tahun Baru Islam', kind: 'holiday' },
  '1-9': { name: "Puasa Tasu'a", kind: 'fasting' },
  '1-10': { name: 'Puasa Asyura', kind: 'fasting' },
  '3-12': { name: 'Maulid Nabi Muhammad ﷺ', kind: 'holiday' },
  '7-27': { name: "Isra Mi'raj", kind: 'holiday' },
  '8-15': { name: "Nisfu Sya'ban", kind: 'observance' },
  '9-1': { name: 'Awal Ramadhan', kind: 'observance' },
  '9-17': { name: "Nuzulul Qur'an", kind: 'observance' },
  '10-1': { name: 'Idul Fitri', kind: 'holiday' },
  '12-9': { name: 'Hari Arafah (puasa Arafah)', kind: 'fasting' },
  '12-10': { name: 'Idul Adha', kind: 'holiday' },
  '12-11': { name: 'Hari Tasyrik (haram berpuasa)', kind: 'observance' },
  '12-12': { name: 'Hari Tasyrik (haram berpuasa)', kind: 'observance' },
  '12-13': { name: 'Hari Tasyrik (haram berpuasa)', kind: 'observance' },
}

export function isAyyamulBidh(h: HijriDate): boolean {
  // 13 Dzulhijjah is a day of Tasyrik, and in Ramadhan every day is already a fast.
  return h.day >= 13 && h.day <= 15 && h.month !== 9 && !(h.month === 12 && h.day === 13)
}

export function notableEvent(h: HijriDate): HijriEvent | undefined {
  return EVENTS[`${h.month}-${h.day}`]
}

/** `weekday` is 0 (Sunday) – 6 (Saturday). */
export function eventsFor(h: HijriDate, weekday: number): HijriEvent[] {
  const events: HijriEvent[] = []
  const fixed = notableEvent(h)
  if (fixed) events.push(fixed)
  // No voluntary fasting on Eid or the days of Tasyrik, and Ramadhan is already obligatory.
  const noSunnahFast = h.month === 9 || (h.month === 10 && h.day === 1) || (h.month === 12 && h.day >= 10 && h.day <= 13)
  if (noSunnahFast) return events
  if (isAyyamulBidh(h)) events.push({ name: 'Puasa Ayyamul Bidh', kind: 'fasting' })
  if (weekday === 1) events.push({ name: 'Puasa sunnah Senin', kind: 'fasting' })
  if (weekday === 4) events.push({ name: 'Puasa sunnah Kamis', kind: 'fasting' })
  return events
}
