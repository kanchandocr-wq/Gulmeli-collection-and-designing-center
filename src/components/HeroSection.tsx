import React from 'react';
import { ArrowRight, Sparkles, MapPin, Scissors, Shield } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onCustomDesignClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onCustomDesignClick,
}) => {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#FAF5FA] via-[#FCFBF9] to-[#FCFBF9] pt-6 pb-16 lg:pt-12 lg:pb-24"
    >
      {/* Subtle Oversized Abstract 'G' graphic in the background inspired by the logo */}
      <div
        className="absolute -right-24 -top-24 w-[480px] h-[480px] md:w-[650px] md:h-[650px] pointer-events-none select-none opacity-[0.045] -z-0"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#7B1865]">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="8" strokeDasharray="90 3 4 3" />
          <path
            d="M66 34C61.5 28.5 53.5 26 44.5 28C33.5 30.5 25 40 25 51.5C25 64 35.5 74 48.5 74C60 74 69.5 66 71 54.5H50V46.5H78.5C78.8 49 79 51.5 79 54C79 70.5 66 82 48.5 82C30.5 82 17 68 17 50.5C17 33.5 30 19.5 46.5 19.5C56 19.5 64.5 23.5 70 30L66 34Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Decorative subtle champagne light burst */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#F3E5F5]/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT COLUMN: Editorial Brand Introduction */}
          <div className="lg:col-span-6 space-y-5 text-left">
            {/* Small brand label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EAF5] border border-[#E8D0E8] text-[#7B1865] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>GULMELI COLLECTION &amp; DESIGNING CENTER</span>
            </div>

            {/* Large headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#1E152A] font-bold leading-[1.12] tracking-tight">
              Style That Feels <br className="hidden sm:inline" />
              <span className="italic text-[#7B1865] font-normal">Like You.</span>
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-[#554D60] max-w-xl font-normal leading-relaxed">
              Discover elegant collections, contemporary fashion and personalized designing at Gulmeli.
              From handloom sarees and festive kurti sets to tailored bespoke fitting in Rupandehi.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 bg-[#7B1865] hover:bg-[#631252] text-white px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all shadow-[0_8px_20px_rgba(123,24,101,0.25)] hover:shadow-[0_10px_25px_rgba(123,24,101,0.35)] active:scale-[0.98]"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-custom-designing-btn"
                onClick={onCustomDesignClick}
                className="inline-flex items-center justify-center gap-2 bg-[#FCFBF9] hover:bg-[#FAF4FA] text-[#4A0E4E] border border-[#7B1865]/40 hover:border-[#7B1865] px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all active:scale-[0.98]"
              >
                <Scissors className="w-4 h-4 text-[#7B1865]" />
                <span>CUSTOM DESIGNING</span>
              </button>
            </div>

            {/* Secondary location indicator */}
            <div className="pt-3 flex items-center gap-2 text-xs sm:text-sm text-[#756A85] font-medium border-t border-[#EFE5EE] max-w-md">
              <MapPin className="w-4 h-4 text-[#7B1865] flex-shrink-0" />
              <span>Ranibagiya, Sainamaina-1, Rupandehi, Nepal</span>
              <span className="text-[#D4AF37]">•</span>
              <span className="text-[#4A0E4E] font-semibold">Store &amp; Studio</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Fashion Editorial Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Primary Image with Luxury Rounded Frame */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85"
                  alt="Gulmeli Collection Festive Nepali Boutique Attire"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Floating Studio Quality Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#F0E2F0] shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F5EAF5] flex items-center justify-center text-[#7B1865]">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#4A0E4E]">Bespoke Designing Studio</p>
                      <p className="text-[11px] text-[#756A85]">Custom Measurements &amp; Fit</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 bg-[#4A0E4E] text-[#F3DFEA] rounded-full">
                    Sainamaina
                  </span>
                </div>
              </div>

              {/* Overlapping Secondary Image with Subtle Purple Frame */}
              <div className="hidden sm:block absolute -bottom-6 -left-8 z-20 w-44 md:w-52 rounded-xl overflow-hidden shadow-xl border-2 border-white bg-white aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80"
                  alt="Gulmeli Collection Kurti &amp; Suit Set"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-white text-[11px] font-medium tracking-wide">
                    New Kurti Sets
                  </span>
                </div>
              </div>

              {/* Floating Decorative Purple/Gold Accent Seal */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 z-20 bg-[#4A0E4E] text-[#F9E4B7] border border-[#D4AF37]/50 rounded-2xl p-3 shadow-xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#7B1865] flex items-center justify-center text-white">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] tracking-wider uppercase font-semibold text-white/80">Authentic</p>
                  <p className="text-xs font-bold text-[#F9E4B7]">गुल्मेली कलेक्सन</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
