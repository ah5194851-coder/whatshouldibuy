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

export const PopularCategories: React.FC = () => {
  const { categories, products, navigate } = useApp();

  return (
    <section className="py-14 sm:py-20 border-b border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-1">
              Browse By Category
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
              Popular Product Categories
            </h2>
            <p className="text-sm text-[#52525B] mt-1">
              Explore in-depth buying guides, side-by-side spec sheets, and vetted recommendations.
            </p>
          </div>

          <button
            onClick={() => navigate({ type: 'categories' })}
            className="text-xs font-semibold text-[#18181B] hover:text-[#52525B] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All 13 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 13 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const count = products.filter(p => p.category === cat.slug).length;
            const icon = ICON_MAP[cat.iconName] || <Layers className="w-5 h-5" />;

            return (
              <button
                key={cat.id}
                onClick={() => navigate({ type: 'category', slug: cat.slug })}
                className="group p-4 bg-white rounded-xl border border-[#E4E4E7] hover:border-[#18181B] hover:shadow-sm transition-all text-left flex flex-col justify-between h-36"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-[#F4F4F5] text-[#18181B] group-hover:bg-[#18181B] group-hover:text-white transition-colors">
                    {icon}
                  </div>
                  <span className="text-[11px] font-medium text-[#71717A]">
                    {count} {count === 1 ? 'model' : 'models'}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-[#18181B] group-hover:text-black">
                    {cat.pluralName}
                  </h3>
                  <p className="text-[11px] text-[#71717A] truncate mt-0.5">
                    {cat.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
