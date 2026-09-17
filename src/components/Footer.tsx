import React from 'react';
import { BrandLogo } from './BrandLogo';
import { StoreSettings } from '../types';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Heart,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface FooterProps {
  settings: StoreSettings;
  customLogoUrl?: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  customLogoUrl,
  onNavigateSection,
  onOpenAdmin,
}) => {
  const handleWhatsApp = () => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '') || '9779800000000';
    window.open(`https://wa.me/${cleanNumber}?text=Namaste%20Gulmeli%20Collection!`, '_blank');
  };

  return (
    <footer className="bg-[#1E051C] text-white pt-16 pb-24 md:pb-12 border-t-4 border-[#7B1865] relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7B1865]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Official Logo & Brand Intro (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 inline-block">
              <BrandLogo
                size="md"
                variant="onDark"
                showTagline={true}
                customLogoUrl={customLogoUrl}
              />
            </div>

            <p className="text-xs sm:text-sm text-[#DFCEE1] leading-relaxed max-w-md">
              A premium fashion boutique and custom designing studio celebrating personal style, modern South Asian elegance, and authentic tailoring in Rupandehi, Nepal.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </button>

              <a
                href={settings.googleMapsUrl || '#contact'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F2DFB3]" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury text-lg font-bold text-[#F2DFB3] tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#D8C7DA]">
              <li>
                <button
                  onClick={() => onNavigateSection('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('categories')}
                  className="hover:text-white transition-colors"
                >
                  Curated Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('featured-collection')}
                  className="hover:text-white transition-colors"
                >
                  Featured Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('new-arrivals')}
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('custom-designing')}
                  className="hover:text-white transition-colors text-[#F2DFB3] font-semibold"
                >
                  Custom Designing Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('lookbook')}
                  className="hover:text-white transition-colors"
                >
                  Style Lookbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-white transition-colors"
                >
                  About Gulmeli
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Location Details & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif-luxury text-lg font-bold text-[#F2DFB3] tracking-wide">
              Store &amp; Location Details
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-[#D8C7DA]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F2DFB3] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Ranibagiya, Sainamaina-1</p>
                  <p className="text-[#C4B2C8]">Rupandehi, Lumbini Province, Nepal</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F2DFB3] flex-shrink-0" />
                <p>Phone: {settings.phone}</p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#F2DFB3] flex-shrink-0" />
                <p>{settings.openingHours}</p>
              </div>

              <div className="pt-2 text-[11px] text-[#A695AA]">
                <p>Delivery: Sainamaina, Butwal, Bhairahawa &amp; Nepal-wide courier.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A695AA]">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Gulmeli Collection &amp; Designing Center (गुल्मेली कलेक्सन &amp; डिजाइनिङ सेन्टर). All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-xs text-[#D4AF37] hover:text-[#F2DFB3] underline flex items-center gap-1 font-semibold"
            >
              <span>Admin Boutique Portal</span>
            </button>
            <span>•</span>
            <span className="text-[11px]">Ranibagiya, Sainamaina-1, Nepal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
