import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Hero } from '../components/Hero';
import { PopularCategories } from '../components/PopularCategories';
import {
  Scale,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  BookOpen,
  Star,
  ExternalLink,
  ShieldCheck,
  Check,
  ChevronDown,
  HelpCircle
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, guides, formatPrice, addToCompare, isInCompare, navigate } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Featured spotlight products for comparison teaser
  const spotlightProducts = products.filter((p) =>
    ['prod-macbook-air-m3', 'prod-lenovo-yoga-slim-7x', 'prod-acer-swift-go-14'].includes(p.id)
  );

  const homeFaqs = [
    {
      question: 'What is What Should I Buy?',
      answer: 'What Should I Buy is an independent consumer product research, side-by-side comparison, and decision platform. We evaluate laptops, smartphones, headphones, cameras, TVs, and home appliances using calibrated laboratory measurements, transparent trade-offs, and live multi-currency store price monitoring.'
    },
    {
      question: 'Which laptop should I buy for college in 2026?',
      answer: 'For 90% of college students, the Apple MacBook Air M3 (16GB RAM) or Lenovo Yoga Slim 7x is recommended. Both provide 14+ hours of genuine battery runtime, quiet operation in quiet lecture halls, and lightweight durable frames under 3 lbs. If you require specialized Windows CAD or engineering software, choose an Intel Core Ultra or AMD Ryzen ultrabook.'
    },
    {
      question: 'What is the best phone under $500 in 2026?',
      answer: 'The Google Pixel 9a is our top recommendation for the best phone under $500. It offers 90% of flagship camera performance, Google Real Tone skin accuracy, and 7 years of full operating system and security updates.'
    },
    {
      question: 'How do you test products without sponsored bias?',
      answer: 'We do not accept paid manufacturer placements, sponsored review units, or pay-for-play rankings. We measure battery runtime under standardized 200-nit web browsing workloads, measure display color accuracy with colorimeters, and publish explicit trade-offs and cons for every model.'
    },
    {
      question: 'How does the side-by-side product comparison tool work?',
      answer: 'You can select any 2 to 4 products from across our catalog. The decision matrix lines up verified hardware specifications, measured battery life, pros, cons, and current live prices across major retailers like Amazon, Best Buy, and B&H in a direct side-by-side table.'
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Popular Categories */}
      <PopularCategories />

      {/* 3. Decision Tool Jump Spotlight */}
      <section className="py-14 sm:py-20 border-b border-[#E4E4E7] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#18181B] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
                  <span>The "What Should I Buy?" Finder</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Stop scrolling through 50 generic reviews. <br />
                  <span className="font-editorial italic font-normal text-[#D4D4D8]">Get an honest match in 30 seconds.</span>
                </h2>

                <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl leading-relaxed">
                  Select your product type, enter your strict budget ceiling, and choose your non-negotiable priorities. Our algorithm calculates suitability based on measured battery life, display fidelity, and real-world durability.
                </p>

                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <button
                    onClick={() => navigate({ type: 'finder' })}
                    className="bg-white hover:bg-[#F4F4F5] text-[#18181B] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <span>Launch Decision Tool</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigate({ type: 'compare' })}
                    className="text-xs text-[#D4D4D8] hover:text-white underline font-medium"
                  >
                    Or open Comparison Matrix →
                  </button>
                </div>
              </div>

              {/* Step indicator on right */}
              <div className="lg:col-span-4 bg-[#27272A]/80 border border-white/10 rounded-2xl p-5 space-y-3 text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1AA] block">
                  How The Finder Works
                </span>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white text-[#18181B] flex items-center justify-center font-bold text-xs">1</span>
                    <span>Select category & target purpose</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white text-[#18181B] flex items-center justify-center font-bold text-xs">2</span>
                    <span>Set your hard budget ceiling</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white text-[#18181B] flex items-center justify-center font-bold text-xs">3</span>
                    <span>Pick priorities (Battery, Weight, Color)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white text-[#18181B] flex items-center justify-center font-bold text-xs">4</span>
                    <span>Receive suitability scores & trade-offs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Head-to-Head Comparison Spotlight */}
      <section className="py-14 sm:py-20 border-b border-[#E4E4E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-1">
                Side-by-Side Analysis
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
                Popular Head-to-Head Comparisons (2026)
              </h2>
              <p className="text-sm text-[#52525B] mt-1">
                Direct spec comparisons without promotional bias.
              </p>
            </div>

            <button
              onClick={() => navigate({ type: 'compare' })}
              className="text-xs font-bold text-[#18181B] hover:text-[#52525B] flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Open Full Comparison Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spotlightProducts.map((prod) => {
              const inCompare = isInCompare(prod.id);
              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-[#E4E4E7] hover:border-[#18181B] hover:shadow-md transition-all p-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="h-44 rounded-xl overflow-hidden bg-[#FAFAFA] border border-[#E4E4E7]">
                      <img
                        src={prod.image}
                        alt={`${prod.name} ${prod.brand} laptop specifications and price comparison`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs text-[#71717A]">
                        <span className="font-semibold uppercase tracking-wider">{prod.brand}</span>
                        <span>{prod.rating} ★</span>
                      </div>
                      <h3 className="font-bold text-base text-[#18181B] mt-0.5 line-clamp-1">
                        {prod.name}
                      </h3>
                      <div className="text-xl font-bold font-mono-numbers text-[#18181B] mt-1">
                        {formatPrice(prod.price)}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#52525B] border-t border-[#F4F4F5] pt-3">
                      <div className="flex justify-between">
                        <span className="text-[#71717A]">Battery:</span>
                        <span className="font-medium text-[#18181B]">{prod.specifications['Battery Life'] || '10+ hrs'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#71717A]">Weight:</span>
                        <span className="font-medium text-[#18181B]">{prod.specifications['Weight'] || '2.8 lbs'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#71717A]">Display:</span>
                        <span className="font-medium text-[#18181B] truncate max-w-[160px]">{prod.specifications['Display']?.split(',')[0]}</span>
                      </div>
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
                      {inCompare ? 'In Compare' : 'Add to Compare'}
                    </button>

                    <a
                      href={prod.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#18181B] text-white hover:bg-[#27272A] text-xs font-semibold py-2 px-3 rounded flex items-center gap-1 transition-colors"
                    >
                      <span>Check Price</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Buying Guides Spotlight */}
      <section className="py-14 sm:py-20 border-b border-[#E4E4E7] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-1">
                Editorial Deep Dives
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
                Latest Decision Buying Guides
              </h2>
              <p className="text-sm text-[#52525B] mt-1">
                Tested against real-world student, creative, travel, and home scenarios.
              </p>
            </div>

            <button
              onClick={() => navigate({ type: 'guides' })}
              className="text-xs font-bold text-[#18181B] hover:text-[#52525B] flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Browse All Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.slice(0, 3).map((guide) => (
              <div
                key={guide.id}
                onClick={() => navigate({ type: 'guide', slug: guide.slug })}
                className="group p-6 rounded-2xl border border-[#E4E4E7] hover:border-[#18181B] transition-all cursor-pointer flex flex-col justify-between bg-[#FAFAFA] hover:bg-white"
              >
                <div className="space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                    {guide.categorySlug} · {guide.readTime}
                  </div>
                  <h3 className="font-bold text-lg text-[#18181B] group-hover:text-black leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-[#52525B] line-clamp-3 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4E4E7] mt-5 flex items-center justify-between text-xs font-bold text-[#18181B]">
                  <span className="group-hover:underline">Read Research Findings</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Trust Us Section (Editorial Standards) */}
      <section className="py-14 sm:py-20 border-b border-[#E4E4E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                Our Research Code
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] leading-tight">
                Designed to eliminate bias and decision fatigue.
              </h2>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Most shopping websites are either automated affiliate scrapers or pay-for-play influencer channels. We built "What Should I Buy?" with the rigor of a scientific consumer lab.
              </p>

              <div className="space-y-3 pt-2 text-xs text-[#3F3F46]">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#18181B]">No Paid Placements: </strong>
                    Brands cannot pay for higher placement or favorable reviews.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#18181B]">Mandatory Trade-Offs: </strong>
                    Every product explicitly details battery compromises, port omissions, and ergonomic quirks.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#18181B]">Multi-Currency Transparency: </strong>
                    Real-time local currency pricing for USA ($), UK (£), Europe (€), Canada (CA$), and Australia (A$).
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E4E4E7] shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-[#F4F4F5] pb-4">
                <ShieldCheck className="w-8 h-8 text-[#18181B]" />
                <div>
                  <h3 className="font-bold text-base text-[#18181B]">
                    Consumer Protection Protocol
                  </h3>
                  <p className="text-xs text-[#71717A]">
                    Audited across thousands of test hours
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#F4F4F5]">
                  <div className="text-2xl font-extrabold text-[#18181B] font-mono-numbers">13</div>
                  <div className="text-xs text-[#71717A] mt-0.5">Vetted Categories</div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#F4F4F5]">
                  <div className="text-2xl font-extrabold text-[#18181B] font-mono-numbers">100%</div>
                  <div className="text-xs text-[#71717A] mt-0.5">Independent Testing</div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#F4F4F5]">
                  <div className="text-2xl font-extrabold text-[#18181B] font-mono-numbers">5</div>
                  <div className="text-xs text-[#71717A] mt-0.5">Global Currencies</div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#F4F4F5]">
                  <div className="text-2xl font-extrabold text-[#18181B] font-mono-numbers">$0</div>
                  <div className="text-xs text-[#71717A] mt-0.5">Sponsored Paywalls</div>
                </div>
              </div>

              <p className="text-[11px] text-[#71717A] text-center">
                Questions or corrections? Reach out to our research editors via our <button onClick={() => navigate({ type: 'legal', page: 'contact' })} className="text-[#18181B] underline">Contact Form</button>.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Homepage Frequently Asked Questions (Structured for AI Overviews & Search) */}
      <section aria-labelledby="home-faq-title" className="py-14 sm:py-20 border-b border-[#E4E4E7] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#18181B]" />
              <span>Consumer Buyer Assistance</span>
            </div>
            <h2 id="home-faq-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
              Frequently Asked Buyer Questions (2026)
            </h2>
            <p className="text-sm text-[#52525B] mt-1">
              Independent answers to the most common product research questions.
            </p>
          </div>

          <div className="divide-y divide-[#E4E4E7] border border-[#E4E4E7] rounded-2xl p-6 sm:p-8 bg-[#FAFAFA]">
            {homeFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#18181B]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#71717A] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#18181B]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="mt-2.5 text-xs sm:text-sm text-[#52525B] leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};
