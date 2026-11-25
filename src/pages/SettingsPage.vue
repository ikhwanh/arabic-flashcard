<script setup lang="ts">
import { ref } from 'vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { THEMES, THEME_META, getTheme, setTheme, type Theme } from '../theme'
import { hasAnyProgress, resetAll } from '../lib/progress'
import { formatHijri, getHijriAdjust, setHijriAdjust, toHijri, todayUTC } from '../lib/hijri'

const theme = ref(getTheme())
const anyProgress = ref(hasAnyProgress())
const confirming = ref(false)
const hijriAdjust = ref(getHijriAdjust())

function changeHijriAdjust(delta: number) {
  setHijriAdjust(hijriAdjust.value + delta)
  hijriAdjust.value = getHijriAdjust()
}

function chooseTheme(t: Theme) {
  setTheme(t)
  theme.value = t
}

function confirmReset() {
  confirming.value = false
  resetAll()
  anyProgress.value = false
}
</script>

<template>
  <div class="nav-page settings-page">
    <div class="nav-hero">
      <h2>Settings</h2>
      <p class="nav-subtitle">Personalize your appearance and manage your progress</p>
    </div>

    <section class="settings-section">
      <h3 class="settings-heading">Theme</h3>
      <div class="settings-options">
        <button
          v-for="t in THEMES"
          :key="t"
          class="settings-option theme-option"
          :class="{ active: theme === t }"
          @click="chooseTheme(t)"
        >
          <span class="settings-option-icon">{{ THEME_META[t].icon }}</span>
          <span class="settings-option-label">{{ THEME_META[t].label }}</span>
        </button>
      </div>
    </section>

    <section class="settings-section">
      <h3 class="settings-heading">Hijri date</h3>
      <div class="hijri-adjust">
        <button class="prayer-nav-btn" aria-label="One day earlier" :disabled="hijriAdjust <= -2" @click="changeHijriAdjust(-1)">−</button>
        <span class="hijri-adjust-value">{{ hijriAdjust > 0 ? '+' : '' }}{{ hijriAdjust }} {{ Math.abs(hijriAdjust) === 1 ? 'day' : 'days' }}</span>
        <button class="prayer-nav-btn" aria-label="One day later" :disabled="hijriAdjust >= 2" @click="changeHijriAdjust(1)">+</button>
      </div>
      <p class="settings-hint">
        Today: {{ formatHijri(toHijri(todayUTC(), hijriAdjust)) }}. Dates follow the Umm al-Qura calendar;
        shift them if your local announcement differs.
      </p>
    </section>

    <section class="settings-section">
      <h3 class="settings-heading">Progress</h3>
      <button class="btn-reset-all" :disabled="!anyProgress" @click="confirming = true">Reset all progress</button>
      <p class="settings-hint">Clears every Surah Breakdown quiz and game score.</p>
    </section>

    <section class="settings-section">
      <h3 class="settings-heading">About</h3>
      <RouterLink class="settings-link" to="/credits">Credits →</RouterLink>
      <p class="settings-hint">Recitation audio, prayer time calculation and their sources.</p>
    </section>

    <ConfirmDialog
      v-if="confirming"
      title="Reset all progress?"
      message="This will clear all quiz and game scores."
      @confirm="confirmReset"
      @cancel="confirming = false"
    />
  </div>
</template>
