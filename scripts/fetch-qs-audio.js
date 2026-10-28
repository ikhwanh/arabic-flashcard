#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const qsDir = join(__dirname, '..', 'src', 'data', 'qs-breakdown');
const audioDir = join(__dirname, '..', 'public', 'audio', 'husary');
const SOURCE = 'https://everyayah.com/data/Husary_64kbps';

const pad = n => String(n).padStart(3, '0');

const files = readdirSync(qsDir)
  .filter(f => f.endsWith('.json') && f !== 'qs-manifest.json');

const wanted = new Set();
for (const filename of files) {
  const data = JSON.parse(readFileSync(join(qsDir, filename), 'utf8'));
  for (const verse of data.verses) wanted.add(`${pad(data.meta.surah)}${pad(verse.ayah)}.mp3`);
}

mkdirSync(audioDir, { recursive: true });

let downloaded = 0;
for (const name of [...wanted].sort()) {
  const dest = join(audioDir, name);
  if (existsSync(dest)) continue;
  const res = await fetch(`${SOURCE}/${name}`);
  if (!res.ok || !res.headers.get('content-type')?.startsWith('audio/')) {
    console.error(`Failed to download ${name}: HTTP ${res.status}`);
    process.exitCode = 1;
    continue;
  }
  // Saved byte for byte: the recordings may be shared only unaltered.
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  downloaded++;
  console.log(`Downloaded ${name}`);
}

console.log(`${wanted.size} ayahs referenced, ${downloaded} downloaded`);
