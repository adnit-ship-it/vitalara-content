import { useBrandingStore } from '~/stores/branding'

/**
 * Utility function to get dynamic brand colors from the API
 * Falls back to static design tokens if branding is not loaded
 */
export function useBrandColors() {
  const brandingStore = useBrandingStore()
  
  const getBrandColors = () => {
    const brandColors = brandingStore.getBrandColors()
    
    if (brandColors) {
      return {
        backgroundColor: brandColors.background,
        bodyColor: brandColors.body,
        accentColor1: brandColors.accent1,
        accentColor2: brandColors.accent2,
      }
    }
    
    // Fallback to static design tokens
    return {
      backgroundColor: '#FDFAF6',
      bodyColor: '#000000',
      accentColor1: '#A75809',
      accentColor2: '#F8F2EC',
    }
  }
  
  return {
    getBrandColors,
    isBrandingLoaded: computed(() => !!brandingStore.branding)
  }
}

/**
 * Utility function to get brand logos from the API
 */
export function useBrandLogos() {
  const brandingStore = useBrandingStore()
  
  return {
    logoUrl: computed(() => brandingStore.getLogoUrl()),
    altLogoUrl: computed(() => brandingStore.getAltLogoUrl()),
    organizationName: computed(() => brandingStore.getOrganizationName()),
    isBrandingLoaded: computed(() => !!brandingStore.branding)
  }
}