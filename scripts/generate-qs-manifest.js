#!/usr/bin/env node
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const qsDir = join(__dirname, '..', 'src', 'data', 'qs-breakdown');
const manifestPath = join(qsDir, 'qs-manifest.json');

const files = readdirSync(qsDir)
  .filter(f => f.endsWith('.json') && f !== 'qs-manifest.json');

const entries = files.map(filename => {
  const data = JSON.parse(readFileSync(join(qsDir, filename), 'utf8'));
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
console.log(`Generated qs-manifest.json with ${entries.length} entries`);
