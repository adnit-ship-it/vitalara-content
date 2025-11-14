<template>
  <div
    class="relative flex flex-col md:flex-row justify-center items-center w-full md:overflow-x-hidden lg:h-[460px] border-t border-b border-l border-[#D9D9D9] overflow-hidden">
    <div v-for="(item, index) in items" v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
      opacity: 1,
      y: 0,
      transition: {
        duration: 500,
        type: 'ease-in',
        stiffness: 250,
        damping: 25,
        mass: 1,
        delay: 50 * index,
      },
    }" :key="item.productName || index" :class="[
      'w-[300px] flex h-[350px] md:w-[340px] md:h-[390px] lg:h-[460px] lg:w-[405px] p-6 md:p-5 lg:p-7 border-x md:border-l-0 lg:border-b-0 lg:border-l-0 first:border-l ',
      index === currentIndex ? 'block' : 'hidden md:block',
    ]" @click="onCardClick(item)">
      <slot :item="item">
        <UiProductCard :image-src="item.imageSrc" :image-alt="item.imageAlt" :product-name="item.productName"
          :price="item.price" :is-best-seller="item.isBestSeller" />
      </slot>
    </div>

    <button type="button" :disabled="currentIndex === 0" :class="[
      'md:hidden group absolute inset-y-0 left-1  sm:left-[5rem] z-10  flex items-center justify-center transition-all duration-200 ease-out',
    ]" aria-label="Previous item" @click="prev">
      <span v-show="currentIndex > 0"
        class="pointer-events-none w-8 h-8 sm:w-9 sm:h-9 grid place-items-center transition-all duration-200 ease-out group-active:scale-95">
        <slot name="prev-icon">
          <svg class="h-full w-full rotate-180" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L8 7.66667L1 15" stroke="#787878" stroke-width="1.5" />
          </svg>
        </slot>
      </span>
    </button>
    <button type="button" :disabled="currentIndex === items.length - 1" :class="[
      'md:hidden group absolute inset-y-0 right-1 sm:right-[5rem]  z-10  flex items-center justify-center transition-all duration-200 ease-out',
    ]" aria-label="Next item" @click="next">
      <span v-show="currentIndex < items.length - 1"
        class="pointer-events-none w-8 h-8 9:w-10 sm:h-9 grid place-items-center transition-all duration-200 ease-out group-active:scale-95">
        <slot name="next-icon">
          <svg class="h-full w-full" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L8 7.66667L1 15" stroke="#787878" stroke-width="1.5" />
          </svg>
        </slot>
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const emit = defineEmits(["item-click"]);

const currentIndex = ref(0);
const prev = () => {
  if (currentIndex.value > 0) currentIndex.value -= 1;
};
const next = () => {
  if (currentIndex.value < props.items.length - 1) currentIndex.value += 1;
};

const onCardClick = (item) => {
  emit("item-click", item);
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
