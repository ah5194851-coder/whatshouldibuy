import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRENCIES } from '../utils/currency';
import { CurrencyCode } from '../types';
import { Search, SlidersHorizontal, Scale, BookOpen, Grid, Menu, X, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    view,
    navigate,
    currency,
    setCurrency,
    compareList,
    setQuickSearchOpen,
    isAdminLoggedIn
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const isActive = (targetType: string) => {
    return view.type === targetType;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#E4E4E7]">
      {/* Editorial Trust Kicker Bar */}
      <div className="bg-[#18181B] text-[#A1A1AA] text-[11px] py-1 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <span className="text-[#FAFAFA]">Editorial Guarantee:</span>
        <span>Independent testing & analysis. No pay-to-play rankings.</span>
        <button
          onClick={() => navigate({ type: 'legal', page: 'affiliate' })}
          className="text-[#D4D4D8] underline hover:text-white transition-colors ml-1"
        >
          Affiliate Disclosure
        </button>
      </div>

      {/* Main Top Bar: Strict 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element brand wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              navigate({ type: 'home' });
              setMobileMenuOpen(false);
            }}
            className="text-left font-bold tracking-tight text-[#18181B] text-lg sm:text-xl hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#18181B] inline-block" aria-hidden="true" />
            <span>What Should I Buy?</span>
          </button>
        </div>

        {/* Zone 2: 4–6 clean text navigation links (single line, no pill enclosures) */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#52525B]">
          <button
            onClick={() => navigate({ type: 'finder' })}
            className={`transition-colors whitespace-nowrap ${
              isActive('finder') ? 'text-[#18181B] font-semibold underline underline-offset-8 decoration-2 decoration-[#18181B]' : 'hover:text-[#18181B]'
            }`}
          >
            Product Finder
          </button>

          <button
            onClick={() => navigate({ type: 'categories' })}
            className={`transition-colors whitespace-nowrap ${
              isActive('categories') || isActive('category') ? 'text-[#18181B] font-semibold underline underline-offset-8 decoration-2 decoration-[#18181B]' : 'hover:text-[#18181B]'
            }`}
          >
            Categories
          </button>

          <button
            onClick={() => navigate({ type: 'compare' })}
            className={`transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              isActive('compare') ? 'text-[#18181B] font-semibold underline underline-offset-8 decoration-2 decoration-[#18181B]' : 'hover:text-[#18181B]'
            }`}
          >
            <span>Compare</span>
            {compareList.length > 0 && (
              <span className="text-[11px] font-bold bg-[#18181B] text-white rounded-full px-1.5 py-0.2 min-w-4 text-center">
                {compareList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate({ type: 'guides' })}
            className={`transition-colors whitespace-nowrap ${
              isActive('guides') || isActive('guide') ? 'text-[#18181B] font-semibold underline underline-offset-8 decoration-2 decoration-[#18181B]' : 'hover:text-[#18181B]'
            }`}
          >
            Buying Guides
          </button>

          <button
            onClick={() => setQuickSearchOpen(true)}
            className="flex items-center gap-1.5 text-[#71717A] hover:text-[#18181B] transition-colors whitespace-nowrap"
            title="Search products and guides"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded border border-[#E4E4E7] bg-white text-[#27272A] hover:border-[#A1A1AA] transition-colors"
              aria-label="Change currency"
            >
              <span>{CURRENCIES[currency].code}</span>
              <span className="text-[#71717A]">{CURRENCIES[currency].symbol}</span>
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white border border-[#E4E4E7] rounded-md shadow-lg py-1 z-50">
                <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#A1A1AA] border-b border-[#F4F4F5]">
                  Select Currency
                </div>
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cCode) => (
                  <button
                    key={cCode}
                    onClick={() => {
                      setCurrency(cCode);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#F4F4F5] transition-colors ${
                      currency === cCode ? 'font-bold text-[#18181B] bg-[#FAFAFA]' : 'text-[#52525B]'
                    }`}
                  >
                    <span>{CURRENCIES[cCode].label}</span>
                    <span className="font-mono-numbers text-xs">{CURRENCIES[cCode].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Finder CTA */}
          <button
            onClick={() => navigate({ type: 'finder' })}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-semibold px-3.5 py-2 rounded transition-colors whitespace-nowrap"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Launch Finder</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded text-[#52525B] hover:text-[#18181B] hover:bg-[#F4F4F5]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E4E4E7] bg-white px-4 pt-3 pb-6 space-y-3 shadow-md">
          {/* Quick Search trigger in mobile */}
          <button
            onClick={() => {
              setQuickSearchOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded bg-[#F4F4F5] text-sm text-[#71717A] text-left"
          >
            <Search className="w-4 h-4 text-[#71717A]" />
            <span>What are you looking to buy?</span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                navigate({ type: 'finder' });
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded border border-[#E4E4E7] text-xs font-semibold text-[#18181B] hover:bg-[#FAFAFA]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#52525B]" />
              <span>Product Finder</span>
            </button>

            <button
              onClick={() => {
                navigate({ type: 'compare' });
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 rounded border border-[#E4E4E7] text-xs font-semibold text-[#18181B] hover:bg-[#FAFAFA]"
            >
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#52525B]" />
                <span>Compare</span>
              </div>
              {compareList.length > 0 && (
                <span className="text-[11px] font-bold bg-[#18181B] text-white rounded-full px-1.5 py-0.2">
                  {compareList.length}
                </span>
              )}
            </button>
          </div>

          <div className="border-t border-[#F4F4F5] pt-2 space-y-1">
            <button
              onClick={() => {
                navigate({ type: 'categories' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#27272A] hover:bg-[#F4F4F5] rounded flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Grid className="w-4 h-4 text-[#71717A]" />
                <span>All 13 Categories</span>
              </div>
            </button>

            <button
              onClick={() => {
                navigate({ type: 'guides' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#27272A] hover:bg-[#F4F4F5] rounded flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#71717A]" />
                <span>Editorial Buying Guides</span>
              </div>
            </button>

            <button
              onClick={() => {
                navigate({ type: 'admin' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs text-[#71717A] hover:text-[#18181B] rounded flex items-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Database Manager {isAdminLoggedIn ? '(Logged In)' : ''}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
