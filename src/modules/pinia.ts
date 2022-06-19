import { createPinia } from 'pinia'
import type { UserModule } from '~/types'
import { useAuthStore } from '~/stores/auth'

export const install: UserModule = ({ app, router }) => {
  const pinia = createPinia()
  app.use(pinia)

  // @TODO BETTER WAY TO PLACE ROUTE LOGICS (MAYBE ROUTE-GUARDIAN)
  const useAuth = useAuthStore()
  // AUTH INTERCEPTOR
  router.beforeEach((to) => {
    if (to.name === 'Logout')
      useAuth.logout()
    if (to.path === '/')
      return { name: 'Tasks' }

    switch (to.meta.access_type) {
      case 'authenticated':
        // @TODO ADD ACCESS_LEVEL VALIDATION
        if (useAuth.isAuthenticated)
          return true

        else
          return { name: 'Login' }
        break
      case 'requireVisitor':
        if (!useAuth.isAuthenticated)
          return true
        else
          return { name: 'Tasks' }
        break
      case 'public':
        return true
        break
      default:
        return true
        break
    }
  },

  )
}
