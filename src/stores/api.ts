import _ from 'lodash'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { setCacheConfig } from './cache'
import { useCacheStore } from './cache'
import service from '~/api/http'
import type { BasicStateApi } from '~/assets/interfaces/ApiTypes'

/***
 * This is default interface to get and send data from API
 */
export const useApiStore = defineStore('api', {
  // DEFINE STATE WITH INTERFACE
  state: (): BasicStateApi => ({
    endpoint: '',
    queryString: '',
    relations: '',
    loading: false,
    resultHandler: null,
    errorHandler: null,
  }),
  // DEFINE GETTERS
  getters: {

  },
  // DEFINE ACTIONS
  actions: {
    /**
     * Filter actual resultFind state
     * using any key/value
     * @param key - Key to search in resultFind
     * @param value - Value of Key to filter in resultFind
     */
    findBy: (state: BasicStateApi) => {
      return (key: string, value: any) => _.filter(state.resultHandler, f => _.get(f, key) === value)
    },

    /**
     * (Async) (queryString)
     * Send GET request to API
     * Return all available records
     */
    async find(config?: setCacheConfig) {
      // START LOADING
      this.loading = true
      // USE CHACHE STORE
      const useCache = useCacheStore()
      // CREATE HASH
      const hash = useCache.createHash(`find__${this.endpoint}${this.queryString || ''}`)
      // CHECK IF CACHED
      const cached = useCache.getValue(hash)
      if (cached) {
        // REMOVE LOADING AND RETURN CACHED DATA
        this.loading = false
        return cached
      }
      // CALL API
      else {
        const response = await service
          // CALL API
          .get(`${this.endpoint}${this.queryString || ''}`)
          // SAVE RESPONSE
          .then(response => this.resultHandler = response.data)
          // CATCH ERROR
          .catch((error) => {
            this.resultHandler = null
            this.errorHandler = error
          })
        // CACHE RESPONSE IF CONFIG IS SET
        if (config && config.cache)
          useCache.setValue(hash, response, { ...config })
        // REMOVE LOADING STATE, RESET QUERY STRING, RETURN RESPONSE
        this.loading = false
        this.queryString = ''
        return response
      }
    },

    /**
     * (Async)
     * Send GET request with Parameter (Ex. ID)
     * Return record if available
     * @param ref - Ref to get specific record (Maybe ID)
     */
    async findOne(refer: number | string, config?: setCacheConfig) {
      // START LOADING
      this.loading = true
      // USE CHACHE STORE
      const useCache = useCacheStore()
      // add relations at end of refer
      const ref = `${refer}${this.relations || ''}`
      // CREATE HASH
      const hash = useCache.createHash(`find__${this.endpoint}/${ref}`)
      // CHECK IF CACHED
      const cached = useCache.getValue(hash)
      if (cached) {
        // REMOVE LOADING AND RETURN CACHED DATA
        this.loading = false
        return cached
      }
      // CALL API
      else {
        const response = await service
          // CALL API
          .get(`${this.endpoint}/${ref}`)
          // SAVE RESPONSE
          .then(response => this.resultHandler = response.data)
          // CATCH ERROR
          .catch((error) => {
            this.resultHandler = null
            this.errorHandler = error
          })
        // CACHE RESPONSE IF CONFIG IS SET
        if (config && config.cache)
          useCache.setValue(hash, response, { ...config })
        // REMOVE LOADING STATE, RETURN RESPONSE
        this.loading = false
        return response
      }
    },
    /**
     * (Async)
     * Send POST request to Create a new record
     * @param form - Form result to create record
     */
    async create(form: any) {
      this.loading = true
      const response = await service
        // CALL API
        .post(`${this.endpoint}`, form)
        // SAVE RESPONSE
        .then(response => this.resultHandler = response.data)
        // CATCH ERROR
        .catch((error) => {
          this.resultHandler = null
          this.errorHandler = error
        })
      // REMOVE LOADING
      this.loading = false
      return response
    },
    /**
     * (Async)
     * Send POST request to Create a new record
     * @param form - Form result to create record
     */
    async post(form: any) {
      this.loading = true
      const response = await service
        // CALL API
        .post(`${this.endpoint}`, form)
        // SAVE RESPONSE
        .then(response => this.resultHandler = response.data)
        // CATCH ERROR
        .catch((error) => {
          this.resultHandler = null
          this.errorHandler = error
        })
      // REMOVE LOADING
      this.loading = false
      return response
    },
    /**
     * (Async)
     * Send POST request to update a new record
     * @param ref - Ref to specific record (Maybe ID)
     * @param form - Form result to update record
     */
    async update(ref: any, form: any) {
      this.loading = true
      const response = await service
        // CALL API
        .put(`${this.endpoint}/${ref}`, form)
        // SAVE RESPONSE
        .then(response => this.resultHandler = response.data)
        // CATCH ERROR
        .catch((error) => {
          this.resultHandler = null
          this.errorHandler = error
        })
      // REMOVE LOADING
      this.loading = false
      return response
    },
    /**
     * (Async)
     * Send DELETE request to Remove record
     * @param ref - Ref to specific record (Maybe ID)
     */
    async delete(ref: any) {
      this.loading = true
      const response = await service
        // CALL API
        .delete(`${this.endpoint}/${ref}`)
        // SAVE RESPONSE
        .then(response => this.resultHandler = response.data)
        // CATCH ERROR
        .catch((error) => {
          this.resultHandler = null
          this.errorHandler = error
        })
      // REMOVE LOADING
      this.loading = false
      return response
    },

  },
  // END ACTION DECLARATION
})
// END STORE DECLARATION
// HOT RELOAD
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useApiStore, import.meta.hot))
