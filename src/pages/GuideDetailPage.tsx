import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  User,
  ShieldCheck,
  Check,
  Scale,
  ExternalLink,
  ArrowLeft,
  ChevronDown,
  Info,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';

interface GuideDetailPageProps {
  slug: string;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ slug }) => {
  const { getGuideBySlug, getProductById, formatPrice, addToCompare, isInCompare, navigate } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const guide = getGuideBySlug(slug);

  if (!guide) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-xl font-bold text-[#18181B]">Guide Not Found</h2>
        <p className="text-sm text-[#52525B] mt-2">
          The requested buying guide could not be found.
        </p>
        <button
          onClick={() => navigate({ type: 'guides' })}
          className="mt-4 px-4 py-2 bg-[#18181B] text-white text-xs font-semibold rounded-lg"
        >
          View All Buying Guides
        </button>
      </div>
    );
  }

  return (
    <article className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Breadcrumb / Back Link */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#71717A]">
        <button
          onClick={() => navigate({ type: 'guides' })}
          className="hover:text-[#18181B] flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Guides</span>
        </button>
        <span>/</span>
        <button
          onClick={() => navigate({ type: 'category', slug: guide.categorySlug })}
          className="hover:text-[#18181B] capitalize"
        >
          {guide.categorySlug}
        </button>
        <span>/</span>
        <span className="text-[#18181B] truncate">{guide.title}</span>
      </nav>

      {/* Guide Header (Single H1) */}
      <header className="space-y-4 border-b border-[#E4E4E7] pb-8">
        <div className="flex items-center gap-3 text-xs text-[#71717A]">
          <span className="font-bold uppercase tracking-wider text-[#18181B]">
            Independent Buying Guide
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{guide.readTime}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>Updated {guide.publishedDate}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#18181B] leading-[1.2]">
          {guide.title}
        </h1>

        <p className="text-lg text-[#52525B] leading-relaxed">
          {guide.subheadline}
        </p>

        {/* Author Byline */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5 text-xs text-[#52525B]">
            <div className="w-8 h-8 rounded-full bg-[#E4E4E7] flex items-center justify-center font-bold text-[#18181B]">
              {guide.author.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-[#18181B]">{guide.author}</div>
              <div className="text-[#71717A]">{guide.authorRole}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#71717A]">
            <ShieldCheck className="w-4 h-4 text-[#18181B]" />
            <span className="hidden sm:inline">100% Independent Lab Testing</span>
          </div>
        </div>
      </header>

      {/* AEO / AI Overview Quick Answer Capsule (Direct, Snippet-Ready) */}
      {guide.aeoTakeaway && (
        <section aria-labelledby="aeo-guide-takeaway" className="bg-[#FAFAFA] rounded-2xl border-2 border-[#18181B] p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#18181B]" />
            <h2 id="aeo-guide-takeaway" className="text-xs font-bold uppercase tracking-wider text-[#18181B]">
              Quick Answer: Which Model Should You Buy in 2026?
            </h2>
          </div>
          <p className="text-base text-[#18181B] leading-relaxed font-medium">
            {guide.aeoTakeaway}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[#71717A] pt-1">
            <Info className="w-3.5 h-3.5" />
            <span>Extracted from over 300 hours of standardized laboratory hardware testing.</span>
          </div>
        </section>
      )}

      {/* Search Keywords Cloud */}
      {guide.targetKeywords && guide.targetKeywords.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E4E4E7] p-4 flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
          <span className="font-bold text-[#18181B] whitespace-nowrap">
            Related Buyer Questions:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {guide.targetKeywords.map((kw) => (
              <span
                key={kw}
                className="px-2.5 py-1 rounded bg-[#F4F4F5] text-[#3F3F46] font-medium"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Executive Summary */}
      <section aria-labelledby="executive-summary-title" className="bg-[#FAFAFA] rounded-2xl border border-[#E4E4E7] p-6 space-y-3">
        <h2 id="executive-summary-title" className="text-xs font-bold uppercase tracking-wider text-[#18181B]">
          The Quick Decision Summary
        </h2>
        <p className="text-sm text-[#3F3F46] leading-relaxed font-editorial text-lg italic">
          "{guide.summary}"
        </p>
      </section>

      {/* Testing Methodology */}
      <section aria-labelledby="methodology-title" className="space-y-3">
        <h2 id="methodology-title" className="text-2xl font-bold text-[#18181B]">
          Our Testing Methodology
        </h2>
        <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
          {guide.methodology}
        </p>
      </section>

      {/* Top Ranked Picks */}
      <section aria-labelledby="top-picks-title" className="space-y-8 pt-4">
        <h2 id="top-picks-title" className="text-2xl font-bold text-[#18181B] border-b border-[#E4E4E7] pb-3">
          Our Tested Recommendations
        </h2>

        <div className="space-y-8">
          {guide.topPickIds.map((pick, index) => {
            const product = getProductById(pick.productId);
            if (!product) return null;

            const inCompare = isInCompare(product.id);

            return (
              <div
                key={pick.productId}
                className="bg-white rounded-2xl border-2 border-[#18181B] p-6 sm:p-8 space-y-6 shadow-sm"
              >
                {/* Badge & Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F4F4F5] pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#18181B] block">
                      {pick.rankTitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#18181B] mt-0.5">
                      {product.name}
                    </h3>
                  </div>

                  <div className="text-2xl font-bold font-mono-numbers text-[#18181B] self-start sm:self-auto">
                    {formatPrice(product.price)}
                  </div>
                </div>

                {/* Product Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 rounded-xl overflow-hidden border border-[#E4E4E7] h-48 bg-[#FAFAFA]">
                    <img
                      src={product.image}
                      alt={`${product.name} - ${pick.rankTitle} tested and reviewed`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="md:col-span-8 space-y-3">
                    <div>
                      <span className="text-xs font-bold text-[#18181B] block mb-1">
                        Why we chose this model:
                      </span>
                      <p className="text-xs sm:text-sm text-[#3F3F46] leading-relaxed">
                        {pick.whyChosen}
                      </p>
                    </div>

                    <div className="text-xs text-[#52525B]">
                      <strong className="text-[#18181B]">Best for: </strong>
                      {product.bestFor}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      {Object.entries(product.specifications).slice(0, 4).map(([k, v]) => (
                        <div key={k} className="bg-[#F9F9F8] p-2 rounded">
                          <span className="text-[10px] text-[#71717A] block uppercase font-medium">{k}</span>
                          <span className="font-semibold text-[#18181B] truncate block">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAFAFA] p-4 rounded-xl text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-[#16A34A] block mb-1.5">Where it excels:</span>
                    <ul className="space-y-1 text-[#3F3F46]">
                      {product.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-[#DC2626] block mb-1.5">Where it compromises:</span>
                    <ul className="space-y-1 text-[#52525B]">
                      {product.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#DC2626] font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => addToCompare(product.id)}
                    className={`text-xs font-semibold px-4 py-2 rounded border flex items-center justify-center gap-1.5 transition-colors w-full sm:w-auto ${
                      inCompare
                        ? 'bg-[#18181B] text-white border-[#18181B]'
                        : 'bg-white text-[#27272A] border-[#E4E4E7] hover:border-[#18181B]'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{inCompare ? 'View in Comparison Table' : 'Add to Compare'}</span>
                  </button>

                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Check Current Price</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Step-by-Step Decision Guide (Matches Schema.org HowTo) */}
      {guide.howToSteps && guide.howToSteps.length > 0 && (
        <section aria-labelledby="step-guide-title" className="bg-white rounded-2xl border border-[#E4E4E7] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#E4E4E7] pb-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-1">
              Step-by-Step Buyer Framework
            </div>
            <h2 id="step-guide-title" className="text-2xl font-bold text-[#18181B]">
              How to Choose the Right Model in 2026
            </h2>
            <p className="text-sm text-[#52525B] mt-1">
              Follow these actionable steps to ensure you choose the best hardware for your specific requirements.
            </p>
          </div>

          <div className="space-y-4">
            {guide.howToSteps.map((step, idx) => (
              <div
                key={idx}
                id={`step-${idx + 1}`}
                className="bg-[#FAFAFA] p-5 rounded-xl border border-[#F4F4F5] space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#18181B] text-white flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-[#18181B]">
                    {step.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed pl-7">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Decision Criteria */}
      <section aria-labelledby="criteria-heading" className="space-y-6 pt-6 border-t border-[#E4E4E7]">
        <h2 id="criteria-heading" className="text-2xl font-bold text-[#18181B]">
          Key Testing Criteria & Benchmarks
        </h2>

        <div className="space-y-4">
          {guide.evaluationCriteria.map((crit, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-[#E4E4E7] space-y-1.5">
              <h3 className="font-bold text-sm sm:text-base text-[#18181B] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#18181B] text-white flex items-center justify-center text-xs font-mono-numbers">
                  {idx + 1}
                </span>
                <span>{crit.title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed pl-7">
                {crit.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The Final Verdict */}
      <section aria-labelledby="verdict-heading" className="bg-[#18181B] text-white p-6 sm:p-8 rounded-2xl space-y-3">
        <h2 id="verdict-heading" className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">
          The Editorial Verdict
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-[#E4E4E7]">
          {guide.verdict}
        </p>
      </section>

      {/* Guide FAQs (Matches FAQPage Schema) */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section aria-labelledby="faq-heading" className="space-y-4 pt-6 border-t border-[#E4E4E7]">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-1">
              Frequently Asked Questions
            </div>
            <h2 id="faq-heading" className="text-2xl font-bold text-[#18181B]">
              Common Buyer Questions & Expert Answers
            </h2>
            <p className="text-xs text-[#71717A] mt-1">
              Direct answers to questions people search before purchasing.
            </p>
          </div>

          <div className="divide-y divide-[#E4E4E7] bg-white p-6 rounded-2xl border border-[#E4E4E7]">
            {guide.faqs.map((f, i) => {
              const isOpen = openFaqIndex === i;

              return (
                <div key={i} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#18181B]"
                  >
                    <span>{f.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#71717A] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#18181B]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="mt-2.5 text-xs sm:text-sm text-[#52525B] leading-relaxed pr-8">
                      {f.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Back to guides */}
      <footer className="pt-6 border-t border-[#E4E4E7] flex justify-between items-center">
        <button
          onClick={() => navigate({ type: 'guides' })}
          className="text-xs font-bold text-[#18181B] hover:text-[#52525B] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Buying Guides</span>
        </button>

        <button
          onClick={() => navigate({ type: 'finder', initialCategory: guide.categorySlug })}
          className="text-xs font-bold text-[#18181B] underline hover:no-underline"
        >
          Try the {guide.categorySlug} Finder →
        </button>
      </footer>

    </article>
  );
};
