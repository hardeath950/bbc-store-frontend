<script setup lang="ts">
import ProductList from '../components/ProductList.vue'
import type { Product } from '~/types/Store'
import { useFind } from '~/composables/api'
const products = ref<Product[]>([])

async function loadProducts() {
  const { content } = await useFind('store-products', {
    cache: false,
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
  <!-- PRODUCT LIST -->
  <ProductList v-if="products.length" :products="products" cols="1" />
  <!-- _END PRODUCT LIST -->
</template>

<route lang="yaml">
meta:
  layout: home
</route>
