import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, BookOpen, Scale, ExternalLink, ArrowRight } from 'lucide-react';

interface SearchResultsPageProps {
  query: string;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ query }) => {
  const { products, categories, guides, formatPrice, addToCompare, isInCompare, navigate } = useApp();

  const q = query.toLowerCase();

  const matchedProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.bestFor.toLowerCase().includes(q) ||
        p.targetPurposes.some((tp) => tp.toLowerCase().includes(q))
    );
  }, [products, q]);

  const matchedCategories = useMemo(() => {
    return categories.filter(
      (c) =>
        c.pluralName.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [categories, q]);

  const matchedGuides = useMemo(() => {
    return guides.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q) ||
        g.categorySlug.toLowerCase().includes(q)
    );
  }, [guides, q]);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="border-b border-[#E4E4E7] pb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-1">
          Search Results
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
          Matches for "{query}"
        </h1>
        <p className="text-sm text-[#52525B] mt-1">
          Found {matchedProducts.length} products, {matchedCategories.length} categories, and {matchedGuides.length} buying guides.
        </p>
      </div>

      {/* Categories Match */}
      {matchedCategories.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#18181B] uppercase tracking-wider">
            Matching Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {matchedCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate({ type: 'category', slug: c.slug })}
                className="p-4 rounded-xl border border-[#E4E4E7] hover:border-[#18181B] bg-white text-left flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-sm text-[#18181B]">{c.pluralName}</h3>
                  <p className="text-[11px] text-[#71717A] mt-0.5">{c.tagline}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#71717A]" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Guides Match */}
      {matchedGuides.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#18181B] uppercase tracking-wider">
            Relevant Buying Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matchedGuides.map((g) => (
              <div
                key={g.id}
                onClick={() => navigate({ type: 'guide', slug: g.slug })}
                className="p-5 rounded-xl border border-[#E4E4E7] hover:border-[#18181B] bg-white cursor-pointer space-y-2"
              >
                <div className="text-[11px] font-semibold text-[#71717A] uppercase">
                  {g.categorySlug} · {g.readTime}
                </div>
                <h3 className="font-bold text-base text-[#18181B]">{g.title}</h3>
                <p className="text-xs text-[#52525B] line-clamp-2">{g.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Match */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#18181B] uppercase tracking-wider">
          Products Matching Search ({matchedProducts.length})
        </h2>

        {matchedProducts.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#E4E4E7] space-y-3">
            <p className="text-sm text-[#52525B]">No products matched your exact query.</p>
            <button
              onClick={() => navigate({ type: 'finder' })}
              className="text-xs font-semibold px-4 py-2 bg-[#18181B] text-white rounded-lg"
            >
              Open Finder Tool
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedProducts.map((prod) => {
              const inCompare = isInCompare(prod.id);
              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-[#E4E4E7] p-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="h-44 rounded-xl overflow-hidden bg-[#FAFAFA] border border-[#E4E4E7]">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
                        {prod.brand} · {prod.subcategory}
                      </span>
                      <h3 className="font-bold text-sm text-[#18181B] line-clamp-1 mt-0.5">
                        {prod.name}
                      </h3>
                      <div className="font-mono-numbers text-lg font-bold text-[#18181B] mt-1">
                        {formatPrice(prod.price)}
                      </div>
                      <p className="text-xs text-[#52525B] mt-1 line-clamp-2">
                        {prod.bestFor}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#F4F4F5] mt-4 flex items-center gap-2">
                    <button
                      onClick={() => addToCompare(prod.id)}
                      className={`text-xs font-semibold py-2 px-3 rounded border flex-1 text-center transition-colors ${
                        inCompare
                          ? 'bg-[#18181B] text-white border-[#18181B]'
                          : 'bg-white text-[#27272A] border-[#E4E4E7] hover:border-[#18181B]'
                      }`}
                    >
                      {inCompare ? 'In Compare' : 'Compare'}
                    </button>
                    <button
                      onClick={() => navigate({ type: 'product', slug: prod.slug })}
                      className="text-xs font-semibold py-2 px-3 rounded bg-[#F4F4F5] hover:bg-[#E4E4E7] text-[#18181B]"
                    >
                      Specs
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
