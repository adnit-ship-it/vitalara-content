<template>
  <div class="flex-col max-w-screen overflow-x-hidden bg-backgroundColor">
    <UiSectionWrapper>
      <UiSectionContainer class="py-20">
        <img v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 400,
            type: 'ease-in',
            stiffness: 250,
            damping: 25,
            mass: 1,
          },
        }" src="/assets/images/brand/logo.svg" alt="brand logo"
          class="w-auto h-[48px] md:h-[64px] lg:h-[100px] object-cover" />
        <h1 v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 400,
            type: 'ease-in',
            stiffness: 250,
            damping: 25,
            mass: 1,
            delay: 25,
          },
        }" class="text-[32px] md:text-[48px] font-semibold mt-2 md:mt-4 lg:mt-8">
          {{ page?.title || 'Explore Our Products' }}
        </h1>
        <p v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 400,
            type: 'ease-in',
            stiffness: 250,
            damping: 25,
            mass: 1,
            delay: 50,
          },
        }" class="text-[16px] md:text-[23px] font-extralight mt-2">
          {{ page?.subtitle || 'Personalized GLP-1 Medication' }}
        </p>
        <div class="h-4 md:h-8"></div>
        <UiButton v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 400,
            type: 'ease-in',
            stiffness: 250,
            damping: 25,
            mass: 1,
            delay: 75,
          },
        }" :width="buttonWidth" :height="buttonHeight" :font-size="buttonFontSize" background-color="accentColor2">{{
        page?.categoryButton || 'Weight Loss' }}</UiButton>
      </UiSectionContainer>
    </UiSectionWrapper>

    <FeaturesDiscover :products="products" />
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useSiteTextStore } from '~/stores/siteText';

const siteTextStore = useSiteTextStore();

// Initialize site text once for this component
const page = computed(() => siteTextStore.getProductsText()?.page);

// Mobile detection
const isMobile = ref(false);

// Check mobile on mount and resize
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

// Derived button sizes
const buttonWidth = computed(() => (isMobile.value ? "144px" : "320px"));
const buttonHeight = computed(() => (isMobile.value ? "20px" : "44px"));
const buttonFontSize = computed(() => (isMobile.value ? "12" : "24"));

definePageMeta({
  layout: "products",
});
</script>

<style scoped>
/* Products page styles */
</style>
