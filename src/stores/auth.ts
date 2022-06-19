import { acceptHMRUpdate, defineStore } from 'pinia'
import { StorageSerializers, useStorage } from '@vueuse/core'
import service from '~/api/http'
import type { State } from '~/assets/interfaces/userAuth'
// DEFINE STORE
export const useAuthStore = defineStore('auth', {

  // a function that returns a fresh state
  state: (): State => ({
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
    fullName: state => state.userInfo ? `${state.userInfo.fname} ${state.userInfo.lname}` : '',
    /**
     * Get user 2 letters from first name
     * @returns - User acronym in string
     */
    userAcronym: state => state.userInfo ? (state.userInfo.fname[0] + state.userInfo.fname[1]).toUpperCase() : '',
    /**
     * Return group 2 first letters
     * @returns - string
     */
    groupAcronym: state => state.userInfo ? (state.userInfo.group.corp_name[0] + state.userInfo.group.corp_name[1]).toUpperCase() : '',
    /**
     * Return user id
     * @returns - number
     */
    idUser: state => state.userInfo ? (state.userInfo.user.id) : 0,
    getAccessLevel: state => state.userInfo ? (state.userInfo.module_role.access_level) : 0,
  },
  // optional actions
  actions: {
    /**
     * Auth user in backend and save data in storage
     * @param email - user email or username
     * @param password - user password
     */
    async login(email: string, password: string) {
      // SET LOADING STATUS
      this.loading = true
      // SEND POST TO API
      await service.post('auth/local', {
        identifier: email,
        password,
      })

        .then(async (response) => {
          // SAVE DATA IN STATE N STORAGE
          this.jwt = response.data.jwt
          const module = await service.get('users-infos/module')
          if (module)
            this.userInfo = module.data

          else
            this.jwt = ''
        })
        .catch(() => { // INVALID DATA
          // REMOVE ANY JWT
          this.jwt = ''
        })
      // SET LOADING STATUS
      this.loading = false
    },
    /**
     * Remove user JWT and Logout.
     */
    logout() {
      this.jwt = ''
    },
    async loginApi(jwt: string) {
      this.jwt = jwt
      const module = await service.get('users-infos/module')
      if (module)
        this.userInfo = module.data

      return module
    },
  },

})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
