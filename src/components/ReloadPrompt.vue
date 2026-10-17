<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const UPDATE_CHECK_MS = 60 * 60 * 1000

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  // An installed app can stay open for days without a full page load, which is
  // the only time the browser checks for a new service worker on its own.
  onRegisteredSW(_url, registration) {
    if (registration) setInterval(() => registration.update(), UPDATE_CHECK_MS)
  },
})

function dismiss() {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast" role="status">
    <p class="pwa-toast-message">
      {{ needRefresh ? 'A new version is available.' : 'Ready to use offline.' }}
    </p>
    <div class="pwa-toast-actions">
      <button v-if="needRefresh" class="pwa-toast-reload" @click="updateServiceWorker()">Reload</button>
      <button class="pwa-toast-close" @click="dismiss">{{ needRefresh ? 'Later' : 'OK' }}</button>
    </div>
  </div>
</template>
