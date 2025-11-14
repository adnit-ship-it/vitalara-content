<template>
  <UiSectionWrapper class="py-20 md:py-32 flex flex-col bg-backgroundColor">
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
          delay: 100,
        },
      }" class="text-[20px] md:text-[28px] lg:text-[32px] font-semibold text-bodyColor text-center mb-12">
        Our Customers Results
      </h2>

    </UiSectionContainer>
    <UiTestimonialCarousel :items="testimonialData" />
  </UiSectionWrapper>
</template>

<script setup lang="ts">
import { reviews } from '~/data/reviews'

const testimonialData = [
  {
    image: "/assets/images/before-after/1.png",
    alt: "Before and after transformation",
    testimonial: "The questions are to the point and easy to navigate. I'm able to voice my concerns if needed and ask questions of Medivora. They are quick to respond and keep me updated on my prescription.",
    name: "Anna K",
    stars: 4
  },
  {
    image: "/assets/images/before-after/2.png",
    alt: "Before and after transformation",
    testimonial: reviews[1]?.review || "Amazing results! I've never felt better.",
    name: reviews[1]?.name || "Sarah M.",
    stars: reviews[1]?.stars || 5
  },
  {
    image: "/assets/images/before-after/3.png",
    alt: "Before and after transformation",
    testimonial: reviews[2]?.review || "This program is life-changing. Highly recommend!",
    name: reviews[2]?.name || "Michael R.",
    stars: reviews[2]?.stars || 5
  }
]
</script>
