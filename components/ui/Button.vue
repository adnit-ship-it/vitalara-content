<template>
  <button
    v-if="!props.decorative"
    :class="buttonClasses"
    :style="buttonStyles"
    :disabled="props.disabled || props.loading"
  >
    <slot>{{ props.text }}</slot>
  </button>
  <div v-else :class="buttonClasses" :style="buttonStyles">
    <slot>{{ props.text }}</slot>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  height: {
    type: String,
    default: "48px",
  },
  width: {
    type: String,
    default: "full",
  },
  fontSize: {
    type: String,
    default: "16",
  },
  ghost: {
    type: Boolean,
    default: false,
  },
  // New props for integration
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "ghost", "disabled", "loading"].includes(value),
  },
  text: {
    type: String,
    default: "",
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  iconPosition: {
    type: String,
    default: "right",
    validator: (value) => ["left", "right"].includes(value),
  },
  decorative: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: "accentColor1",
  },
  textColor: {
    type: String,
    default: "white",
  },
});

const buttonClasses = computed(() => {
  const baseClasses =
    "flex items-center justify-center font-medium transition-colors rounded-full px-2 md:px-6  ";

  // Handle variant-based styling
  if (props.decorative) {
    // Decorative buttons don't have pointer cursor or button-specific interactions
    if (props.variant === "ghost" || props.ghost) {
      return `${baseClasses} border border-accentColor1 text-accentColor1 bg-white`;
    } else if (props.variant === "disabled" || props.disabled) {
      return `${baseClasses} bg-gray-300 text-gray-500`;
    } else if (props.variant === "loading" || props.loading) {
      return `${baseClasses} bg-${props.backgroundColor} text-${props.textColor} opacity-75`;
    } else {
      return `${baseClasses} bg-${props.backgroundColor} text-${props.textColor}`;
    }
  } else {
    // Regular buttons with pointer cursor and button interactions
    if (props.variant === "ghost" || props.ghost) {
      return `${baseClasses} border border-accentColor1 text-accentColor1 bg-white cursor-pointer`;
    } else if (props.variant === "disabled" || props.disabled) {
      return `${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed`;
    } else if (props.variant === "loading" || props.loading) {
      return `${baseClasses} bg-${props.backgroundColor} text-${props.textColor} opacity-75 cursor-not-allowed`;
    } else {
      return `${baseClasses} bg-${props.backgroundColor} text-${props.textColor} cursor-pointer`;
    }
  }
});

const buttonStyles = computed(() => {
  return {
    height: props.height,
    width: props.width === "full" ? "100%" : props.width,
    fontSize: `${props.fontSize}px`,
  };
});
</script>

<style scoped></style>
