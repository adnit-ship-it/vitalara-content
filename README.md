# Medivora Site

A comprehensive Nuxt.js application for Medivora's weight loss platform, featuring an interactive intake form, product showcase, and patient journey visualization.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
medivora-site/
├── app.vue                          # Main app component with CRM data fetching
├── nuxt.config.ts                   # Nuxt configuration and environment setup
├── tailwind.config.js               # Tailwind CSS configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── eslint.config.js                 # ESLint configuration
│
├── assets/                          # Static assets
│   ├── css/
│   │   └── main.css                 # Global CSS styles
│   └── fonts/                       # Custom font files
│       ├── AllRoundGothicBold.woff2
│       ├── AllRoundGothicSemi.woff2
│       ├── DMSerifText-Regular.woff2
│       └── Quicksand-VariableFont_wght.woff2
│
├── components/                      # Vue components
│   ├── intake-form/                 # Intake form components
│   │   ├── checkout/                # Checkout flow components
│   │   │   ├── Navigation.vue
│   │   │   ├── PaymentStep.vue
│   │   │   └── ProductSelection.vue
│   │   ├── inputs/                  # Form input components
│   │   │   ├── BeforeAfter.vue
│   │   │   ├── Dropdown.vue
│   │   │   ├── FileInput.vue
│   │   │   ├── Marketing.vue
│   │   │   ├── MedicalReview.vue
│   │   │   ├── Perfect.vue
│   │   │   ├── Select.vue
│   │   │   ├── StripePayment.vue
│   │   │   ├── TextInput.vue
│   │   │   └── YesNoButtons.vue
│   │   ├── FormStepLayout.vue
│   │   ├── Header.vue
│   │   ├── Navigation.vue
│   │   ├── ProgressTracker.vue
│   │   ├── QuestionRenderer.vue
│   │   └── WeightSummaryDisplay.vue
│   ├── layout/                      # Layout components
│   │   ├── Footer.vue
│   │   └── Navbar.vue
│   ├── sections/                    # Page section components
│   │   ├── AboutBanner.vue
│   │   ├── AboutPriority.vue
│   │   ├── BeforeAfter.vue
│   │   ├── CTA.vue
│   │   ├── Discover.vue
│   │   ├── Hero.vue
│   │   ├── IntakeForm.vue
│   │   ├── Journey.vue              # Patient journey with scroll animations
│   │   ├── Reviews.vue
│   │   ├── Statistics.vue
│   │   └── TrustedBy.vue
│   └── ui/                          # Reusable UI components
│       ├── Button.vue
│       ├── CardCarousel.vue
│       ├── JourneyCard.vue
│       ├── ProductCard.vue
│       ├── ProductModal.vue
│       ├── SectionContainer.vue
│       └── SectionWrapper.vue
│
├── composables/                      # Vue composables
│   └── intake-form/
│       ├── useCheckout.ts           # Checkout state management
│       ├── useFormPersistence.ts   # Form data persistence
│       ├── useFormState.ts         # Form state management
│       ├── usePatientForm.ts       # Patient form logic
│       └── useStripe.ts            # Stripe integration
│
├── data/                            # Static data and configurations
│   ├── intake-form/
│   │   ├── formSteps.ts            # Form step definitions
│   │   ├── products.ts             # Product catalog
│   │   └── quizConfigs.ts          # Quiz configurations
│   └── reviews.ts                  # Customer reviews data
│
├── layouts/                         # Page layouts
│   ├── default.vue                 # Default layout
│   └── products.vue                # Products page layout
│
├── pages/                           # Application pages
│   ├── about.vue                   # About page
│   ├── checkout.vue                # Checkout page
│   ├── consultation.vue           # Consultation page
│   ├── contact.vue                 # Contact page
│   ├── index.vue                   # Homepage
│   ├── products.vue                # Products page
│   ├── quiz-selector.vue           # Quiz selection page
│   └── welcome.vue                 # Welcome page
│
├── plugins/                         # Nuxt plugins
│   └── toast.client.ts             # Toast notifications (client-only)
│
├── public/                          # Public static assets
│   ├── assets/
│   │   └── images/                 # Images and icons
│   │       ├── before-after/       # Before/after images
│   │       ├── clients/            # Client logos
│   │       ├── intake-form/        # Form-specific images
│   │       │   ├── before-after/
│   │       │   ├── icons/
│   │       │   ├── marketing/
│   │       │   └── option-icons/
│   │       └── products/           # Product images
│   ├── favicon.ico
│   └── robots.txt
│
├── server/                          # Server-side API endpoints
│   └── api/
│       ├── confirm-payment-setup.post.ts
│       ├── create-setup-intent.post.ts
│       ├── crm-data.get.ts         # CRM data fetching
│       └── submit-form.post.ts     # Form submission
│
├── stores/                          # Pinia stores
│   └── crmStore.ts                # CRM data store
│
├── types/                           # TypeScript type definitions
│   ├── index.ts                    # Global types
│   └── intake-form/
│       ├── checkout.ts             # Checkout types
│       └── form.ts                 # Form types
│
└── utils/                           # Utility functions
    └── intake-form/
        ├── buildFormPayload.ts     # Form payload builder
        ├── calculations.ts         # Form calculations
        ├── componentMapper.ts      # Component mapping
        ├── convertFile.ts          # File conversion utilities
        ├── submitForm.ts           # Form submission logic
        ├── textInterpolation.ts    # Text interpolation
        └── validation.ts           # Form validation
