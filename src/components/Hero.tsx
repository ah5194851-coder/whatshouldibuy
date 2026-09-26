import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import heroImg from '../assets/images/hero_product_curation_1790354697983.jpg';

export const Hero: React.FC = () => {
  const { navigate, setQuickSearchOpen } = useApp();
  const [searchInput, setSearchInput] = useState('');

  const sampleQueries = [
    'Best laptop for students',
    'Best phone under $500',
    'Best microphone for YouTube',
    'Best printer for home',
    'Best headphones for travel',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      navigate({ type: 'finder' });
      return;
    }
    const query = searchInput.trim().toLowerCase();
    // Route intelligently
    if (query.includes('student') || query.includes('laptop')) {
      navigate({ type: 'finder', initialCategory: 'laptops', initialQuery: searchInput });
    } else if (query.includes('phone') || query.includes('camera')) {
      navigate({ type: 'finder', initialCategory: query.includes('camera') ? 'cameras' : 'smartphones', initialQuery: searchInput });
    } else if (query.includes('headphone') || query.includes('travel')) {
      navigate({ type: 'finder', initialCategory: 'headphones', initialQuery: searchInput });
    } else {
      navigate({ type: 'search', query: searchInput });
    }
  };

  const handleQueryClick = (q: string) => {
    setSearchInput(q);
    if (q.includes('laptop for students')) {
      navigate({ type: 'guide', slug: 'best-laptop-for-college-students' });
    } else if (q.includes('phone under $500')) {
      navigate({ type: 'finder', initialCategory: 'smartphones', initialQuery: 'under 500' });
    } else if (q.includes('microphone for YouTube')) {
      navigate({ type: 'guide', slug: 'best-microphone-for-youtube' });
    } else if (q.includes('headphones for travel')) {
      navigate({ type: 'guide', slug: 'best-headphones-for-travel' });
    } else {
      navigate({ type: 'search', query: q });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Search Module */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#52525B] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18181B]" />
              <span>Independent Consumer Product Decision Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#18181B] leading-[1.15] text-balance">
              Not Sure What to Buy? <br className="hidden sm:inline" />
              <span className="font-editorial italic font-normal text-[#27272A]">We Can Help.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] max-w-xl leading-relaxed text-pretty">
              Tell us your budget, what you need, and how you’ll use it. We’ll help you compare your options with verified laboratory data and zero sponsor bias.
            </p>

            {/* Main Interactive Search Input Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white p-2 rounded-xl border-2 border-[#18181B] shadow-sm max-w-xl transition-all focus-within:ring-2 focus-within:ring-[#18181B]/20"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-5 h-5 text-[#71717A] shrink-0" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="What are you looking to buy?"
                    className="w-full pl-3 pr-2 py-2.5 text-sm sm:text-base text-[#18181B] placeholder-[#A1A1AA] bg-transparent border-0 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#18181B] hover:bg-[#27272A] text-white text-sm font-semibold px-5 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Find My Options</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Quick Suggestion Prompts */}
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-medium text-[#71717A]">Popular searches:</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {sampleQueries.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleQueryClick(q)}
                    className="px-2.5 py-1 rounded bg-[#F4F4F5] hover:bg-[#E4E4E7] text-[#3F3F46] hover:text-[#18181B] transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Editorial Trust Markers */}
            <div className="pt-4 border-t border-[#F4F4F5] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#52525B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#18181B] shrink-0" />
                <span>Hands-on Lab Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#18181B] shrink-0" />
                <span>No Sponsored Rankings</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#18181B] shrink-0" />
                <span>Unbiased Trade-Offs</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Studio Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#E4E4E7] shadow-sm bg-[#F4F4F5]">
              <img
                src={heroImg}
                alt="Editorial curation of tested laptops, audio equipment, and cameras"
                className="w-full h-[320px] sm:h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D4D4D8]">
                  Tested & Calibrated
                </span>
                <p className="font-editorial text-xl sm:text-2xl font-normal leading-snug mt-1 text-balance">
                  Every product measured for longevity, battery truth, and real price value.
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-[#D4D4D8] border-t border-white/20 pt-2">
                  <span>2026 Buying Standards</span>
                  <button
                    onClick={() => navigate({ type: 'finder' })}
                    className="text-white underline hover:no-underline font-medium"
                  >
                    Open Decision Tool →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
