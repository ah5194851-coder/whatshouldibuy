import { Product, Category, BuyingGuide } from '../types';

/**
 * Truncate text cleanly at word boundary without breaking words
 */
export function trimAtWordBoundary(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const sub = text.slice(0, maxLength);
  const lastSpace = sub.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.7) {
    return sub.slice(0, lastSpace).trim();
  }
  return sub.trim();
}

/**
 * Helper to ensure a description lands cleanly in the 125 - 158 character golden SEO zone
 */
export function fitToOptimalLength(
  base: string,
  cta: string,
  minLen = 125,
  maxLen = 158
): string {
  const combined = `${base.trim()} ${cta.trim()}`.trim();
  if (combined.length <= maxLen && combined.length >= minLen) {
    return combined;
  }

  if (combined.length > maxLen) {
    // Try shorter CTAs
    const shortCtas = [
      'Compare verified specs, pros, cons & live prices.',
      'Compare verified specs, pros & live deals.',
      'Compare specs, pros, cons & prices.',
      'Compare specs & live retailer deals.',
      'Read verified tests & top picks.',
      'Read our 2026 buying guide.',
    ];

    for (const shortCta of shortCtas) {
      const trial = `${base.trim()} ${shortCta}`;
      if (trial.length <= maxLen && trial.length >= minLen) {
        return trial;
      }
    }

    // If still too long, trim base and attach a short CTA
    const targetBaseLen = maxLen - 36; // leave room for ' Read our 2026 buyer guide.'
    const trimmedBase = trimAtWordBoundary(base, targetBaseLen).replace(/[,;.:]+$/, '');
    return `${trimmedBase}. Read our 2026 buyer guide.`;
  }

  // If shorter than minLen, expand with supportive context
  const expansion = ' Independent research, verified specifications, and live prices.';
  const expanded = `${base.trim()}${expansion}`;
  if (expanded.length <= maxLen && expanded.length >= minLen) {
    return expanded;
  }

  return combined;
}

/**
 * Dynamic Product Title Generator
 * Optimal length: 35 - 60 characters
 */
export function buildProductTitle(product: Product): string {
  const name = product.name.trim();

  // 1. Try standard full brand format if it fits (<= 60 chars)
  const fullBrandCandidates = [
    `${name} Review & Specs | What Should I Buy?`,
    `${name} Review & Deals | What Should I Buy?`,
    `${name} – What Should I Buy?`,
  ];
  for (const cand of fullBrandCandidates) {
    if (cand.length >= 35 && cand.length <= 60) return cand;
  }

  // 2. Try with compact brand postfix (| WSIB)
  const compactCandidates = [
    `${name} Review, Specs & Price | WSIB`,
    `${name} Review & Specs | WSIB`,
    `${name} Review & Best Deals | WSIB`,
    `${name} Review & Price | WSIB`,
    `${name} | WSIB`,
  ];
  for (const cand of compactCandidates) {
    if (cand.length >= 35 && cand.length <= 60) return cand;
  }

  // 3. If product name alone is long (> 48 chars), trim at word boundary
  const trimmed = trimAtWordBoundary(name, 48).replace(/[,;.:]+$/, '');
  return `${trimmed}… | WSIB`;
}

/**
 * Dynamic Product Meta Description Generator
 * Optimal length: 125 - 158 characters
 * Incorporates: Rating, starting price, target user suitability, specs/strengths, and CTA
 */
