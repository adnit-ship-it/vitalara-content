<template>
  <UiSectionWrapper class="relative z-[2] lg:min-h-[90vh] bg-cover bg-no-repeat bg-center" style="
    background-image: url('/assets/images/discover-bg.png');
  ">
    <!-- Background overlay for better text readability -->
    <div class="absolute inset-0 bg-black bg-opacity-30"></div>

    <UiSectionContainer class="relative z-10 h-full flex gap-8 lg:gap-0 flex-col-reverse lg:flex-row items-center justify-between py-20">
      <!-- Product Card - Left Side -->
      <div class="bg-white shadow-lg p-8 w-full max-w-md">
        <!-- Product Image -->
        <div class="mb-6">
          <img 
            :src="productImageUrl" 
            :alt="productName"
            class="w-[384px] h-[384px] object-contain bg-backgroundColor" 
          />
        </div>

        <!-- Product Details -->
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold text-bodyColor">{{ productName }}</h3>
            <span class="text-lg font-semibold text-bodyColor">${{ productPrice }}</span>
          </div>

          <p class="text-sm text-bodyColor">{{ productDescription }}</p>
          <p class="text-xs text-bodyColor">{{ discover?.shippingInfo || 'Free Shipping. Fast Delivery.' }}</p>
          <div class="flex justify-between items-center mt-6">
            <p class="text-sm font-medium text-bodyColor">{{ discover?.providerText || 'Speak to a provider today!' }}</p>
            <!-- Buy Now Button -->
            <NuxtLink to="/consultation">
              <UiButton backgroundColor="accentColor1" textColor="white" width="full" height="32px" fontSize="16">
                {{ discover?.buyNowButton || 'Buy Now' }}
              </UiButton>
            </NuxtLink>
          </div>


        </div>
      </div>

      <!-- Text Content - Right Side -->
      <div class="text-white text-center max-w-3xl">
        <h2 class="text-[28px] md:text-[32px] lg:text-[48px] font-semibold mb-4">
          {{ discover?.title || 'Discover Your Best Self' }}
        </h2>
        <h3 class="text-[24px] md:text-[28px] lg:text-[40px]">
          {{ discover?.subtitle || 'Lose Weight Today' }}
        </h3>
      </div>
    </UiSectionContainer>
  </UiSectionWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCRMStore } from '~/stores/crmStore'
import { useSiteTextStore } from '~/stores/siteText'
import DOMPurify from 'isomorphic-dompurify'

const crmStore = useCRMStore()
const siteTextStore = useSiteTextStore()

// Initialize site text once for this component
const discover = computed(() => siteTextStore.getHomeText()?.discover)

// Compute product data from the default product bundle
const productImageUrl = computed(() => {
  if (crmStore.defaultProductBundle && crmStore.defaultProductBundle.products.length > 0) {
    return crmStore.defaultProductBundle.products[0].imageUrl
  }
  return '/assets/images/products/glp1.png' // fallback
})

const productName = computed(() => {
  if (crmStore.defaultProductBundle && crmStore.defaultProductBundle.products.length > 0) {
    const rawName = crmStore.defaultProductBundle.products[0].name
    return DOMPurify.sanitize(rawName, { ALLOWED_TAGS: [] })
  }
  return 'Medivora GLP-1 Injection' // fallback
})

const productPrice = computed(() => {
  if (crmStore.defaultProductBundle) {
    return crmStore.defaultProductBundle.price
  }
  return '129' // fallback
})

const productDescription = computed(() => {
  if (crmStore.defaultProductBundle) {
    const rawDescription = crmStore.defaultProductBundle.description || 'Lose weight fast with our personalized medication.'
    return DOMPurify.sanitize(rawDescription, { ALLOWED_TAGS: [] })
  }
  return 'Lose weight fast with our personalized medication.' // fallback
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
