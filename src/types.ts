import type { App } from 'vue'
import type { RouteMeta, RouteRecordRaw, Router } from 'vue-router'
import type { HeadClient } from '@vueuse/head'

declare module 'vue-router' {
  interface RouteMeta {
    access_type: string | 'authenticated'
    access_level: bigint | 0
  }
}
interface AppContext<HasRouter extends boolean = true> {
  app: App<Element>
  router: HasRouter extends true ? Router : undefined
  routes: HasRouter extends true ? RouteRecordRaw[] : undefined
  head: HeadClient | undefined
  meta: RouteMeta
}

export type UserModule = (ctx: AppContext) => void
