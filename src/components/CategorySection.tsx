import React from 'react';
import { ProductCategory, CategoryInfo } from '../types';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';

interface CategorySectionProps {
  categories: CategoryInfo[];
  selectedCategory: ProductCategory | 'ALL';
  onSelectCategory: (category: ProductCategory | 'ALL') => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="categories-section" className="py-14 sm:py-20 bg-[#FCFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title & Scroll buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#7B1865] uppercase mb-1">
              <span className="w-6 h-[1.5px] bg-[#7B1865]" />
              <span>COLLECTIONS &amp; STYLES</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E152A] font-bold">
              Shop by Category
            </h2>
            <p className="text-sm sm:text-base text-[#6B6178] mt-1">
              Explore our curated garments, festive wear, and custom stitching categories.
            </p>
          </div>

          {/* Desktop/Tablet Carousel Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => onSelectCategory('ALL')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === 'ALL'
                  ? 'bg-[#7B1865] text-white'
                  : 'bg-[#F4EAF7] text-[#4A0E4E] hover:bg-[#EBD8EF]'
              }`}
            >
              All Categories
            </button>
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded-full border border-[#E2D2E4] bg-white flex items-center justify-center text-[#4A0E4E] hover:bg-[#F9EEF9] transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-8 h-8 rounded-full border border-[#E2D2E4] bg-white flex items-center justify-center text-[#4A0E4E] hover:bg-[#F9EEF9] transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Cards Carousel (Horizontal swipe on mobile & scrollable on desktop) */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 pt-1 gap-4 sm:gap-6 no-scrollbar snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`snap-start flex-shrink-0 w-60 sm:w-64 md:w-72 group cursor-pointer rounded-2xl overflow-hidden bg-white border transition-all duration-300 ${
                  isSelected
                    ? 'border-[#7B1865] ring-2 ring-[#7B1865]/30 shadow-lg'
                    : 'border-[#EDE0ED] hover:border-[#7B1865]/60 hover:shadow-xl'
                }`}
              >
                {/* Large Category Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F2F7]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Nepali Tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#4A0E4E] text-[11px] font-semibold tracking-wide shadow-sm">
                    {cat.nepaliName}
                  </span>

                  {/* Bottom details inside overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wide">
                      {cat.name}
                    </h3>
                    <p className="text-white/80 text-xs line-clamp-1 mb-2">
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F2DFB3] group-hover:text-white transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
