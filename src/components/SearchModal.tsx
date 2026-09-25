import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Laptop, BookOpen, ArrowRight, ExternalLink } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    products,
    categories,
    guides,
    quickSearchOpen,
    setQuickSearchOpen,
    formatPrice,
    navigate
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setQuickSearchOpen(true);
      }
      if (e.key === 'Escape' && quickSearchOpen) {
        setQuickSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickSearchOpen, setQuickSearchOpen]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { products: [], categories: [], guides: [] };

    const matchedProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.bestFor.toLowerCase().includes(q) ||
        p.targetPurposes.some((tp) => tp.toLowerCase().includes(q))
    );

    const matchedCategories = categories.filter(
      (c) =>
        c.pluralName.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );

    const matchedGuides = guides.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q) ||
        g.categorySlug.toLowerCase().includes(q)
    );

    return {
      products: matchedProducts.slice(0, 6),
      categories: matchedCategories.slice(0, 4),
      guides: matchedGuides.slice(0, 4),
    };
  }, [query, products, categories, guides]);

  if (!quickSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-[#E4E4E7] flex flex-col max-h-[80vh]">
        
        {/* Input Bar */}
        <div className="p-4 border-b border-[#E4E4E7] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#71717A] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, guides, specs (e.g. laptop for students, under $500)..."
            className="w-full text-base font-medium text-[#18181B] placeholder-[#A1A1AA] bg-transparent focus:outline-none"
          />
          <button
            onClick={() => setQuickSearchOpen(false)}
            className="p-1 rounded-lg text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto divide-y divide-[#F4F4F5] space-y-4">
          
          {query.trim() === '' ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">
                Popular Quick Searches
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto pt-2">
                {[
                  'Best laptop for students',
                  'Best phone under $500',
                  'Best headphones for travel',
                  'Shure MV7+',
                  'LG C4 OLED'
                ].map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setQuery(sample)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#F4F4F5] hover:bg-[#E4E4E7] text-[#3F3F46] transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Matching Categories */}
              {searchResults.categories.length > 0 && (
                <div className="space-y-2 pb-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                    Categories
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {searchResults.categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          navigate({ type: 'category', slug: c.slug });
                          setQuickSearchOpen(false);
                        }}
                        className="p-2.5 rounded-lg border border-[#E4E4E7] hover:border-[#18181B] text-left flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-bold text-[#18181B] block">{c.pluralName}</span>
                          <span className="text-[10px] text-[#71717A] truncate block">{c.tagline}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#71717A]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Buying Guides */}
              {searchResults.guides.length > 0 && (
                <div className="space-y-2 py-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                    In-Depth Buying Guides
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.guides.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => {
                          navigate({ type: 'guide', slug: g.slug });
                          setQuickSearchOpen(false);
                        }}
                        className="w-full p-2.5 rounded-lg hover:bg-[#F9F9F8] text-left flex items-center justify-between transition-colors text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4 text-[#71717A] shrink-0" />
                          <div>
                            <span className="font-bold text-[#18181B] block">{g.title}</span>
                            <span className="text-[10px] text-[#71717A]">{g.readTime} · {g.publishedDate}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#71717A]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Products */}
              {searchResults.products.length > 0 && (
                <div className="space-y-2 pt-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                    Evaluated Products ({searchResults.products.length})
                  </div>
                  <div className="space-y-2">
                    {searchResults.products.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          navigate({ type: 'product', slug: p.slug });
                          setQuickSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl border border-[#E4E4E7] hover:border-[#18181B] flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FAFAFA] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded border border-[#E4E4E7] overflow-hidden bg-white shrink-0">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#18181B]">{p.name}</div>
                            <div className="text-[10px] text-[#71717A]">
                              {p.brand} · {p.bestFor}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-mono-numbers text-xs font-bold text-[#18181B]">
                            {formatPrice(p.price)}
                          </div>
                          <span className="text-[10px] text-[#18181B] underline">
                            View Specs →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {searchResults.products.length === 0 &&
                searchResults.categories.length === 0 &&
                searchResults.guides.length === 0 && (
                  <div className="py-10 text-center space-y-2">
                    <p className="text-xs font-medium text-[#71717A]">
                      No exact matches found for "{query}".
                    </p>
                    <button
                      onClick={() => {
                        navigate({ type: 'finder', initialQuery: query });
                        setQuickSearchOpen(false);
                      }}
                      className="text-xs font-bold text-[#18181B] underline"
                    >
                      Search with the Interactive Finder instead →
                    </button>
                  </div>
                )}
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#FAFAFA] border-t border-[#E4E4E7] text-[11px] text-[#71717A] flex items-center justify-between">
          <span>Press ESC to close</span>
          <button
            onClick={() => {
              navigate({ type: 'finder' });
              setQuickSearchOpen(false);
            }}
            className="text-[#18181B] font-semibold hover:underline"
          >
            Launch Product Finder →
          </button>
        </div>

      </div>
    </div>
  );
};
