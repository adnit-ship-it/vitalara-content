<template>
  <div class="max-w-screen overflow-x-hidden">
    <SectionsHero />
    <!-- Desktop: Static layout -->
    <div class="hidden lg:flex h-[72px] w-full items-center justify-center gap-12 bg-accentColor1">
      <div class="flex gap-2 items-center text-white">
        <img src="/assets/images/checkmark_yellow.svg" alt="checkmark" class="w-[36px] h-[36px]">
        <p class="font-medium text-[24px]">No Hidden Fees</p>
      </div>
      <div class="flex gap-2 items-center text-white">
        <img src="/assets/images/checkmark_yellow.svg" alt="checkmark" class="w-[36px] h-[36px]">
        <p class="font-medium text-[24px]">Free, Expedited Delivery</p>
      </div>
      <div class="flex gap-2 items-center text-white">
        <img src="/assets/images/checkmark_yellow.svg" alt="checkmark" class="w-[36px] h-[36px]">
        <p class="font-medium text-[24px]">Doctor-led Plans & Coaching</p>
      </div>
      <div class="flex gap-2 items-center text-white">
        <img src="/assets/images/checkmark_yellow.svg" alt="checkmark" class="w-[36px] h-[36px]">
        <p class="font-medium text-[24px]">Money Back Guarantee</p>
      </div>
    </div>

    <!-- Mobile & Tablet: Infinite Marquee -->
    <div class="lg:hidden h-[48px] w-full bg-accentColor1 overflow-hidden">
      <NuxtMarquee :speed="30" :pause-on-hover="true" class="h-full">
        <div class="flex mx-4 items-center gap-8 h-full">
          <div class="flex gap-2 items-center text-white whitespace-nowrap">
            <img src="/assets/images/checkmark_yellow.svg" alt="checkmark" class="w-[28px] h-[28px]">
            <p class="font-medium text-lg">No Hidden Fees</p>
          </div>
          <div class="flex gap-2 items-center text-white whitespace-nowrap">
            <img src="/assets/images/checkmark_yellow.svg" alt="checkmark" class="w-[28px] h-[28px]">
            <p class="font-medium text-lg">Free, Expedited Delivery</p>
          </div>
          <div class="flex gap-2 items-center text-white whitespace-nowrap">
            <img src="/assets/images/checkmark_yellow.svg" alt="checkmark" class="w-[28px] h-[28px]">
            <p class="font-medium text-lg">Doctor-led Plans & Coaching</p>
          </div>
          <div class="flex gap-2 items-center text-white whitespace-nowrap">
            <img src="/assets/images/checkmark_yellow.svg" alt="checkmark" class="w-[28px] h-[28px]">
            <p class="font-medium text-lg">Money Back Guarantee</p>
          </div>
        </div>
      </NuxtMarquee>
    </div>
    <FeaturesCTA title="Weight Loss" subtitle="GLP-1 Medication Options" image="/assets/images/weight-loss.png"
      :features="['Tirzepatide Tablets', 'Tirzepatide Injection', 'Tirzepatide Oral Drops']" />
    <FeaturesDiscover/>
    <FeaturesCTA reverse title="Skin Care" subtitle="Acne Medication Options"
      :features="['Topical Cream', 'Topical Spray', 'Topical Wipes']" image="/assets/images/skincare.png" />
    <FeaturesDiscover/>
    <FeaturesCTA title="Wellness Products" subtitle="Medication Options"
      :features="['B12 Injection', 'Glutathione Injection', 'Methylene Capsules']"
      image="/assets/images/skincare.png" />
    <SectionsTrustedBy center />
    <SectionsTestimonials />
    <SectionsJourney />
    <SectionsFeatures />
    <SectionsFAQ />
    <div class="w-full h-[480px] lg:h-[632px] max-w-screen flex justify-center px-4 my-16 lg:my-32 text-bodyColor">
      <div
        class="h-full lg:w-[960px] bg-[#F5F3ED] border border-accentColor1 gap-4 lg:gap-8 rounded-3xl lg:rounded-[52px] flex flex-col justify-center items-center px-4 lg:px-32">
        <h2 class="text-[28px] lg:text-[32px] font-semibold text-center lg:text-left">What’s Your Weight Loss Goal?</h2>
        <div class="flex w-full flex-col gap-3 lg:gap-5">
          <div v-for="(option, index) in weightLossOptions" :key="index" @click="selectWeightLossGoal(index)"
            class="w-full cursor-pointer rounded-lg lg:rounded-xl text-[20px] lg:text-[24px] font-medium h-[48px] lg:h-[68px] flex items-center justify-center border transition-all duration-200"
            :class="[
              selectedWeightLossGoal === index
                ? 'bg-accentColor1 text-white'
                : 'bg-white text-accentColor1 border-accentColor1'
            ]">
            {{ option }}
          </div>
        </div>
        <NuxtLink class="mt-6" to="/consultation">
          <button
            class="h-[40px] lg:h-[48px] w-[284px] lg:w-[320px] text-[22px] lg:text-[24px] flex items-center justify-center font-medium transition-colors rounded-full px-2 md:px-6 bg-accentColor1 text-white cursor-pointer">
            Take the Assessment
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { products } from '~/data/intake-form/products'

// Weight loss goal options
const weightLossOptions = [
  'Light: 1-20 lbs',
  'Medium: 25-50 lbs',
  'High: 50+ lbs',
  'Not sure, exploring options'
]

// Use products directly from products.ts
const specificProducts = products

// Selected weight loss goal (null means none selected)
const selectedWeightLossGoal = ref(null)

// Function to select weight loss goal and navigate to quiz
const selectWeightLossGoal = (index) => {
  selectedWeightLossGoal.value = index
  // Navigate to consultation quiz page
  navigateTo('/consultation')
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
