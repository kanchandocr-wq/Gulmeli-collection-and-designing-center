import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, Eye, ShoppingBag, MessageCircle, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color?: string, size?: string) => void;
  whatsappNumber: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  whatsappNumber,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : 'Standard'
  );
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Free Size';
    onAddToCart(product, selectedColor, defaultSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 400);
    onToggleWishlist(product);
  };

  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '') || '9779800000000';
    const message = encodeURIComponent(
      `Namaste Gulmeli Collection, I am interested in ${product.name} (रु. ${product.price.toLocaleString('en-IN')}). Please provide details about price, size, color and availability.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#EFE5EE] hover:border-[#7B1865]/40 transition-all duration-300 hover:shadow-xl flex flex-col cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] bg-[#F7F2F7] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badge (NEW, SALE, LIMITED) */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm ${
              product.badge === 'NEW'
                ? 'bg-[#4A0E4E] text-white'
                : product.badge === 'SALE'
                ? 'bg-[#C5221F] text-white'
                : 'bg-[#C59B27] text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Button (Top Right) */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 shadow-sm ${
            isWishlisted ? 'text-[#7B1865]' : 'text-[#6F647D] hover:text-[#7B1865]'
          } ${heartAnim ? 'scale-125' : 'scale-100'}`}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isWishlisted ? 'fill-[#7B1865] text-[#7B1865]' : 'fill-transparent'
            }`}
          />
        </button>

        {/* Hover / Quick View Actions Overlay (Desktop) */}
        <div className="absolute inset-x-2 bottom-2 hidden sm:flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 bg-white/95 backdrop-blur-sm text-[#4A0E4E] hover:bg-white text-xs font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center gap-1"
          >
            <Eye className="w-3.5 h-3.5 text-[#7B1865]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Category & Nepali Sub-name */}
          <div className="flex items-center justify-between text-[11px] text-[#756A85] mb-0.5">
            <span className="uppercase tracking-wider font-semibold text-[#7B1865]">
              {product.category}
            </span>
            {product.nepaliName && (
              <span className="text-[#887D96] truncate max-w-[120px] hidden sm:inline">
                {product.nepaliName}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-sm sm:text-base text-[#1E152A] group-hover:text-[#7B1865] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Price Display in NPR (रु.) */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-base sm:text-lg font-bold text-[#4A0E4E]">
              रु. {product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#9B8FA8] line-through">
                रु. {product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
            <span className="text-[10px] text-[#756A85] mr-1 hidden sm:inline">Colors:</span>
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                title={c.name}
                style={{ backgroundColor: c.hex }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === c.name
                    ? 'ring-2 ring-offset-1 ring-[#7B1865] scale-110'
                    : 'border-black/20 hover:scale-110'
                }`}
              />
            ))}
          </div>
        )}

        {/* Action Buttons: Add to Cart & WhatsApp Direct */}
        <div className="pt-2 flex items-center gap-2 border-t border-[#F5EDF5]">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 ${
              addedAnimation
                ? 'bg-[#2E7D32] text-white'
                : 'bg-[#FAF5FA] hover:bg-[#7B1865] text-[#4A0E4E] hover:text-white border border-[#E8D9E8] hover:border-[#7B1865]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="truncate">Add to Cart</span>
              </>
            )}
          </button>

          <button
            onClick={handleWhatsAppEnquiry}
            className="p-2 bg-[#E8F8EE] hover:bg-[#25D366] text-[#1E7E34] hover:text-white rounded-xl transition-all duration-200 border border-[#BDE7CA]"
            title="Enquire on WhatsApp"
            aria-label="Enquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
