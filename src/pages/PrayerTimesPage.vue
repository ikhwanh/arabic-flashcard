<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import WordSheet from '../components/WordSheet.vue'
import { CITIES, type City } from '../data/cities'
import { addDays, dayUTC, formatGregorian, formatHijri, toHijri } from '../lib/hijri'
import {
  computeDay,
  deviceTimeZone,
  formatCountdown,
  formatTime,
  getLocation,
  isPrayer,
  localDay,
  nextPrayer,
  setLocation,
  tzLabel,
  type PrayerLocation,
} from '../lib/prayer-times'

const TABLE_KEYS = ['imsak', 'fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const

const loc = ref<PrayerLocation | null>(getLocation())
const now = ref(new Date())

const pickerOpen = ref(false)
const query = ref('')
const locating = ref(false)
const gpsError = ref('')
const monthOffset = ref(0)

let timer: number | undefined
onMounted(() => {
  timer = window.setInterval(() => { now.value = new Date() }, 30_000)
})
onUnmounted(() => window.clearInterval(timer))

const today = computed(() => localDay(now.value, loc.value?.tz ?? deviceTimeZone()))
const times = computed(() => (loc.value ? computeDay(today.value, loc.value) : []))
const next = computed(() => {
  if (!loc.value) return null
  return nextPrayer(times.value, computeDay(addDays(today.value, 1), loc.value), now.value)
})

const locationDetail = computed(() => {
  const l = loc.value
  if (!l) return ''
  const where = l.region ?? `${l.lat.toFixed(3)}, ${l.lng.toFixed(3)}`
  return `${where} · ${tzLabel(l.tz)}`
})

const viewMonth = computed(() => {
  const first = new Date(Date.UTC(today.value.getUTCFullYear(), today.value.getUTCMonth() + monthOffset.value, 1, 12))
  return { year: first.getUTCFullYear(), month: first.getUTCMonth() + 1 }
})

const monthRows = computed(() => {
  const l = loc.value
  if (!l) return []
  const { year, month } = viewMonth.value
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate()
  return Array.from({ length: days }, (_, i) => {
    const day = dayUTC(year, month, i + 1)
    const byKey = Object.fromEntries(computeDay(day, l).map(p => [p.key, formatTime(p.time, l.tz)]))
    return {
      day: i + 1,
      weekday: formatGregorian(day, { weekday: 'short' }),
      isToday: day.getTime() === today.value.getTime(),
      cells: TABLE_KEYS.map(k => byKey[k]),
    }
  })
})

const filteredCities = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return CITIES
  return CITIES.filter(c => c.name.toLowerCase().includes(q) || c.province.toLowerCase().includes(q))
})

function openPicker() {
  query.value = ''
  gpsError.value = ''
  pickerOpen.value = true
}

function choose(l: PrayerLocation) {
  setLocation(l)
  loc.value = l
  monthOffset.value = 0
  pickerOpen.value = false
}

function chooseCity(c: City) {
  choose({ name: c.name, region: c.province, lat: c.lat, lng: c.lng, tz: c.tz, source: 'city' })
}

const GPS_ERRORS: Record<number, string> = {
  1: 'Location permission was denied. Choose a city instead.',
  2: 'Your location is unavailable right now. Choose a city instead.',
  3: 'Finding your location took too long. Try again or choose a city.',
}

function useGps() {
  if (!('geolocation' in navigator)) {
    gpsError.value = 'This browser cannot share your location. Choose a city instead.'
    return
  }
  locating.value = true
  gpsError.value = ''
  navigator.geolocation.getCurrentPosition(
    pos => {
      locating.value = false
      choose({ name: 'My location', lat: pos.coords.latitude, lng: pos.coords.longitude, tz: deviceTimeZone(), source: 'gps' })
    },
    err => {
      locating.value = false
      gpsError.value = GPS_ERRORS[err.code] ?? GPS_ERRORS[2]
    },
    { timeout: 15_000, maximumAge: 600_000 },
  )
}
</script>

