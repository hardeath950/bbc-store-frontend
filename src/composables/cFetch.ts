import { createFetch } from '@vueuse/core'
import _ from 'lodash'
import { useAuthStore } from '~/store/auth'

interface cHeader {
  key: string
  value: string
}

interface cFetchConfig {
  auth?: boolean
  appToken?: boolean
  headers?: cHeader[]
}

export function createCustomFetch(config?: cFetchConfig) {
  const useAuth = useAuthStore()
  // CREATE CUSTOM FETCH
  const useCustomFetch = createFetch({
    baseUrl: import.meta.env.VITE_API_ENDPOINT,
    options: {
      // BEFORE FETCH
      async beforeFetch({ options }) {
        // INCLUDE APP TOKEN?
        if (options.headers && config && config.appToken)
          _.set(options.headers, 'appToken', import.meta.env.VITE_APP_TOKEN)
        // INCLUDE AUTH?
        if (options.headers && config && config.auth)
          _.set(options.headers, 'Authorization', `Bearer ${useAuth.jwt}`)
        // INCLUDE CUSTOM HEADERS?
        if (options.headers && config && config.headers && config.headers.length) {
          config.headers.forEach((header) => {
            _.set(options, `headers.${header.key}`, header.value)
          })
        }

        return { options }
      },
    },
  })

  return { useCustomFetch }
}
