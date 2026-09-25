import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import {
  Scale,
  Plus,
  X,
  ExternalLink,
  Check,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';

export const ComparePage: React.FC = () => {
  const {
    products,
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    formatPrice,
    navigate
  } = useApp();

  const [selectorModalOpen, setSelectorModalOpen] = useState(false);
  const [selectorCategoryFilter, setSelectorCategoryFilter] = useState('all');

  // Selected products
  const selectedProducts: Product[] = compareList
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  // If list has < 2 products, offer quick starter sets (e.g. MacBook Air vs Lenovo Slim, or iPhone 16 Pro vs S24 Ultra)
  const handleLoadPreset = (ids: string[]) => {
    clearCompare();
    ids.forEach((id) => addToCompare(id));
  };

  // Find all unique specification keys across selected products
  const allSpecKeys = Array.from(
    new Set(
      selectedProducts.flatMap((p) => Object.keys(p.specifications))
    )
  );

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-[#E4E4E7] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>Side-by-Side Product Comparison</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
            Product Decision Matrix
          </h1>
          <p className="text-sm text-[#52525B] mt-1 max-w-2xl">
            Compare 2 to 4 products across verified hardware specifications, battery runtime, pros, cons, and current retailer pricing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedProducts.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs font-medium text-[#71717A] hover:text-[#18181B] px-3 py-1.5 rounded border border-[#E4E4E7] hover:bg-[#F4F4F5] transition-colors"
            >
              Clear All ({selectedProducts.length})
            </button>
          )}

          {selectedProducts.length < 4 && (
            <button
              onClick={() => setSelectorModalOpen(true)}
              className="text-xs font-semibold bg-[#18181B] text-white hover:bg-[#27272A] px-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product ({selectedProducts.length}/4)</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {selectedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#F4F4F5] text-[#18181B] flex items-center justify-center mx-auto">
            <Scale className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#18181B]">
              No Products Selected for Comparison
            </h2>
            <p className="text-sm text-[#52525B]">
              Select 2 to 4 items from our database, or choose one of our popular head-to-head comparisons below.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] block">
              Popular Head-to-Head Comparisons
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <button
                onClick={() =>
                  handleLoadPreset([
                    'prod-macbook-air-m3',
                    'prod-lenovo-yoga-slim-7x',
                    'prod-acer-swift-go-14'
                  ])
                }
                className="p-3 rounded-xl border border-[#E4E4E7] hover:border-[#18181B] hover:bg-[#FAFAFA] transition-all"
              >
                <span className="text-xs font-bold text-[#18181B] block">MacBook Air M3 vs Yoga Slim 7x</span>
                <span className="text-[11px] text-[#71717A]">Apple Silicon vs Snapdragon X Elite Ultrabooks</span>
              </button>

              <button
                onClick={() =>
                  handleLoadPreset([
                    'prod-sony-wh1000xm5',
                    'prod-bose-qc-ultra-headphones'
                  ])
                }
                className="p-3 rounded-xl border border-[#E4E4E7] hover:border-[#18181B] hover:bg-[#FAFAFA] transition-all"
              >
                <span className="text-xs font-bold text-[#18181B] block">Sony WH-1000XM5 vs Bose QC Ultra</span>
                <span className="text-[11px] text-[#71717A]">Battery & Sound vs Folding Travel Comfort</span>
              </button>

              <button
                onClick={() =>
                  handleLoadPreset([
                    'prod-iphone-16-pro',
                    'prod-samsung-galaxy-s25',
                    'prod-google-pixel-9a'
                  ])
                }
                className="p-3 rounded-xl border border-[#E4E4E7] hover:border-[#18181B] hover:bg-[#FAFAFA] transition-all"
              >
                <span className="text-xs font-bold text-[#18181B] block">iPhone 16 Pro vs S24 Ultra vs Pixel 8a</span>
                <span className="text-[11px] text-[#71717A]">Flagship Cameras vs Value Champion</span>
              </button>

              <button
                onClick={() =>
                  handleLoadPreset([
                    'prod-sony-a6700',
                    'prod-fujifilm-xt5'
                  ])
                }
                className="p-3 rounded-xl border border-[#E4E4E7] hover:border-[#18181B] hover:bg-[#FAFAFA] transition-all"
              >
                <span className="text-xs font-bold text-[#18181B] block">Sony A6700 vs Fujifilm X-T5</span>
                <span className="text-[11px] text-[#71717A]">AI Video Tracking vs Analog Film Simulations</span>
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setSelectorModalOpen(true)}
              className="bg-[#18181B] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-[#27272A] transition-colors"
            >
              Browse Catalog & Add Items
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Main Comparison Matrix Container with Horizontal Scroll Safety for Mobile */}
          <div className="bg-white rounded-2xl border border-[#E4E4E7] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                
                {/* Product Card Headers */}
                <thead>
                  <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA]">
                    <th className="p-4 w-44 sm:w-56 text-xs font-bold uppercase tracking-wider text-[#71717A] align-top">
                      Selected Models
                    </th>
                    {selectedProducts.map((prod) => (
                      <th
                        key={prod.id}
                        className="p-4 align-top border-l border-[#E4E4E7] min-w-[200px]"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
                              {prod.brand}
                            </span>
                            <button
                              onClick={() => removeFromCompare(prod.id)}
                              className="text-[#A1A1AA] hover:text-[#18181B] p-1 rounded hover:bg-[#F4F4F5] transition-colors"
                              title="Remove from comparison"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="h-28 w-full rounded-lg overflow-hidden border border-[#E4E4E7] bg-white flex items-center justify-center">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div>
                            <h3 className="font-bold text-sm text-[#18181B] line-clamp-2">
                              {prod.name}
                            </h3>
                            <div className="text-lg font-bold font-mono-numbers text-[#18181B] mt-1">
                              {formatPrice(prod.price)}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-[#52525B] mt-0.5">
                              <Star className="w-3.5 h-3.5 fill-[#18181B] text-[#18181B]" />
                              <span>{prod.rating}</span>
                              <span className="text-[#A1A1AA]">({prod.reviewCount})</span>
                            </div>
                          </div>

                          <a
                            href={prod.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-semibold py-2 rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <span>Check Price</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </th>
                    ))}
                    {selectedProducts.length < 4 && (
                      <th className="p-4 align-middle text-center border-l border-[#E4E4E7] min-w-[160px] bg-[#FDFDFD]">
                        <button
                          onClick={() => setSelectorModalOpen(true)}
                          className="p-4 rounded-xl border-2 border-dashed border-[#D4D4D8] hover:border-[#18181B] text-[#71717A] hover:text-[#18181B] transition-colors text-xs font-semibold flex flex-col items-center gap-2 mx-auto"
                        >
                          <Plus className="w-5 h-5" />
                          <span>Add Product ({selectedProducts.length}/4)</span>
                        </button>
                      </th>
                    )}
                  </tr>
                </thead>

                {/* Table Body: Key Decision Rows */}
                <tbody className="divide-y divide-[#E4E4E7] text-xs">
                  
                  {/* Row: Best Use Case */}
                  <tr>
                    <td className="p-4 font-bold text-[#18181B] bg-[#FAFAFA]">
                      Best Use Case
                    </td>
                    {selectedProducts.map((prod) => (
                      <td key={prod.id} className="p-4 border-l border-[#E4E4E7] text-[#27272A]">
                        {prod.bestFor}
                      </td>
                    ))}
                    {selectedProducts.length < 4 && <td className="border-l border-[#E4E4E7]" />}
                  </tr>

                  {/* Row: Verified Pros */}
                  <tr>
                    <td className="p-4 font-bold text-[#18181B] bg-[#FAFAFA]">
                      Key Strengths (Pros)
                    </td>
                    {selectedProducts.map((prod) => (
                      <td key={prod.id} className="p-4 border-l border-[#E4E4E7]">
                        <ul className="space-y-1 text-[#3F3F46]">
                          {prod.pros.map((p, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    {selectedProducts.length < 4 && <td className="border-l border-[#E4E4E7]" />}
                  </tr>

                  {/* Row: Verified Cons / Trade-Offs */}
                  <tr>
                    <td className="p-4 font-bold text-[#18181B] bg-[#FAFAFA]">
                      Trade-Offs (Cons)
                    </td>
                    {selectedProducts.map((prod) => (
                      <td key={prod.id} className="p-4 border-l border-[#E4E4E7]">
                        <ul className="space-y-1 text-[#52525B]">
                          {prod.cons.map((c, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#DC2626] font-bold">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    {selectedProducts.length < 4 && <td className="border-l border-[#E4E4E7]" />}
                  </tr>

                  {/* Section Divider: Specifications */}
                  <tr className="bg-[#F4F4F5]">
                    <td
                      colSpan={selectedProducts.length + (selectedProducts.length < 4 ? 2 : 1)}
                      className="p-3 text-[11px] font-bold uppercase tracking-wider text-[#52525B]"
                    >
                      Technical Specifications Side-by-Side
                    </td>
                  </tr>

                  {/* Dynamic Spec Rows */}
                  {allSpecKeys.map((specKey) => (
                    <tr key={specKey}>
                      <td className="p-3 font-semibold text-[#52525B] bg-[#FAFAFA]">
                        {specKey}
                      </td>
                      {selectedProducts.map((prod) => {
                        const val = prod.specifications[specKey];
                        return (
                          <td
                            key={prod.id}
                            className="p-3 border-l border-[#E4E4E7] text-[#18181B]"
                          >
                            {val || <span className="text-[#A1A1AA] italic">N/A</span>}
                          </td>
                        );
                      })}
                      {selectedProducts.length < 4 && <td className="border-l border-[#E4E4E7]" />}
                    </tr>
                  ))}

                  {/* Section Divider: Price Comparison Across Retailers */}
                  <tr className="bg-[#F4F4F5]">
                    <td
                      colSpan={selectedProducts.length + (selectedProducts.length < 4 ? 2 : 1)}
                      className="p-3 text-[11px] font-bold uppercase tracking-wider text-[#52525B]"
                    >
                      Retailer Price Comparison & Live Availability
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-[#18181B] bg-[#FAFAFA]">
                      Store Pricing
                    </td>
                    {selectedProducts.map((prod) => (
                      <td key={prod.id} className="p-4 border-l border-[#E4E4E7]">
                        <div className="space-y-2">
                          {prod.retailers.map((r, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between text-xs p-1.5 rounded bg-[#F9F9F8] border border-[#E4E4E7]"
                            >
                              <div className="font-medium text-[#18181B]">{r.name}</div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono-numbers font-bold text-[#18181B]">
                                  {formatPrice(r.price)}
                                </span>
                                <a
                                  href={r.affiliateUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] font-semibold text-[#18181B] underline hover:no-underline"
                                >
                                  View
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                    {selectedProducts.length < 4 && <td className="border-l border-[#E4E4E7]" />}
                  </tr>

                  {/* Warranty Information */}
                  <tr>
                    <td className="p-4 font-bold text-[#18181B] bg-[#FAFAFA]">
                      Manufacturer Warranty
                    </td>
                    {selectedProducts.map((prod) => (
                      <td key={prod.id} className="p-4 border-l border-[#E4E4E7] text-[#52525B]">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#18181B]" />
                          <span>{prod.warranty}</span>
                        </div>
                      </td>
                    ))}
                    {selectedProducts.length < 4 && <td className="border-l border-[#E4E4E7]" />}
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          {/* Important Differences Summary Box */}
          <div className="bg-[#FAFAFA] rounded-2xl border border-[#E4E4E7] p-6 space-y-3">
            <h3 className="font-bold text-sm text-[#18181B] uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#18181B]" />
              <span>Key Verdict & Deciding Differences</span>
            </h3>
            <p className="text-xs text-[#52525B] leading-relaxed">
              When choosing between these options, prioritize battery endurance and physical weight if you travel frequently. If peak visual clarity, video color grading, or high-FPS gaming is required, pay close attention to display refresh rate and dedicated processing power.
            </p>
          </div>

        </div>
      )}

      {/* Add Product Modal */}
      {selectorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-xl">
            <div className="p-4 border-b border-[#E4E4E7] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#18181B]">
                  Select a Product to Compare
                </h3>
                <p className="text-xs text-[#71717A]">
                  Choose from our verified catalog (up to 4 products total).
                </p>
              </div>
              <button
                onClick={() => setSelectorModalOpen(false)}
                className="text-[#71717A] hover:text-[#18181B] p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 border-b border-[#F4F4F5] flex gap-2 overflow-x-auto text-xs">
              <button
                onClick={() => setSelectorCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
                  selectorCategoryFilter === 'all'
                    ? 'bg-[#18181B] text-white'
                    : 'bg-[#F4F4F5] text-[#52525B] hover:bg-[#E4E4E7]'
                }`}
              >
                All Categories
              </button>
              {['laptops', 'smartphones', 'headphones', 'cameras', 'tvs', 'gaming', 'audio'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectorCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap capitalize ${
                    selectorCategoryFilter === cat
                      ? 'bg-[#18181B] text-white'
                      : 'bg-[#F4F4F5] text-[#52525B] hover:bg-[#E4E4E7]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="p-4 overflow-y-auto divide-y divide-[#F4F4F5] flex-1">
              {products
                .filter(
                  (p) =>
                    (selectorCategoryFilter === 'all' || p.category === selectorCategoryFilter) &&
                    !compareList.includes(p.id)
                )
                .map((prod) => (
                  <div
                    key={prod.id}
                    className="py-3 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded border border-[#E4E4E7] overflow-hidden bg-[#FAFAFA] shrink-0">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#18181B]">{prod.name}</h4>
                        <div className="text-[11px] text-[#71717A]">
                          {prod.brand} · {prod.subcategory}
                        </div>
                        <div className="font-mono-numbers text-xs font-semibold text-[#18181B]">
                          {formatPrice(prod.price)}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCompare(prod.id);
                        setSelectorModalOpen(false);
                      }}
                      className="text-xs font-semibold px-3 py-1.5 rounded bg-[#18181B] text-white hover:bg-[#27272A] whitespace-nowrap"
                    >
                      + Add
                    </button>
                  </div>
                ))}
            </div>

            <div className="p-3 border-t border-[#E4E4E7] bg-[#FAFAFA] flex justify-end">
              <button
                onClick={() => setSelectorModalOpen(false)}
                className="text-xs font-medium px-4 py-2 rounded text-[#52525B] hover:text-[#18181B]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
