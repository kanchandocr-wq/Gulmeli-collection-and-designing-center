import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PurpleBrandMomentProps {
  onExploreClick: () => void;
  customLogoUrl?: string;
}

export const PurpleBrandMoment: React.FC<PurpleBrandMomentProps> = ({
  onExploreClick,
  customLogoUrl,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#2D0727] via-[#4A0E4E] to-[#260522] text-white py-20 sm:py-28">
      {/* Large Translucent Abstract G Shape inspired by the uploaded logo */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.08]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] text-white"
          fill="none"
        >
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="6" strokeDasharray="90 3 4 3" />
          <path
            d="M66 34C61.5 28.5 53.5 26 44.5 28C33.5 30.5 25 40 25 51.5C25 64 35.5 74 48.5 74C60 74 69.5 66 71 54.5H50V46.5H78.5C78.8 49 79 51.5 79 54C79 70.5 66 82 48.5 82C30.5 82 17 68 17 50.5C17 33.5 30 19.5 46.5 19.5C56 19.5 64.5 23.5 70 30L66 34Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Subtle Warm Gold and Champagne ambient highlights */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#9B1D7C]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
        {/* Actual Logo Clearly but Subtly Displayed */}
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
            <BrandLogo
              size="md"
              variant="onDark"
              showTagline={false}
              customLogoUrl={customLogoUrl}
            />
          </div>
        </div>

        {/* Center Iconic 'G' monogram medallion */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#9B1D7C] to-[#D4AF37] p-[1.5px] shadow-[0_0_25px_rgba(212,175,55,0.3)]">
          <div className="w-full h-full rounded-full bg-[#3B0A33] flex items-center justify-center">
            <span className="font-serif-luxury text-2xl font-bold text-[#F9E4B7]">
              G
            </span>
          </div>
        </div>

        {/* Small text */}
        <div>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#F2DFB3]">
            Gulmeli Collection &amp; Designing Center
          </p>
          <p className="text-[11px] text-[#E0C0DC] mt-0.5">
            Ranibagiya, Sainamaina-1, Rupandehi, Nepal
          </p>
        </div>

        {/* Headline */}
        <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Express Your <span className="italic font-normal text-[#F2DFB3]">Style.</span>
        </h2>

        <p className="text-sm sm:text-base text-[#E5CEE5] max-w-lg mx-auto font-normal leading-relaxed">
          Celebrating your individuality through modern flair and authentic Nepali elegance.
          Each drape, stitch, and finish is personalized for your beauty.
        </p>

        {/* CTA */}
        <div className="pt-4">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center justify-center gap-2.5 bg-[#FAF5FA] hover:bg-white text-[#4A0E4E] hover:text-[#7B1865] px-8 py-4 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-98"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowRight className="w-4 h-4 text-[#7B1865]" />
          </button>
        </div>
      </div>
    </section>
  );
};
