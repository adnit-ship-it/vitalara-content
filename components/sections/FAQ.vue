<template>
  <div class="flex flex-col items-center text-bodyColor gap-8 lg:gap-16 px-4 py-12 lg:py-20">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <div class="w-full max-w-[1000px]">
          <div class="space-y-0">
              <div 
                  v-for="(item, index) in faqItems" 
                  :key="index"
                  class="border-b border-bodyColor cursor-pointer"
                  @click="toggleAccordion(index)"
              >
                  <div class="w-full flex justify-between items-center py-4 text-left transition-all duration-300">
                      <span class="text-lg font-medium">{{ item.question }}</span>
                      <span 
                          class="text-2xl transition-transform duration-200"
                          :class="{ 'rotate-45': item.isOpen }"
                      >
                          +
                      </span>
                  </div>
                  <div 
                      class="overflow-hidden transition-all duration-300 ease-in-out"
                      :style="{ 
                          maxHeight: item.isOpen ? '200px' : '0px',
                          paddingBottom: item.isOpen ? '1rem' : '0rem'
                      }"
                  >
                      <div class="text-gray-600 leading-relaxed">
                          {{ item.answer }}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const faqItems = ref([
  {
      question: "How long is the process on average?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      isOpen: false
  },
  {
      question: "Are there any additional fees?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      isOpen: false
  },
  {
      question: "How is my provider selected?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      isOpen: false
  },
  {
      question: "Can I try multiple products?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      isOpen: false
  },
  {
      question: "Do GLP-1s actually work?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      isOpen: false
  }
]);

const toggleAccordion = (index) => {
  faqItems.value[index].isOpen = !faqItems.value[index].isOpen;
};
</script>