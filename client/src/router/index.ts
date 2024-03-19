import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './middlewares/routeGuards'

import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        layout: 'auth',
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        layout: 'auth',
        auth: false
      }
    },
    {
      path: '/',
      name: 'main',
      component: HomeView,
      meta: {
        layout: 'main',
        auth: true
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound,
      meta: {
        layout: 'main',
        auth: true
      }
    }
  ]
})

router.beforeEach(authGuard)

export default router
