<script setup lang="ts">
import { computed } from 'vue';
import { UiSectionWrapper } from '#components';
import { useSiteTextStore } from '~/stores/siteText';

const siteTextStore = useSiteTextStore();

// Initialize site text once for this component
const banner = computed(() => siteTextStore.getAboutText()?.banner);

</script>

<template>
    <UiSectionWrapper class="py-20">
        <UiSectionContainer>
            <img v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 500,
                    type: 'ease-in',
                    stiffness: 250,
                    damping: 25,
                    mass: 1,
                },
            }" src="/assets/images/brand/logo-alt.svg" alt="brand logo"
                class="w-auto h-[48px] md:h-[64px] lg:h-[100px] object-cover mx-auto" />
            <div class="w-full flex flex-col md:flex-row gap-8 lg:gap-20 items-center mt-12 md:mt-6">
                <div class="flex-1 h-full flex flex-col gap-2 lg:gap-6">
                    <h1 v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 500,
                            type: 'ease-in',
                            stiffness: 250,
                            damping: 25,
                            mass: 1,
                            delay: 50,
                        },
                    }" class="font-semibold text-[32px] lg:text-[48px] text-accentColor1 mb-2 lg:mb-4">
                        {{ banner?.title || 'About Us' }}
                    </h1>
                    <h2 v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 500,
                            type: 'ease-in',
                            stiffness: 250,
                            damping: 25,
                            mass: 1,
                            delay: 100,
                        },
                    }" class="font-semibold text-[24px] lg:text-[34px]">
                        {{ banner?.subtitle || 'Quality is our guarantee!' }}
                    </h2>
                    <p v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 500,
                            type: 'ease-in',
                            stiffness: 250,
                            damping: 25,
                            mass: 1,
                            delay: 150,
                        },
                    }" class="text-[24px] lg:text-[34px] font-light">
                        {{ banner?.description || 'Medivora works to change the game in the health and wellness space allowing for certified medical care, made simple and effective.' }}
                    </p>
                </div>
                <div class="w-[160px] lg:w-[288px] h-full">
                    <img v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
            opacity: 1,
            y: 0,
            transition: {
              duration: 500,
              type: 'ease-in',
              stiffness: 250,
              damping: 25,
              mass: 1,
              delay: 0,
            },
          }" src="/assets/images/products-alt.png" alt="products" class="w-full h-full object-cover" />
                </div>
            </div>
        </UiSectionContainer>
    </UiSectionWrapper>
</template>