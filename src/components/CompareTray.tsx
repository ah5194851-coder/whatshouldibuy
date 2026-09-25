import React from 'react';
import { useApp } from '../context/AppContext';
import { Scale, X, ArrowRight } from 'lucide-react';

export const CompareTray: React.FC = () => {
  const { compareList, products, removeFromCompare, clearCompare, navigate, view } = useApp();

  // If already on the compare page or nothing in compare, do not show
  if (compareList.length === 0 || view.type === 'compare') {
    return null;
  }

  const selectedProducts = compareList
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-xl bg-[#18181B] text-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
      
      {/* Product Thumbnails */}
      <div className="flex items-center gap-2 overflow-x-auto">
        <div className="flex items-center -space-x-2 shrink-0">
          {selectedProducts.map((p) => (
            <div
              key={p!.id}
              className="relative group w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-[#18181B] overflow-hidden bg-white shrink-0"
              title={p!.name}
            >
              <img
                src={p!.image}
                alt={p!.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCompare(p!.id);
                }}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"
                title="Remove"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-left shrink-0 pl-1">
          <div className="text-xs font-bold leading-tight">
            {selectedProducts.length} {selectedProducts.length === 1 ? 'Product' : 'Products'}
          </div>
          <span className="text-[10px] text-[#A1A1AA] hidden sm:inline">
            Max 4 items in comparison
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={clearCompare}
          className="text-[11px] text-[#A1A1AA] hover:text-white px-2 py-1 transition-colors"
        >
          Clear
        </button>

        <button
          onClick={() => navigate({ type: 'compare' })}
          className="bg-white hover:bg-[#F4F4F5] text-[#18181B] text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-sm"
        >
          <span>Compare Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
