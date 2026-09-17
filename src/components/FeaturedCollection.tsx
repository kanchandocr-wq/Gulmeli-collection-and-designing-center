import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedCollectionProps {
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color?: string, size?: string) => void;
  whatsappNumber: string;
  onViewAllClick: () => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  whatsappNumber,
  onViewAllClick,
}) => {
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <section id="featured-collection" className="py-14 sm:py-20 bg-[#FCFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#7B1865] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>BOUTIQUE HIGHLIGHTS</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E152A] font-bold">
              Featured Collection
            </h2>
            <p className="text-sm sm:text-base text-[#6B6178] mt-1">
              Curated styles for every occasion.
            </p>
          </div>

          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#7B1865] hover:text-[#4A0E4E] transition-colors group self-start sm:self-auto"
          >
            <span>View All Pieces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid: 4 columns desktop, 3 tablet, 2 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
