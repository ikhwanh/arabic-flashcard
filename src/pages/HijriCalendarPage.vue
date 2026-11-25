<script setup lang="ts">
import { computed, ref } from 'vue'
import { eventsFor, isAyyamulBidh, notableEvent } from '../data/hijri-events'
import { HIJRI_MONTHS, addDays, formatGregorian, formatHijri, getHijriAdjust, hijriMonth, toHijri, todayUTC } from '../lib/hijri'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const adjust = getHijriAdjust()
const today = todayUTC()
const todayHijri = toHijri(today, adjust)

const view = ref({ year: todayHijri.year, month: todayHijri.month })
const selected = ref(today.getTime())

const month = computed(() => hijriMonth(view.value.year, view.value.month, adjust))

const cells = computed(() => {
  const { start, length } = month.value
  return Array.from({ length }, (_, i) => {
    const date = addDays(start, i)
    const h = { year: view.value.year, month: view.value.month, day: i + 1 }
    return {
      date,
      h,
      time: date.getTime(),
      event: notableEvent(h),
      bidh: isAyyamulBidh(h),
      friday: date.getUTCDay() === 5,
    }
  })
})

const leadingBlanks = computed(() => month.value.start.getUTCDay())

const gregorianSpan = computed(() => {
  const { start, length } = month.value
  const end = addDays(start, length - 1)
  const short = (d: Date) => formatGregorian(d, { month: 'short' })
  const sy = start.getUTCFullYear()
  const ey = end.getUTCFullYear()
  if (sy !== ey) return `${short(start)} ${sy} – ${short(end)} ${ey}`
  if (start.getUTCMonth() === end.getUTCMonth()) return `${short(start)} ${sy}`
  return `${short(start)} – ${short(end)} ${sy}`
})

const selectedInfo = computed(() => {
  const date = new Date(selected.value)
  const h = toHijri(date, adjust)
  return {
    gregorian: formatGregorian(date),
    hijri: formatHijri(h),
    arabicMonth: HIJRI_MONTHS[h.month - 1].arabic,
    events: eventsFor(h, date.getUTCDay()),
  }
})

const isCurrentMonth = computed(() => view.value.year === todayHijri.year && view.value.month === todayHijri.month)

function shiftMonth(delta: number) {
  const index = view.value.year * 12 + (view.value.month - 1) + delta
  view.value = { year: Math.floor(index / 12), month: (index % 12) + 1 }
  selected.value = isCurrentMonth.value ? today.getTime() : month.value.start.getTime()
}

function goToday() {
  view.value = { year: todayHijri.year, month: todayHijri.month }
  selected.value = today.getTime()
}
</script>

<template>
  <div class="nav-page hcal-page">
    <div class="nav-hero">
      <h2>Hijri Calendar</h2>
      <p class="nav-subtitle">Today is {{ formatHijri(todayHijri) }}</p>
    </div>

    <section class="hcal">
      <div class="hcal-head">
        <button class="prayer-nav-btn" aria-label="Previous month" @click="shiftMonth(-1)">‹</button>
        <div class="hcal-title">
          <span class="hcal-month">{{ HIJRI_MONTHS[view.month - 1].name }} {{ view.year }} H</span>
          <span class="hcal-month-arabic" lang="ar">{{ HIJRI_MONTHS[view.month - 1].arabic }}</span>
          <span class="hcal-span">{{ gregorianSpan }}</span>
        </div>
        <button class="prayer-nav-btn" aria-label="Next month" @click="shiftMonth(1)">›</button>
      </div>
      <div class="hcal-today-row">
        <button class="prayer-btn" :disabled="isCurrentMonth && selected === today.getTime()" @click="goToday">Today</button>
      </div>

      <div class="hcal-grid" role="grid">
        <span v-for="w in WEEKDAYS" :key="w" class="hcal-weekday" :class="{ friday: w === 'Fri' }">{{ w }}</span>
        <span v-for="n in leadingBlanks" :key="`blank-${n}`" class="hcal-blank"></span>
        <button
          v-for="c in cells"
          :key="c.time"
          class="hcal-day"
          :class="{
            today: c.time === today.getTime(),
            selected: c.time === selected,
            bidh: c.bidh,
            friday: c.friday,
          }"
          :aria-label="`${formatHijri(c.h)}, ${formatGregorian(c.date)}`"
          :aria-pressed="c.time === selected"
          @click="selected = c.time"
        >
          <span class="hcal-day-hijri">{{ c.h.day }}</span>
          <span class="hcal-day-greg">{{ c.date.getUTCDate() }}</span>
          <span v-if="c.event" class="hcal-dot" :class="`hcal-dot-${c.event.kind}`"></span>
        </button>
      </div>

      <div class="hcal-legend">
        <span><span class="hcal-dot hcal-dot-holiday"></span> Holiday</span>
        <span><span class="hcal-dot hcal-dot-fasting"></span> Fasting day</span>
        <span><span class="hcal-dot hcal-dot-observance"></span> Observance</span>
        <span><span class="hcal-swatch"></span> Ayyamul Bidh</span>
      </div>
    </section>

    <section class="hcal-detail">
      <div class="hcal-detail-dates">
        <strong>{{ selectedInfo.hijri }}</strong>
        <span class="hcal-detail-arabic" lang="ar">{{ selectedInfo.arabicMonth }}</span>
      </div>
      <span class="hcal-detail-greg">{{ selectedInfo.gregorian }}</span>
      <ul v-if="selectedInfo.events.length" class="hcal-events">
        <li v-for="e in selectedInfo.events" :key="e.name">
          <span class="hcal-dot" :class="`hcal-dot-${e.kind}`"></span>{{ e.name }}
        </li>
      </ul>
      <p v-else class="hcal-no-events">No special observance.</p>
    </section>

    <p class="settings-hint hcal-hint">
      Dates follow the Umm al-Qura calendar. If your local announcement differs, adjust it in
      <RouterLink to="/settings">Settings</RouterLink>.
    </p>
  </div>
</template>
