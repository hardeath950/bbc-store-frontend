import { acceptHMRUpdate, defineStore } from 'pinia'
import { useAuthStore } from './auth'
// import { useApiStore } from './api'
// import { useCacheStore } from '~/stores/cache'
import type { systemActions } from '~/assets/interfaces/commons'

interface ActionValidator {
  access_level: number
  rules: any[]
}

interface State {
  systemActions: Record<systemActions, ActionValidator>
}
// DEFINE STORE
export const useSystemActionStore = defineStore('systemActions', {

  // a function that returns a fresh state
  state: (): State => ({
    systemActions: {
      'delete-chart': {
        access_level: 0,
        rules: [
          (data: any) => {
            // CHECK IF USER IS OWNER
            if (data.userInfo && data.user && data.userInfo.user.id === data.user.id)
              return true
            else
              return false
          },
        ],
      },
      'create-item-type': {
        access_level: 59,
        rules: [],
      },
      'read-item-type': {
        access_level: 59,
        rules: [],
      },
      'update-item-type': {
        access_level: 59,
        rules: [],
      },
      'delete-item-type': {
        access_level: 59,
        rules: [],
      },
      'create-item-file': {
        access_level: 0,
        rules: [],
      },
      'read-item-file': {
        access_level: 0,
        rules: [],
      },
      'update-item-file': {
        access_level: 0,
        rules: [
          (data: any) => {
            // CHECK IF USER IS FILE OWNER
            if (data.userInfo && data.file && data.user && data.userInfo.user.id === data.user.id)
              return true
            else
              return false
          },
        ],
      },
      'delete-item-file': {
        access_level: 0,
        rules: [
          (data: any) => {
            // CHECK IF USER IS FILE OWNER
            if (data.userInfo && data.file && data.user && data.userInfo.user.id === data.user.id)
              return true
            else
              return false
          },
        ],
      },
      'delete-item-file-batch': {
        access_level: 59,
        rules: [],
      },
      'download-item-file': {
        access_level: 0,
        rules: [],
      },
      'download-item-file-batch': {
        access_level: 0,
        rules: [],
      },
      'update-item-data': {
        access_level: 59,
        rules: [],
      },
      'create-type-panel': {
        access_level: 59,
        rules: [],
      },
      'update-type-panel': {
        access_level: 59,
        rules: [],
      },
      'delete-type-panel': {
        access_level: 59,
        rules: [],
      },
      'open-apprises': {
        access_level: 0,
        rules: [],
      },
      'edit-panel-view': {
        access_level: 0,
        rules: [],
      },
      'delete-panel-view': {
        access_level: 0,
        rules: [],
      },
      'create-panel-view': {
        access_level: 0,
        rules: [],
      },
      'create-item-note': {
        access_level: 0,
        rules: [],
      },
      'read-item-note': {
        access_level: 0,
        rules: [],
      },
      'delete-screening-item': {
        access_level: 0,
        rules: [],
      },
      'send-to-flow-screening': {
        access_level: 0,
        rules: [
          (data: any) => {
            if (data.form && data.status === 'new')
              return true
            else
              return false
          },
        ],
      },
      'send-to-form-screening': {
        access_level: 0,
        rules: [
          (data: any) => {
            if (!data.form)
              return true
            else
              return false
          },
        ],
      },
      'screening-details': {
        access_level: 0,
        rules: [],
      },
      'task-details': {
        access_level: 0,
        rules: [],
      },
      'panelview-details': {
        access_level: 0,
        rules: [],
      },
      'update-item-note': {
        access_level: 0,
        rules: [
          (data: any) => {
            if (data.userInfo && data.user && data.userInfo.user.id === data.user.id)
              return true
            else
              return false
          },
        ],
      },
      'delete-item-note': {
        access_level: 0,
        rules: [
          (data: any) => {
            if (data.userInfo && data.user && data.userInfo.user.id === data.user.id)
              return true
            else
              return false
          },
        ],
      },
      'read-task-resume': {
        access_level: 0,
        rules: [],
      },
    },

  }),
  // optional getters
  getters: {

  },
  // optional actions
  actions: {
    checkAction(action: systemActions, data: any) {
      const useAuth = useAuthStore()
      // ADD USER INFO TO DATA
      const toValidate = { ...data, userInfo: useAuth.userInfo }
      // GET ACTION AND CHECK IF EXIST
      const actionObject = this.systemActions[action]
      if (!actionObject)
        return false
      // CHECK ROLE ACCESS LEVEL
      if (actionObject.access_level > useAuth.userInfo.module_role.access_level)
        return false
      // CHECK RULES
      if (actionObject.rules.length > 0)
        return actionObject.rules.every(rule => rule(toValidate))
      // IF NO RULES, RETURN TRUE
      return true
    },

  },

})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSystemActionStore, import.meta.hot))
