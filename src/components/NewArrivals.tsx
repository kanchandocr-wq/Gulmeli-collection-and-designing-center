import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Flame } from 'lucide-react';

interface NewArrivalsProps {
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color?: string, size?: string) => void;
  whatsappNumber: string;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  whatsappNumber,
}) => {
  // Show 6-8 new arrivals as requested
  const newArrivalsList = products.filter((p) => p.isNewArrival).slice(0, 8);

  return (
    <section id="new-arrivals" className="py-14 sm:py-20 bg-gradient-to-b from-[#FCFBF9] via-[#FAF4FA]/60 to-[#FCFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EAF5] text-[#7B1865] text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>FRESH IN BOUTIQUE</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E152A] font-bold">
            New Arrivals
          </h2>
          <p className="text-sm sm:text-base text-[#6B6178] mt-2">
            Explore the latest festive drapes, tailored sets, and modern seasonal designs just arrived at our Sainamaina store.
          </p>
        </div>

        {/* 4-col desktop, 3-col tablet, 2-col mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {newArrivalsList.map((product) => (
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
