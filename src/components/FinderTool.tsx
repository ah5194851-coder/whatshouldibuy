import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FinderFilterState } from '../types';
import { matchProducts, generateAiSuitabilityAnalysis } from '../utils/matchingEngine';
import {
  SlidersHorizontal,
  Scale,
  ExternalLink,
  Sparkles,
  Check,
  AlertCircle,
  ChevronRight,
  RotateCcw,
  Info
} from 'lucide-react';

interface FinderToolProps {
  initialCategory?: string;
  initialQuery?: string;
}

export const FinderTool: React.FC<FinderToolProps> = ({ initialCategory = 'laptops', initialQuery }) => {
  const { products, categories, formatPrice, addToCompare, isInCompare, navigate } = useApp();

  // State for user inputs
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [maxBudget, setMaxBudget] = useState<number>(() => {
    if (initialCategory === 'smartphones') return 800;
    if (initialCategory === 'headphones') return 400;
    return 1200;
  });
  const [selectedPurpose, setSelectedPurpose] = useState<string>('Student + Work');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['Battery life', 'Lightweight']);
  const [selectedBrand, setSelectedBrand] = useState<string>('No preference');
  const [enableAi, setEnableAi] = useState<boolean>(false);
  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});
  const [aiExplanations, setAiExplanations] = useState<Record<string, string>>({});

  // Available purposes
  const PURPOSE_OPTIONS = [
    'Student + Work',
    'Creative / Video Editing',
    'Gaming & Performance',
    'Travel / Portability',
    'Casual / Home',
  ];

  // Available feature priorities
  const FEATURE_OPTIONS = [
    'Battery life',
    'Lightweight',
    'Color accuracy',
    'Quiet operation',
    'Durability',
    'Fast charging',
  ];

  // Available brands dynamically from current category
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products
      .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
      .forEach((p) => brandsSet.add(p.brand));
    return ['No preference', ...Array.from(brandsSet)];
  }, [products, selectedCategory]);

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const handleReset = () => {
    setSelectedCategory('laptops');
    setMaxBudget(1200);
    setSelectedPurpose('Student + Work');
    setSelectedFeatures(['Battery life', 'Lightweight']);
    setSelectedBrand('No preference');
    setAiExplanations({});
  };

  // Run matching engine
  const filterState: FinderFilterState = {
    category: selectedCategory,
    minBudget: 0,
    maxBudget,
    purpose: selectedPurpose,
    importantFeatures: selectedFeatures,
    preferredBrand: selectedBrand,
  };

  const matchedResults = useMemo(() => {
    return matchProducts(products, filterState);
  }, [products, filterState]);

  // Request AI explanation for a specific result card
  const handleGenerateAiReasoning = async (productId: string) => {
    const targetProduct = products.find((p) => p.id === productId);
    if (!targetProduct) return;

    setAiLoading((prev) => ({ ...prev, [productId]: true }));
    try {
      const explanation = await generateAiSuitabilityAnalysis(targetProduct, filterState);
      setAiExplanations((prev) => ({ ...prev, [productId]: explanation }));
    } catch {
      // Fallback already handled inside matchingEngine
    } finally {
      setAiLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tool Header */}
      <div className="border-b border-[#E4E4E7] pb-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive Decision Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
              Product Recommendation Finder (2026) – What Should I Buy?
            </h1>
            <p className="text-sm text-[#52525B] mt-1 max-w-2xl">
              Specify your category, budget limit, and primary priorities. We calculate suitability based on lab measurements and real-world trade-offs.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleReset}
              className="text-xs font-medium text-[#71717A] hover:text-[#18181B] px-3 py-1.5 rounded border border-[#E4E4E7] bg-white hover:bg-[#F4F4F5] flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Selection Matrix */}
        <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#E4E4E7] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#F4F4F5] pb-3">
            <h2 className="text-sm font-bold text-[#18181B] uppercase tracking-wider">
              Your Requirements
            </h2>
            <span className="text-[11px] text-[#71717A]">Step 1 to 5</span>
          </div>

          {/* 1. Category Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#27272A] block">
              1. Product Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                // Adjust budget default smoothly
                if (e.target.value === 'headphones') setMaxBudget(400);
                else if (e.target.value === 'smartphones') setMaxBudget(900);
                else if (e.target.value === 'accessories') setMaxBudget(150);
                else setMaxBudget(1200);
              }}
              className="w-full text-sm font-medium border border-[#D4D4D8] rounded-lg px-3 py-2 bg-white text-[#18181B] focus:border-[#18181B] focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.pluralName}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Budget Slider & Presets */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#27272A]">
                2. Maximum Budget
              </label>
              <span className="font-mono-numbers text-sm font-bold text-[#18181B]">
                {formatPrice(maxBudget)}
              </span>
            </div>

            <input
              type="range"
              min="50"
              max="2500"
              step="50"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-[#18181B] cursor-pointer"
            />

            <div className="flex items-center justify-between text-[11px] text-[#71717A]">
              <span>{formatPrice(50)}</span>
              <span>{formatPrice(1200)}</span>
              <span>{formatPrice(2500)}+</span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {[300, 600, 1000, 1500].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMaxBudget(preset)}
                  className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                    maxBudget === preset
                      ? 'bg-[#18181B] text-white border-[#18181B]'
                      : 'bg-[#F4F4F5] text-[#3F3F46] border-[#E4E4E7] hover:bg-[#E4E4E7]'
                  }`}
                >
                  Under {formatPrice(preset)}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Main Purpose */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#27272A] block">
              3. Main Purpose / Intended Use
            </label>
            <div className="space-y-1.5">
              {PURPOSE_OPTIONS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedPurpose(p)}
                  className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all flex items-center justify-between ${
                    selectedPurpose === p
                      ? 'border-[#18181B] bg-[#FAFAFA] font-semibold text-[#18181B]'
                      : 'border-[#E4E4E7] text-[#52525B] hover:border-[#A1A1AA]'
                  }`}
                >
                  <span>{p}</span>
                  {selectedPurpose === p && <Check className="w-3.5 h-3.5 text-[#18181B]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Important Features */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#27272A] block">
              4. Important Priorities (Multi-select)
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {FEATURE_OPTIONS.map((feat) => {
                const isChecked = selectedFeatures.includes(feat);
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    className={`text-xs p-2 rounded border text-left flex items-center gap-1.5 transition-colors ${
                      isChecked
                        ? 'border-[#18181B] bg-[#18181B] text-white font-medium'
                        : 'border-[#E4E4E7] bg-white text-[#52525B] hover:bg-[#F4F4F5]'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-sm border border-current flex items-center justify-center shrink-0">
                      {isChecked && <Check className="w-2.5 h-2.5" />}
                    </span>
                    <span className="truncate">{feat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Preferred Brand (Optional) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#27272A] block">
              5. Preferred Brand (Optional)
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full text-xs font-medium border border-[#D4D4D8] rounded-lg px-3 py-2 bg-white text-[#18181B] focus:border-[#18181B] focus:outline-none"
            >
              {availableBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Optional AI Layer Switch */}
          <div className="pt-3 border-t border-[#F4F4F5]">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#18181B]" />
                <span className="text-xs font-semibold text-[#18181B]">
                  AI Suitability Reasoning
                </span>
              </div>
              <input
                type="checkbox"
                checked={enableAi}
                onChange={(e) => setEnableAi(e.target.checked)}
                className="w-4 h-4 accent-[#18181B] rounded cursor-pointer"
              />
            </label>
            <p className="text-[11px] text-[#71717A] mt-1 leading-normal">
              When checked, you can run in-depth contextual analysis explaining why an option fits your exact requirements.
            </p>
          </div>

        </div>

        {/* Right Column: Matched Suitable Options */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-[#18181B]">
              <span>Suitable Product Matches</span>
              <span className="text-[#71717A] font-normal ml-2">
                ({matchedResults.length} {matchedResults.length === 1 ? 'option' : 'options'} evaluated)
              </span>
            </div>

            <div className="text-xs text-[#71717A] flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              <span>Ranked by requirement fit, not sponsor rank</span>
            </div>
          </div>

          {matchedResults.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#E4E4E7] space-y-3">
              <AlertCircle className="w-8 h-8 text-[#71717A] mx-auto" />
              <h3 className="font-semibold text-base text-[#18181B]">
                No exact matches under {formatPrice(maxBudget)}
              </h3>
              <p className="text-xs text-[#52525B] max-w-md mx-auto">
                Try raising your budget slider or switching to "All Categories" to see models that fit your functional requirements.
              </p>
              <button
                onClick={() => setMaxBudget(maxBudget + 300)}
                className="text-xs font-semibold px-4 py-2 rounded bg-[#18181B] text-white hover:bg-[#27272A] transition-colors"
              >
                Increase Budget by {formatPrice(300)}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {matchedResults.map(({ product, matchScore, suitabilityReasons, tradeOffs }) => {
                const inCompare = isInCompare(product.id);
                const hasAiExplanation = aiExplanations[product.id];
                const isAiLoading = aiLoading[product.id];

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-[#E4E4E7] hover:border-[#A1A1AA] transition-all p-5 sm:p-6 shadow-sm space-y-5"
                  >
                    {/* Top Row: Brand, Match Score & Price */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F4F4F5] pb-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#71717A]">
                          <span className="font-semibold uppercase tracking-wider">{product.brand}</span>
                          <span aria-hidden="true">·</span>
                          <span>{product.subcategory}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#18181B] mt-0.5">
                          {product.name}
                        </h3>
                      </div>

                      <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center">
                        <div className="text-xl sm:text-2xl font-bold font-mono-numbers text-[#18181B]">
                          {formatPrice(product.price)}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#15803D] font-semibold">
                          <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                          <span>{matchScore}% Suitability Match</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Section: Image & Editorial Specs */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Product Thumbnail with zero-broken-image safety */}
                      <div className="md:col-span-4 rounded-xl overflow-hidden border border-[#E4E4E7] bg-[#F9F9F8] h-48 md:h-44 flex items-center justify-center relative">
                        <img
                          src={product.image}
                          alt={`${product.name} - ${product.brand} verified suitability match`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[11px] font-semibold px-2 py-0.5 rounded text-[#18181B]">
                          {product.rating} ★ ({product.reviewCount})
                        </div>
                      </div>

                      {/* Suitability Explanations & Trade-Offs */}
                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <span className="text-xs font-bold text-[#18181B] block mb-1">
                            Why this option fits your criteria:
                          </span>
                          <ul className="space-y-1 text-xs text-[#3F3F46]">
                            {suitabilityReasons.map((reason, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {tradeOffs.length > 0 && (
                          <div className="bg-[#FAFAFA] p-2.5 rounded-lg border border-[#F4F4F5]">
                            <span className="text-[11px] font-bold text-[#71717A] uppercase tracking-wider block mb-1">
                              Compromises to keep in mind:
                            </span>
                            <ul className="space-y-0.5 text-xs text-[#52525B]">
                              {tradeOffs.map((to, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-[#A1A1AA]">•</span>
                                  <span>{to}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="text-xs text-[#52525B]">
                          <strong className="text-[#18181B]">Best for: </strong>
                          <span>{product.bestFor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Specs Pill-Free Table Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#F4F4F5] text-xs">
                      {Object.entries(product.specifications).slice(0, 4).map(([key, val]) => (
                        <div key={key} className="bg-[#F9F9F8] p-2 rounded">
                          <span className="text-[10px] text-[#71717A] block font-medium uppercase tracking-wider">{key}</span>
                          <span className="font-medium text-[#18181B] truncate block">{val}</span>
                        </div>
                      ))}
                    </div>

                    {/* AI Explanation Accordion / Banner if enabled */}
                    {(enableAi || hasAiExplanation) && (
                      <div className="bg-[#F9F9F8] p-3 rounded-xl border border-[#E4E4E7] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#18181B]">
                            <Sparkles className="w-3.5 h-3.5 text-[#18181B]" />
                            <span>AI Contextual Recommendation</span>
                          </div>

                          {!hasAiExplanation && (
                            <button
                              onClick={() => handleGenerateAiReasoning(product.id)}
                              disabled={isAiLoading}
                              className="text-xs font-medium text-[#18181B] underline hover:no-underline disabled:opacity-50"
                            >
                              {isAiLoading ? 'Analyzing...' : 'Generate Analysis'}
                            </button>
                          )}
                        </div>

                        {hasAiExplanation ? (
                          <p className="text-xs text-[#3F3F46] leading-relaxed italic">
                            "{hasAiExplanation}"
                          </p>
                        ) : (
                          <p className="text-[11px] text-[#71717A]">
                            Click "Generate Analysis" to evaluate this model against your exact budget, priorities, and workflow compromises.
                          </p>
                        )}
                      </div>
                    )}

                    {/* Action Bar: Compare & Check Price */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#F4F4F5]">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (inCompare) {
                              navigate({ type: 'compare' });
                            } else {
                              addToCompare(product.id);
                            }
                          }}
                          className={`text-xs font-semibold px-3 py-2 rounded border flex items-center justify-center gap-1.5 transition-colors ${
                            inCompare
                              ? 'bg-[#18181B] text-white border-[#18181B]'
                              : 'bg-white text-[#27272A] border-[#E4E4E7] hover:border-[#18181B]'
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span>{inCompare ? 'View in Comparison Table' : 'Add to Compare'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate({ type: 'product', slug: product.slug })}
                          className="text-xs font-medium text-[#52525B] hover:text-[#18181B] px-3 py-2 transition-colors"
                        >
                          Full Specs & Review →
                        </button>
                      </div>

                      {/* Primary Affiliate Action */}
                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                      >
                        <span>Check Price ({product.retailers[0]?.name || 'Amazon'})</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* Finder Tool FAQs (Matches FAQPage Schema) */}
      <section aria-labelledby="finder-faq-title" className="mt-12 pt-8 border-t border-[#E4E4E7] space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-1">
            <Info className="w-3.5 h-3.5 text-[#18181B]" />
            <span>Decision Engine Help</span>
          </div>
          <h2 id="finder-faq-title" className="text-xl sm:text-2xl font-bold text-[#18181B]">
            Product Finder Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#71717A] mt-1">
            Understand how our algorithm matches products to your requirements.
          </p>
        </div>

        <div className="divide-y divide-[#E4E4E7] bg-white rounded-2xl border border-[#E4E4E7] p-6 sm:p-8">
          <div className="py-4 first:pt-0">
            <h3 className="font-bold text-sm sm:text-base text-[#18181B]">
              How does the Product Recommendation Finder choose matches?
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-[#52525B] leading-relaxed">
              Our matching engine evaluates your selected category, strict budget ceiling, intended use case, and priority hardware features (battery, weight, color accuracy) against verified laboratory benchmarks to calculate a transparent suitability percentage.
            </p>
          </div>
          <div className="py-4">
            <h3 className="font-bold text-sm sm:text-base text-[#18181B]">
              Can I filter for budget products under $500 or $800?
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-[#52525B] leading-relaxed">
              Yes. Use the interactive budget slider or quick presets (Under $300, Under $600, Under $1,000) to find vetted top-value options that meet your needs without overpaying.
            </p>
          </div>
          <div className="py-4 last:pb-0">
            <h3 className="font-bold text-sm sm:text-base text-[#18181B]">
              How are trade-offs and compromises determined?
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-[#52525B] leading-relaxed">
              Every matched card highlights the trade-offs of that model—such as soldered non-upgradable RAM, missing headphone jacks, or shorter battery life under intensive workflows—so you are never surprised after purchase.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
