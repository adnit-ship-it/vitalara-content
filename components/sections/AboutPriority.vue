<script setup lang="ts">
import { computed } from 'vue';
import { useSiteTextStore } from '~/stores/siteText';

const siteTextStore = useSiteTextStore();

// Initialize site text once for this component
const priority = computed(() => siteTextStore.getAboutText()?.priority);
</script>

<template>
    <UiSectionWrapper class="pb-8 md:pb-20 pt-6 md:pt-2">
        <UiSectionContainer class="flex flex-col items-start">
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
            }" class="text-[20px] lg:text-[32px] w-full text-left font-semibold">
                {{ priority?.title || 'Your Satisfaction Is Our Priority' }}
            </h2>
            <div class="mt-6 lg:mt-10 flex flex-col md:flex-row gap-4 md:justify-between w-full px-8 lg:px-0">
                <div v-motion :initial="{ opacity: 0, y: 32 }" :visible-once="{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 400,
                        type: 'ease-in',
                        stiffness: 250,
                        damping: 25,
                        mass: 1,
                        delay: 150,
                    },
                }" class="flex flex-row gap-2 items-center">
                    <img src="/assets/images/brand/check-star.svg" alt="checkmark" class="w-[28px] h-[28px]" />
                    <p class="text-[16px] lg:text-[20px] font-medium">{{ priority?.features.noHiddenFees || 'No Hidden Fees' }}</p>
                </div>
                <div v-motion :initial="{ opacity: 0, y: 32 }" :visible-once="{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 400,
                        type: 'ease-in',
                        stiffness: 250,
                        damping: 25,
                        mass: 1,
                        delay: 200,
                    },
                }" class="flex flex-row gap-2 items-center">
                    <img src="/assets/images/brand/check-star.svg" alt="checkmark" class="w-[28px] h-[28px]" />
                    <p class="text-[16px] lg:text-[20px] font-medium">
                        {{ priority?.features.expeditedDelivery || 'Expedited Delivery' }}
                    </p>
                </div>
                <div v-motion :initial="{ opacity: 0, y: 32 }" :visible-once="{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 400,
                        type: 'ease-in',
                        stiffness: 250,
                        damping: 25,
                        mass: 1,
                        delay: 250,
                    },
                }" class="flex flex-row gap-2 items-center">
                    <img src="/assets/images/brand/check-star.svg" alt="checkmark" class="w-[28px] h-[28px]" />
                    <p class="text-[16px] lg:text-[20px] font-medium">
                        {{ priority?.features.doctorLedPlans || 'Doctor-led Plans & Coaching' }}
                    </p>
                </div>
                <div v-motion :initial="{ opacity: 0, y: 32 }" :visible-once="{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 400,
                        type: 'ease-in',
                        stiffness: 250,
                        damping: 25,
                        mass: 1,
                        delay: 300,
                    },
                }" class="flex flex-row gap-2 items-center">
                    <img src="/assets/images/brand/check-star.svg" alt="checkmark" class="w-[28px] h-[28px]" />
                    <p class="text-[16px] lg:text-[20px] font-medium">
                        {{ priority?.features.moneyBackGuarantee || 'Money Back Guarantee' }}
                    </p>
                </div>
            </div>
            <div
                class="pb-12 lg:pb-0 px-8 lg:px-0 mt-12 lg:mt-16 flex flex-col md:flex-row gap-8 justify-center md:justify-around w-full">
                <div v-motion :initial="{ opacity: 0, y: 32 }" :visible-once="{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 400,
                        type: 'ease-in',
                        stiffness: 250,
                        damping: 25,
                        mass: 1,
                        delay: 350,
                    },
                }" class="flex flex-col items-center max-w-[400px]">
                    <h3 class="text-accentColor1 text-[20px] lg:text-[24px] font-semibold text-left md:text-center w-full">
                        {{ priority?.support.title || 'Unlimited 24/7 Support Included' }}
                    </h3>
                    <div class="h-0.5 w-10 bg-accentColor1 mt-0"></div>
                    <p class="font-medium mt-4 tracking-tight w-full text-left md:text-center">
                        {{ priority?.support.description || 'Medivora provides 24/7 access to a dedicated team of specialists, ensuring you have the support you need around the clock. With unlimited appointments, messaging and support, you can confidently reach out for guidance, ask questions, or address concerns at any time.' }}
                    </p>
                </div>
                <div v-motion :initial="{ opacity: 0, y: 32 }" :visible-once="{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 400,
                        type: 'ease-in',
                        stiffness: 250,
                        damping: 25,
                        mass: 1,
                        delay: 350,
                    },
                }" class="flex flex-col items-center max-w-[400px]">
                    <h3 class="text-accentColor1 text-[20px] lg:text-[24px] font-semibold text-left md:text-center w-full">
                        {{ priority?.providers.title || 'Hand Selected Providers' }}
                    </h3>
                    <div class="h-0.5 w-10 bg-accentColor1 mt-0"></div>
                    <p class="font-medium mt-4 w-full text-left md:text-center">
                        {{ priority?.providers.description || 'Medivora physicians are here to guide you every step of the way, bringing both their expertise and genuine care to keep you supported.' }}
                    </p>
                    <div class="flex flex-row gap-4 w-full justify-start md:justify-center items-center mt-2">
                        <img src="/assets/images/checkmark-star.svg" alt="checkmark"
                            class="w-[28px] h-[28px] object-cover" />
                        <p>{{ priority?.providers.certification || 'Certified doctors and clinicians' }}</p>
                    </div>
                </div>
            </div>
        </UiSectionContainer>
    </UiSectionWrapper>
</template>