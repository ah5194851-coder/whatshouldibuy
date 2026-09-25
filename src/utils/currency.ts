import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rateFromUSD: 1.0, label: 'United States (USD $)' },
  GBP: { code: 'GBP', symbol: '£', rateFromUSD: 0.78, label: 'United Kingdom (GBP £)' },
  EUR: { code: 'EUR', symbol: '€', rateFromUSD: 0.92, label: 'Europe (EUR €)' },
  CAD: { code: 'CAD', symbol: 'CA$', rateFromUSD: 1.36, label: 'Canada (CAD $)' },
  AUD: { code: 'AUD', symbol: 'A$', rateFromUSD: 1.52, label: 'Australia (AUD $)' },
};

export function convertPrice(amountUSD: number, targetCurrency: CurrencyCode): number {
  const rate = CURRENCIES[targetCurrency]?.rateFromUSD || 1.0;
  return Math.round(amountUSD * rate);
}

export function formatPrice(amountUSD: number, currency: CurrencyCode): string {
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = convertPrice(amountUSD, currency);
  return `${config.symbol}${converted.toLocaleString()}`;
}
