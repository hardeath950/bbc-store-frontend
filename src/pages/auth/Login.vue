<!-- ROUTE CONFIGURATION -->
<route lang="yaml">
name: Login
meta:
  layout: default
  access_type: requireVisitor
</route>
<!-- __END ROUTE CONFIG -->

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '~/stores/auth'
const { t } = useI18n()
const useAuth = useAuthStore()
const router = useRouter()
const disabled = ref(false)
const toast = useToast()
const form = ref<any>({})

function warnDisabled() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 2000)
}

useHead({
  title: `${import.meta.env.VITE_APP_TITLE} Auth`,
})

if (useAuth.userInfo)
  form.value.email = useAuth.userInfo.user ? useAuth.userInfo.user.email : ''

async function login() {
  await useAuth.login(form.value.email, form.value.password)

  if (useAuth.isAuthenticated) {
    router
      .push({ name: 'Tasks' })
  }
  else {
    toast.add({
      severity: 'error',
      summary: t('Auth Error'),
      detail: t('Login__message_detail'),
      life: 1500,
    })
    warnDisabled()
  }
}
</script>

<template>
  <!-- MAIN CARD -->
  <LoginCard :class="{ 'animate-shake-x animate-count-1': disabled }" class="w-90% max-w-sm mx-auto !enl-border">
    <div class="">
      <img class="w-32 mx-auto op90 min-h-32 animate-fade-in  animate-count-1" src="https://enl-public.nyc3.digitaloceanspaces.com/logos/FotoPerfil-Colorido.png" alt="The Bobcorn Company">
      <h2 class="h2 text-center font-extrabold mt--1 enl-text">
        {{ t("pages.login.sign_in") }}
      </h2>
    </div>
    <FormKit
      id="form_login"
      v-model="form"
      :submit-label="t('pages.login.sign_in')"
      :submit-attrs="{
        inputClass: 'btn btn-primary select-none !mt-6',
      }"
      type="form"
      @submit="login"
    >
      <FieldRenderer2
        width="w-full"
        field-ident="email"
        form-ident="form_login"
        :f-data="{ refId: 'email', label: 'Email', type: 'email', validation: 'required|email' }"
      />
      <FieldRenderer2
        width="w-full"
        field-ident="password"
        form-ident="form_login"
        :f-data="{ refId: 'password', label: 'Password', type: 'EnlPassword', validation: 'required' }"
      />
    </FormKit>
    <div class="text-sm mt-4 text-right ">
      <router-link class="icon-btn !enl-link" to="/auth/recovery" :title="t('button.about')">
        {{ t("pages.login.recovery_pass") }}
      </router-link>
    </div>
  </LoginCard>
  <!-- MAIN CARD -->
</template>

<style scoped>
</style>