<template>
  <div class="nav-page prayer-page">
    <div class="nav-hero">
      <h2>Prayer Times</h2>
      <p class="nav-subtitle">Daily prayer schedule, calculated with the Kemenag RI method</p>
    </div>

    <div v-if="!loc" class="prayer-empty">
      <p>Choose your city or use your location to see today's prayer times.</p>
      <button class="prayer-btn primary" @click="openPicker">Choose location</button>
    </div>

    <template v-else>
      <div class="prayer-location">
        <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true" class="prayer-location-icon"><path d="M8 15s5-4.6 5-8.5A5 5 0 0 0 3 6.5C3 10.4 8 15 8 15z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" /><circle cx="8" cy="6.5" r="1.8" fill="currentColor" /></svg>
        <div class="prayer-location-text">
          <strong>{{ loc.name }}</strong>
          <span>{{ locationDetail }}</span>
        </div>
        <button class="prayer-btn" @click="openPicker">Change</button>
      </div>

      <section class="prayer-today">
        <div class="prayer-today-head">
          <span class="prayer-date">{{ formatGregorian(today) }}</span>
          <span class="prayer-hijri">{{ formatHijri(toHijri(today)) }}</span>
        </div>
        <div v-if="next" class="prayer-next">
          <span class="prayer-next-label">Next: {{ next.label }}</span>
          <span class="prayer-next-time">{{ formatTime(next.time, loc.tz) }}</span>
          <span class="prayer-next-countdown">in {{ formatCountdown(next.time.getTime() - now.getTime()) }}</span>
        </div>
        <ul class="prayer-list">
          <li
            v-for="p in times"
            :key="p.key"
            class="prayer-row"
            :class="{ next: p === next, minor: !isPrayer(p.key), past: p.time < now }"
          >
            <span class="prayer-name">{{ p.label }}</span>
            <span class="prayer-time">{{ formatTime(p.time, loc.tz) }}</span>
          </li>
        </ul>
      </section>

      <section class="prayer-month">
        <div class="prayer-month-head">
          <button class="prayer-nav-btn" aria-label="Previous month" @click="monthOffset--">‹</button>
          <h3>{{ formatGregorian(dayUTC(viewMonth.year, viewMonth.month, 1), { month: 'long', year: 'numeric' }) }}</h3>
          <button class="prayer-nav-btn" aria-label="Next month" @click="monthOffset++">›</button>
        </div>
        <div class="prayer-table-wrap">
          <table class="prayer-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Imsak</th>
                <th>Fajr</th>
                <th>Dhuhr</th>
                <th>Asr</th>
                <th>Maghrib</th>
                <th>Isha</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in monthRows" :key="r.day" :class="{ today: r.isToday }">
                <td class="prayer-table-date">{{ r.day }} <small>{{ r.weekday }}</small></td>
                <td v-for="(c, i) in r.cells" :key="i">{{ c }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="settings-hint">
          Times in {{ tzLabel(loc.tz) }}. Kemenag RI parameters: Fajr 20°, Isha 18°, Shafi'i Asr,
          2-minute ihtiyat, Imsak 10 minutes before Fajr.
        </p>
      </section>
    </template>

    <WordSheet :open="pickerOpen" @close="pickerOpen = false">
      <h3 class="prayer-picker-title">Choose location</h3>
      <button class="prayer-btn primary prayer-gps" :disabled="locating" @click="useGps">
        <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" class="prayer-gps-icon"><path d="M8 15s5-4.6 5-8.5A5 5 0 0 0 3 6.5C3 10.4 8 15 8 15z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" /><circle cx="8" cy="6.5" r="1.8" fill="currentColor" /></svg>
        {{ locating ? 'Locating…' : 'Use my location' }}
      </button>
      <p v-if="gpsError" class="prayer-error">{{ gpsError }}</p>
      <input v-model="query" class="prayer-search" type="search" placeholder="Search city or province" aria-label="Search city or province" />
      <ul class="prayer-city-list">
        <li v-for="c in filteredCities" :key="c.name">
          <button
            class="prayer-city"
            :class="{ active: loc?.source === 'city' && loc.name === c.name }"
            @click="chooseCity(c)"
          >
            <span>{{ c.name }}</span>
            <small>{{ c.province }} · {{ tzLabel(c.tz) }}</small>
          </button>
        </li>
        <li v-if="filteredCities.length === 0" class="prayer-city-empty">No matching city. Try "Use my location".</li>
      </ul>
    </WordSheet>
  </div>
</template>
