import React, { useState } from 'react';
import { LookbookItem } from '../types';
import { Sparkles, ArrowRight, Eye, X, Tag } from 'lucide-react';

interface LookbookProps {
  lookbookItems: LookbookItem[];
}

type LookbookCategory = 'All' | 'Everyday Style' | 'Festive' | 'Party Wear' | 'Traditional' | 'New Arrivals' | 'Custom Designs';

export const Lookbook: React.FC<LookbookProps> = ({ lookbookItems }) => {
  const [selectedCategory, setSelectedCategory] = useState<LookbookCategory>('All');
  const [activeLook, setActiveLook] = useState<LookbookItem | null>(null);

  const categories: LookbookCategory[] = [
    'All',
    'Everyday Style',
    'Festive',
    'Party Wear',
    'Traditional',
    'New Arrivals',
    'Custom Designs',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? lookbookItems
      : lookbookItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="lookbook" className="py-16 sm:py-24 bg-[#FCFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EAF5] text-[#7B1865] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>INSTAGRAM EDITORIAL LOOKBOOK</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E152A] font-bold">
            Style Inspiration
          </h2>
          <p className="text-sm sm:text-base text-[#6B6178] mt-2">
            Real boutique aesthetics, customer silhouettes, and bespoke tailoring inspiration from Gulmeli.
          </p>
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#7B1865] text-white shadow-sm'
                  : 'bg-white text-[#554D60] border border-[#E8D9E8] hover:border-[#7B1865] hover:text-[#7B1865]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-Style Fashion Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLook(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#F7F2F7] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#EFE5EE]"
            >
              {/* Image */}
              <div className={`overflow-hidden relative ${index % 3 === 1 ? 'aspect-[4/5]' : 'aspect-square sm:aspect-[3/4]'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Pill */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#4A0E4E] text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow">
                  {item.category}
                </span>

                {/* Hover Action Info */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-xs line-clamp-2 mt-1 mb-3">
                    {item.description}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F2DFB3] tracking-wider uppercase">
                    <span>VIEW LOOK</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Look Detail Modal */}
      {activeLook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-[#EADEEA] shadow-2xl relative">
            <button
              onClick={() => setActiveLook(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="aspect-[3/4] bg-[#F7F2F7]">
                <img
                  src={activeLook.image}
                  alt={activeLook.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#FAF0FA] text-[#7B1865] text-xs font-bold uppercase tracking-wider mb-2">
                    {activeLook.category}
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#1E152A]">
                    {activeLook.title}
                  </h3>
                  <p className="text-sm text-[#554D60] mt-3 leading-relaxed">
                    {activeLook.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#F0E4F0]">
                    <p className="text-xs font-bold text-[#4A0E4E] uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[#7B1865]" />
                      <span>Style Elements</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeLook.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] bg-[#FAF5FA] text-[#7B1865] px-2.5 py-1 rounded-lg border border-[#EFE2EF]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F0E4F0] text-center">
                  <p className="text-xs text-[#756A85] mb-2">
                    Want this custom tailored for your event?
                  </p>
                  <a
                    href="#custom-designing"
                    onClick={() => setActiveLook(null)}
                    className="inline-block w-full py-2.5 bg-[#7B1865] hover:bg-[#601252] text-white text-xs font-bold rounded-xl tracking-wide uppercase transition-colors"
                  >
                    Inquire Custom Fit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
