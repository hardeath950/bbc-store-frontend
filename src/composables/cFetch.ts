import { createFetch } from '@vueuse/core'
import _ from 'lodash'
import { useAuthStore } from '~/store/auth'

interface Header {
  key: string
  value: string
}

interface FetchConfig {
  auth?: boolean
  appToken?: boolean
  headers?: Header[]
  baseUrl?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  mode?: 'cors' | 'no-cors' | 'same-origin' | 'navigate'
}

export function createCustomFetch(config?: FetchConfig) {
  const useAuth = useAuthStore()
  // CREATE CUSTOM FETCH
  const useCustomFetch = createFetch({
    baseUrl: _.get(config, 'baseUrl', import.meta.env.VITE_API_ENDPOINT),
    fetchOptions: {
      method: _.get(config, 'method', 'GET'),
      mode: _.get(config, 'mode', 'cors'),
    },
    options: {
      // BEFORE FETCH
      async beforeFetch({ options }) {
        // INCLUDE AUTH?
        if (options.headers && config && config.auth)
          _.set(options.headers, 'Authorization', `Bearer ${useAuth.jwt}`)
        // INCLUDE APP TOKEN?
        if (options.headers && config && config.appToken)
          _.set(options.headers, 'appToken', import.meta.env.VITE_APP_TOKEN)
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
