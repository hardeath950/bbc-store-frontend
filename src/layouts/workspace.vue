<script setup lang='ts'>
import { useMenuStore } from '~/stores/menu'
import { useApiStore } from '~/stores/api'

const useMenu = useMenuStore()
const useApi = useApiStore()
useApi.endpoint = 'group-configs'
useApi.queryString = ''
// USE HEAD
useHead({
  title: `${import.meta.env.VITE_APP_TITLE}`,
})
/**
 * Call api to get menu model
 */
onMounted(async () => {
  await loadConfig()
})

const layoutMode = ref('static')
const staticMenuInactive = useStorage('staticMenuInactive', false)
const overlayMenuActive = useStorage('overlayMenuActive', false)
const mobileMenuActive = useStorage('mobileMenuActive', false)
const menuClick = useStorage('menuClick', false)

async function loadConfig() {
  await useMenu.loadMenu()
}

function onMenuToggle() {
  menuClick.value = true
  if (isDesktop()) {
    if (layoutMode.value === 'overlay') {
      if (mobileMenuActive.value === true)
        overlayMenuActive.value = true

      overlayMenuActive.value = !overlayMenuActive.value
      mobileMenuActive.value = false
    }
    else if (layoutMode.value === 'static') {
      staticMenuInactive.value = !staticMenuInactive.value
    }
  }
  else {
    mobileMenuActive.value = !mobileMenuActive.value
  }
}

function isDesktop() {
  return window.innerWidth >= 992
}

function onWrapperClick() {
  if (!menuClick.value) {
    overlayMenuActive.value = false
    mobileMenuActive.value = false
  }
  menuClick.value = false
}

function onSidebarClick() {
  menuClick.value = true
}

function onMenuItemClick(event: any) {
  if (event.item && !event.item.items) {
    overlayMenuActive.value = false
    mobileMenuActive.value = false
  }
}
const containerClass = computed(() => ['layout-wrapper', {
  'layout-overlay': layoutMode.value === 'overlay',
  'layout-static': layoutMode.value === 'static',
  'layout-static-sidebar-inactive': staticMenuInactive.value && layoutMode.value === 'static',
  'layout-overlay-sidebar-active': overlayMenuActive.value && layoutMode.value === 'overlay',
  'layout-mobile-sidebar-active': mobileMenuActive.value,
  'p-ripple-disabled': false,
  'layout-theme-light': false,
}])
</script>

<template>
  <main class="enl-ground-grad">
    <!-- TOAST HANDLER -->
    <Toast />
    <!-- CONFIRM HANDLER -->
    <ConfirmDialog />
    <div :class="containerClass" class="" @click="onWrapperClick">
      <AppTopbar @menu-toggle="onMenuToggle" />
      <div id="sidebar-menu" class="layout-sidebar enl-surface-solid shadow-lg" @click="onSidebarClick">
        <div v-if="useMenu.loading">
          <Skeleton width="70%" height="1.6rem" class="my-4" />
          <Skeleton width="40%" height="1.6rem" class="mr-4 my-4" />
          <Skeleton width="70%" height="1.6rem" class="my-4" />
          <Skeleton width="40%" height="1.6rem" class="mr-4 my-4" />
          <Skeleton width="40%" height="1.6rem" class="mr-4 my-4" />
          <Skeleton width="40%" height="1.6rem" class="mr-4 my-4" />
          <Skeleton width="70%" height="1.6rem" class="my-4" />
          <Skeleton width="40%" height="1.6rem" class="mr-4 my-4" />
          <Skeleton width="40%" height="1.6rem" class="mr-4 my-4" />
        </div>
        <div v-else>
          <AppMenu :model="useMenu.getMenu" @menuitem-click="onMenuItemClick" />
        </div>
      </div>

      <div class="layout-main-container">
        <div class="layout-main mt-5 sm:mt-0">
          <router-view />
        </div>
        <AppFooter />
      </div>

      <transition name="layout-mask">
        <div v-if="mobileMenuActive" class="layout-mask p-component-overlay" />
      </transition>
    </div>
  </main>
</template>
