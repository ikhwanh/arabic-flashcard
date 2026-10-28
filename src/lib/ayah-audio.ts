import { onBeforeUnmount, ref } from 'vue'

export const RECITER = 'Mahmoud Khalil Al-Husary'

const pad = (n: number) => String(n).padStart(3, '0')

export function ayahAudioUrl(surah: number, ayah: number): string {
  return `${import.meta.env.BASE_URL}audio/husary/${pad(surah)}${pad(ayah)}.mp3`
}

export type AyahAudioStatus = 'loading' | 'playing' | 'error'

// One player per page: starting an ayah stops the previous one, and leaving
// the page stops playback.
export function useAyahAudio() {
  const current = ref<{ ayah: number; status: AyahAudioStatus } | null>(null)
  const audio = new Audio()
  let objectUrl: string | null = null
  let request = 0

  function release() {
    audio.pause()
    audio.removeAttribute('src')
    if (objectUrl) URL.revokeObjectURL(objectUrl)
    objectUrl = null
  }

  function stop() {
    request++
    release()
    current.value = null
  }

  async function toggle(surah: number, ayah: number) {
    const replay = current.value?.ayah === ayah && current.value.status !== 'error'
    stop()
    if (replay) return
    const id = request
    current.value = { ayah, status: 'loading' }
    try {
      // Played from a blob rather than the URL: <audio src> sends Range
      // requests, which the service worker's precache answers with a full
      // 200 that Safari refuses to play.
      const res = await fetch(ayahAudioUrl(surah, ayah))
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const blob = await res.blob()
      if (id !== request) return
      objectUrl = URL.createObjectURL(blob)
      audio.src = objectUrl
      await audio.play()
      if (id === request) current.value = { ayah, status: 'playing' }
    } catch {
      if (id !== request) return
      release()
      current.value = { ayah, status: 'error' }
    }
  }

  audio.addEventListener('ended', stop)
  onBeforeUnmount(stop)

  return { current, toggle }
}
