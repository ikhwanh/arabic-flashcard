import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { readFileSync } from 'node:fs'

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  base: '/arabic-flashcard/',
  plugins: [
    vue(),
    VitePWA({
      // An auto-reload could wipe an in-progress quiz, so the user decides when
      // to switch to a new version (see ReloadPrompt.vue).
      registerType: 'prompt',
      manifest: {
        name: 'Arabic Flashcards',
        short_name: 'Arabic',
        description: 'Learn Quranic Arabic word by word: surah breakdowns, Yasin, and prayer & dzikir.',
        lang: 'en',
        theme_color: '#2563eb',
        background_color: '#f5f5f5',
        display: 'standalone',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache every lazy surah/dzikir chunk, the Arabic fonts and the ayah
        // audio so the whole app works offline, not just pages visited while online.
        globPatterns: ['**/*.{js,css,html,woff2,png,svg,mp3}'],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
})