export function buildProductDescription(product: Product): string {
  const priceStr = `$${product.price.toLocaleString()}`;
  const ratingStr = `Rated ${product.rating}/5`;

  // Clean persona/suitability
  let persona = (product.bestFor || '').trim().replace(/\.$/, '');
  if (persona.length > 50) {
    if (product.keyStrengths && product.keyStrengths.length > 0 && product.keyStrengths[0].length <= 40) {
      persona = product.keyStrengths[0];
    } else {
      persona = trimAtWordBoundary(persona, 46).replace(/[,;]$/, '');
    }
  }

  const ctaLong = 'Compare verified specs, pros, cons & live store prices.';
  const ctaMed = 'Compare verified specs, pros, cons & live prices.';
  const ctaShort = 'Compare specs, pros, cons & live deals.';
  const ctaCompact = 'Compare specs & live retailer prices.';

  // Attempt standard rich format
  const intro = `${product.name} review: ${ratingStr} from ${priceStr}. Best for ${persona}.`;

  const candidates = [
    `${intro} ${ctaLong}`,
    `${intro} ${ctaMed}`,
    `${intro} ${ctaShort}`,
    `${intro} ${ctaCompact}`,
  ];

  for (const c of candidates) {
    if (c.length >= 125 && c.length <= 160) {
      return c;
    }
  }

  // If intro was too long, try a tighter format
  const compactIntro = `${product.name}: ${ratingStr} (${priceStr}). Built for ${persona}.`;
  for (const c of [
    `${compactIntro} ${ctaMed}`,
    `${compactIntro} ${ctaShort}`,
    `${compactIntro} ${ctaCompact}`,
  ]) {
    if (c.length >= 125 && c.length <= 160) {
      return c;
    }
  }

  // If still out of bounds, use fitToOptimalLength
  return fitToOptimalLength(
    `${product.name} review: ${ratingStr} from ${priceStr}. Built for ${persona}.`,
    ctaShort,
    125,
    158
  );
}

/**
 * Dynamic Category Title Generator
 * Optimal length: 35 - 60 characters
 */
export function buildCategoryTitle(category: Category): string {
  const plural = category.pluralName.trim();

  // Candidate 1: "Best ${plural} (2026 Buying Guide) – What Should I Buy?"
  const t1 = `Best ${plural} (2026 Buying Guide) – What Should I Buy?`;
  if (t1.length >= 35 && t1.length <= 60) return t1;

  // Candidate 2: "Best ${plural} 2026: Reviews & Buying Guide | WSIB"
  const t2 = `Best ${plural} 2026: Reviews & Buying Guide | WSIB`;
  if (t2.length >= 35 && t2.length <= 60) return t2;

  // Candidate 3: "Best ${plural} 2026: Top Models & Comparisons | WSIB"
  const t3 = `Best ${plural} 2026: Top Models & Comparisons | WSIB`;
  if (t3.length >= 35 && t3.length <= 60) return t3;

  // Candidate 4: "Best ${plural} (2026) – Reviews & Specs | WSIB"
  const t4 = `Best ${plural} (2026) – Reviews & Specs | WSIB`;
  if (t4.length >= 35 && t4.length <= 60) return t4;

  return `Best ${plural} 2026 | What Should I Buy?`;
}

/**
 * Dynamic Category Meta Description Generator
 * Optimal length: 125 - 158 characters
 * Incorporates: Count of vetted products, top brands, starting price, and buyer guide CTA
 */
export function buildCategoryDescription(
  category: Category,
  categoryProducts: Product[]
): string {
  const pluralLower = category.pluralName.toLowerCase();
  const brands = Array.from(new Set(categoryProducts.map(p => p.brand))).filter(Boolean);
  const prices = categoryProducts.map(p => p.price).filter(p => typeof p === 'number' && p > 0);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const count = categoryProducts.length;

  const brandText = brands.length > 0 ? brands.slice(0, 3).join(', ') : '';
  const priceText = minPrice > 0 ? ` from $${minPrice.toLocaleString()}` : '';

  // Candidate 1: Count + Brands + Starting Price + CTA
  if (count > 0 && brandText) {
    const c1 = `Looking for the best ${pluralLower}? Compare ${count} top models from ${brandText}${priceText}. Vetted specs, pros & cons, and 2026 buyer guide.`;
    if (c1.length >= 125 && c1.length <= 160) return c1;

    const c2 = `Find the best ${pluralLower}${priceText}. Compare ${count} vetted models from ${brandText}. Detailed specs, lab ratings, pros & cons, and 2026 guide.`;
    if (c2.length >= 125 && c2.length <= 160) return c2;

    const c3 = `Compare ${count} top ${pluralLower} from ${brandText}${priceText}. Tested specifications, pros, cons, and independent 2026 buying advice.`;
    if (c3.length >= 125 && c3.length <= 160) return c3;
  }

  // Fallback using category tagline or key features
  const keyFeature = category.topFeaturesToLookFor?.[0]?.replace(/\([^)]*\)/g, '').trim() || 'battery and performance';
  const c4 = `Compare top ${pluralLower}${priceText}. Evaluated for ${keyFeature}. Read verified specs, pros, cons, and independent 2026 buying advice.`;
  if (c4.length >= 125 && c4.length <= 160) return c4;

  return fitToOptimalLength(
    `Looking for the best ${pluralLower}? Compare top models from ${brandText || 'leading brands'}${priceText}.`,
    'Explore verified specs, pros, cons, and 2026 buyer guide.',
    125,
    158
  );
}

