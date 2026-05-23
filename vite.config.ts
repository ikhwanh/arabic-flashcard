import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  base: '/arabic-flashcard/',
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
})
