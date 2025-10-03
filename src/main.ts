import { createApp } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Imprint from './views/Imprint.vue'
import Privacy from './views/Privacy.vue'

// Define routes with TypeScript types
const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  { path: '/imprint', name: 'Imprint', component: Imprint },
  { path: '/privacy', name: 'Privacy', component: Privacy }
]

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create and mount the app
const app = createApp(App)
app.use(router)
app.mount('#app')