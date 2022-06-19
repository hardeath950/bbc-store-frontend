// these APIs are auto-imported from @vueuse/core
import { useCacheStore } from '~/store/cache'
import type { setCacheConfig } from '~/store/cache'

const defaultConfig = {
  baseUrl: import.meta.env.BASE_URL,
}
// USE CHACHE STORE
const useCache = useCacheStore()

/**
 * (Async) (queryString)
 * Send GET request to API
 * Return all available records
 */
export async function useFind(url: string, config?: setCacheConfig) {
  // CREATE HASH
  const hash = useCache.createHash(`find__${url}`)
  // CHECK IF CACHED
  const cached = useCache.getValue(hash)
  // RETURN CACHED DATA
  if (cached && config && config.cache)
    return cached

  // FETCH API
  const { error, data, response } = await useFetch(url, {})

  if (response.value && response.value?.status >= 200 && response.value?.status < 300) {
    // CACHE RESPONSE IF CONFIG IS SET
    if (config && config.cache)
      useCache.setValue(hash, data, { ...config })
  }
  else {
    // RETURN ERROR
    return error
  }
}
