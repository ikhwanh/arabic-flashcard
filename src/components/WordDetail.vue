<script setup lang="ts">
import type { QsWord, ReadingWord, VerbForms, WordType } from '../types'

defineProps<{ word: ReadingWord & Partial<Pick<QsWord, 'type' | 'root' | 'forms' | 'notes'>> }>()

const TYPE_LABEL: Record<WordType, string> = {
  ism:    'kata benda (ism)',
  "fi'l": 'kata kerja (fi\'l)',
  harf:   'kata tugas (harf)',
}

const FORM_LABEL: Record<keyof VerbForms, string> = {
  past:    'Lampau',
  present: 'Sekarang',
  future:  'Akan datang',
  command: 'Perintah',
}

function typeClass(type: WordType): string {
  return `qs-type-${type === "fi'l" ? 'fil' : type}`
}

function formKeys(forms: VerbForms) {
  return (Object.keys(FORM_LABEL) as (keyof VerbForms)[]).filter(k => forms[k])
}
</script>

<template>
  <div class="qs-detail">
    <div class="qs-detail-head">
      <span class="qs-detail-arabic">{{ word.arabic }}</span>
      <span class="qs-detail-translit">{{ word.transliteration }}</span>
    </div>
    <span class="qs-detail-meaning">{{ word.meaning }}</span>
    <div v-if="word.type" class="qs-detail-tags">
      <span class="qs-type-badge" :class="typeClass(word.type)">{{ TYPE_LABEL[word.type] }}</span>
      <span v-if="word.root" class="qs-detail-root">Akar: {{ word.root }}</span>
    </div>
    <div v-if="word.forms && formKeys(word.forms).length" class="qs-forms" dir="rtl">
      <span v-for="k in formKeys(word.forms)" :key="k" class="qs-form">
        <span class="qs-form-label">{{ FORM_LABEL[k] }}</span>
        <span class="qs-form-arabic">{{ word.forms[k] }}</span>
      </span>
    </div>
    <p v-if="word.notes" class="qs-detail-notes">{{ word.notes }}</p>
  </div>
</template>
