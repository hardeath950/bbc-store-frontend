<script setup lang="ts">
import type { Product } from '~/types/Store'

const props = defineProps<{
  product: Product
}>()
</script>

<template>
  <!-- PRODUCT -->
  <div
    class="border-2 p-2 rounded-xl shadow-lg max-h-sm"
  >
    <!-- PRD. NAME -->
    <span class="font-bold">
      {{ props.product.attributes.name }}
    </span>
    <!-- PRD. DESCRIPTION -->
    <p class="h-xs overflow-auto p-4">
      {{ props.product.attributes.description }}
    </p>
  </div>
  <!-- __END PRODUCT -->
</template>
