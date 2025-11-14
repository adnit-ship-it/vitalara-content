<template>
  <div
    class="w-[250px] lg:w-[342px] h-[296px] lg:h-[402px] bg-[#ededed] flex flex-col justify-end items-center relative cursor-pointer hover:shadow-lg transition-shadow"
    @click="handleClick"
  >
    <!-- Best Seller Flag -->
    <div v-if="isBestSeller" class="absolute top-3 left-3 z-10">
      <span
        class="text-black text-[12px] lg:text-[14px] rounded-full bg-[#FAFAFA] px-4 py-0.5 font-medium"
      >
        Best Seller
      </span>
    </div>

    <!-- Product Image -->
    <img
      :src="imageSrc"
      :alt="imageAlt"
      class="w-full object-cover min-h-[248px] max-h-[248px] lg:min-h-[360px] lg:max-h-[360px]"
    />

    <!-- Product Info Bar -->
    <div
      class="w-full min-h-12 lg:min-h-[40px] text-[16px] flex justify-between items-center px-2 lg:px-4 bg-accentColor1 text-white"
    >
      <p class="">{{ productName }}</p>
      <p class="">{{ price }}</p>
    </div>
  </div>
</template>

<script setup>
// Define props for the component
const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  isBestSeller: {
    type: Boolean,
    default: false,
  },
});

// Define emits
const emit = defineEmits(["click"]);

// Handle click event
const handleClick = () => {
  emit("click", {
    imageSrc: props.imageSrc,
    productName: props.productName,
    price: props.price,
    isBestSeller: props.isBestSeller,
  });
};
</script>

<style scoped>
/* Component styles can be added here */
</style>
