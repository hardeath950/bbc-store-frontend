<script setup lang='ts'>

</script>

<template>
  <main class="enl-ground-grad min-h-full">
    <Toast />
    <ConfirmDialog />
    <AppTopbar :onlytop="true" />
    <div class="pt-30 px-4">
      <router-view />
      <AppFooter />
    </div>
  </main>
</template>
