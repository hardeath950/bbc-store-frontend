<!-- ROUTE CONFIGURATION -->
<route lang="yaml">
meta:
  access_type: requireVisitor
</route>
<!-- __END ROUTE CONFIG -->

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

// PROPS
const props = defineProps<{
  token: string
}>()

const useAuth = useAuthStore()
const router = useRouter()

useHead({
  title: `${import.meta.env.VITE_APP_TITLE} Api Login`,
})

onMounted(async () => {
  try {
    await useAuth.loginApi(props.token)
    router
      .push({ name: 'Tasks' })
  }
  catch (error) {
    router
      .push({ name: 'Login' })
  }
})
</script>

<template>
  <div>
    <div class="flex justify-center items-center min-h-md ">
      <div class="p-col-12">
        <h1 class="h1">
          Validating...
        </h1>
      </div>
    </div>
  </div>
</template>
