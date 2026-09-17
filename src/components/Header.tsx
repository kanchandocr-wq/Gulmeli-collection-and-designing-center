import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, MessageCircle, Menu, X, Phone, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  wishlistCount: number;
  cartCount: number;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  whatsappNumber: string;
  onToggleAdmin: () => void;
  isAdminActive: boolean;
  customLogoUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  wishlistCount,
  cartCount,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  onNavigate,
  activeSection,
  whatsappNumber,
  onToggleAdmin,
  isAdminActive,
  customLogoUrl,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', nepali: 'गृहपृष्ठ' },
    { id: 'collections', label: 'Collections', nepali: 'कलेक्सन' },
    { id: 'new-arrivals', label: 'New Arrivals', nepali: 'नयाँ' },
    { id: 'designing', label: 'Designing', nepali: 'कस्टम सिलाई' },
    { id: 'offers', label: 'Offers', nepali: 'अफर' },
    { id: 'gallery', label: 'Gallery', nepali: 'ग्यालरी' },
    { id: 'about', label: 'About Us', nepali: 'हाम्रो बारेमा' },
    { id: 'contact', label: 'Contact', nepali: 'सम्पर्क' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleWhatsAppGeneralChat = () => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '') || '9779800000000';
    const message = encodeURIComponent(
      'Namaste Gulmeli Collection & Designing Center! I am visiting your boutique website and would like to inquire about your collections and custom tailoring.'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Top micro-announcement banner */}
      <div className="bg-[#4A0E4E] text-[#F3DFEA] text-[11px] sm:text-xs py-1.5 px-4 font-medium transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-semibold text-white">गुल्मेली कलेक्सन & डिजाइनिङ सेन्टर</span>
            <span className="hidden sm:inline text-purple-200 opacity-80">|</span>
            <span className="hidden sm:inline text-white/90">
              Ranibagiya, Sainamaina-1, Rupandehi, Lumbini Province
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={onToggleAdmin}
              className="flex items-center gap-1 text-[#F2DFB3] hover:text-white transition-colors bg-white/10 px-2 py-0.5 rounded border border-white/15"
              title="Admin Portal Toggle"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden md:inline font-sans">{isAdminActive ? 'Exit Admin' : 'Admin Panel'}</span>
            </button>
            <button
              onClick={handleWhatsAppGeneralChat}
              className="hidden lg:flex items-center gap-1.5 text-white hover:text-[#D4AF37] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-[#FCFBF9]/95 backdrop-blur-md shadow-sm border-b border-[#EADEEA] py-2.5'
            : 'bg-[#FCFBF9] border-b border-[#F0E6F0] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            {/* LEFT: Authentic Brand Logo */}
            <button
              id="header-brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B1865] rounded-md transition-opacity hover:opacity-95"
            >
              <BrandLogo
                size={isScrolled ? 'sm' : 'md'}
                variant="light"
                showTagline={!isScrolled}
                customLogoUrl={customLogoUrl}
              />
            </button>

            {/* CENTER / NAVIGATION (Desktop) */}
            <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-1 ${
                      isActive
                        ? 'text-[#7B1865] font-semibold bg-[#F6EEF6]'
                        : 'text-[#4A4356] hover:text-[#7B1865] hover:bg-[#FAF4FA]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7B1865]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* RIGHT: Search, Wishlist, Cart, WhatsApp */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Search button */}
              <button
                id="header-search-btn"
                onClick={onOpenSearch}
                className="p-2 sm:p-2.5 text-[#4A4356] hover:text-[#7B1865] hover:bg-[#F6EEF6] rounded-full transition-colors relative"
                aria-label="Search collection"
                title="Search (Products, Categories, Colors)"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
              </button>

              {/* Wishlist */}
              <button
                id="header-wishlist-btn"
                onClick={onOpenWishlist}
                className="p-2 sm:p-2.5 text-[#4A4356] hover:text-[#7B1865] hover:bg-[#F6EEF6] rounded-full transition-colors relative"
                aria-label="View wishlist"
                title="Your Wishlist"
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8] ${wishlistCount > 0 ? 'text-[#7B1865] fill-[#7B1865]/20' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#7B1865] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart button */}
              <button
                id="header-cart-btn"
                onClick={onOpenCart}
                className="p-2 sm:p-2.5 text-[#4A4356] hover:text-[#7B1865] hover:bg-[#F6EEF6] rounded-full transition-colors relative"
                aria-label="View shopping bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#4A0E4E] text-[#D4AF37] border border-[#D4AF37]/50 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* WhatsApp direct consultation button */}
              <button
                id="header-whatsapp-cta"
                onClick={handleWhatsAppGeneralChat}
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#4A0E4E] hover:bg-[#601265] text-[#FAF5FA] px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm border border-[#D4AF37]/40"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span className="hidden md:inline">Chat</span>
              </button>

              {/* Mobile hamburger menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-[#4A4356] hover:text-[#7B1865] hover:bg-[#F6EEF6] rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FCFBF9] border-b border-[#EADEEA] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pt-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#7B1865] text-white shadow-sm'
                        : 'bg-[#F9F5F9] text-[#4A4356] hover:bg-[#F0E4F0]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`text-xs ${isActive ? 'text-white/80' : 'text-[#7B1865]'}`}>
                      {item.nepali}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#EADEEA] flex flex-col gap-2">
              <button
                onClick={handleWhatsAppGeneralChat}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl text-xs font-semibold shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Boutique Consultation</span>
              </button>
              <div className="text-center text-[11px] text-[#756A85] flex items-center justify-center gap-1 pt-1">
                <span>📍 Ranibagiya, Sainamaina-1, Rupandehi</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
