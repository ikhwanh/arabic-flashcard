#!/usr/bin/env node
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dzikirDir = join(__dirname, '..', 'src', 'data', 'dzikir');
const manifestPath = join(dzikirDir, 'dzikir-manifest.json');

const files = readdirSync(dzikirDir)
  .filter(f => f.endsWith('.json') && f !== 'dzikir-manifest.json');

const entries = files.map(filename => {
  const data = JSON.parse(readFileSync(join(dzikirDir, filename), 'utf8'));
  const id = basename(filename, '.json');
  return {
    id,
    time: data.meta.time,
    title: data.meta.title,
    description: data.meta.description,
    itemCount: data.items.length,
  };
});

// Sort by time (morning before evening), then id
const timeOrder = { morning: 0, evening: 1 };
entries.sort((a, b) => timeOrder[a.time] - timeOrder[b.time] || a.id.localeCompare(b.id));

writeFileSync(manifestPath, JSON.stringify(entries, null, 2) + '\n');
console.log(`Generated dzikir-manifest.json with ${entries.length} entries`);
