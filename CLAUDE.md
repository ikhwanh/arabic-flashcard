# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A Quranic Arabic learning SPA (word-by-word Quran and dzikir readers), built with Vue 3 (`<script setup lang="ts">` SFCs) + vue-router + Vite. Translations are in Indonesian. Deployed to GitHub Pages — pushes to `main` auto-build and deploy via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## Language conventions

- **Generated content** (word meanings, verse translations, any user-facing data) must be in **Indonesian**.
- **UI elements** (labels, buttons, headings, navigation, prompts in the interface) must be in **English**.

## Commands

```bash
npm run dev                      # Vite dev server
npm run build                    # vue-tsc type-check + vite build + copy index.html → 404.html (base path /arabic-flashcard/)
npm run preview                  # serve the production build
npm run generate-qs-manifest     # rebuild src/data/qs-breakdown/qs-manifest.json from all breakdown files
npm run generate-reading-manifest # rebuild src/data/reading/reading-manifest.json from all reading files
npm run generate-dzikir-manifest # rebuild src/data/dzikir/dzikir-manifest.json from all dzikir files
```

There is no test runner or linter; `vue-tsc` (run as part of `build`) is the only static check, and it covers `.vue` files. `tsconfig.json` enables `noUnusedLocals` / `noUnusedParameters`, so unused symbols fail the build.

## Architecture

**Path-based routing.** [src/router.ts](src/router.ts) uses vue-router with `createWebHistory(import.meta.env.BASE_URL)`. GitHub Pages has no SPA fallback, so `npm run build` copies `dist/index.html` to `dist/404.html` to serve deep links. Old hash URLs (`#qs/<id>`) are rewritten to their path equivalent at the top of `router.ts`, before the router reads the URL. Unknown paths (including the removed flashcard `/deck/…` and `/test/…` routes) redirect to `/`, which redirects to `/qs`. Routes (page components in [src/pages/](src/pages/)):
- `/qs` → Surah Breakdown index (`BreakdownIndex.vue`)
- `/qs/:id` → word-by-word verse reader (`QsBreakdownPage.vue`)
- `/qs/:id/quiz` → per-passage meaning quiz; each answer reveals the word's detail card (`QsQuizPage.vue`)
- `/qs/:id/game/:ayah?` → word-ordering game for the passage or one ayah (`QsGamePage.vue`)
- `/read` → **Yasin** tab. It renders the first reading surah inline (`ReadingTab.vue` → `ReadingPage.vue` with `embedded`), falling back to an empty-state grid when there is no reading data
- `/read/:id` → fluent Quran reader (`ReadingPage.vue`)
- `/dzikir` → Prayer and Dzikir index (`DzikirIndex.vue`)
- `/dzikir/:id` → prayer recitation / morning-evening dzikir reader (`DzikirPage.vue`)
- `/settings` → theme, reset all progress (`SettingsPage.vue`)

[src/App.vue](src/App.vue) is the shell: header with three tabs — **Breakdown** (`/qs`), **Yasin** (`/read`), **Prayer and Dzikir** (`/dzikir`) — plus the settings button and footer. Route `meta: { tab, header }` decides the active tab and whether the header shows (readers hide it). The active tab comes from the route, not internal state, so each reader's back button returns to the right tab. `<RouterView :key="route.fullPath">` remounts the page on every navigation, including param-only changes.

**PWA / offline.** [vite.config.ts](vite.config.ts) configures `vite-plugin-pwa`:
- **Install:** the manifest lives in the config. Icons are PNGs in `public/` (`pwa-*`, `maskable-icon-512x512.png`, `apple-touch-icon-180x180.png`, `favicon-64x64.png`).
- **Offline:** the generated Workbox service worker precaches *every* build asset, including all lazy surah/dzikir data chunks and the fonts, so the whole app works offline after the first load. Its navigation fallback serves `index.html` for deep links.
- **Updates:** `registerType: 'prompt'`. [src/components/ReloadPrompt.vue](src/components/ReloadPrompt.vue) shows a toast when a new version is waiting or the app is first ready offline, and checks for updates hourly. Never switch to auto-reload, because it would interrupt quizzes in progress.
- **Dev:** the service worker only exists in `npm run build` output. Test offline behavior against a build, not `npm run dev`.

