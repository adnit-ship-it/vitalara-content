<template>
  <div class="mx-auto max-w-screen overflow-x-hidden pt-[60px]">
    <!-- Heading -->
    <h2 :class="[
      'section-title text-bodyColor mb-2 md:mb-8',
      center ? 'text-center' : 'pl-4 md:pl-20',
    ]">
      As Seen On
    </h2>

 

    <!-- Mobile & Tablet: Marquee -->
    <div class="h-[96px] w-full border-y border-[#D9D9D9] overflow-hidden">
      <NuxtMarquee :speed="20" :pause-on-hover="true" class="h-full">
        <div class="flex items-center gap-8 lg:gap-16 h-full px-4">
          <img src="/assets/images/clients/bloomberg.png" alt="Bloomberg" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/forbes.png" alt="Forbes" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/healthline.png" alt="Healthline" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/web-md.png" alt="WebMD" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/fortune.png" alt="Fortune" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/fast-company.png" alt="Fast Company" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/new-york-times.png" alt="The New York Times" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/bloomberg.png" alt="Bloomberg" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/forbes.png" alt="Forbes" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/healthline.png" alt="Healthline" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/web-md.png" alt="WebMD" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/fortune.png" alt="Fortune" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/fast-company.png" alt="Fast Company" class="h-8 lg:h-10 w-auto object-contain" />
          <img src="/assets/images/clients/new-york-times.png" alt="The New York Times" class="h-8 lg:h-10 w-auto object-contain" />
        </div>
      </NuxtMarquee>
    </div>
  </div>
</template>

<script setup>
// Define the center prop with a default value of false
const props = defineProps({
  center: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
