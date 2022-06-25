// these APIs are auto-imported from @vueuse/core
import _ from 'lodash'
import { createCustomFetch } from './cFetch'
import { useCacheStore } from '~/store/cache'
import type { SetCacheConfig } from '~/store/cache'

interface ApiConfig extends SetCacheConfig {
  auth?: boolean
}

// USE CHACHE STORE
const useCache = useCacheStore()

/**
 * (Async)
 * Send GET request to API
 * Return all available records
 */
export async function useFind(endpoint: string, config?: ApiConfig) {
  const status = ref(false)
  const content = ref<any[]>([])
  const { useCustomFetch } = createCustomFetch({ auth: config?.auth })

  const hash = useCache.createHash(`find__${endpoint}`)
  const cached = useCache.getValue(hash)

  if (cached && config && config.cache) {
    content.value = cached
    status.value = true
  }
  else {
    // FETCH API
    const { data, statusCode } = await useCustomFetch(endpoint, {}).get().json()
    // CHECK STATUS AND SAVE TO CACHE IF CONFIG IS SET
    if (statusCode.value && statusCode.value > 199 && statusCode.value < 300 && config && config.cache) {
      useCache.setValue(hash, data.value, { ...config })
      content.value = data.value ? _.castArray(data.value) : []
      status.value = true
    }
    else {
      content.value = []
      status.value = false
    }
  }
  return { status, content }
}
