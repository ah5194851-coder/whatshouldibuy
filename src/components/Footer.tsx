import React from 'react';
import { useApp } from '../context/AppContext';
import { CURRENCIES } from '../utils/currency';
import { CurrencyCode } from '../types';
import { Shield, ExternalLink, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { categories, guides, navigate, currency, setCurrency } = useApp();

  return (
    <footer className="bg-[#18181B] text-[#A1A1AA] border-t border-[#27272A] pt-12 pb-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Tier: Brand & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#27272A]">
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" />
              <span className="text-white font-bold text-lg tracking-tight">
                What Should I Buy?
              </span>
            </div>
            <p className="text-sm text-[#D4D4D8] font-editorial italic">
              “Find the right product for your needs and budget.”
            </p>
            <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-sm">
              Independent consumer product decision platform serving the United States, UK, Europe, Canada, Australia, and worldwide English-speaking consumers. No pay-to-play rankings.
            </p>

            {/* Currency selector in footer */}
            <div className="pt-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#71717A]" />
              <span className="text-[11px] text-[#A1A1AA]">Display Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-[#27272A] text-white text-xs rounded px-2 py-1 border border-[#3F3F46] focus:outline-none"
              >
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                  <option key={c} value={c}>
                    {CURRENCIES[c].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Categories Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-white font-bold uppercase tracking-wider text-[11px] block">
              Core Categories
            </span>
            <ul className="space-y-1.5 text-xs">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => navigate({ type: 'category', slug: c.slug })}
                    className="hover:text-white transition-colors"
                  >
                    {c.pluralName}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate({ type: 'categories' })}
                  className="text-white font-medium underline"
                >
                  View All 13 Categories →
                </button>
              </li>
            </ul>
          </div>

          {/* Buying Guides */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-white font-bold uppercase tracking-wider text-[11px] block">
              Popular Buying Guides
            </span>
            <ul className="space-y-1.5 text-xs">
              {guides.slice(0, 5).map((g) => (
                <li key={g.id}>
                  <button
                    onClick={() => navigate({ type: 'guide', slug: g.slug })}
                    className="hover:text-white transition-colors line-clamp-1 text-left"
                  >
                    {g.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate({ type: 'guides' })}
                  className="text-white font-medium underline"
                >
                  All Buying Guides →
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-white font-bold uppercase tracking-wider text-[11px] block">
              Editorial & Legal
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => navigate({ type: 'legal', page: 'about' })}
                  className="hover:text-white transition-colors"
                >
                  About Us & Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ type: 'legal', page: 'affiliate' })}
                  className="hover:text-white transition-colors"
                >
                  Affiliate Disclosure
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ type: 'legal', page: 'contact' })}
                  className="hover:text-white transition-colors"
                >
                  Contact Editorial Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ type: 'legal', page: 'privacy' })}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ type: 'legal', page: 'terms' })}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ type: 'legal', page: 'cookies' })}
                  className="hover:text-white transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ type: 'sitemap' })}
                  className="hover:text-white transition-colors text-[11px]"
                >
                  Sitemap & Robots.txt
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => navigate({ type: 'admin' })}
                  className="text-[#71717A] hover:text-white text-[10px] block"
                >
                  Admin Database Panel
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Statement */}
        <div className="bg-[#27272A]/40 p-4 rounded-xl border border-[#27272A] text-[11px] text-[#A1A1AA] leading-relaxed">
          <p>
            <strong className="text-white">Affiliate Transparency Disclosure: </strong>
            What Should I Buy? is an independently owned and operated consumer research publication. We may earn a commission when you click or purchase through links on our site. This comes at zero extra cost to you. We never accept payment for positive reviews or altered lab measurements.
          </p>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71717A]">
          <div>
            © {new Date().getFullYear()} What Should I Buy? All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Built for USA, UK, EU, CA, AU & Worldwide Shoppers</span>
            <span>·</span>
            <span>Version 1.0 Production Release</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
