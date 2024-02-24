import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { auth } from './includes/firebase'
import VeeValidationRule from '@/includes/validation'

import './assets/tailwind.css'
import './assets/main.css'

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(VeeValidationRule)

    app.mount('#app')
  }
})
