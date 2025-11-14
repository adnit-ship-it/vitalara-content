<template>
  <section class="w-full h-[560px] flex flex-col items-center justify-center">
    <h2 class="section-title text-bodyColor mb-7">Testimonials</h2>
    
    <div class="max-w-[1088px] w-full">
      <ClientOnly>
        <Swiper
          :modules="[Navigation]"
          :slides-per-view="1"
          :space-between="16"
          :navigation="true"
          class="h-[300px]"
        >
          <SwiperSlide v-for="review in reviews" :key="review.name" class="flex items-center justify-center">
            <div class="text-center mt-16 px-12">
              <div class="flex justify-center mb-4">
                <div class="flex gap-2 md:gap-6">
                  <img v-for="star in 5" :key="star" src="/assets/images/star.svg" alt="star" class="w-5 h-5 md:w-12 md:h-12">
                </div>
              </div>
              
              <blockquote class="text-lg lg:text-[24px] font-medium text-bodyColor mb-4 italic">
                "{{ review.review }}"
              </blockquote>
              
              <p class="font-medium text-bodyColor">
                — {{ review.name }}
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
        <template #fallback>
          <!-- Fallback content for SSR -->
          <div class="h-[300px] flex items-center justify-center">
            <div class="text-center px-8">
              <div class="flex justify-center mb-4">
                <div class="flex gap-2 md:gap-6">
                  <img v-for="star in 5" :key="star" src="/assets/images/star.svg" alt="star" class="w-5 h-5 md:w-12 md:h-12">
                </div>
              </div>
              
              <blockquote class="text-lg lg:text-[24px] font-medium text-bodyColor mb-4 italic">
                "{{ reviews[0].review }}"
              </blockquote>
              
              <p class="font-medium text-bodyColor">
                — {{ reviews[0].name }}
              </p>
            </div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { reviews } from '~/data/reviews';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
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
</style>
