<script setup lang="ts">
import { useRouter } from 'vue-router'

withDefaults(defineProps<{ message: string; backTo: string; backLabel?: string }>(), { backLabel: '← Back' })

const router = useRouter()
</script>

<template>
  <div class="error-page">
    <p>{{ message }}</p>
    <button class="btn-back" @click="router.push(backTo)">{{ backLabel }}</button>
  </div>
</template>
