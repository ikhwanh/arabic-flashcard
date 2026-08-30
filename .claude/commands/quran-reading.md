# Generate Quran Reading data

Generate lightweight, word-by-word reading data for a range of Quran verses, written in Indonesian. Output goes to `src/data/reading/{surah}_1-{ayahCount}.json` (one file per surah, spanning its full length) and powers the "Read" page in the app.

This is **not** the Surah Breakdown command. The Read page shows Arabic only (no inline translation) and, when a word is tapped, reveals **just its meaning** — so this data is intentionally minimal: no grammar type, root, verb forms, notes, official translation, literal translation, or game segments.

## Usage
```
/quran-reading <surah> [<from>] [<to>]
```
Examples:
- `/quran-reading 36` → all of QS Yasin.
- `/quran-reading 36 1 20` → QS Yasin ayat 1–20 (a batch).

If `<from>`/`<to>` are omitted, generate the whole surah. Generate long surahs in batches (e.g. 1–20, 21–40, …); every batch merges into the same per-surah file.

## Audience & tone

For **beginners** reading personally. Meanings must be in **Indonesian**, concise, and faithful to the word's meaning in its verse context.

## Steps

### 1. Determine the surah's ayah count
Fetch the surah once to learn its total number of ayahs:
```
https://api.alquran.cloud/v1/surah/<surah>
```
Read `data.numberOfAyahs` → this is `ayahCount`. `data.englishName` → `surahName`. The output file is always `{surah}_1-{ayahCount}.json`, and `meta.from = 1`, `meta.to = ayahCount`, regardless of the batch range.

If `<from>`/`<to>` are omitted, set the batch to `1`…`ayahCount`.

### 2. Fetch each verse in the batch
For each ayah from `<from>` to `<to>`, fetch:
```
https://api.alquran.cloud/v1/ayah/<surah>:<ayah>/editions/quran-uthmani
```
Extract `data.text` → Arabic verse (Uthmani).

**Bismillah note:** the API prepends `بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ` to the first ayah of every surah except At-Tawbah (9) and Al-Fatihah (1, where it is ayah 1 itself). When ayah 1 of any surah other than 1 and 9 is fetched, **strip that leading Bismillah phrase** from the Arabic text before breaking it into words, since it is not part of ayah 1's own words.

### 3. Break each verse into words
Split the verse Arabic into its individual words **in reading order** (right to left, but stored left-to-right in the array as they appear in the text). Keep attached particles/pronouns together with their word as they are written (e.g. `عَبْدِهِ`, `لِيَكُونَ`). Standalone waqaf/pause marks (ۖ ۗ ۚ …) are **not** words — skip them (the app renders them from the verse text automatically). For each real word produce only:

- `arabic` — the word exactly as it appears in the verse, with harakat
- `transliteration` — standard Latin transliteration
- `meaning` — concise **Indonesian** meaning, in this verse's context

### 4. Build / merge the file
Target file: `src/data/reading/{surah}_1-{ayahCount}.json`, 2-space indentation.

- If the file does **not** exist, create it with `meta` and the batch's verses.
- If it **does** exist, merge: insert or replace each generated verse by `ayah` number, then sort `verses` ascending by `ayah`. Keep `meta` as the full surah span.

```json
{
  "meta": {
    "surah": 36,
    "surahName": "Ya-Sin",
    "from": 1,
    "to": 83,
    "title": "Ya-Sin 1–83",
    "description": "<one gentle Indonesian sentence describing the surah>"
  },
  "verses": [
    {
      "ayah": 1,
      "arabic": "<verse arabic>",
      "words": [
        {
          "arabic": "يس",
          "transliteration": "yaa siin",
          "meaning": "Ya Sin"
        }
      ]
    }
  ]
}
```

Use a clean English `title` like `<surahName> 1–<ayahCount>`.

### 5. Regenerate the manifest
```
node scripts/generate-reading-manifest.js
```

### 6. Confirm
Report a short summary: surah, ayah range covered in this batch, total verses now in the file, total words in the batch, and the output file path. Remind the user that the per-word meanings are your analysis (not from an API) and worth a quick eyeball.