**Surah Breakdown** is the main learning module. It renders a contiguous range of Quran verses for *reading comprehension*: each verse shows full Arabic + Indonesian translation, and tapping any word reveals a gentle, beginner-level grammar card (`ism`/`fi'l`/`harf` type, root, contextual meaning, optional note, and for `fi'l` words the past/present/future/command conjugation forms). Data lives in [src/data/qs-breakdown/](src/data/qs-breakdown/) as `{surah}_{from}-{to}.json` files (one passage per file), normalized by [src/data/qs-breakdown/index.ts](src/data/qs-breakdown/index.ts); `qs-manifest.json` is generated, never hand-edited. Generate new passages with the `/qs-breakdown <surah> <from> <to>` command ([.claude/commands/qs-breakdown.md](.claude/commands/qs-breakdown.md)), then run `npm run generate-qs-manifest`.

**Yasin** ([src/pages/ReadingPage.vue](src/pages/ReadingPage.vue)) is a separate, lighter reading module: a full surah rendered as Arabic only (no inline translation), where tapping any word reveals *just* its meaning (transliteration + Indonesian meaning) — no grammar, root, forms, or notes. Data lives in [src/data/reading/](src/data/reading/) as `{surah}_1-{ayahCount}.json` (one file per surah, full span), with minimal per-word `{ arabic, transliteration, meaning }`, normalized by [src/data/reading/index.ts](src/data/reading/index.ts); `reading-manifest.json` is generated, never hand-edited. Generate/extend a surah with the `/quran-reading <surah> [<from>] [<to>]` command ([.claude/commands/quran-reading.md](.claude/commands/quran-reading.md)) — batches merge into the one per-surah file — then run `npm run generate-reading-manifest`.

**Prayer and Dzikir** ([src/pages/DzikirPage.vue](src/pages/DzikirPage.vue)) is a parallel of the Yasin reader for prayer recitations (bacaan shalat) and morning/evening remembrances (dzikir pagi/petang). Same word-by-word tap-to-reveal interaction (reusing the `qs-*` classes), but each item is a repeated remembrance rather than a numbered ayat: the per-item badge shows the recitation count (e.g. `3×`) instead of an ayah number, with an optional item `title` and `source`. Morning/evening content is sourced from **Hisnul Muslim**; prayer recitations use the wording common in Indonesia. Prayer items whose action or recitation is an essential element of prayer (rukun, **Shafi'i**) carry `rukun: { part: 'action' | 'recitation' | 'both', note }`, rendered as a tappable tag. Data lives in [src/data/dzikir/](src/data/dzikir/) as numeric-prefixed files (`1.json` = morning, `2.json` = evening, `3.json` = prayer), each `{ meta: { id, time: 'prayer' | 'morning' | 'evening', title, description }, items: [{ title?, repeat, hadith?: { reference, arabic?, content }, rukun?, arabic, words: [{ arabic, transliteration, meaning }] }] }`, normalized by [src/data/dzikir/index.ts](src/data/dzikir/index.ts). The item `arabic` must split on spaces into exactly the `words[]` tokens in order. Generate/extend a set with the `/dzikir <prayer|morning|evening> [<from>] [<to>]` command ([.claude/commands/dzikir.md](.claude/commands/dzikir.md)), then run `npm run generate-dzikir-manifest`; `dzikir-manifest.json` is generated, never hand-edited.

Shared code:
- [src/components/](src/components/):
  - `ArabicLine` — waqaf-aware tappable word line, used by all three readers
  - `WordSheet` — bottom sheet with Escape/backdrop close
  - `WordDetail` — word meaning card; shows grammar fields when present
  - `QuizRunner` — question/answer/result flow for the breakdown quiz
  - `ConfirmDialog`, `ErrorPage`, `IndexCard`
- [src/lib/](src/lib/):
  - `progress.ts` — every localStorage score key, plus reset
  - `quiz.ts` — breakdown quiz question building
  - `qs-rounds.ts` — game rounds and `isVersePlayable`
  - `arabic.ts` — tokenizing a line into words, waqaf marks and ayah separators
  - `random.ts`
- [src/theme.ts](src/theme.ts) stays a framework-agnostic module that applies the theme to `document.documentElement`.
- Arabic text uses one self-hosted font, LPMQ Isep Misbah (the Kemenag mushaf font), declared in `src/style.css`. The bundled copy is patched to map U+0671 (alef wasla) to the plain alef glyph, because upstream has no glyph for it, and to fix the `allahumma` ligature (upstream draws the vowel marks into the glyph and has no mark anchors for it, so `اللَّهُمَّ` showed doubled marks).

`src/style.css` is a single global stylesheet. Components use its class names and have no scoped styles. Scores persist in `localStorage`. Vue can't observe localStorage, so derived views recompute from it on mount. JSON content is rendered with `{{ }}` interpolation. None of it contains HTML.
