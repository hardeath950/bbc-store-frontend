// these APIs are auto-imported from @vueuse/core
import _ from 'lodash'
import { useCustomFetch } from './cFetch'
import { useCacheStore } from '~/store/cache'
import type { setCacheConfig } from '~/store/cache'

interface ApiConfig extends setCacheConfig {
  auth?: boolean
  headers?: { [key: string]: string }
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
  const { customFetch } = useCustomFetch({ auth: config?.auth })

  const hash = useCache.createHash(`find__${endpoint}`)
  const cached = useCache.getValue(hash)

  if (cached && config && config.cache) {
    content.value = cached
    status.value = true
  }
  else {
    // FETCH API
    const { data, statusCode } = await useFetch(endpoint, {})
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
