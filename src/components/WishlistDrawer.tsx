import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onViewProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 flex justify-end"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-[#EFE2EF]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0E4F0] flex items-center justify-between bg-[#FCFBF9]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#7B1865] fill-[#7B1865]" />
            <h2 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
              My Wishlist ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6B6178] hover:text-[#1E152A] hover:bg-[#F2E5F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Wishlisted Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-2xl border border-[#EDE0ED] bg-white flex items-center gap-3.5 hover:shadow-md transition-shadow group"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => {
                    onViewProduct(product);
                    onClose();
                  }}
                  className="w-16 h-20 object-cover rounded-xl flex-shrink-0 cursor-pointer hover:opacity-90"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#7B1865] uppercase">
                    {product.category}
                  </span>
                  <h4
                    onClick={() => {
                      onViewProduct(product);
                      onClose();
                    }}
                    className="text-xs sm:text-sm font-semibold text-[#1E152A] truncate cursor-pointer hover:text-[#7B1865]"
                  >
                    {product.name}
                  </h4>
                  <p className="text-sm font-bold text-[#4A0E4E] mt-0.5">
                    रु. {product.price.toLocaleString('en-IN')}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="px-2.5 py-1 bg-[#FAF0FA] hover:bg-[#7B1865] text-[#7B1865] hover:text-white rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-1 text-[#9D8FA8] hover:text-[#C5221F] rounded transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#FAF0FA] text-[#7B1865] flex items-center justify-center mx-auto">
                <Heart className="w-7 h-7" />
              </div>
              <h4 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
                Your wishlist is empty
              </h4>
              <p className="text-xs sm:text-sm text-[#6B6178] max-w-xs mx-auto">
                Explore our sarees, kurti sets and designer creations, then tap ♡ to save your favorites.
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-[#F0E4F0] bg-[#FCFBF9]">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => onMoveToCart(p));
                onClose();
              }}
              className="w-full py-3 bg-[#7B1865] hover:bg-[#601252] text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors shadow"
            >
              Move All To Shopping Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
