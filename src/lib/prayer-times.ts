import { CalculationParameters, Coordinates, Madhab, PrayerTimes } from 'adhan'

const LOCATION_KEY = 'prayer_location'
const MINUTE_MS = 60_000

// Kemenag RI adds an ihtiyat (safety margin) of 2 minutes to every prayer and
// subtracts it from sunrise, so the published times never fall too early.
const IHTIYAT = 2
const IMSAK_BEFORE_FAJR = 10
const DHUHA_ALTITUDE = 4.5
const SUNRISE_ALTITUDE = -0.833

export interface PrayerLocation {
  name: string
  region?: string
  lat: number
  lng: number
  tz: string
  source: 'gps' | 'city'
}

export type PrayerKey = 'imsak' | 'fajr' | 'sunrise' | 'dhuha' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'

export interface PrayerTime {
  key: PrayerKey
  label: string
  time: Date
}

const PRAYERS: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

// Imsak, sunrise and dhuha are markers, not prayers, so they never become "next prayer".
export function isPrayer(key: PrayerKey): boolean {
  return PRAYERS.includes(key)
}

export function getLocation(): PrayerLocation | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(LOCATION_KEY) ?? 'null')
    if (parsed && typeof parsed.name === 'string' && typeof parsed.lat === 'number' && typeof parsed.lng === 'number' && typeof parsed.tz === 'string') {
      return parsed
    }
  } catch {
    // fall through to "no location"
  }
  return null
}

export function setLocation(loc: PrayerLocation) {
  localStorage.setItem(LOCATION_KEY, JSON.stringify(loc))
}

export function deviceTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

function kemenagParams(): CalculationParameters {
  const params = new CalculationParameters('Other', 20, 18)
  params.madhab = Madhab.Shafi
  return params
}

const rad = (deg: number) => (deg * Math.PI) / 180

// adhan has no dhuha time, so derive it from sunrise: the minutes the sun takes
// to climb from the horizon to 4.5°, from the hour angles at both altitudes.
function dhuhaOffsetMinutes(lat: number, date: Date): number {
  const dayOfYear = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 86_400_000)
  const decl = rad(23.44) * Math.sin(rad((360 / 365) * (dayOfYear - 81)))
  const phi = rad(lat)
  const hourAngle = (alt: number) => Math.acos((Math.sin(rad(alt)) - Math.sin(phi) * Math.sin(decl)) / (Math.cos(phi) * Math.cos(decl)))
  return ((hourAngle(SUNRISE_ALTITUDE) - hourAngle(DHUHA_ALTITUDE)) * 180) / Math.PI * 4
}

const shift = (date: Date, minutes: number) => new Date(date.getTime() + Math.round(minutes) * MINUTE_MS)

/** `day` is a UTC-noon calendar date (see lib/hijri.ts) for the location's local date. */
export function computeDay(day: Date, loc: PrayerLocation): PrayerTime[] {
  // adhan reads the local Y/M/D of the Date it is given.
  const date = new Date(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate())
  const t = new PrayerTimes(new Coordinates(loc.lat, loc.lng), date, kemenagParams())
  const fajr = shift(t.fajr, IHTIYAT)
  return [
    { key: 'imsak', label: 'Imsak', time: shift(fajr, -IMSAK_BEFORE_FAJR) },
    { key: 'fajr', label: 'Fajr', time: fajr },
    { key: 'sunrise', label: 'Sunrise', time: shift(t.sunrise, -IHTIYAT) },
    { key: 'dhuha', label: 'Dhuha', time: shift(t.sunrise, dhuhaOffsetMinutes(loc.lat, date) + IHTIYAT) },
    { key: 'dhuhr', label: 'Dhuhr', time: shift(t.dhuhr, IHTIYAT) },
    { key: 'asr', label: 'Asr', time: shift(t.asr, IHTIYAT) },
    { key: 'maghrib', label: 'Maghrib', time: shift(t.maghrib, IHTIYAT) },
    { key: 'isha', label: 'Isha', time: shift(t.isha, IHTIYAT) },
  ]
}

export function nextPrayer(today: PrayerTime[], tomorrow: PrayerTime[], now: Date): PrayerTime {
  const next = today.find(p => isPrayer(p.key) && p.time > now)
  return next ?? tomorrow.find(p => p.key === 'fajr')!
}

export function formatTime(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date)
}

export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / MINUTE_MS))
  const h = Math.floor(total / 60)
  const m = total % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

/** The location's current local date as a UTC-noon calendar date. */
export function localDay(now: Date, tz: string): Date {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(now)
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value)
  return new Date(Date.UTC(get('year'), get('month') - 1, get('day'), 12))
}

export function tzLabel(tz: string): string {
  return { 'Asia/Jakarta': 'WIB', 'Asia/Makassar': 'WITA', 'Asia/Jayapura': 'WIT' }[tz] ?? tz
}
