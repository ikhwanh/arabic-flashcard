#!/usr/bin/env node
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const flashcardsDir = join(__dirname, '..', 'src', 'data', 'flashcards');
const manifestPath = join(flashcardsDir, 'manifest.json');

// Preserve existing emojis so they aren't overwritten on regeneration
let existingEmoji = {};
try {
  const existing = JSON.parse(readFileSync(manifestPath, 'utf8'));
  existingEmoji = Object.fromEntries(existing.map(e => [e.id, e.emoji]));
} catch {}

const files = readdirSync(flashcardsDir)
  .filter(f => f.endsWith('.json') && f !== 'manifest.json')
  .sort((a, b) => parseInt(a) - parseInt(b));

const entries = [];

for (const filename of files) {
  const data = JSON.parse(readFileSync(join(flashcardsDir, filename), 'utf8'));

  if (data.groups) {
    for (const group of data.groups) {
      entries.push({
        id: group.id,
        file: filename,
        title: group.group_title,
        description: group.group_description,
        emoji: existingEmoji[group.id] ?? '📌',
        cardCount: group.words.length,
      });
    }
  } else if (data.cards) {
    const title = data.meta.title;
    const id = title.toLowerCase().replace(/\s+/g, '-');
    entries.push({
      id,
      file: filename,
      title,
      description: data.meta.description,
      emoji: existingEmoji[id] ?? '📖',
      cardCount: data.cards.length,
    });
  }
}

writeFileSync(manifestPath, JSON.stringify(entries, null, 2) + '\n');
console.log(`Generated manifest.json with ${entries.length} entries`);
