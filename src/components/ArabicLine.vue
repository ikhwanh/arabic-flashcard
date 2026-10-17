<script setup lang="ts">
import { computed } from 'vue'
import { tokenize } from '../lib/arabic'

const props = defineProps<{
  arabic: string
  words: { arabic: string }[]
  activeWi?: number | null
  ayahSep?: boolean
}>()

const emit = defineEmits<{ word: [wi: number] }>()

const tokens = computed(() => tokenize(props.arabic, props.words.length, { ayahSep: props.ayahSep }))
</script>

<template>
  <div class="qs-arabic" dir="rtl">
    <!-- Kept on touching lines so exactly one space separates tokens, as in the source text. -->
    <template v-for="(t, i) in tokens" :key="i">{{ i > 0 ? ' ' : '' }}<button
        v-if="t.kind === 'word'"
        class="qs-word"
        :class="{ active: activeWi === t.wi }"
        @click.stop="emit('word', t.wi)"
      >{{ words[t.wi].arabic }}</button><span
        v-else-if="t.kind === 'sep'"
        class="qs-ayah-sep"
      >{{ t.text }}</span><span
        v-else
        class="qs-waqaf"
      >{{ t.text }}</span></template>
  </div>
</template>
