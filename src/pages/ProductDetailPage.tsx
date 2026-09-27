import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  ExternalLink,
  Check,
  Star,
  ShieldCheck,
  ArrowLeft,
  Share2,
  AlertCircle
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { getProductBySlug, formatPrice, addToCompare, isInCompare, navigate } = useApp();

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-xl font-bold text-[#18181B]">Product Not Found</h2>
        <p className="text-sm text-[#52525B] mt-2">
          The requested product could not be found in our database.
        </p>
        <button
          onClick={() => navigate({ type: 'categories' })}
          className="mt-4 px-4 py-2 bg-[#18181B] text-white text-xs font-semibold rounded-lg"
        >
          Browse All Products
        </button>
      </div>
    );
  }

  const inCompare = isInCompare(product.id);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-[#71717A]">
        <button
          onClick={() => navigate({ type: 'home' })}
          className="hover:text-[#18181B]"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigate({ type: 'category', slug: product.category })}
          className="hover:text-[#18181B] capitalize"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-[#18181B] font-medium truncate">{product.name}</span>
      </div>

      {/* Main PDP Grid: Left Sticky Gallery, Right Sticky Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Gallery & Overview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl overflow-hidden border border-[#E4E4E7] bg-[#F9F9F8] h-80 sm:h-96 flex items-center justify-center relative">
            <img
              src={product.image}
              alt={`${product.name} - ${product.brand} ${product.subcategory} verified laboratory test unit`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.isFeatured && (
              <div className="absolute top-4 left-4 bg-[#18181B] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                Top Rated Model
              </div>
            )}
          </div>

          {/* Pros & Cons Section */}
          <div className="bg-white rounded-2xl border border-[#E4E4E7] p-6 space-y-5">
            <h2 className="text-base font-bold text-[#18181B] uppercase tracking-wider">
              Independent Editorial Assessment
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="space-y-2">
                <span className="font-bold text-[#16A34A] block">What We Like:</span>
                <ul className="space-y-1.5 text-[#3F3F46]">
                  {product.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-[#DC2626] block">Trade-Offs to Note:</span>
                <ul className="space-y-1.5 text-[#52525B]">
                  {product.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#DC2626] font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F4F4F5] text-xs text-[#52525B]">
              <strong className="text-[#18181B]">Best Suited For: </strong>
              <span>{product.bestFor}</span>
            </div>
          </div>

          {/* Full Specifications Sheet */}
          <div className="bg-white rounded-2xl border border-[#E4E4E7] p-6 space-y-4">
            <h2 className="text-base font-bold text-[#18181B] uppercase tracking-wider">
              Technical Specifications
            </h2>

            <div className="divide-y divide-[#F4F4F5] text-xs">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="py-2.5 flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-[#71717A] font-medium sm:w-1/3">{key}</span>
                  <span className="font-semibold text-[#18181B] sm:w-2/3">{val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sticky Purchase Module */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
          <div className="bg-white rounded-2xl border-2 border-[#18181B] p-6 space-y-5 shadow-sm">
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-[#71717A]">
                <span className="font-bold uppercase tracking-wider text-[#18181B]">{product.brand}</span>
                <span>{product.subcategory}</span>
              </div>
              <h1 className="text-2xl font-bold text-[#18181B] leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-[#52525B] pt-1">
                <Star className="w-4 h-4 fill-[#18181B] text-[#18181B]" />
                <span className="font-bold text-[#18181B]">{product.rating}</span>
                <span className="text-[#71717A]">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#F4F4F5] space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A] block">
                Current Best Available Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono-numbers text-[#18181B]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#71717A] line-through font-mono-numbers">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Retailer Comparison */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] block">
                Prices Across Stores
              </span>

              <div className="space-y-2">
                {product.retailers.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-[#E4E4E7] hover:border-[#18181B] transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#18181B]">{r.name}</div>
                      <div className="text-[10px] text-[#16A34A] font-semibold">
                        {r.inStock ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono-numbers text-xs font-bold text-[#18181B]">
                        {formatPrice(r.price)}
                      </span>
                      <a
                        href={r.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#18181B] text-white hover:bg-[#27272A] text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1 transition-colors"
                      >
                        <span>Check Price</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#18181B] hover:bg-[#27272A] text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span>View Deal ({product.retailers[0]?.name || 'Direct'})</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  addToCompare(product.id);
                  navigate({ type: 'compare' });
                }}
                className={`w-full text-xs font-semibold py-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-colors ${
                  inCompare
                    ? 'bg-[#18181B] text-white border-[#18181B]'
                    : 'bg-white text-[#27272A] border-[#E4E4E7] hover:border-[#18181B]'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{inCompare ? 'Open in Comparison Table' : 'Compare with Other Models'}</span>
              </button>
            </div>

            {/* Warranty & Guarantee */}
            <div className="pt-3 border-t border-[#F4F4F5] flex items-center gap-2 text-xs text-[#52525B]">
              <ShieldCheck className="w-4 h-4 text-[#18181B] shrink-0" />
              <span>{product.warranty}</span>
            </div>

          </div>

          {/* Affiliate Disclosure Notice */}
          <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E4E4E7] text-[11px] text-[#71717A] leading-relaxed">
            <span className="font-semibold text-[#18181B]">Affiliate Disclosure: </span>
            We may earn a commission when you purchase through links on our website at no additional cost to you. Our editorial evaluations are independently verified.
          </div>

        </div>

      </div>

    </div>
  );
};
