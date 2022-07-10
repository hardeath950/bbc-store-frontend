<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { Product } from '~/types/Store'

const props = defineProps<{
  products: Product[]
  cols?: '1' | '2' | '3' | '4'
}>()
</script>

<template>
  <!-- PRODUCT LIST -->
  <div class="my-6 p-2 flex flex-wrap">
    <!-- PRODUCT -->
    <Product
      v-for="product, index in props.products"
      :key="`prod_${index}`"
      :product="product"
    />
    <!-- __END PRODUCT -->
  </div>
  <!-- _END PRODUCT LIST -->
</template>
