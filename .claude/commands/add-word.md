# Add Vocab Word

Add a new Arabic vocabulary word to the flashcard deck, pulling its Quran verse context automatically.

## Usage
```
/add-word <surah>:<ayah> <arabic_word>
```
Example: `/add-word 12:23 رَبّ`

## Steps

### 1. Parse arguments
From `$ARGUMENTS`, extract:
- `surah_ref` — the `<surah>:<ayah>` part (e.g. `12:23`)
- `surah_number` and `ayah_number` as integers
- `arabic_word` — the Arabic text (e.g. `رَبّ`)

If either part is missing or malformed, stop and tell the user:
```
Usage: /add-word <surah>:<ayah> <arabic_word>
Example: /add-word 12:23 رَبّ
```

### 2. Check for duplicates
Read every `.json` file in `src/data/flashcards/`. For vocab files (those with a `cards` array), check each card's `arabic` field. For grouped files (those with a `groups` array), check every word's `arabic` field in every group.

Compare by stripping diacritics (harakat) before comparing — use this normalization:
```
normalise(s) = s.replace(/[ً-ٰٟ]/g, '').trim()
```

If a match is found, stop and report:
```
⚠️  "<arabic_word>" already exists in <filename> (card id: <id> / group: <group_id>).
```

### 3. Fetch the Quran verse
Use WebFetch to call the Quran Cloud API for the specific verse in two editions — Arabic and English translation:

```
https://api.alquran.cloud/v1/ayah/<surah>:<ayah>/editions/quran-uthmani,id.indonesian
```

From the response extract:
- `data[0].text` → Arabic verse text
- `data[1].text` → Indonesian translation of the verse
- `data[0].surah.englishName` → surah name in English (e.g. "Yusuf")
- `data[0].numberInSurah` → ayah number

If the API call fails, ask the user to provide the verse text manually.

### 4. Generate the vocab card with Claude
Using your knowledge of Arabic linguistics, generate a complete vocab card for `arabic_word`:

- `arabic` — the word exactly as the user typed it
- `transliteration` — standard transliteration (e.g. `rabb`)
- `translation` — concise Indonesian meaning (since existing cards use Indonesian), e.g. `Tuhan, Pemelihara`
- `word_type` — one of: `noun`, `verb`, `adjective`, `adverb`, `pronoun`, `preposition`, `conjunction`, `particle`
- `root` — three-letter Arabic root, dash-separated (e.g. `ر-ب-ب`), or empty string if not applicable
- `forms` — object with relevant forms (use `null` for unavailable forms):
  - For nouns: `singular`, `plural`
  - For verbs: `past`, `present`, `command`
  - For others: `{}` (empty object)
- `related_words` — array of 2–3 related Arabic words with their Indonesian translations
- `quran_example` — use the fetched verse data:
  ```json
  {
    "arabic": "<full verse text from API>",
    "translation": "<Indonesian verse translation from API>",
    "surah": "<surah English name from API>",
    "ayah": <ayah number as integer>
  }
  ```

### 5. Determine the target file
Look at the existing vocab files (`cards` array format) in `src/data/flashcards/`. Pick the file with the lowest numeric filename starting from 99 and decrementing (e.g. if `99.json` and `98.json` exist, use `98.json`).

**Max 10 cards per file rule:** If that file already has 10 cards, create a new file by decrementing the number (e.g. from `99.json` → `98.json`). Copy the `meta` block from the previous file, and start its `cards` array with just the new card.

Determine the next `id` by finding the maximum `id` value across **all** cards in **all** vocab files, then adding 1.

### 6. Write the card
Append the new card object to the `cards` array in the target file. Keep the existing JSON formatting style (2-space indentation). Write the updated file.

### 7. Update the manifest
Read `src/data/flashcards/manifest.json`. Find the entry whose `file` matches the target filename.

- If the entry exists: increment its `cardCount` by 1. If a new file was created instead, add a new entry:
  ```json
  {
    "id": "<deck_id>",
    "file": "<filename>",
    "title": "<meta.title>",
    "description": "<meta.description>",
    "emoji": "📖",
    "cardCount": 1
  }
  ```
  where `deck_id` is `meta.title.toLowerCase().replace(/\s+/g, '-')`.

Write the updated `manifest.json` with 2-space indentation.

### 8. Confirm
Report:
```
✅ Added "<arabic_word>" to src/data/flashcards/<filename>.json (id: <new_id>)
   Translation: <translation>
   Root: <root>
   Quran ref: <surah_name> <ayah>
```
