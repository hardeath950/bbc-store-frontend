import { createFetch } from '@vueuse/core'
import _ from 'lodash'
import { useAuthStore } from '~/store/auth'

export function useCustomFetch(config: any) {
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
    fetchOptions: {
      mode: 'cors',
    },
  })

  return { customFetch }
}
