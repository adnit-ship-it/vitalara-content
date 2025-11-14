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
        backgroundColor: '#1E6B40',
        bodyColor: '#4A4A4A',
        accentColor1: {
          DEFAULT: '#FF6B35',
          50: 'color-mix(in srgb, #FF6B35 50%, transparent)',
        },
        accentColor2: '#4FB56E',
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
