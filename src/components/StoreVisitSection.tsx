import React from 'react';
import { StoreSettings } from '../types';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Compass,
  Navigation,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface StoreVisitSectionProps {
  settings: StoreSettings;
}

export const StoreVisitSection: React.FC<StoreVisitSectionProps> = ({ settings }) => {
  const handleCall = () => {
    const cleanNumber = settings.phone.replace(/[^0-9]/g, '');
    if (cleanNumber && !cleanNumber.includes('X')) {
      window.location.href = `tel:${cleanNumber}`;
    } else {
      alert(`Boutique Contact: ${settings.phone}. You can also connect directly on WhatsApp!`);
    }
  };

  const handleWhatsApp = () => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '') || '9779800000000';
    const message = encodeURIComponent(
      `Namaste Gulmeli Collection & Designing Center! I would like to visit your boutique at Ranibagiya, Sainamaina-1, Rupandehi. Please let me know your opening times today.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  const handleDirections = () => {
    window.open(settings.googleMapsUrl || 'https://maps.google.com/?q=Ranibagiya+Sainamaina+Rupandehi', '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-b border-[#EDE0ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5FA] border border-[#E5CEE5] text-[#7B1865] text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#7B1865]" />
            <span>BOUTIQUE &amp; TAILORING STUDIO</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E152A] font-bold">
            Visit Our Store
          </h2>
          <p className="text-sm sm:text-base text-[#6B6178] mt-2">
            Step in to experience rich fabric textures, explore festive collections, or discuss custom measurements in person.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Information Card & Google Maps Embed / Interactive Pin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Store Details & Mobile-Friendly Action Buttons */}
          <div className="lg:col-span-5 bg-[#FAF5FA] rounded-3xl p-6 sm:p-8 border border-[#EFE2EF] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#7B1865]">
                  SAINAMAINA • RUPANDEHI
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E152A] mt-1">
                  {settings.businessName}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#7B1865]">
                  {settings.nepaliName}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-white text-[#7B1865] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#EFE2EF]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#4A0E4E]">
                    Store Address
                  </p>
                  <p className="text-sm text-[#1E152A] font-medium leading-snug">
                    {settings.address}
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-[#7B1865] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#EFE2EF]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#4A0E4E]">
                    Opening Hours
                  </p>
                  <p className="text-sm text-[#554D60] font-normal leading-snug">
                    {settings.openingHours}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-[#7B1865] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#EFE2EF]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#4A0E4E]">
                    Direct Inquiries
                  </p>
                  <p className="text-sm text-[#1E152A] font-medium">
                    Phone: {settings.phone}
                  </p>
                  <p className="text-xs text-[#756A85]">
                    WhatsApp: {settings.whatsappNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Prominent Mobile-First Action Buttons: Get Directions, Call, WhatsApp */}
            <div className="pt-4 border-t border-[#EFE2EF] space-y-2.5">
              <button
                onClick={handleDirections}
                className="w-full py-3.5 px-4 bg-[#7B1865] hover:bg-[#601252] text-white rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(123,24,101,0.25)] transition-all active:scale-[0.98]"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions (Google Maps)</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleCall}
                  className="py-3 px-3 bg-white hover:bg-[#FAF0FA] text-[#4A0E4E] border border-[#E5CEE5] rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7B1865]" />
                  <span>Call Store</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="py-3 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed & Location Visualization */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-[#EFE2EF] shadow-sm relative min-h-[380px] flex flex-col">
            <div className="relative w-full flex-1 min-h-[340px] bg-[#EFE9F2]">
              {/* Google Maps Embed iframe styled for Sainamaina Ranibagiya */}
              <iframe
                title="Gulmeli Collection & Designing Center Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14131.85966779435!2d83.3300!3d27.6950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399684347712345%3A0x123456789abcdef!2sSainamaina%2C%20Rupandehi!5e0!3m2!1sen!2snp!4v1690000000000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '340px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Pin Card Over Map */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#EDE0ED] shadow-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#7B1865] text-[#D4AF37] flex items-center justify-center font-bold">
                    G
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1E152A]">Gulmeli Collection</p>
                    <p className="text-[11px] text-[#756A85]">Ranibagiya, Sainamaina-1</p>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[#F0E4F0] flex justify-between items-center text-[11px]">
                  <span className="text-[#1E7E34] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    Open Today
                  </span>
                  <button
                    onClick={handleDirections}
                    className="text-[#7B1865] font-bold hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
