import { createFetch } from '@vueuse/core'
import _ from 'lodash'
import { useAuthStore } from '~/store/auth'

interface cFetchConfig {
  auth?: boolean
}

export function useCustomFetch(config: cFetchConfig) {
  const useAuth = useAuthStore()
  // CREATE CUSTOM FETCH
  const customFetch = createFetch({
    baseUrl: import.meta.env.BASE_URL,
    options: {
      // BEFORE FETCH
      async beforeFetch({ options }) {
        // INCLUDE AUTH?
        if (options.headers && config.auth)
          _.set(options.headers, 'Authorization', `Bearer ${useAuth.jwt}`)

        return { options }
      },
    },
  })

  return { customFetch }
}