/**
 * Dynamic Buying Guide Title Generator
 * Optimal length: 35 - 60 characters
 */
export function buildGuideTitle(guide: BuyingGuide): string {
  const raw = guide.title.trim();

  // If already perfectly within 40 to 60 characters:
  if (raw.length >= 40 && raw.length <= 60) return raw;

  // Try appending full brand
  const t1 = `${raw} | What Should I Buy?`;
  if (t1.length >= 35 && t1.length <= 60) return t1;

  // Try appending compact brand
  const t2 = `${raw} | WSIB Guide`;
  if (t2.length >= 35 && t2.length <= 60) return t2;

  const t3 = `${raw} | WSIB`;
  if (t3.length >= 35 && t3.length <= 60) return t3;

  // If raw is longer than 60 chars, trim cleanly so full title is <= 60 chars:
  // e.g. 48 chars + 1 ellipsis + 7 (' | WSIB') = 56 chars
  const trimmed = trimAtWordBoundary(raw, 48).replace(/[,;.:]+$/, '');
  return `${trimmed}… | WSIB`;
}

/**
 * Dynamic Buying Guide Meta Description Generator
 * Optimal length: 125 - 158 characters
 * Incorporates: Author byline, top pick model name, read time, and benchmark testing scope
 */
export function buildGuideDescription(
  guide: BuyingGuide,
  allProducts: Product[]
): string {
  // Find top pick product name if present
  let topPickName = '';
  if (guide.topPickIds && guide.topPickIds.length > 0) {
    const firstPick = guide.topPickIds[0];
    const matchedProd = allProducts.find(p => p.id === firstPick.productId);
    if (matchedProd) {
      topPickName = matchedProd.name.split(' (')[0]; // clean parenthetical suffixes
    }
  }

  const author = guide.author || 'our editorial lab';
  const topic = guide.title
    .replace(/^best\s+/i, '')
    .replace(/:\s*.*$/, '')
    .toLowerCase()
    .trim();

  // Candidate 1 with Top Pick & Author
  if (topPickName) {
    const c1 = `Tested by ${author}: find the best ${topic}. Featuring top pick ${topPickName}, verified lab benchmarks, battery tests, and 2026 buying advice.`;
    if (c1.length >= 125 && c1.length <= 160) return c1;

    const c2 = `Tested by ${author}: discover top-rated ${topic}. Featuring top pick ${topPickName}, verified specs, pros, cons, and buyer verdict.`;
    if (c2.length >= 125 && c2.length <= 160) return c2;

    const c3 = `In-depth ${topic} guide by ${author}. Featuring top pick ${topPickName}, lab benchmarks, pros, cons, and value alternatives for 2026.`;
    if (c3.length >= 125 && c3.length <= 160) return c3;
  }

  // Candidate using subheadline
  if (guide.subheadline) {
    const cleanSub = guide.subheadline.replace(/\.$/, '');
    const c4 = `${trimAtWordBoundary(cleanSub, 100)}. Read our lab benchmarks, top picks, and buyer verdict.`;
    if (c4.length >= 125 && c4.length <= 160) return c4;
  }

  return fitToOptimalLength(
    `Tested by ${author}: comprehensive buying guide for ${topic}.`,
    'Explore verified lab benchmarks, top picks, and buyer verdict.',
    125,
    158
  );
}
