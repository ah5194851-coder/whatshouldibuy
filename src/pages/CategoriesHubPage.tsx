import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Laptop,
  Smartphone,
  Headphones,
  Tv,
  Camera,
  Gamepad2,
  Watch,
  Home,
  UtensilsCrossed,
  Activity,
  Briefcase,
  Mic,
  Layers,
  ArrowRight
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Laptop: <Laptop className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />,
  Headphones: <Headphones className="w-5 h-5" />,
  Tv: <Tv className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
  Gamepad2: <Gamepad2 className="w-5 h-5" />,
  Watch: <Watch className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Mic: <Mic className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
};

export const CategoriesHubPage: React.FC = () => {
  const { categories, products, navigate } = useApp();

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="border-b border-[#E4E4E7] pb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-1">
          Catalog Taxonomy
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18181B]">
          Consumer Research Categories
        </h1>
        <p className="text-sm text-[#52525B] mt-1 max-w-2xl">
          Browse comprehensive product directories, test protocols, side-by-side matrices, and price monitors across 13 major consumer sectors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const catProducts = products.filter((p) => p.category === cat.slug);
          const icon = ICON_MAP[cat.iconName] || <Layers className="w-5 h-5" />;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-[#E4E4E7] hover:border-[#18181B] hover:shadow-sm transition-all p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#F4F4F5] text-[#18181B]">
                    {icon}
                  </div>
                  <span className="text-xs font-semibold text-[#71717A]">
                    {catProducts.length} {catProducts.length === 1 ? 'model' : 'models'}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#18181B]">
                    {cat.pluralName}
                  </h2>
                  <p className="text-xs font-medium text-[#71717A] mt-0.5">
                    {cat.tagline}
                  </p>
                  <p className="text-xs text-[#52525B] mt-2 line-clamp-3 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.subcategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      className="text-[11px] text-[#52525B] bg-[#F4F4F5] px-2 py-0.5 rounded"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-[#F4F4F5] mt-5 flex items-center justify-between">
                <button
                  onClick={() => navigate({ type: 'category', slug: cat.slug })}
                  className="text-xs font-bold text-[#18181B] hover:text-[#52525B] flex items-center gap-1"
                >
                  <span>Explore {cat.pluralName} Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => navigate({ type: 'finder', initialCategory: cat.slug })}
                  className="text-[11px] text-[#71717A] hover:text-[#18181B] underline"
                >
                  Finder →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
