export type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromUSD: number;
  label: string;
}

export interface RetailerDeal {
  name: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  affiliateUrl: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string; // e.g. 'laptops', 'smartphones'
  subcategory: string;
  image: string;
  price: number; // Base USD price
  originalPrice?: number;
  currency: string;
  rating: number; // e.g. 4.8 out of 5
  reviewCount: number;
  productUrl: string;
  affiliateUrl: string;
  retailers: RetailerDeal[];
  specifications: Record<string, string>;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  suitabilityNotes: string;
  targetPurposes: string[];
  keyStrengths: string[];
  warranty: string;
  lastUpdated: string;
  isFeatured: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  pluralName: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
  subcategories: string[];
  topFeaturesToLookFor: string[];
  commonMistakes: string[];
  buyingGuideSummary: string;
  aeoDirectDefinition?: string;
  howToSteps?: { name: string; text: string }[];
  highIntentKeywords?: string[];
  faqs: { question: string; answer: string }[];
  relatedCategorySlugs: string[];
}

export interface BuyingGuide {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  subheadline: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  summary: string;
  methodology: string;
  aeoTakeaway?: string;
  howToSteps?: { name: string; text: string }[];
  targetKeywords?: string[];
  topPickIds: {
    rankTitle: string;
    productId: string;
    whyChosen: string;
  }[];
  evaluationCriteria: {
    title: string;
    explanation: string;
  }[];
  verdict: string;
  faqs: { question: string; answer: string }[];
}

export interface FinderFilterState {
  category: string;
  minBudget: number;
  maxBudget: number;
  purpose: string;
  importantFeatures: string[];
  preferredBrand: string;
  useAI?: boolean;
}

export interface MatchedProductResult {
  product: Product;
  matchScore: number; // 0 - 100
  suitabilityReasons: string[];
  tradeOffs: string[];
  aiAnalysis?: string;
}
