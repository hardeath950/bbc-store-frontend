<script setup lang="ts">
import { useFind } from '~/composables/api'
const user = useUserStore()
const input = $ref(user.savedName)

interface Product {
  id: number
  attributes: {
    createdAt: string
    name: string
    description: string
    sale_price: number
    images: any[]
  }
}

const products = ref<Product[]>([])

async function loadProducts() {
  const { content } = await useFind('store-products')
  products.value = content.value.data
}

const router = useRouter()
const go = () => {
  if (input)
    router.push(`/hi/${encodeURIComponent(input)}`)
}

const { t } = useI18n()

loadProducts()
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noopener" href="https://github.com/hardeath950/bbc-store-frontend" target="_blank">
        Vitesse Store
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="input"
      :placeholder="t('intro.whats-your-name')"
      :aria-label="t('intro.whats-your-name')"
      type="text"
      autocomplete="false"
      p="x4 y2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        btn m-3 text-sm
        :disabled="!input"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
  <!-- PRODUCTS WRAPPER -->
  <div class="flex items-center justify-center">
    <!-- PRODUCT -->
    <div
      v-for="product, index in products"
      :key="`prod_${index}`"
      class="border-2 p-2 rounded-xl shadow-lg"
    >
      {{ product.attributes.name }}
    </div>
    <!-- __END PRODUCT -->
  </div>
  <!-- _END PRODUCTS WRAPPER -->
</template>

<route lang="yaml">
meta:
  layout: home
</route>
