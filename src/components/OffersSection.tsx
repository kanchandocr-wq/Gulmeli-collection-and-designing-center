import React from 'react';
import { OfferCard } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface OffersSectionProps {
  offers: OfferCard[];
  onSelectOffer: (tag: string) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ offers, onSelectOffer }) => {
  const activeOffers = offers.filter((o) => o.active);

  return (
    <section id="offers" className="py-14 sm:py-20 bg-[#FAF5FA] border-y border-[#EDE0ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5CEE5] text-[#7B1865] text-xs font-semibold uppercase tracking-wider mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>SPECIAL COLLECTION</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E152A] font-bold">
            Discover something beautiful.
          </h2>
          <p className="text-sm sm:text-base text-[#6B6178] mt-2">
            Seasonal curation, designer studio specials, and genuine boutique highlights.
          </p>
        </div>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EFE2EF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F2F7]">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {offer.badgeText && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#4A0E4E] text-[#F9E4B7] text-[11px] font-bold tracking-wider uppercase border border-[#D4AF37]/40 shadow-sm">
                    {offer.badgeText}
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#F2DFB3]">
                    {offer.tag}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold leading-snug">
                    {offer.title}
                  </h3>
                </div>
              </div>

              {/* Description & Action */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs font-semibold text-[#7B1865] mb-1">
                    {offer.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#554D60] leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F5EDF5]">
                  <button
                    onClick={() => onSelectOffer(offer.tag)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF5FA] hover:bg-[#7B1865] text-[#4A0E4E] hover:text-white border border-[#E8D9E8] hover:border-[#7B1865] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <span>EXPLORE SHOWCASE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
