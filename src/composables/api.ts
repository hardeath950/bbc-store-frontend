// these APIs are auto-imported from @vueuse/core
import { createCustomFetch } from './cFetch'
import { useCacheStore } from '~/store/cache'
import type { SetCacheConfig } from '~/store/cache'

interface ApiConfig extends SetCacheConfig {
  auth?: boolean
}

interface StrapiResponse {
  data?: any
  meta?: any
}

/**
 * (Async)
 * Send GET request to API
 * Return all available records
 */
export async function useFind(endpoint: string, config?: ApiConfig) {
  // USE CHACHE STORE
  const useCache = useCacheStore()

  const status = ref(false)
  const content = ref<StrapiResponse>({})
  const { useCustomFetch } = createCustomFetch({ auth: config?.auth })

  const hash = useCache.createHash(`find__${endpoint}`)
  const cached = useCache.getValue(hash)

  if (cached && config && config.cache) {
    content.value = cached
    status.value = true
  }
  else {
    // FETCH API
    const { data, statusCode } = await useCustomFetch(endpoint, {}).json()
    // CHECK STATUS AND SAVE TO CACHE IF CONFIG IS SET
    if (statusCode.value && statusCode.value > 199 && statusCode.value < 300 && config && config.cache) {
      useCache.setValue(hash, data.value, { ...config })
      content.value = data.value
      status.value = true
    }
    else {
      content.value = data.value
      status.value = false
    }
  }
  return { status, content }
}
