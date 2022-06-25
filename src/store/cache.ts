import { acceptHMRUpdate, defineStore } from 'pinia'
import forge from 'node-forge'
import type { RemovableRef } from '@vueuse/core'

export interface CacheItem {
  key: string
  alias?: string
  created_at: string
  expire_at: string
  data: any
}

export interface SetCacheConfig {
  /**
   * Active response cache
   * @default false
   * @memberof SetCacheConfig
   * @type boolean
   * @example true
   */
  cache: boolean
  /**
   * Cache expire time in seconds
   * default is 30 seconds
   * @type {number} - seconds
   * @memberof SetCacheConfig
   * @default 30
   * @example
    */
  life?: number | null
  /**
   * alias to use for cache key
   * @type {string}
   * @memberof SetCacheConfig
   * @default ''
   * @example 'my-alias'
   * */
  alias?: string
  // @todo: add encriptation support
  encrypt?: boolean
}

export interface cacheStore {
  defaultCacheLife: number
  cacheDB: RemovableRef<CacheItem[]>
}

/***
 * This is default interface to get and send data from API
 */
export const useCacheStore = defineStore('cache', {
  // DEFINE STATE WITH INTERFACE
  state: (): cacheStore => ({
    // The default time to cache data
    defaultCacheLife: 30,
    // localStorage cache data
    cacheDB: useStorage('cache-db', []),
  }),
  // DEFINE GETTERS
  getters: {

  },
  // DEFINE ACTIONS
  actions: {
    /**
     * Set value to cache
     * @param key - key to reference a value
     * @param data - Data to set
     */
    setValue(key: string, data: any, config?: SetCacheConfig) {
      const { life, alias } = config || {}
      // create default time/life to cache
      const lifeTime = life || this.defaultCacheLife
      const d = new Date(new Date().getTime() + (lifeTime * 1000))
      // create data object
      const dataObject = {
        key,
        alias,
        created_at: new Date().toISOString(),
        expire_at: d.toISOString(),
        data,
      }
      // CHECK IF EXIST
      const index = this.cacheDB.findIndex(f => f.key === key)

      if (index === -1)
        this.cacheDB.push(dataObject)
      else
        this.cacheDB[index] = dataObject
    },

    /**
     * Set value to cache
     * @param key - key to get value
     * @returns {any || false} - cached data or false if not found or expired
     */
    getValue(key: string) {
      // CHECK IF EXIST
      const cached = this.cacheDB.find(f => f.key === key)
      if (cached) {
        // CHECK IF EXPIRED
        if (new Date(cached.expire_at) > new Date()) { return cached.data }
        else {
          // CLEAR EXPIRED DATA ADN RETURN FALSE
          this.clearExpiredCache()
          return false
        }
      }
      else {
        return false
      }
    },

    /**
     * Clear all data in cache-db
     */
    clearCache() {
      this.cacheDB = []
    },

    /**
     * Clear all expired data in cache-db
     */
    clearExpiredCache() {
      this.cacheDB = this.cacheDB.filter(f => new Date(f.expire_at) > new Date())
    },

    /**
     * Clear data in cache-db by key
     * @param key - key to clear
     * @returns {boolean} - true if found and cleared
     */
    clearCacheByKey(key: string) {
      const index = this.cacheDB.findIndex(f => f.key === key)
      if (index !== -1) {
        this.cacheDB.splice(index, 1)
        return true
      }
      else {
        return false
      }
    },

    /**
     * Clear data in cache-db by alias
     * @param alias - alias to clear
     * @returns {boolean} - true if found and cleared
     */
    clearCacheByAlias(alias: string) {
      const filtered = this.cacheDB.filter(f => f.alias !== alias)
      if (filtered.length !== this.cacheDB.length) {
        this.cacheDB = filtered
        return true
      }
      else {
        return false
      }
    },

    /**
     * Create hashed key to cache
     */
    createHash(key: string) {
      const md = forge.md.sha256.create()
      md.update(key)
      return md.digest().toHex()
    },

  },
  // END ACTION DECLARATION
})
// END STORE DECLARATION
// HOT RELOAD
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCacheStore, import.meta.hot))
