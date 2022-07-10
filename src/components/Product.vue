<script setup lang="ts">
import type { Product } from '~/types/Store'
import { useFormatter } from '~/composables/helpers'

const props = defineProps<{
  product: Product
}>()

const storageUrl = import.meta.env.VITE_STORAGE_ENDPOINT
</script>

<template>
  <!-- PRODUCT -->
  <div class="flex p-6 font-mono">
    <div class="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
      <img :src="`${storageUrl}${props.product.attributes.images.data[0].attributes.url}`" alt="" class="absolute z-10 inset-0 w-full h-full object-cover rounded-lg" loading="lazy">
    </div>
    <form class="flex-auto pl-6">
      <div class="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
        <h1 class="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
          {{ props.product.attributes.name }}
        </h1>
        <div class="relative text-lg text-white">
          {{ useFormatter(props.product.attributes.sale_price, {
            type: 'number',
            n_style: 'currency',
          }) }}
        </div>
        <div class="relative uppercase text-teal-400 ml-3">
          In stock
        </div>
      </div>
      <div class="flex items-baseline my-6">
        <div class="space-x-3 flex text-sm font-medium">
          <label>
            <input class="sr-only peer" name="size" type="radio" value="xs" checked>
            <div class="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
              XS
            </div>
          </label>
          <label>
            <input class="sr-only peer" name="size" type="radio" value="s">
            <div class="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
              S
            </div>
          </label>
          <label>
            <input class="sr-only peer" name="size" type="radio" value="m">
            <div class="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
              M
            </div>
          </label>
          <label>
            <input class="sr-only peer" name="size" type="radio" value="l">
            <div class="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
              L
            </div>
          </label>
          <label>
            <input class="sr-only peer" name="size" type="radio" value="xl">
            <div class="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
              XL
            </div>
          </label>
        </div>
      </div>
      <div class="flex space-x-2 mb-4 text-sm font-medium">
        <div class="flex space-x-4">
          <button class="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black" type="submit">
            Buy now
          </button>
          <button class="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900" type="button">
            Add to bag
          </button>
        </div>
        <button class="flex-none flex items-center justify-center w-12 h-12 text-black" type="button" aria-label="Like">
          <svg width="20" height="20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
        </button>
      </div>
      <p class="text-xs leading-6 text-slate-500">
        {{ props.product.attributes.description }}
      </p>
    </form>
  </div>
  <!-- __END PRODUCT -->
</template>
