<template>
  <div class="mx-auto p-4 bg-white">
    <ClientOnly>
      <div class="w-full max-w-[1440px] mx-auto px-6">
        <Swiper
          :modules="[SwiperNavigation]"
          :slides-per-view="1"
          :space-between="20"
          :navigation="true"
          :breakpoints="{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }"
          class="swiper-container w-full"
        >
          <SwiperSlide v-for="product in productsToShow" :key="product.id">
            <div @click="() => openModal(product)" class="cursor-pointer flex justify-center">
              <UiProductCard
                :image-src="product.thumbnail"
                :image-alt="product.name"
                :product-name="product.name"
                :price="`$${product.prices.monthly}`"
                :is-best-seller="product.popular || false"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <template #fallback>
        <!-- Fallback content for SSR -->
        <div class="w-full px-6">
          <div class="flex justify-center items-center h-[296px]">
            <div class="text-center">
              <p class="text-gray-500">Loading products...</p>
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>

    <!-- Product Modal -->
    <UiProductModal
      :is-open="isModalOpen"
      :product="selectedProduct"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import type { Product } from "~/types/intake-form/checkout";
import { products as defaultProducts } from "~/data/intake-form/products";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Props
const props = defineProps<{
  products?: Product[];
}>();

// Use provided products or products from products.ts
const productsToShow = computed(() => props.products?.length ? props.products : defaultProducts);

// Map Product to Product for the modal
const mapToModalProduct = (product: Product) => ({
  id: product.id,
  imageUrl: product.thumbnail,
  productName: product.name,
  price: `$${product.prices.monthly}`,
  isBestSeller: product.popular || false,
  productBundleIds: product.productBundleIds,
  quizId: product.quizId
});

// Modal state
const isModalOpen = ref(false);
const selectedProduct = ref<ReturnType<typeof mapToModalProduct> | null>(null);

// Open modal with product data
const openModal = (product: Product) => {
  selectedProduct.value = mapToModalProduct(product);
  isModalOpen.value = true;
};

// Close modal
const closeModal = () => {
  isModalOpen.value = false;
  selectedProduct.value = null;
};

// Swiper modules
const SwiperNavigation = Navigation;
</script>

<style scoped>
/* Custom Swiper navigation styles */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

@media (min-width: 1024px) {
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    width: 48px;
    height: 48px;
  }
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: #f9fafb;
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 12px;
  color: var(--accentColor1);
}

@media (min-width: 1024px) {
  :deep(.swiper-button-next::after),
  :deep(.swiper-button-prev::after) {
    font-size: 18px;
  }
}

/* Center slides */
:deep(.swiper-slide) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
