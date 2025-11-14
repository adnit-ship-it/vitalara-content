<template>
  <div class="pt-24 pb-16  md:py-28 flex-col bg-backgroundColor">
    <UiSectionWrapper>
      <UiSectionContainer class="pt-0">
        <div class="w-full min-h-[640px] flex flex-col items-center gap-4 pt-8 lg:pt-12">
          <img src="/assets/images/brand/logo.svg" alt="vitalara logo"
            class="w-auto h-[60px] lg:h-[88px] object-cover" />
          <div class="w-full flex flex-col lg:flex-row gap-8 items-center">
            <div class="flex-1 h-full flex flex-col gap-2 lg:gap-6 pl-4 lg:pl-24">
              <h1 class="font-semibold text-[32px] lg:text-[48px] text-accentColor1 mb-2 lg:mb-4">
                About Us
              </h1>
              <h2 class="font-semibold text-[24px] lg:text-[34px]">
                Quality is our guarantee!
              </h2>
              <p class="text-[24px] lg:text-[34px] font-light">
                Vitalara works to change the game in the health and wellness space
                allowing for certified medical care, made simple and effective.
              </p>
            </div>
            <div class="w-[320px] lg:min-w-[480px] h-full">
              <img src="/assets/images/products.png" alt="products" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </UiSectionContainer>
    </UiSectionWrapper>
    <SectionsTrustedBy center />
    <UiSectionWrapper>
      <UiSectionContainer class="pt-20 text-bodyColor">
        <div class="p-4 w-full">
          <h2 class="section-title text-bodyColor text-center font-semibold">
            Your Satisfaction Is Our Priority
          </h2>
          <div class="mt-6 lg:mt-10 flex flex-col md:flex-row gap-4">
            <div class="flex flex-row gap-2 items-center">
              <img src="/assets/images/checkmark-star.svg" alt="checkmark" class="w-[38px] h-[38px]" />
              <p class="text-[16px] lg:text-[20px] font-medium">No Hidden Fees</p>
            </div>
            <div class="flex flex-row gap-2 items-center">
              <img src="/assets/images/checkmark-star.svg" alt="checkmark" class="w-[38px] h-[38px]" />
              <p class="text-[16px] lg:text-[20px] font-medium">
                Expedited Delivery
              </p>
            </div>
            <div class="flex flex-row gap-2 items-center">
              <img src="/assets/images/checkmark-star.svg" alt="checkmark" class="w-[38px] h-[38px]" />
              <p class="text-[16px] lg:text-[20px] font-medium">
                Doctor-led Plans & Coaching
              </p>
            </div>
            <div class="flex flex-row gap-2 items-center">
              <img src="/assets/images/checkmark-star.svg" alt="checkmark" class="w-[38px] h-[38px]" />
              <p class="text-[16px] lg:text-[20px] font-medium">
                Money Back Guarantee
              </p>
            </div>
          </div>
          <div class="pb-12 lg:pb-0 mt-12 lg:mt-16 flex flex-col md:flex-row gap-8 lg:gap-40 justify-center">
            <div class="flex flex-col items-center max-w-[400px]">
              <h3 class="text-accentColor1 text-[20px] lg:text-[24px] font-semibold text-center">
                Unlimited 24/7 Support Included
              </h3>
              <div class="h-0.5 w-10 bg-accentColor2 mt-0"></div>
              <p class="font-medium text-center mt-4">
                Vitalara provides 24/7 access to a dedicated team of specialists,
                ensuring you have the support you need around the clock. With
                unlimited appointments, messaging and support, you can confidently
                reach out for guidance, ask questions, or address concerns at any
                time.
              </p>
            </div>
            <div class="flex flex-col items-center max-w-[400px]">
              <h3 class="text-accentColor1 text-[20px] lg:text-[24px] font-semibold text-center">
                Hand Selected Providers
              </h3>
              <div class="h-0.5 w-10 bg-accentColor2 mt-0"></div>
              <p class="font-medium text-center mt-4">
                Vitalara physicians are here to guide you every step of the way,
                bringing both their expertise and genuine care to keep you
                supported.
              </p>
              <div class="flex flex-row gap-4 w-full justify-center items-center mt-2">
                <img src="/assets/images/checkmark_yellow.svg" alt="checkmark" class="w-[28px] h-[28px] object-cover" />
                <p>Certified doctors and clinicians</p>
              </div>
            </div>
          </div>
        </div>
      </UiSectionContainer>
    </UiSectionWrapper>

  </div>
</template>

<script setup>
// About page logic
</script>

<style scoped>
/* About page styles */
</style>
