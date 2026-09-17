import React, { useState } from 'react';
import { Product } from '../types';
import {
  X,
  Heart,
  ShoppingBag,
  Zap,
  MessageCircle,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  Scissors,
} from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onBuyNow: (product: Product, color: string, size: string) => void;
  whatsappNumber: string;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  whatsappNumber,
}) => {
  if (!product) return null;

  const allImages = [product.image, ...(product.secondaryImages || [])];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : 'Standard'
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Free Size'
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNowClick = () => {
    onBuyNow(product, selectedColor, selectedSize);
  };

  const handleWhatsAppEnquiry = () => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '') || '9779800000000';
    const message = encodeURIComponent(
      `Namaste Gulmeli Collection, I am interested in ${product.name} (Price: रु. ${product.price.toLocaleString('en-IN')}, Size: ${selectedSize}, Color: ${selectedColor}). Please provide details about availability and custom fitting.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full border border-[#EFE2EF] shadow-2xl relative my-auto max-h-[92vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#4A0E4E] flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT: Image Gallery */}
        <div className="md:w-1/2 p-4 sm:p-6 bg-[#FAF5FA] flex flex-col justify-between">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-[#EDE0ED] shadow-inner mb-3">
            <img
              src={allImages[activeImageIndex] || product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#4A0E4E] text-white text-xs font-bold uppercase tracking-wider">
                {product.badge}
              </span>
            )}
            <button
              onClick={() => onToggleWishlist(product)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#7B1865] shadow-sm hover:scale-110 transition-transform"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-[#7B1865] text-[#7B1865]' : 'fill-transparent'
                }`}
              />
            </button>
          </div>

          {/* Thumbnail Strip if multiple images */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#7B1865] ring-2 ring-[#7B1865]/20 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Details & Actions */}
        <div className="md:w-1/2 p-5 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-[#7B1865] font-semibold uppercase tracking-wider mb-1">
                <span>{product.category}</span>
                <span className="text-[#8C7D99]">SKU: {product.sku || 'GUL-STD'}</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E152A] leading-snug">
                {product.name}
              </h2>
              {product.nepaliName && (
                <p className="text-xs sm:text-sm text-[#756A85] font-medium mt-0.5">
                  {product.nepaliName}
                </p>
              )}
            </div>

            {/* Price & Stock Status */}
            <div className="flex items-center justify-between py-2 border-y border-[#F0E4F0]">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-bold text-[#4A0E4E]">
                  रु. {product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-[#9B8FA8] line-through">
                    रु. {product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#E8F8EE] text-[#1E7E34]">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span>{product.inStock ? 'In Stock (Ranibagiya Store)' : 'Custom Order'}</span>
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E4E] mb-2">
                  Select Color: <span className="font-normal text-[#7B1865]">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        selectedColor === c.name
                          ? 'border-[#7B1865] bg-[#FAF0FA] text-[#4A0E4E] shadow-sm'
                          : 'border-[#E2D2E4] hover:border-[#7B1865]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4A0E4E]">
                    Select Size: <span className="font-normal text-[#7B1865]">{selectedSize}</span>
                  </label>
                  <span className="text-[11px] text-[#7B1865] flex items-center gap-1">
                    <Scissors className="w-3 h-3" />
                    <span>Custom stitching available</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedSize === s
                          ? 'bg-[#7B1865] text-white border-[#7B1865] shadow-sm'
                          : 'bg-white text-[#4A4356] border-[#E2D2E4] hover:border-[#7B1865]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description & Fabric Details */}
            <div className="space-y-2 text-xs sm:text-sm text-[#554D60] leading-relaxed pt-1">
              <p>{product.description}</p>
              {product.fabricDetails && (
                <p className="text-xs text-[#4A0E4E] font-medium bg-[#FCFBF9] p-2.5 rounded-xl border border-[#EDE0ED]">
                  <strong>Fabric &amp; Weave:</strong> {product.fabricDetails}
                </p>
              )}
            </div>

            {/* Store guarantee pill */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6B6178] pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>100% Genuine Fabric</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#7B1865]" />
                <span>Store Pickup &amp; Nepal Delivery</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-[#F0E4F0]">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={handleAddToCartClick}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                  addedAnimation
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-[#FAF5FA] hover:bg-[#F2E0F2] text-[#7B1865] border border-[#7B1865]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNowClick}
                className="py-3 px-4 rounded-xl bg-[#7B1865] hover:bg-[#601252] text-white text-xs sm:text-sm font-bold tracking-wide uppercase flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(123,24,101,0.25)] transition-all active:scale-[0.98]"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Enquire for this Item</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
