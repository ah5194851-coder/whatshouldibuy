import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Search, BookOpen, Compass, Layers } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate, setQuickSearchOpen } = useApp();

  return (
    <div className="py-20 sm:py-28 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4F4F5] border border-[#E4E4E7] text-xs font-mono text-[#71717A]">
        <span>ERROR 404</span>
        <span aria-hidden="true">·</span>
        <span>PAGE NOT FOUND</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#18181B] tracking-tight">
          Lost your way in our catalog?
        </h1>
        <p className="text-sm sm:text-base text-[#52525B] max-w-xl mx-auto">
          The product, comparison page, or guide you are looking for does not exist or may have been updated.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => navigate({ type: 'home' })}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#18181B] text-white text-xs font-semibold rounded-lg hover:bg-[#27272A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </button>

        <button
          onClick={() => setQuickSearchOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E4E4E7] text-[#18181B] text-xs font-semibold rounded-lg hover:bg-[#F4F4F5] transition-colors shadow-xs"
        >
          <Search className="w-3.5 h-3.5 text-[#71717A]" />
          <span>Search Products</span>
        </button>
      </div>

      <div className="pt-8 border-t border-[#E4E4E7] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <button
          onClick={() => navigate({ type: 'finder' })}
          className="p-4 rounded-xl border border-[#E4E4E7] bg-white hover:border-[#18181B] transition-colors group"
        >
          <Compass className="w-5 h-5 text-[#18181B] mb-2" />
          <div className="text-xs font-bold text-[#18181B] group-hover:underline">Product Finder</div>
          <div className="text-[11px] text-[#71717A] mt-1">Specify your budget and get custom recommendations.</div>
        </button>

        <button
          onClick={() => navigate({ type: 'categories' })}
          className="p-4 rounded-xl border border-[#E4E4E7] bg-white hover:border-[#18181B] transition-colors group"
        >
          <Layers className="w-5 h-5 text-[#18181B] mb-2" />
          <div className="text-xs font-bold text-[#18181B] group-hover:underline">All Categories</div>
          <div className="text-[11px] text-[#71717A] mt-1">Browse laptops, phones, headphones, cameras, and gear.</div>
        </button>

        <button
          onClick={() => navigate({ type: 'guides' })}
          className="p-4 rounded-xl border border-[#E4E4E7] bg-white hover:border-[#18181B] transition-colors group"
        >
          <BookOpen className="w-5 h-5 text-[#18181B] mb-2" />
          <div className="text-xs font-bold text-[#18181B] group-hover:underline">Buying Guides</div>
          <div className="text-[11px] text-[#71717A] mt-1">Read lab benchmarks and editorial breakdowns.</div>
        </button>
      </div>
    </div>
  );
};
