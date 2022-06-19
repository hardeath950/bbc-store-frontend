import { acceptHMRUpdate, defineStore } from 'pinia'
import _ from 'lodash'
import { useApiStore } from './api'
import { useCacheStore } from '~/stores/cache'
import { useAuthStore } from '~/stores/auth'

// DEFINE STORE
export const useMenuStore = defineStore('menu', {

  // a function that returns a fresh state
  state: () => ({
    loading: false,
    menu: [

    ],
    defaultRoutes: [
      {
        label: 'Categorias',
        value: '/config/types',
      },
      {
        label: 'Grupo de Membros',
        value: '/config/membersgroups',
      },
      {
        label: 'menu__emailsTemplate',
        value: '/config/templates',
      },
      {
        label: 'screens',
        value: '/config/screens',
      },
      {
        label: 'my tasks',
        value: '/workspace/tasks',
      },
      {
        label: 'my issues',
        value: '/workspace/myissues',
      },
      {
        label: 'Files__title',
        value: '/workspace/files',
      },
      {
        label: 'Consultar',
        value: '/workspace/search',
      },
      {
        label: 'menu__questionsScreening',
        value: '/workspace/screening',
      },
      {
        label: 'categories_reports',
        value: '/manage/types',
      },
      {
        label: 'menu__sentEmails',
        value: '/manage/emails',
      },
      {
        label: 'all_tasks',
        value: '/manage/tasks',
      },
      {
        label: 'Base de Conhecimento',
        value: '/workspace/KnowledgeBase',
      },
      {
        label: 'Gestão do Conhecimento',
        value: '/manage/questions',
      },
      {
        label: 'Requisições (Todas as categorias)',
        value: '/workspace/request',
      },
      {
        label: 'Dashboard',
        value: '/manage/dashboard',
      },
      {
        label: 'Listas',
        value: '/config/lists',
      },
      {
        label: 'Configuração de Painéis',
        value: '/config/panels',
      },
      {
        label: 'Visualização de Painéis',
        value: '/workspace/panelviews',
      },
    ],
    defaultMenu: [
      {
        label: 'config',
        order: 0,
        data: [
          { icon: 'pi pi-desktop', label: 'Pages', path: '/config/screens', access_level: 49 },
          { icon: 'pi pi-list', label: 'Builder', path: '/config/menu', access_level: 49 },
        ],
      },
    ],
  }),
  // optional getters
  getters: {

    getMenu: (state) => {
      const useAuth = useAuthStore()
      const access_level = useAuth.getAccessLevel
      const temp = state.menu.length ? state.menu : state.defaultMenu

      return temp.map((item) => {
        return {
          ...item,
          data: item.data.filter((subItem) => {
            return (_.toNumber(subItem.access_level) || 0) <= access_level
          },
          ),
        }
      })
    },
  },
  // optional actions
  actions: {
    async loadMenu(config?: { type?: string; cacheClear?: boolean; cacheLife?: number }) {
      config = config || {}
      // USE API N CACHE INSTANCE
      const useApi = useApiStore()
      const useCache = useCacheStore()
      // SET REQUEST CONFIG
      useApi.endpoint = 'c-menu-items'
      useApi.queryString = `?type_eq=${config.type || 'default'}&_sort=order:ASC`
      // CHECK CACHE CLEAR
      if (config.cacheClear)
        useCache.clearCacheByAlias('c-menu-items')
      // SET LOADING STATUS
      this.loading = true
      // SEND POST TO API
      await useApi.find({ cache: true, life: config.cacheLife, alias: 'c-menu-items' })
        .then((data) => {
          // SET MENU
          this.menu = data
        })
        .catch(() => { // INVALID DATA
          // @TODO: SET ERROR
          this.menu = []
        })
      // SET LOADING STATUS
      this.loading = false
      // RETURN MENU
      return this.menu
    },
  },

})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
