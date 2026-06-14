# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A Quranic Arabic vocabulary flashcard SPA, built with vanilla TypeScript + Vite (no framework). Translations are in Indonesian. Deployed to GitHub Pages — pushes to `main` auto-build and deploy via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## Language conventions

- **Generated content** (card translations, vocabulary meanings, verse translations, any user-facing data) must be in **Indonesian**.
- **UI elements** (labels, buttons, headings, navigation, prompts in the interface) must be in **English**.

## Commands

```bash
npm run dev                      # Vite dev server
npm run build                    # tsc type-check + vite build (build base path is /arabic-flashcard/)
npm run preview                  # serve the production build
npm run generate-manifest        # rebuild src/data/flashcards/manifest.json from all deck JSON files
npm run generate-qs-manifest     # rebuild src/data/qs-breakdown/qs-manifest.json from all breakdown files
```

There is no test runner or linter; `tsc` (run as part of `build`) is the only static check. `tsconfig.json` enables `noUnusedLocals` / `noUnusedParameters`, so unused symbols fail the build.

## Architecture

**Hash-based routing.** [src/main.ts](src/main.ts) renders the shell and routes on `window.location.hash`:
- `` (empty) → deck navigation grid ([src/pages/navigation.ts](src/pages/navigation.ts))
- `#deck/<id>` → flashcard viewer ([src/pages/flashcard.ts](src/pages/flashcard.ts))
- `#deck/<id>/quiz` → per-deck quiz ([src/pages/quiz.ts](src/pages/quiz.ts))
- `#test` → 50-question exam across all decks ([src/pages/test.ts](src/pages/test.ts))
- `#qs` → navigation page with the Surah Breakdown tab active
- `#qs/<id>` → word-by-word verse reader ([src/pages/qs-breakdown.ts](src/pages/qs-breakdown.ts))

The navigation page ([src/pages/navigation.ts](src/pages/navigation.ts)) has two tabs — **Flashcard** (deck grid, route ``) and **Surah Breakdown** (route `#qs`). The active tab is driven by the hash, not internal state, so the QS reader's back button (`#qs`) returns to the right tab.

**Surah Breakdown** is a separate learning module from decks (not a flashcard). It renders a contiguous range of Quran verses for *reading comprehension*: each verse shows full Arabic + Indonesian translation, and tapping any word reveals a gentle, beginner-level grammar card (`ism`/`fi'l`/`harf` type, root, contextual meaning, optional note). Data lives in [src/data/qs-breakdown/](src/data/qs-breakdown/) as `{surah}_{from}-{to}.json` files (one passage per file), normalized by [src/data/qs-breakdown/index.ts](src/data/qs-breakdown/index.ts); `qs-manifest.json` is generated, never hand-edited. Generate new passages with the `/qs-breakdown <surah> <from> <to>` command ([.claude/commands/qs-breakdown.md](.claude/commands/qs-breakdown.md)), then run `npm run generate-qs-manifest`.

Each page module exports a `render*(container, ...)` function that owns its own `innerHTML` and event wiring. There is no shared component layer or virtual DOM — pages re-render by reassigning `innerHTML`. Scores persist in `localStorage`.

**Data layer is the core complexity.** Decks live as numbered JSON files in [src/data/flashcards/](src/data/flashcards/) and come in **two distinct on-disk formats** (see [src/types.ts](src/types.ts)):
- **Grouped format** (`{ groups: [...] }`, e.g. `0.json`) — one file holds multiple decks; each group is its own deck. Cards are minimal (no root/forms/relatedWords).
- **Vocab format** (`{ cards: [...] }`) — one file = one deck of rich vocab cards with `root`, `forms`, `related_words`, `quran_example`.

[src/data/flashcards/index.ts](src/data/flashcards/index.ts) normalizes both into the unified `Card`/`Deck` app types via `loadDeck(id)` and `loadAllCards()`. JSON files are lazy-loaded with `import.meta.glob`. Note: `loadAllCards()` (used by the exam) deliberately **excludes grouped files** (`0.json`) and only aggregates vocab-format decks.

**manifest.json is generated, not hand-edited.** [scripts/generate-manifest.js](scripts/generate-manifest.js) scans all deck files and emits the `DeckMeta[]` list the navigation page reads. It preserves existing `emoji` values across regenerations. Always run `npm run generate-manifest` after adding/changing deck data, and never edit `manifest.json` by hand.

## Adding vocabulary

To add a word: fetch its verse context from the Quran Cloud API (`https://api.alquran.cloud/v1/ayah/<surah>:<ayah>/editions/quran-uthmani,id.indonesian`), build a vocab-format card (Arabic, transliteration, Indonesian translation, `root`, `forms`, `related_words`, `quran_example`), append it to the appropriate vocab deck file, then run `npm run generate-manifest`. Check for duplicates by comparing Arabic with diacritics stripped.

Auto-generated cards go into sequential vocab part files — when the current part file reaches its card limit, create the next sequential number (e.g. `13.json` after `12.json`). Do **not** use `99.json`, which is reserved as a special user-curated file.
