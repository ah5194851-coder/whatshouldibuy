import { Product, FinderFilterState, MatchedProductResult } from '../types';

export function matchProducts(
  products: Product[],
  filters: FinderFilterState
): MatchedProductResult[] {
  const { category, minBudget, maxBudget, purpose, importantFeatures, preferredBrand } = filters;

  // Filter by category if specified
  let candidatePool = products;
  if (category && category !== 'all') {
    candidatePool = products.filter(p => p.category === category);
  }

  const results: MatchedProductResult[] = candidatePool.map(product => {
    let score = 50; // Baseline candidate score
    const suitabilityReasons: string[] = [];
    const tradeOffs: string[] = [];

    // 1. Budget Evaluation
    if (product.price <= maxBudget) {
      if (product.price >= minBudget) {
        score += 25;
        suitabilityReasons.push(`Comfortably within your stated budget range ($${product.price}).`);
      } else {
        score += 20;
        suitabilityReasons.push(`Priced below your budget target, offering strong cost-to-performance savings.`);
      }
    } else {
      // Over budget
      const overAmount = product.price - maxBudget;
      const overPercentage = overAmount / maxBudget;
      if (overPercentage < 0.20) {
        score += 5;
        tradeOffs.push(`Priced slightly above your target budget ceiling by $${overAmount}.`);
      } else {
        score -= 25;
        tradeOffs.push(`Exceeds your designated budget by $${overAmount}.`);
      }
    }

    // 2. Purpose Match
    if (purpose && purpose !== 'Any') {
      const matchesPurpose = product.targetPurposes.some(
        tp => tp.toLowerCase().includes(purpose.toLowerCase()) || purpose.toLowerCase().includes(tp.toLowerCase())
      );
      if (matchesPurpose) {
        score += 20;
        suitabilityReasons.push(`Engineered specifically for ${purpose.toLowerCase()} requirements.`);
      } else {
        score -= 5;
      }
    }

    // 3. Important Features Match
    if (importantFeatures && importantFeatures.length > 0) {
      let matchedCount = 0;
      importantFeatures.forEach(feat => {
        const matchesStrength = product.keyStrengths.some(
          ks => ks.toLowerCase().includes(feat.toLowerCase()) || feat.toLowerCase().includes(ks.toLowerCase())
        );
        const matchesInFeatures = product.features.some(
          f => f.toLowerCase().includes(feat.toLowerCase())
        );
        const matchesInPros = product.pros.some(
          p => p.toLowerCase().includes(feat.toLowerCase())
        );

        if (matchesStrength || matchesInFeatures || matchesInPros) {
          matchedCount++;
          suitabilityReasons.push(`Includes requested priority: ${feat}.`);
        }
      });

      score += Math.min(25, matchedCount * 10);

      if (matchedCount === 0 && importantFeatures.length > 1) {
        tradeOffs.push(`May not emphasize every requested specialty priority.`);
      }
    }

    // 4. Preferred Brand Match
    if (preferredBrand && preferredBrand !== 'Any' && preferredBrand !== 'No preference') {
      if (product.brand.toLowerCase() === preferredBrand.toLowerCase()) {
        score += 15;
        suitabilityReasons.push(`Manufactured by your preferred brand (${product.brand}).`);
      }
    }

    // Add general top pro and con
    if (product.pros.length > 0 && suitabilityReasons.length < 3) {
      suitabilityReasons.push(`Key benefit: ${product.pros[0]}`);
    }
    if (product.cons.length > 0 && tradeOffs.length === 0) {
      tradeOffs.push(`Trade-off to consider: ${product.cons[0]}`);
    }

    // Clamp score between 10 and 99 (no 100% "perfection" claim)
    const normalizedScore = Math.min(98, Math.max(15, Math.round(score)));

    return {
      product,
      matchScore: normalizedScore,
      suitabilityReasons: suitabilityReasons.slice(0, 4),
      tradeOffs: tradeOffs.slice(0, 2)
    };
  });

  // Sort descending by match score
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

// Optional AI recommendation layer
export async function generateAiSuitabilityAnalysis(
  product: Product,
  filters: FinderFilterState
): Promise<string> {
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY);

  if (apiKey) {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a trusted, neutral consumer product researcher for "What Should I Buy?".
The user is looking for a product with the following requirements:
- Category: ${filters.category || 'General'}
- Budget limit: $${filters.maxBudget}
- Primary Purpose: ${filters.purpose || 'General everyday use'}
- Priority Features: ${filters.importantFeatures.join(', ') || 'Standard reliability'}
- Preferred Brand: ${filters.preferredBrand || 'Open to all brands'}

Candidate Product:
- Name: ${product.name}
- Brand: ${product.brand}
- Price: $${product.price}
- Best For: ${product.bestFor}
- Key Strengths: ${product.keyStrengths.join(', ')}
- Known Cons: ${product.cons.join(', ')}

In 2-3 concise, honest sentences, explain WHY this specific product may or may not fit their stated requirements.
CRITICAL RULES:
- Do NOT declare it objectively the "best" or "winner".
- Do NOT invent specs, prices, or fake reviews.
- Explicitly address their budget and intended purpose.
- Mention one genuine compromise or trade-off to keep in mind.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response.text) {
        return response.text.trim();
      }
    } catch {
      // Fallback below
    }
  }

  // High quality deterministic editorial explanation
  const budgetVerdict = product.price <= filters.maxBudget
    ? `At $${product.price}, it aligns within your $${filters.maxBudget} ceiling.`
    : `At $${product.price}, it slightly surpasses your $${filters.maxBudget} target, but delivers superior build longevity.`;

  return `${product.name} suits ${filters.purpose ? filters.purpose.toLowerCase() : 'your requirements'} because it excels in ${product.keyStrengths.slice(0, 2).join(' and ').toLowerCase()}. ${budgetVerdict} Keep in mind that ${product.cons[0]?.toLowerCase() || 'it carries typical category trade-offs'}.`;
}