```

## ⚙️ Configuration

### Environment Variables

The application uses environment-specific configuration in `nuxt.config.ts`:

#### Server-side (Private)
- `careValidateApiKey`: API key for CareValidate integration

#### Client-side (Public)
- `stripePublishableKey`: Stripe publishable key
- `careValidateApiUrl`: CareValidate API endpoint
- `formTitle`: Form title configuration
- `formDescription`: Form description

### Tailwind CSS Configuration

Custom theme configuration in `tailwind.config.js`:

#### Colors
- `backgroundColor`: "#FDFAF6" (Light cream)
- `bodyColor`: "#000000" (Black)
- `accentColor1`: "#A75809" (Brown accent)
- `accentColor2`: "#F8F2EC" (Light brown)

#### Fonts
- `headingFont`: "AllRoundGothicSemi" (Headings)
- `bodyFont`: "Quicksand" (Body text)
- `defaultSerif`: "DMSerifText-Regular" (Serif text)

### Nuxt Modules

- `@nuxtjs/tailwindcss`: Tailwind CSS integration
- `@nuxt/eslint-config`: ESLint configuration
- `nuxt-marquee`: Marquee text component
- `@vueuse/motion/nuxt`: Motion animations
- `@pinia/nuxt`: State management

## 🎨 Design System

### Typography
- **Headings**: AllRoundGothicSemi font family
- **Body Text**: Quicksand variable font
- **Serif Text**: DMSerifText-Regular for special text

### Color Palette
- **Primary Background**: Light cream (#FDFAF6)
- **Accent Brown**: Warm brown (#A75809)
- **Light Accent**: Very light brown (#F8F2EC)
- **Text**: Black (#000000)

### Components
- **Responsive Design**: Mobile-first approach with breakpoints
- **Animations**: VueUse Motion for scroll-triggered animations
- **Form Components**: Comprehensive input system with validation
- **UI Components**: Reusable button, card, and layout components

## 🔧 Development

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Key Features

#### Intake Form System
- Multi-step form with progress tracking
- Dynamic question rendering
- File upload capabilities
- Form persistence across sessions
- Stripe payment integration
- CareValidate API integration

#### Patient Journey Visualization
- Interactive scroll-based animations
- Progress indicators for mobile/tablet
- Responsive design across all devices
- Motion animations for enhanced UX

#### Product Management
- Product catalog with images
- Product selection interface
- Pricing and discount handling
- Inventory management

#### CRM Integration
- Real-time CRM data fetching
- Patient case management
- Form submission to external APIs
- Error handling and validation

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run preview
```

### Environment Setup
1. Configure environment variables
2. Set up API keys for CareValidate and Stripe
3. Configure CDN for static assets
4. Set up monitoring and error tracking

## 📝 Notes

- **Hydration**: The application handles SSR/CSR hydration properly with client-only components where needed
- **Performance**: Optimized with lazy loading, image optimization, and efficient state management
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO**: Meta tags, structured data, and proper heading hierarchy
- **Security**: API keys properly secured, form validation, and XSS protection

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Follow ESLint and Prettier configurations
4. Test on multiple devices and screen sizes
5. Ensure accessibility compliance
6. Update documentation for new features
