<template>
  <section class="w-full h-[448px] lg:h-[552px] min-w-screen bg-accentColor2 text-bodyColor flex relative gap-0"
    :class="reverse ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row'">
    <div class="absolute bg-[#ebf2ee]/50 lg:bg-transparent top-0 left-0 w-full h-full flex justify-end">
      <div class="w-full max-w-[1280px] px-4 h-full md:px-8 mx-auto p-20 flex" :class="{'lg:justify-end': reverse }">
        <div class="flex flex-col w-fit">
          <h2 class="section-title">{{ title }}</h2>
          <div class="h-[3px] w-16 bg-accentColor1"></div>
          <p class="text-[24px] lg:text-[36px] font-light mt-4">
            {{ subtitle }}
          </p>
          <div class="flex flex-col gap-4 lg:gap-7 mt-8">
            <UiButton v-for="feature in features" :key="feature" height="44px" width="320px" fontSize="24"
              color="accentColor2" borderColor="accentColor2" decorative>
              {{ feature }}
            </UiButton>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block h-full min-w-[50%] flex-1 bg-[#EBF2EE] p-20">

    </div>
    <img :src="image" :alt="`${title} image`" class="w-full h-full object-cover" />
  </section>
</template>

<script setup>
// Define props for the component
const props = defineProps({
  reverse: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* Component styles can be added here */
</style>
