# Generate Surah Breakdown

Generate a beginner-friendly, word-by-word grammatical breakdown of a range of Quran verses, written in Indonesian. Output goes to `src/data/qs-breakdown/{surah}_{from}-{to}.json` and powers the "Surah Breakdown" reader in the app.

## Usage
```
/qs-breakdown <surah> <from> <to>
```
Example: `/qs-breakdown 25 1 10` → QS Al-Furqan, ayat 1–10.

If `<to>` is omitted, generate just the single `<from>` ayah.

## Audience & tone

This is for **beginners** studying personally. Keep it **gentle**:
- Indonesian for everything user-facing (meaning, notes, description).
- Use the simple three-category word-type system only: `ism`, `fi'l`, `harf`. **Do not** include full i'rab case analysis (marfu'/manshub/majrur).
- `notes` is optional — add a single short, friendly Indonesian sentence only when it genuinely helps (e.g. "Kata kerja bentuk lampau" / "Akhiran -hu berarti 'nya'"). Skip it otherwise.

## Steps

### 1. Fetch each verse
For each ayah from `<from>` to `<to>`, fetch:
```
https://api.alquran.cloud/v1/ayah/<surah>:<ayah>/editions/quran-uthmani,id.indonesian
```
Extract:
- `data[0].text` → Arabic verse (Uthmani)
- `data[1].text` → Indonesian translation
- `data[0].surah.englishName` → surah name (use for `surahName`)

**Bismillah note:** the API prepends `بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ` to the first ayah of every surah except At-Tawbah (9) and Al-Fatihah (1, where it is ayah 1 itself). When ayah 1 of any surah other than 1 and 9 is fetched, **strip that leading Bismillah phrase** from the Arabic text before breaking it into words, since it is not part of ayah 1's own words.

### 2. Break each verse into words
Split the verse Arabic into its individual words **in reading order** (right to left, but stored left-to-right in the array as they appear in the text). Keep attached particles/pronouns together with their word as they are written (e.g. `عَبْدِهِ`, `لِيَكُونَ`). For each word, using your Arabic linguistics knowledge, produce:

- `arabic` — the word exactly as it appears in the verse, with harakat
- `transliteration` — standard Latin transliteration
- `meaning` — concise **Indonesian** meaning, in this verse's context
- `type` — one of `ism`, `fi'l`, `harf`
- `root` — three-letter root, space-separated Arabic letters (e.g. `ب ر ك`). Omit the field for particles (`harf`) that have no root.
- `notes` — optional, see tone guidance above

### 3. Build the file
Write `src/data/qs-breakdown/<surah>_<from>-<to>.json` (for a single ayah, use `<surah>_<from>-<from>.json`) with 2-space indentation:

```json
{
  "meta": {
    "surah": 25,
    "surahName": "Al-Furqan",
    "from": 1,
    "to": 10,
    "title": "Al-Furqan 1–10",
    "description": "<one gentle Indonesian sentence describing the passage>"
  },
  "verses": [
    {
      "ayah": 1,
      "arabic": "<verse arabic>",
      "translation": "<indonesian translation>",
      "words": [
        {
          "arabic": "تَبَارَكَ",
          "transliteration": "tabaaraka",
          "meaning": "Maha Suci / Maha Berkah",
          "type": "fi'l",
          "root": "ب ر ك",
          "notes": "Kata kerja bentuk lampau."
        }
      ]
    }
  ]
}
```

Use a clean English `title` like `<surahName> <from>–<to>`.

### 4. Regenerate the manifest
```
node scripts/generate-qs-manifest.js
```

### 5. Confirm
Report a short summary: surah, ayah range, number of verses, total words, and the output file path. Remind the user that the per-word grammar is your analysis (not from an API) and worth a quick eyeball.
