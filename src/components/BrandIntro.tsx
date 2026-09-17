import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Sparkles, HeartHandshake, CheckCircle2, Scissors } from 'lucide-react';

interface BrandIntroProps {
  customLogoUrl?: string;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ customLogoUrl }) => {
  return (
    <section className="py-14 sm:py-20 bg-white border-y border-[#F0E6F0] relative overflow-hidden">
      {/* Soft background tint */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Logo Showcase with Generous Whitespace on one side */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-center">
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#FCFBF9] to-[#F7EEF7] border border-[#EADBEC] shadow-[0_4px_24px_rgba(123,24,101,0.06)] relative text-center w-full max-w-md">
              <div className="inline-block mb-4 p-2 bg-white rounded-full shadow-sm border border-[#EADBEC]">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>

              <div className="flex justify-center mb-5">
                <BrandLogo
                  size="lg"
                  variant="light"
                  showTagline={false}
                  customLogoUrl={customLogoUrl}
                />
              </div>

              <div className="pt-4 border-t border-[#E8D9E8] space-y-1">
                <p className="font-semibold text-xs text-[#7B1865] uppercase tracking-widest">
                  गुल्मेली कलेक्सन &amp; डिजाइनिङ सेन्टर
                </p>
                <p className="text-xs text-[#756A85]">
                  Ranibagiya, Sainamaina-1, Rupandehi, Nepal
                </p>
              </div>
            </div>
          </div>

          {/* Text & Ethos */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B1865] tracking-widest uppercase">
              <span className="w-6 h-[1.5px] bg-[#7B1865]" />
              <span>THE BOUTIQUE EXPERIENCE</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E152A] font-bold leading-tight">
              Where Fashion Meets <br />
              <span className="text-[#7B1865] italic font-normal">Personal Style</span>
            </h2>

            <p className="text-base sm:text-lg text-[#554D60] leading-relaxed">
              Gulmeli Collection &amp; Designing Center is your neighborhood boutique and bespoke design studio
              located at Ranibagiya, Sainamaina-1, Rupandehi. We take pride in bringing contemporary fashion,
              traditional grace, and custom tailoring together under one welcoming roof.
            </p>

            <p className="text-sm sm:text-base text-[#554D60] leading-relaxed">
              Whether you are selecting a vibrant silk saree for a wedding, looking for comfortable daily kurti sets,
              or desire personalized garments custom-stitched to your exact silhouette, our studio is dedicated
              to helping you dress with effortless elegance and confidence.
            </p>

            {/* Core Values / Authentic Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-[#FAF5FA] border border-[#EFE5EE]">
                <div className="flex items-center gap-2 mb-1 text-[#7B1865]">
                  <Scissors className="w-4 h-4" />
                  <span className="font-bold text-xs uppercase tracking-wide">Custom Fit</span>
                </div>
                <p className="text-xs text-[#6B6178]">
                  Personalized tailoring and design customization for every body type.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF5FA] border border-[#EFE5EE]">
                <div className="flex items-center gap-2 mb-1 text-[#7B1865]">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-bold text-xs uppercase tracking-wide">Curated Styles</span>
                </div>
                <p className="text-xs text-[#6B6178]">
                  Fresh collections of sarees, kurtis, gowns, and festival essentials.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF5FA] border border-[#EFE5EE]">
                <div className="flex items-center gap-2 mb-1 text-[#7B1865]">
                  <HeartHandshake className="w-4 h-4" />
                  <span className="font-bold text-xs uppercase tracking-wide">Local Care</span>
                </div>
                <p className="text-xs text-[#6B6178]">
                  Warm, attentive service right here at Ranibagiya, Sainamaina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
