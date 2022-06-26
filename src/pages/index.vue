<script setup lang="ts">
import { useFind } from '~/composables/api'

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
  const { content } = await useFind('store-products', {
    cache: true,
    life: 120,
  })
  products.value = content.value ? content.value.data : []
}

const { t } = useI18n()

loadProducts()
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-store inline-block />
    </div>
    <p>
      <a rel="noopener" href="https://github.com/hardeath950/bbc-store-frontend" target="_blank">
        Vitesse Store
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>
  </div>
  <!-- PRODUCTS WRAPPER -->
  <div class="my-6 flex items-center justify-center space-x-4">
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
