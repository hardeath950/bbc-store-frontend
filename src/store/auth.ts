import { acceptHMRUpdate, defineStore } from 'pinia'
import { StorageSerializers, useStorage } from '@vueuse/core'
// DEFINE STORE
export const useAuthStore = defineStore('auth', {

  // a function that returns a fresh state
  state: () => ({
    loading: false,
    jwt: useStorage('jwt', ''),
    userInfo: useStorage('info-Storage', null, undefined, { serializer: StorageSerializers.object }),
  }),

  // optional getters
  getters: {
    /**
     * Check if user is authenticated
     * @returns - return true if user is authenticated, false if not
     */
    isAuthenticated: state => !!state.jwt,
    /**
     * Get user 2 letters from first name
     * @returns - User acronym in string
     */
    userAcronym: state => state.userInfo ? (state.userInfo.email[0] + state.userInfo.email[1]).toUpperCase() : '',
    /**
     * Return user id
     * @returns - number
     */
    idUser: state => state.userInfo ? (state.userInfo.user.id) : 0,
  },
  // optional actions
  actions: {

  },

})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
