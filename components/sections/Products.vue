<template>
  <UiSectionWrapper class="flex-col py-20">
    <!-- Heading -->
    <UiSectionContainer>
      <h2 v-motion :initial="{ opacity: 0, y: 32 }" :visible-once="{
        opacity: 1,
        y: 0,
        transition: {
          duration: 400,
          type: 'ease-in',
          stiffness: 250,
          damping: 25,
          mass: 1,
        },
      }" v-if="showTitle"
        class="pb-[24px] text-[20px] md:text-[28px] lg:text-[32px] font-semibold text-black md:text-left">
        {{ productsText?.title || 'Discover Our Products' }}
      </h2>
    </UiSectionContainer>

    <FeaturesDiscover :products="convertedProducts" />
  </UiSectionWrapper>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSiteTextStore } from '~/stores/siteText'
import { products } from '~/data/intake-form/products'
import type { Product } from "../../types/intake-form/checkout";

defineProps({
  showTitle: {
    type: Boolean,
    default: false,
  },
});

const siteTextStore = useSiteTextStore()

// Initialize site text once for this component
const productsText = computed(() => siteTextStore.getProductsText()?.section)

// Use the products from the data file
const convertedProducts = computed((): Product[] => {
  return products
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
