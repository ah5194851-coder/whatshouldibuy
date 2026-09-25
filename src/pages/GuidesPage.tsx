import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Clock, User, ArrowRight, Check } from 'lucide-react';

export const GuidesPage: React.FC = () => {
  const { guides, navigate } = useApp();
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');

  const filteredGuides = selectedCatFilter === 'all'
    ? guides
    : guides.filter((g) => g.categorySlug === selectedCatFilter);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#E4E4E7] pb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-1">
          Editorial Research & Buying Strategy
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18181B]">
          Decision-Focused Buying Guides
        </h1>
        <p className="text-sm text-[#52525B] mt-1 max-w-2xl">
          Independent, multi-hour laboratory evaluations. We establish strict testing baselines, eliminate sponsor influence, and tell you directly who should and shouldn’t buy each model.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 text-xs">
        <button
          onClick={() => setSelectedCatFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            selectedCatFilter === 'all'
              ? 'bg-[#18181B] text-white'
              : 'bg-[#F4F4F5] text-[#52525B] hover:bg-[#E4E4E7]'
          }`}
        >
          All Buying Guides
        </button>
        {['laptops', 'smartphones', 'headphones', 'audio', 'tvs'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCatFilter(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium capitalize whitespace-nowrap transition-colors ${
              selectedCatFilter === cat
                ? 'bg-[#18181B] text-white'
                : 'bg-[#F4F4F5] text-[#52525B] hover:bg-[#E4E4E7]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <article
            key={guide.id}
            onClick={() => navigate({ type: 'guide', slug: guide.slug })}
            className="group bg-white rounded-2xl border border-[#E4E4E7] hover:border-[#18181B] hover:shadow-sm transition-all p-6 flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[11px] text-[#71717A]">
                <span className="font-semibold uppercase tracking-wider text-[#18181B]">
                  {guide.categorySlug}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {guide.readTime}
                </span>
                <span aria-hidden="true">·</span>
                <span>{guide.publishedDate}</span>
              </div>

              <h2 className="text-lg font-bold text-[#18181B] group-hover:text-black leading-snug">
                {guide.title}
              </h2>

              <p className="text-xs text-[#52525B] line-clamp-3 leading-relaxed">
                {guide.summary}
              </p>

              {/* Quick Picks Highlight */}
              <div className="pt-2 border-t border-[#F4F4F5]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block mb-1">
                  Top Recommended Pick
                </span>
                <span className="text-xs font-semibold text-[#18181B] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>{guide.topPickIds[0]?.rankTitle.replace('Our Top Pick: ', '')}</span>
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F4F4F5] mt-5 flex items-center justify-between text-xs font-bold text-[#18181B]">
              <span className="group-hover:underline">Read Full Decision Guide</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
