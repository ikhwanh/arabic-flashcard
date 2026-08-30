#!/usr/bin/env node
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const readingDir = join(__dirname, '..', 'src', 'data', 'reading');
const manifestPath = join(readingDir, 'reading-manifest.json');

const files = readdirSync(readingDir)
  .filter(f => f.endsWith('.json') && f !== 'reading-manifest.json');

const entries = files.map(filename => {
  const data = JSON.parse(readFileSync(join(readingDir, filename), 'utf8'));
  const id = basename(filename, '.json');
  return {
    id,
    surah: data.meta.surah,
    surahName: data.meta.surahName,
    from: data.meta.from,
    to: data.meta.to,
    title: data.meta.title,
    description: data.meta.description,
    verseCount: data.verses.length,
  };
});

// Sort by surah, then starting ayah
entries.sort((a, b) => a.surah - b.surah || a.from - b.from);

writeFileSync(manifestPath, JSON.stringify(entries, null, 2) + '\n');
console.log(`Generated reading-manifest.json with ${entries.length} entries`);
