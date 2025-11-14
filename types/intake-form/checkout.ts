// Product interface - individual products with direct pricing
export interface Product {
  id: string;
  name: string;
  description: string;
  img: string;
  thumbnail: string;
  prices: {
    monthly?: number;
    threeMonthly?: number;
    sixMonthly?: number;
    semiannually?: number; // Alias for sixMonthly for backward compatibility
  };
  productBundleIds: {
    monthly?: string;
    threeMonthly?: string;
    sixMonthly?: string;
  }
  quizId?: string; // Quiz ID associated with this product
  popular?: boolean;
  availability?: "in_stock" | "out_of_stock" | "coming_soon";
  features?: string[];
  type: "injection" | "oral_drops" | "oral_pills";
  category: string;
}

// Checkout page state interface
export interface CheckoutState {
  selectedProduct?: Product;
  billingCycle?: "monthly" | "semiannually";
}
