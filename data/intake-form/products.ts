import type { Product } from "~/types/intake-form/checkout";

// --- PRODUCT DATA ---

// This is the master list of all available products.

export const products: Product[] = [
  {
    id: "mounjaro-injection",
    name: "Mounjaro Inasdasdjection",
    description: "Weekly GLP-1 injection for weight loss and diabetes management",
    img: "/assets/images/products/mounjaro-injection.png",
    thumbnail: "/assets/images/products/mounjaro-injection.png",
    prices: {
      monthly: 399,
      threeMonthly: 349,
      sixMonthly: 349
    },
    productBundleIds: {
      monthly: "awdwad12-11",
      threeMonthly: "awdwad12-12",
      sixMonthly: "awdwad12-awdad-13"
    },
    quizId: "glp1-weight-loss",
    category: "weight-loss",
    popular: true,
    availability: "in_stock",
    type: "injection",
    features: [
      "Weekly subcutaneous injection",
      "GLP-1 receptor agonist",
      "Effective for weight loss",
      "Diabetes management",
      "Prescription required"
    ],
    quiz: null
  },
  {
    id: "ozempic-injection",
    name: "Ozempic Injection",
    description: "Weekly GLP-1 injection for weight loss and blood sugar control",
    img: "/assets/images/products/ozempic-injection.png",
    thumbnail: "/assets/images/products/ozempic-injection.png",
    prices: {
      monthly: 399,
      threeMonthly: 349,
      sixMonthly: 349
    },
    productBundleIds: {
      monthly: "awdwad12-awdad-21",
      threeMonthly: "awdwad12-awdad-22",
      sixMonthly: "awdwad12-awdad-23"
    },
    quizId: "glp1-weight-loss",
    category: "weight-loss",
    availability: "in_stock",
    type: "injection",
    features: [
      "Weekly subcutaneous injection",
      "GLP-1 receptor agonist",
      "Weight loss support",
      "Blood sugar control",
      "Prescription required"
    ],
    quiz: null
  },
  {
    id: "methylcobalamin-injection",
    name: "Methylcobalamin Injection",
    description: "Vitamin B12 injection for energy and neurological health",
    img: "/assets/images/products/methylcobalamin-injection.png",
    thumbnail: "/assets/images/products/methylcobalamin-injection.png",
    prices: {
      monthly: 399,
      threeMonthly: 349,
      sixMonthly: 349
    },
    productBundleIds: {
      monthly: "awdwad12-awdad-31",
      threeMonthly: "awdwad12-awdad-32",
      sixMonthly: "awdwad12-awdad-33"
    },
    quizId: "vitamin-b12",
    availability: "in_stock",
    category: "energy",
    type: "injection",
    features: [
      "Vitamin B12 supplement",
      "Energy boost",
      "Neurological support",
      "Methylated form for better absorption",
      "Prescription required"
    ],
    quiz: null
  }
];


export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getPopularProducts(): Product[] {
  return products.filter((product) => product.popular);
}

