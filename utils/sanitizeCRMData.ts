import DOMPurify from 'isomorphic-dompurify'

export interface SanitizedCRMData {
  primaryMedicationTitleText?: string
  primaryMedicationSubtitleText?: string
  [key: string]: any
}

export function sanitizeCRMData(rawData: any): SanitizedCRMData {
  if (!rawData || typeof rawData !== 'object') {
    return {}
  }

  const sanitized: SanitizedCRMData = {}

  // Sanitize HTML content fields
  const htmlFields = [
    'primaryMedicationTitleText',
    'primaryMedicationSubtitleText',
    'heroHeading',
    'heroSubheading'
  ]

  // Sanitize product bundle fields
  const productFields = [
    'name',
    'description',
    'soldOutListText',
    'soldOutModalText'
  ]

  for (const [key, value] of Object.entries(rawData)) {
    if (htmlFields.includes(key) && typeof value === 'string') {
      // Sanitize HTML content
      sanitized[key] = DOMPurify.sanitize(value, {
        ALLOWED_TAGS: ['span', 'br', 'strong', 'em'],
        ALLOWED_ATTR: ['style', 'class']
      })
    } else if (key === 'productBundles' && Array.isArray(value)) {
      // Sanitize product bundles
      sanitized[key] = value.map((bundle: any) => {
        const sanitizedBundle = { ...bundle }
        productFields.forEach(field => {
          if (bundle[field] && typeof bundle[field] === 'string') {
            // Extract text content from HTML
            const tempDiv = process.client ? document.createElement('div') : null
            if (tempDiv) {
              tempDiv.innerHTML = DOMPurify.sanitize(bundle[field], {
                ALLOWED_TAGS: [],
                ALLOWED_ATTR: []
              })
              sanitizedBundle[field] = tempDiv.textContent || tempDiv.innerText || ''
            } else {
              // Server-side: use regex to remove HTML tags
              sanitizedBundle[field] = DOMPurify.sanitize(bundle[field], {
                ALLOWED_TAGS: [],
                ALLOWED_ATTR: []
              }).replace(/<[^>]*>/g, '').trim()
            }
          }
        })
        return sanitizedBundle
      })
    } else if (key === 'defaultProductBundle' && value && typeof value === 'object') {
      // Sanitize default product bundle
      const sanitizedBundle = { ...value }
      productFields.forEach(field => {
        if (value[field] && typeof value[field] === 'string') {
          // Extract text content from HTML
          const tempDiv = process.client ? document.createElement('div') : null
          if (tempDiv) {
            tempDiv.innerHTML = DOMPurify.sanitize(value[field], {
              ALLOWED_TAGS: [],
              ALLOWED_ATTR: []
            })
            sanitizedBundle[field] = tempDiv.textContent || tempDiv.innerText || ''
          } else {
            // Server-side: use regex to remove HTML tags
            sanitizedBundle[field] = DOMPurify.sanitize(value[field], {
              ALLOWED_TAGS: [],
              ALLOWED_ATTR: []
            }).replace(/<[^>]*>/g, '').trim()
          }
        }
      })
      sanitized[key] = sanitizedBundle
    } else {
      // Pass through non-HTML fields as-is
      sanitized[key] = value
    }
  }

  return sanitized
}