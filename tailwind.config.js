import designTokens from './data/designTokens.json'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Dynamic colors from CSS custom properties (set by branding API)
        backgroundColor: 'var(--color-background, #EBF2EE)',
        bodyColor: 'var(--color-body, #4A4A4A)',
        accentColor1: {
          DEFAULT: 'var(--color-accentColor1, #337168)',
          50: 'color-mix(in srgb, var(--color-accentColor1, #337168) 50%, transparent)',
        },
        accentColor2: 'var(--color-accentColor2, #6C9E7A)',
      },
      fontFamily: {
        // Fonts automatically loaded from designTokens.json
        headingFont: [designTokens.fonts.heading, "sans-serif"],
        bodyFont: [designTokens.fonts.body, "sans-serif"],
        defaultSerif: [designTokens.fonts.serif, "serif"],
      },
    },
  },
  plugins: [],
};
