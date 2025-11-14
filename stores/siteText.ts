import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface MediaAsset {
  src: string
  alt: string
}

export interface SiteTextData {
  home: {
    hero: {
      show: boolean
      heading: string
      subheading: string
      bulletPoints: {
        trustedByExperts: string
        provenResults: string
        exceptionalCare: string
      }
      ctaButton: string
      media: {
        background: MediaAsset
        foreground: MediaAsset
        bulletIcon: MediaAsset
        logo: MediaAsset
      }
    }
    trustedBy: {
      show: boolean
      title: string
      marquee: {
        speed: number
      }
      logos: MediaAsset[]
    }
    discover: {
      show: boolean
      title: string
      subtitle: string
      shippingInfo: string
      providerText: string
      buyNowButton: string
      fallbackProducts: Array<{
        id: string
        productName: string
        price: string
        isBestSeller: boolean
        image: MediaAsset
      }>
    }
    reviews: {
      show: boolean
      title: string
      marquee: {
        speed: number
      }
      media: {
        avatar: MediaAsset
        star: MediaAsset
      }
      list: Array<{
        name: string
        stars: number
        review: string
      }>
    }
    statistics: {
      show: boolean
      title: string
      cards: Array<{
        value: string
        description: string
      }>
      media: {
        graph: MediaAsset
      }
    }
    journey: {
      show: boolean
      title: string
      steps: Array<{
        title: string
        subtext: string[]
        icon: MediaAsset
      }>
      ctaButton: string
      media: {
        progressLine: MediaAsset
      }
    }
    cta: {
      show: boolean
      title: string
      subtitle: string
      stats: {
        patients: string
        worldwideCare: string
      }
      features: {
        noHiddenFees: string
        freeDelivery: string
        doctorLedPlans: string
        moneyBackGuarantee: string
      }
      media: {
        product: MediaAsset
        featureIcon: MediaAsset
      }
    }
    beforeAfter: {
      show: boolean
      title: string
      images: MediaAsset[]
    }
    intakeForm: {
      show: boolean
      title: string
      highlight: string
      fields: Array<{
        label: string
        placeholder: string
      }>
    }
    faq: {
      show: boolean
      title: string
      questions: Array<{
        question: string
        answer: string
      }>
    }
  }
  about: {
    banner: {
      show: boolean
      title: string
      subtitle: string
      description: string
      media: {
        image: MediaAsset
      }
    }
    priority: {
      show: boolean
      title: string
      features: {
        noHiddenFees: string
        expeditedDelivery: string
        doctorLedPlans: string
        moneyBackGuarantee: string
      }
      support: {
        title: string
        description: string
      }
      providers: {
        title: string
        description: string
        certification: string
      }
      media: {
        featureIcon: MediaAsset
        certificationIcon: MediaAsset
      }
    }
  }
  products: {
    page: {
      show: boolean
      title: string
      subtitle: string
      categoryButton: string
    }
    section: {
      show: boolean
      title: string
    }
  }
  contact: {
    show: boolean
    title: string
    form: {
      labels: {
        name: string
        age: string
        email: string
        message: string
      }
      placeholders: {
        name: string
        age: string
        email: string
        message: string
      }
      submitButton: string
      successMessage: string
      errorMessage: string
    }
  }
  common: {
    buttons: {
      next: string
      submitToProvider: string
      back: string
      getStarted: string
    }
    navigation: {
      home: string
      about: string
      products: string
      contact: string
      contactUs: string
      product: string
    }
    accessibility: {
      toggleMenu: string
      brandLogo: string
      menu: string
    }
    media: {
      hamburgerMenu: MediaAsset
    }
    status: {
      loading: string
    }
  }
}

export const useSiteTextStore = defineStore('siteText', () => {
  const siteText = ref<SiteTextData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadSiteText = async () => {
    if (siteText.value) {
      return // Already loaded
    }

    isLoading.value = true
    error.value = null

    try {
      // Import the JSON file directly for better SSR compatibility
      const data = await import('~/data/websiteText.json')
      siteText.value = data.default
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load site text'
    } finally {
      isLoading.value = false
    }
  }

  const loadSiteTextFromAPI = async (apiSiteText: any) => {
    isLoading.value = true
    error.value = null

    try {
      siteText.value = apiSiteText
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load site text from API'
      console.error('Error loading site text from API:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Helper methods to get specific text sections
  const getHomeText = () => siteText.value?.home || null
  const getAboutText = () => siteText.value?.about || null
  const getProductsText = () => siteText.value?.products || null
  const getContactText = () => siteText.value?.contact || null
  const getCommonText = () => siteText.value?.common || null

  // Method to set site text directly (for SSR)
  const setSiteText = (data: SiteTextData) => {
    siteText.value = data
  }

  return {
    siteText,
    isLoading,
    error,
    loadSiteText,
    loadSiteTextFromAPI,
    setSiteText,
    getHomeText,
    getAboutText,
    getProductsText,
    getContactText,
    getCommonText
  }
})