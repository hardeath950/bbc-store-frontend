<!-- ROUTE CONFIGURATION -->
<route lang="yaml">
name: Recovery
meta:
  layout: default
  access_type: requireVisitor
</route>
<!-- __END ROUTE CONFIG -->

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useApiStore } from '~/stores/api'
const { t } = useI18n()
const useApi = useApiStore()
const router = useRouter()
const toast = useToast()
const form = ref<any>({})

useHead({
  title: `${import.meta.env.VITE_APP_TITLE} Recover`,
})

async function sendMail() {
  useApi.endpoint = 'auth/forgot-password'

  const response = await useApi.create(form.value)

  if (response) {
    toast.add({
      severity: 'success',
      summary: t('EnlNewReport__success'),
      detail: t('Recovery_EmailSended'),
      life: 5000,
    })
    router
      .push({ name: 'Login' })
  }
  else {
    toast.add({
      severity: 'error',
      summary: t('Auth Error'),
      detail: t('Recovery_Error'),
      life: 1500,
    })
  }
}
</script>

<template>
  <!-- MAIN CARD -->
  <LoginCard class="w-90% max-w-sm mx-auto !enl-border">
    <div class="">
      <img class="w-32 mx-auto op90 min-h-32 animate-fade-in  animate-count-1" src="https://enl-public.nyc3.digitaloceanspaces.com/logos/FotoPerfil-Colorido.png" alt="The Bobcorn Company">
      <h2 class="h2 text-center font-extrabold mt--1 enl-text">
        {{ t("pages.recovery.recover") }}
      </h2>
    </div>
    <FormKit
      id="form_login"
      v-model="form"
      :submit-label="t('pages.recovery.send')"
      :submit-attrs="{
        inputClass: 'btn btn-primary select-none !mt-6',
      }"
      type="form"
      @submit="sendMail"
    >
      <FieldRenderer2
        width="w-full"
        field-ident="email"
        form-ident="form_login"
        :f-data="{ refId: 'email', label: 'Email', type: 'email', validation: 'required|email' }"
      />
    </FormKit>
  </LoginCard>
  <!-- MAIN CARD -->
</template>

<style scoped>
</style>
