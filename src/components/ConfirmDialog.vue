<script setup lang="ts">
import { onMounted, ref } from 'vue'

withDefaults(defineProps<{ title: string; message: string; confirmLabel?: string }>(), { confirmLabel: 'Reset' })
const emit = defineEmits<{ confirm: []; cancel: [] }>()

const cancelBtn = ref<HTMLButtonElement>()
onMounted(() => cancelBtn.value?.focus())
</script>

<template>
  <Teleport to="body">
    <div class="confirm-overlay" @click.self="emit('cancel')">
      <div class="confirm-dialog">
        <p class="confirm-title">{{ title }}</p>
        <p class="confirm-message">{{ message }}</p>
        <div class="confirm-actions">
          <button ref="cancelBtn" class="confirm-cancel" @click="emit('cancel')">Cancel</button>
          <button class="confirm-ok" @click="emit('confirm')">{{ confirmLabel }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
