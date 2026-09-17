import React from 'react';
import { Home, Grid, Heart, ShoppingBag, PhoneCall } from 'lucide-react';

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  wishlistCount: number;
  cartCount: number;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onNavigate,
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
}) => {
  return (
    <nav
      id="mobile-bottom-navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FCFBF9]/95 backdrop-blur-md border-t border-[#EADEEA] px-2 py-1.5 shadow-[0_-4px_16px_rgba(74,14,78,0.06)]"
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-5 items-center justify-around text-center">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeSection === 'home' ? 'text-[#7B1865]' : 'text-[#6F647D] hover:text-[#7B1865]'
          }`}
        >
          <Home className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] font-medium mt-0.5">Home</span>
        </button>

        {/* Shop / Collections */}
        <button
          onClick={() => onNavigate('collections')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeSection === 'collections' || activeSection === 'new-arrivals'
              ? 'text-[#7B1865]'
              : 'text-[#6F647D] hover:text-[#7B1865]'
          }`}
        >
          <Grid className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] font-medium mt-0.5">Shop</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={onOpenWishlist}
          className="flex flex-col items-center justify-center py-1 text-[#6F647D] hover:text-[#7B1865] relative transition-colors"
        >
          <div className="relative">
            <Heart className="w-5 h-5 stroke-[1.8]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#7B1865] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-0.5">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center py-1 text-[#6F647D] hover:text-[#7B1865] relative transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#4A0E4E] text-[#D4AF37] border border-[#D4AF37]/50 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-0.5">Cart</span>
        </button>

        {/* Contact */}
        <button
          onClick={() => onNavigate('contact')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeSection === 'contact' ? 'text-[#7B1865]' : 'text-[#6F647D] hover:text-[#7B1865]'
          }`}
        >
          <PhoneCall className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] font-medium mt-0.5">Contact</span>
        </button>
      </div>
    </nav>
  );
};
