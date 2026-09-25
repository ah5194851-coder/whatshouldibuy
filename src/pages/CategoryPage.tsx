import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Filter,
  Scale,
  ExternalLink,
  ChevronDown,
  ArrowRight,
  Check,
  Star,
  BookOpen,
  HelpCircle,
  SlidersHorizontal
} from 'lucide-react';

interface CategoryPageProps {
  slug: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ slug }) => {
  const {
    getCategoryBySlug,
    products,
    formatPrice,
    addToCompare,
    isInCompare,
    navigate
  } = useApp();

  const category = getCategoryBySlug(slug);

  // Filter & Sort states
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter products for this category
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category === slug);
  }, [products, slug]);

  // Unique brands
  const brands = useMemo(() => {
    return Array.from(new Set(categoryProducts.map((p) => p.brand)));
  }, [categoryProducts]);

  // Filtered & Sorted products
  const displayProducts = useMemo(() => {
    let result = [...categoryProducts];

    if (selectedSubcategory !== 'all') {
      result = result.filter((p) => p.subcategory === selectedSubcategory);
    }

    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // recommended: featured first, then rating
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating);
    }

    return result;
  }, [categoryProducts, selectedSubcategory, selectedBrand, sortBy]);

  if (!category) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-xl font-bold text-[#18181B]">Category Not Found</h2>
        <p className="text-sm text-[#52525B] mt-2">
          The category you requested could not be located.
        </p>
        <button
          onClick={() => navigate({ type: 'categories' })}
          className="mt-4 px-4 py-2 bg-[#18181B] text-white text-xs font-semibold rounded-lg"
        >
          View All Categories
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* 1. Category Introduction & Hero Banner */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#71717A] uppercase tracking-wider">
              <span>Category Overview</span>
              <span aria-hidden="true">·</span>
              <span>{categoryProducts.length} Evaluated Models</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#18181B]">
              Best {category.pluralName} (2026 Buying Guide)
            </h1>

            <p className="text-base text-[#52525B] leading-relaxed max-w-2xl">
              {category.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigate({ type: 'finder', initialCategory: category.slug })}
                className="bg-[#18181B] text-white hover:bg-[#27272A] text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Launch {category.name} Finder</span>
              </button>

              <a
                href="#buying-guide"
                className="bg-[#F4F4F5] hover:bg-[#E4E4E7] text-[#18181B] text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Buying Criteria</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-xl overflow-hidden border border-[#E4E4E7] h-52 bg-[#FAFAFA]">
            <img
              src={category.image}
              alt={category.pluralName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* 2. Filter & Sort Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E4E7] pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#71717A] uppercase tracking-wider mr-1">
            Filter:
          </span>

          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="text-xs font-medium border border-[#D4D4D8] rounded-lg px-2.5 py-1.5 bg-white text-[#18181B]"
          >
            <option value="all">All Subcategories</option>
            {category.subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="text-xs font-medium border border-[#D4D4D8] rounded-lg px-2.5 py-1.5 bg-white text-[#18181B]"
          >
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-[#71717A]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-medium border border-[#D4D4D8] rounded-lg px-2.5 py-1.5 bg-white text-[#18181B]"
          >
            <option value="recommended">Recommended Picks</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* 3. Product Catalog Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#18181B]">
            Recommended Models ({displayProducts.length})
          </h2>
          <span className="text-xs text-[#71717A]">
            Independent laboratory data & real retailer pricing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((prod) => {
            const inCompare = isInCompare(prod.id);

            return (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-[#E4E4E7] hover:border-[#A1A1AA] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image Slot */}
                  <div className="h-48 w-full bg-[#F9F9F8] border-b border-[#E4E4E7] relative">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-[11px] font-bold px-2 py-0.5 rounded text-[#18181B]">
                      {prod.rating} ★ ({prod.reviewCount})
                    </div>
                    {prod.isFeatured && (
                      <div className="absolute top-2.5 right-2.5 bg-[#18181B] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        Top Pick
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#71717A]">
                      <span className="font-semibold uppercase tracking-wider">{prod.brand}</span>
                      <span>{prod.subcategory}</span>
                    </div>

                    <h3 className="font-bold text-base text-[#18181B] leading-snug line-clamp-2">
                      {prod.name}
                    </h3>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold font-mono-numbers text-[#18181B]">
                        {formatPrice(prod.price)}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-[#71717A] line-through font-mono-numbers">
                          {formatPrice(prod.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#52525B] line-clamp-2">
                      <strong className="text-[#18181B]">Best for: </strong>
                      {prod.bestFor}
                    </div>

                    {/* Key Specs Preview */}
                    <div className="pt-2 border-t border-[#F4F4F5] space-y-1 text-xs text-[#52525B]">
                      {Object.entries(prod.specifications).slice(0, 3).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-[#71717A] truncate mr-2">{k}:</span>
                          <span className="font-medium text-[#18181B] truncate">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 border-t border-[#F4F4F5] space-y-2 mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCompare(prod.id)}
                      className={`text-xs font-semibold py-2 px-2 rounded border flex items-center justify-center gap-1 transition-colors ${
                        inCompare
                          ? 'bg-[#18181B] text-white border-[#18181B]'
                          : 'bg-white text-[#27272A] border-[#E4E4E7] hover:border-[#18181B]'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{inCompare ? 'In Compare' : 'Compare'}</span>
                    </button>

                    <a
                      href={prod.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-semibold py-2 px-2 rounded text-center flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Check Price</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <button
                    onClick={() => navigate({ type: 'product', slug: prod.slug })}
                    className="w-full text-center text-[11px] font-medium text-[#71717A] hover:text-[#18181B] py-1"
                  >
                    View In-Depth Laboratory Analysis →
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 4. In-Depth Category Buying Guide Section */}
      <div id="buying-guide" className="bg-white rounded-2xl border border-[#E4E4E7] p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E4E4E7] pb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-1">
            Buyer Education
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#18181B]">
            How to Choose the Right {category.name} in 2026
          </h2>
          <p className="text-sm text-[#52525B] mt-1">
            {category.buyingGuideSummary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 bg-[#FAFAFA] p-5 rounded-xl border border-[#F4F4F5]">
            <h3 className="font-bold text-sm text-[#18181B] uppercase tracking-wider flex items-center gap-2">
              <Check className="w-4 h-4 text-[#16A34A]" />
              <span>What to Look For</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#3F3F46]">
              {category.topFeaturesToLookFor.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] shrink-0 mt-1.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 bg-[#FAFAFA] p-5 rounded-xl border border-[#F4F4F5]">
            <h3 className="font-bold text-sm text-[#18181B] uppercase tracking-wider flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-[10px] font-bold">!</span>
              <span>Common Mistakes to Avoid</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#52525B]">
              {category.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0 mt-1.5" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Frequently Asked Questions (FAQ Accordion with SEO Schema) */}
      {category.faqs && category.faqs.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-6 sm:p-8 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-1">
              Frequently Asked Questions
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#18181B]">
              {category.pluralName} FAQs
            </h2>
          </div>

          <div className="divide-y divide-[#E4E4E7]">
            {category.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 font-semibold text-sm text-[#18181B]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#71717A] transition-transform ${
                        isOpen ? 'rotate-180 text-[#18181B]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="mt-2.5 text-xs text-[#52525B] leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Related Categories */}
      {category.relatedCategorySlugs && category.relatedCategorySlugs.length > 0 && (
        <div className="pt-4 border-t border-[#E4E4E7]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-3">
            Related Product Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.relatedCategorySlugs.map((relSlug) => (
              <button
                key={relSlug}
                onClick={() => navigate({ type: 'category', slug: relSlug })}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E4E4E7] bg-white hover:border-[#18181B] text-[#27272A] transition-colors capitalize"
              >
                {relSlug.replace('-', ' ')} →
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
