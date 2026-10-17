import './style.css'
import './font'
import { createApp } from 'vue'
import { initTheme } from './theme'
import { router } from './router'
import App from './App.vue'

initTheme()

createApp(App).use(router).mount('#app')
