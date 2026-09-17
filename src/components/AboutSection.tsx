import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Sparkles, Scissors, Check, Heart, Shield } from 'lucide-react';

interface AboutSectionProps {
  aboutText?: string;
  customLogoUrl?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ aboutText, customLogoUrl }) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FCFBF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual & Logo Showcase */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAF5FA] to-[#F5EBF5] p-8 border border-[#EADBEB] shadow-lg text-center">
              {/* Actual Brand Logo with generous whitespace */}
              <div className="py-6 flex justify-center">
                <BrandLogo
                  size="hero"
                  variant="light"
                  showTagline={true}
                  customLogoUrl={customLogoUrl}
                />
              </div>

              <div className="pt-6 border-t border-[#E8D4E8] space-y-1.5 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#7B1865]">
                  गुल्मेली कलेक्सन &amp; डिजाइनिङ सेन्टर
                </p>
                <p className="text-xs text-[#756A85]">
                  Ranibagiya, Sainamaina-1, Rupandehi, Nepal
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Authentic Pillars */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5FA] text-[#7B1865] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>BOUTIQUE ETHOS</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#1E152A] font-bold">
                About Gulmeli
              </h2>
              <p className="font-serif-luxury text-lg text-[#7B1865] italic mt-1">
                Fashionable. Local. Dedicated to your personal style.
              </p>
            </div>

            <p className="text-base text-[#554D60] leading-relaxed">
              {aboutText ||
                'Gulmeli Collection & Designing Center is an authentic Nepali boutique and custom tailoring atelier located in Ranibagiya, Sainamaina-1, Rupandehi. We believe fashion should feel effortless, personal, and comfortable. Our boutique brings curated sarees, contemporary kurti sets, and customized tailoring together to celebrate South Asian grace.'}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FAF0FA] text-[#7B1865] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1E152A]">
                    Curated Fabrics &amp; Distinctive Silhouettes
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B6178]">
                    Carefully chosen silks, georgettes, cottons, and traditional Dhaka textiles selected for quality and wearability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FAF0FA] text-[#7B1865] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Scissors className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1E152A]">
                    Precision Designing &amp; Tailoring
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B6178]">
                    In-house custom tailoring services for blouses, kurtis, lehengas, and alterations tailored to your exact measurements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FAF0FA] text-[#7B1865] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1E152A]">
                    Rooted in Sainamaina, Rupandehi
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B6178]">
                    A warm local presence where every customer is treated with personal attention and welcoming care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
