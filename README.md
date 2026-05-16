# Arabic Flashcard

A Quranic Arabic vocabulary flashcard app built with TypeScript and Vite, deployed to GitHub Pages.

**Live:** https://ikhwanh.github.io/arabic-flashcard/

## Features

- Flashcard decks for Quranic vocabulary (nouns, verbs, particles, prepositions, etc.)
- Each card includes Arabic text, transliteration, Indonesian translation, word root, grammatical forms, related words, and a Quran verse example
- Dark/light theme toggle

## Getting Started

```bash
npm install
npm run dev
```

## Adding Vocabulary

Use the `/add-word` slash command in Claude Code to add a new word from a specific Quran verse:

```
/add-word <surah>:<ayah> <arabic_word>
```

Example:

```
/add-word 12:23 رَبّ
```

This fetches the verse from the Quran Cloud API, generates a complete vocab card, and appends it to the appropriate file in [src/data/flashcards/](src/data/flashcards/).


## Deployment

Pushes to `main` automatically build and deploy to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
