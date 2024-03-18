import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        auth: false,
        layout: 'auth'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        auth: false,
        layout: 'auth'
      }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        auth: true,
        layout: 'main'
      }
    }
  ]
})

export default router
