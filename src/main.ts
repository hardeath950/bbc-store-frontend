import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { registerSW } from 'virtual:pwa-register'

import '~/assets/styles/themes/enl/theme.scss'

// SETUP UNO CSS
import '@unocss/reset/tailwind.css'
import 'uno.css'

import App from './App.vue'

registerSW({ immediate: true })
const app = createApp(App)
// SETUP LAYOUTS IN ROUTES
const routes = setupLayouts(generatedRoutes)
// CREATE ROUTER
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)

// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.({ app, router, routes }))

app.mount('#app')
