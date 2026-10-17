<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { NavTab } from './router'
import ReloadPrompt from './components/ReloadPrompt.vue'

const TABS: { tab: NavTab; label: string; path: string }[] = [
  { tab: 'flashcard', label: 'Flashcard', path: '/' },
  { tab: 'breakdown', label: 'Breakdown', path: '/qs' },
  { tab: 'reading', label: 'Yasin', path: '/read' },
  { tab: 'dzikir', label: 'Prayer and Dzikir', path: '/dzikir' },
]

const appVersion = __APP_VERSION__

const route = useRoute()
const router = useRouter()

const drawerOpen = ref(false)
const title = computed(() => TABS.find(t => t.tab === route.meta.tab)?.label ?? 'Settings')

function goTab(path: string) {
  router.push(path)
  drawerOpen.value = false
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') drawerOpen.value = false
}

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="app-header" :hidden="!route.meta.header">
    <button
      class="nav-toggle"
      aria-label="Open menu"
      :aria-expanded="drawerOpen"
      aria-controls="nav-drawer"
      @click="drawerOpen = !drawerOpen"
    >☰</button>
    <span class="app-title">{{ title }}</span>
    <nav class="header-tabs" :class="{ open: drawerOpen }" id="nav-drawer" role="tablist" aria-label="Sections">
      <button
        v-for="t in TABS"
        :key="t.tab"
        class="header-tab"
        :class="{ active: route.meta.tab === t.tab }"
        role="tab"
        @click="goTab(t.path)"
      >{{ t.label }}</button>
    </nav>
    <div class="header-actions">
      <button class="settings-toggle" aria-label="Settings" @click="router.push('/settings')">⚙️</button>
    </div>
    <div class="nav-scrim" :hidden="!drawerOpen" @click="drawerOpen = false"></div>
  </header>
  <main class="app-main" id="main-content">
    <RouterView :key="route.fullPath" />
  </main>
  <footer class="app-footer">
    <a class="github-link" href="https://github.com/ikhwanh/arabic-flashcard" target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      <span>Source on GitHub</span>
    </a>
    <span class="app-version">v{{ appVersion }}</span>
  </footer>
  <ReloadPrompt />
</template>
