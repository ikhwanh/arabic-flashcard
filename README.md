# Arabic Flashcard

A Quranic Arabic learning app built with Vue 3, TypeScript and Vite, deployed to GitHub Pages.

**Live:** https://ikhwanh.github.io/arabic-flashcard/

## Features

- Surah Breakdown: verse-by-verse reading with a tap-to-reveal grammar card for every word (type, root, verb forms), plus a meaning quiz and a word-ordering game per passage
- Yasin: a fluent reader for Surah Yasin, tap any word for its meaning
- Prayer and Dzikir: prayer recitations and morning/evening remembrances, word by word
- Works offline as an installable PWA
- Dark/light theme toggle

## Getting Started

```bash
npm install
npm run dev
```

## Adding Content

Content is generated with Claude Code slash commands, each followed by its manifest script:

| Command | Then run |
| --- | --- |
| `/qs-breakdown <surah> <from> <to>` | `npm run generate-qs-manifest` |
| `/quran-reading <surah> [<from>] [<to>]` | `npm run generate-reading-manifest` |
| `/dzikir <prayer\|morning\|evening> [<from>] [<to>]` | `npm run generate-dzikir-manifest` |

## Deployment

Pushes to `main` automatically build and deploy to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
