<route lang="yaml">
name: Not Found
meta:
  layout: default
  access_type: public
</route>

<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()

useHead({
  title: t('pageTitle.404'),
})
</script>

<template>
  <div class="h-full text-center flex select-none op95">
    <div class="ma enl-text">
      <div class="animate-bounce-in-left animate-count-1 animate-duration-2000">
        <div class="text-9xl fw100 underline ">
          404
        </div>
        <div class="text-base op70 my-2">
          {{ t('pageTitle.404') }}
        </div>
      </div>
      <!-- VIEW CONTENT -->
      <div op70 text-2xl fw300 m1>
        {{ t('not-found') }}
      </div>
      <!-- __END VIEW CONTENT -->
      <div class="animate-flip-in-x animate-count-1 animate-duration-1500">
        <EnlButton class="!mt-8 btn-primary" icon="i-carbon-drill-back" :label="t('button.back404')" @click="router.back()">
          />
        </enlbutton>
      </div>
    </div>
  </div>
</template>
