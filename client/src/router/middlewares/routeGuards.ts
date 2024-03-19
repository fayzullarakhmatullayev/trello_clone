import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

interface RouteMeta {
  layout?: 'main' | 'auth'
}

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const authStore = useAuthStore()

  if (to.meta.auth && !authStore.isAuthenticated) {
    // If the route requires authentication and the user is not authenticated
    next('/login') // Redirect to login page
  } else if (!to.meta.auth && authStore.isAuthenticated) {
    // If the route does not require authentication and the user is authenticated
    next('/') // Redirect to home page
  } else {
    next() // Continue navigation
  }
}
