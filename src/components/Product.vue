<script setup lang="ts">
import type { Product } from '~/types/Store'
import { useFormatter } from '~/composables/helpers'

const props = defineProps<{
  product: Product
}>()
</script>

<template>
  <!-- PRODUCT -->
  <div
    class="border-2 p-2 rounded-xl shadow-lg max-h-sm"
  >
    <div class="flex justify-center items-center space-x-2">
      <!-- PRD. NAME -->
      <span class="font-bold">
        {{ props.product.attributes.name }}
      </span>
      <span>
        -
      </span>
      <span>
        {{ useFormatter(props.product.attributes.sale_price, {
          type: 'number',
          n_style: 'currency',
        }) }}
      </span>
    </div>
    <!-- PRD. DESCRIPTION -->
    <p class="h-xs overflow-auto p-4">
      {{ props.product.attributes.description }}
    </p>
  </div>
  <!-- __END PRODUCT -->
</template>
