# Generate Dzikir data

Generate word-by-word data for **morning/evening remembrance** (dzikir pagi/petang), written in Indonesian, from the **Hisnul Muslim** collection. Output goes to `src/data/dzikir/{id}.json` (`1.json` = morning, `2.json` = evening) and powers the "Dzikir" page in the app.

This mirrors the `/quran-reading` command but for adhkar. The Dzikir page shows Arabic only and, when a word is tapped, reveals **just its meaning**. Each item also carries an optional source **hadith** (reference + Arabic + Indonesian narration) revealed behind a 📖 icon.

## Usage
```
/dzikir <morning|evening> [<from>] [<to>]
```
- `<morning|evening>` selects the target file (`1.json` / `2.json`).
- `<from>`/`<to>` are 1-based item positions in the standard Hisnul Muslim order (for batching). Omit to generate the full set.

Generate in batches (e.g. items 1–8, then 9–16); each batch merges into the same file by item order.

## Source & fidelity

- Content is from **Hisnul Muslim** (Sa'id bin Ali al-Qahtani). Use the well-known morning/evening chapter.
- Arabic must carry full harakat. Transliteration uses the same Latin-diacritic style as existing items (e.g. `aṣbaḥnā`, `yaḍurru`).
- Meanings and hadith `content` must be in **Indonesian**, concise and faithful.
- Every `hadith.reference` should cite the collection and number where known (e.g. `HR. Muslim no. 2708`).

## Data shape

Target file `src/data/dzikir/{id}.json`, 2-space indentation:

```json
{
  "meta": {
    "id": "1",
    "time": "morning",
    "title": "Dzikir Pagi",
    "description": "<one gentle Indonesian sentence>"
  },
  "items": [
    {
      "title": "<short Indonesian label, e.g. \"Ayat Kursi\">",
      "repeat": 1,
      "hadith": {
        "reference": "HR. Muslim no. 2708",
        "arabic": "<optional hadith Arabic>",
        "content": "<Indonesian narration / virtue of this dzikir>"
      },
      "arabic": "<full remembrance text, space-joined tokens>",
      "words": [
        { "arabic": "أَصْبَحْنَا", "transliteration": "aṣbaḥnā", "meaning": "kami memasuki waktu pagi" }
      ]
    }
  ]
}
```

Rules:
- `arabic` is space-joined and must split into exactly the tokens listed in `words[]`, in order. Keep attached particles/pronouns together as written.
- `repeat` is the recitation count (e.g. 1, 3, 7, 100).
- `hadith` is **optional** — omit it for items with no single sourcing hadith; the app renders the 📖 icon only when present.
- Morning and evening share most items with `aṣbaḥnā`↔`amsaynā` (and similar) swapped; keep them parallel.

## Steps

1. Build each item's Arabic + word-by-word breakdown + hadith from Hisnul Muslim.
2. Merge into `src/data/dzikir/{id}.json` by item order (create the file with `meta` if absent).
3. Regenerate the manifest:
   ```
   node scripts/generate-dzikir-manifest.js
   ```
4. Report: which file, item range covered, total items now in the file, and remind the user the Arabic/meanings/hadith are your analysis and worth a quick eyeball against a trusted Hisnul Muslim copy.
