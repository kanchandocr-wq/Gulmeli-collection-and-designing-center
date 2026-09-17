import React from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

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
            <ShoppingBag className="w-5 h-5 text-[#7B1865]" />
            <h2 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
              Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6B6178] hover:text-[#1E152A] hover:bg-[#F2E5F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl border border-[#EDE0ED] bg-white flex gap-3.5 items-center hover:shadow-sm"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-20 object-cover rounded-xl flex-shrink-0 bg-gray-50"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#1E152A] truncate pr-2">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#9D8FA8] hover:text-[#C5221F] p-0.5"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#756A85]">
                    <span className="bg-[#FAF5FA] px-2 py-0.5 rounded border border-[#EDE0ED]">
                      Size: {item.selectedSize}
                    </span>
                    <span className="bg-[#FAF5FA] px-2 py-0.5 rounded border border-[#EDE0ED]">
                      Color: {item.selectedColor}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs sm:text-sm font-bold text-[#4A0E4E]">
                      रु. {(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#E5CEE5] rounded-lg overflow-hidden bg-[#FAF5FA]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-[#4A0E4E] hover:bg-[#EBD8EF]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-[#4A0E4E] hover:bg-[#EBD8EF]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#FAF0FA] text-[#7B1865] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
                Your shopping bag is empty
              </h4>
              <p className="text-xs sm:text-sm text-[#6B6178] max-w-xs mx-auto">
                Select your favorite sarees, kurtis or designer items to begin shopping.
              </p>
            </div>
          )}
        </div>

        {/* Footer with Subtotal & Checkout Actions */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#F0E4F0] bg-[#FCFBF9] space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#6B6178]">Estimated Subtotal</span>
              <span className="text-lg font-bold text-[#4A0E4E]">
                रु. {subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-[#756A85]">
              Taxes included. Delivery charges calculated during Nepal checkout.
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-[#7B1865] hover:bg-[#601252] text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(123,24,101,0.25)] flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-semibold text-[#6B6178] hover:text-[#1E152A] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
