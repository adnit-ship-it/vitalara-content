<template>
  <div v-if="journey?.show !== false" class="mx-auto py-[56px] flex flex-col text-bodyColor items-center bg-[#F5F3ED]">
    <!-- Heading -->
    <h2 class="section-title text-center mb-16">
      {{ journey?.title || 'Your Weight Loss Journey' }}
    </h2>
    <div class="flex flex-row lg:flex-col items-center gap-4">
      <div class="flex flex-col lg:flex-row items-center justify-center gap-3 max-w-[1144px] lg:mb-4 pb-12">
        <template v-for="(step, index) in journey?.steps" :key="index">
          <img :src="step?.icon?.src || '/assets/images/brand/check.svg'" 
            :alt="step?.icon?.alt || 'checkmark'" 
            class="w-12 md:w-16 h-12 md:h-16">
          <div v-if="index < (journey?.steps?.length - 1)" class="w-0.5 lg:w-[180px] h-[72px] lg:h-0.5 bg-[#dddddd]"></div>
        </template>
      </div>
      <div class="w-full flex flex-col lg:flex-row items-start lg:items-center justify-center gap-16 lg:gap-[44px] mb-12">
        <div v-for="(step, index) in journey?.steps" :key="index" class="flex flex-col lg:items-center w-[240px]">
          <h3 class="text-[24px]">{{ step?.title || '' }}</h3>
          <p class="text-[20px] text-[#787878] font-light lg:text-center">
            <template v-for="(line, lineIndex) in step?.subtext" :key="lineIndex">
              {{ line }}<br v-if="lineIndex < (step?.subtext?.length - 1)">
            </template>
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <NuxtLink to="/consultation">
        <UiButton height="44px" width="240px" fontSize="24">
          {{ journey?.ctaButton || 'Start Today!' }}
        </UiButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSiteTextStore } from '~/stores/siteText'

const siteTextStore = useSiteTextStore()
const journey = computed(() => siteTextStore.getHomeText()?.journey)
</script>

<style scoped>
/* Component styles can be added here */
</style>
