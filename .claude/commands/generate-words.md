# Generate Top Quran Words

Generate 10 vocabulary cards from the most frequently occurring words in the Quran, skipping any that already exist in the deck.

## Usage
```
/generate-words
```

## Steps

### 1. Read existing cards
Read every `.json` file in `src/data/flashcards/`. Collect all existing Arabic words:
- Vocab files (`cards` array): each card's `arabic` field
- Grouped files (`groups` array): every word's `arabic` field in every group

Build a set of normalised forms (strip harakat) for duplicate checking:
```
normalise(s) = s.replace(/[ً-ٰٟ]/g, '').trim()
```

Also note the current maximum card `id` across all vocab files and the current highest-numbered vocab filename.

### 2. Select 10 candidate words
Using your knowledge of Quran vocabulary frequency, pick the next 10 most-common meaningful Quran words that are **not** already in the deck (after normalisation). Prioritise by estimated Quran occurrence count, highest first.

Skip:
- Words already in the deck
- Pure grammatical particles with no standalone meaning (e.g. و، ف، ب، ل as prefixes)
- Proper nouns (Allah, Muhammad, Jibreel, place names)

Good candidates include high-frequency nouns, verbs, and adjectives such as: قَالَ، اللَّه (skip — proper noun), آمَنَ، كِتَاب، يَوْم، نَاس، أَرْض، سَمَاء، عَبْد، حَقّ، خَيْر، etc.

### 3. For each word — fetch a Quran verse example
For each selected word, pick a well-known short verse that contains it. Use WebFetch to fetch:

```
https://api.alquran.cloud/v1/ayah/<surah>:<ayah>/editions/quran-uthmani,id.indonesian
```

Extract:
- `data[0].text` → Arabic verse text
- `data[1].text` → Indonesian translation
- `data[0].surah.englishName` → surah name in English
- `data[0].numberInSurah` → ayah number

If a fetch fails for a word, skip it and pick the next candidate so you still end up with 10 cards.

### 4. Generate each vocab card
For each word, using your Arabic linguistics knowledge, produce:

- `arabic` — fully voweled form with harakat (even if the candidate was bare)
- `transliteration` — standard Latin transliteration
- `translation` — concise Indonesian meaning
- `word_type` — one of: `noun`, `verb`, `adjective`, `adverb`, `pronoun`, `preposition`, `conjunction`, `particle`
- `root` — three-letter root, dash-separated (e.g. `ك-ت-ب`), or `""` if not applicable
- `forms` — relevant forms (use `null` for unavailable):
  - Nouns: `singular`, `plural`
  - Verbs: `past`, `present`, `command`
  - Others: `{}`
- `related_words` — 2–3 related words with Indonesian translations
- `quran_example` — from the API response above

### 5. Determine target file(s)
**Max 10 cards per file rule.** Starting from the highest-numbered vocab file:
- If it has fewer than 10 cards, fill it up first.
- Once a file hits 10, create the next numbered file (e.g. `2.json` → `3.json`).

New file `meta` block:
```json
{
  "title": "Kosakata Al-Quran - Part <N>",
  "description": "Kata-kata bermakna yang paling sering muncul di Al-Quran",
  "range": "<start>-<end>"
}
```
Where `<N>` is the part number, `<start>` and `<end>` are the `id` range of cards in that file.

Assign `id` values sequentially starting from `max_existing_id + 1`.

### 6. Write the files
Write all updated or newly created JSON files. Keep 2-space indentation to match the existing style.

### 7. Update the manifest
Read `src/data/flashcards/manifest.json`. For each file that was updated or created:

- **Updated file** (cards appended): find the entry with matching `file` field and set `cardCount` to the new total card count of that file.
- **New file created**: append a new entry:
  ```json
  {
    "id": "<deck_id>",
    "file": "<filename>",
    "title": "<meta.title>",
    "description": "<meta.description>",
    "emoji": "📖",
    "cardCount": <number of cards in new file>
  }
  ```
  where `deck_id` is `meta.title.toLowerCase().replace(/\s+/g, '-')`.

Write the updated `manifest.json` with 2-space indentation.

### 8. Confirm
Report a summary table:

```
✅ Generated 10 words across <n> file(s):

 #  | Arabic       | Translation          | File
----|--------------|----------------------|----------------
 11 | كِتَاب       | kitab, buku          | 2.json
 12 | يَوْم        | hari                 | 2.json
 ...
```
