import React, { useState } from 'react';
import { CartItem, Order, StoreSettings } from '../types';
import {
  X,
  CheckCircle2,
  MapPin,
  Truck,
  Store,
  CreditCard,
  QrCode,
  Banknote,
  MessageCircle,
  AlertCircle,
  Phone,
  User,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderPlaced: (order: Order) => void;
  settings: StoreSettings;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderPlaced,
  settings,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Sainamaina');
  const [deliveryMethod, setDeliveryMethod] = useState<'Store Pickup' | 'Local Delivery' | 'Nepal-wide Delivery'>('Local Delivery');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'eSewa' | 'Khalti' | 'Fonepay / QR'>('Cash on Delivery');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryCost =
    deliveryMethod === 'Store Pickup'
      ? settings.deliveryCharges.storePickup
      : deliveryMethod === 'Local Delivery'
      ? settings.deliveryCharges.localDelivery
      : settings.deliveryCharges.nepalWide;

  const total = subtotal + deliveryCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert('Please provide your name and phone number for delivery confirmation.');
      return;
    }

    setIsSubmitting(true);

    const orderNumber = 'GUL-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      customerName,
      phone,
      email: email || undefined,
      address: deliveryMethod === 'Store Pickup' ? 'Store Pickup: Ranibagiya, Sainamaina-1' : address,
      city,
      deliveryMethod,
      paymentMethod,
      items: [...cartItems],
      totalAmount: total,
      deliveryCharge: deliveryCost,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      notes,
    };

    setTimeout(() => {
      onOrderPlaced(newOrder);
      setPlacedOrder(newOrder);
      setIsSubmitting(false);
    }, 400);
  };

  const handleWhatsAppOrderShare = () => {
    if (!placedOrder) return;
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '') || '9779800000000';
    let text = `Namaste Gulmeli Collection! I have placed an order #${placedOrder.orderNumber}.\n\n`;
    text += `Customer: ${placedOrder.customerName}\nPhone: ${placedOrder.phone}\n`;
    text += `Delivery: ${placedOrder.deliveryMethod}\nAddress: ${placedOrder.address}, ${placedOrder.city}\n`;
    text += `Payment: ${placedOrder.paymentMethod}\n\n`;
    text += `Items:\n`;
    placedOrder.items.forEach((item) => {
      text += `- ${item.product.name} (Qty: ${item.quantity}, Size: ${item.selectedSize}, Color: ${item.selectedColor}) - रु. ${item.product.price * item.quantity}\n`;
    });
    text += `\nDelivery Charge: रु. ${placedOrder.deliveryCharge}`;
    text += `\nTotal Amount: रु. ${placedOrder.totalAmount.toLocaleString('en-IN')}`;

    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full border border-[#EFE2EF] shadow-2xl relative my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0E4F0] flex items-center justify-between bg-[#FCFBF9]">
          <div>
            <span className="text-[11px] font-bold text-[#7B1865] uppercase tracking-wider">
              Gulmeli Boutique Checkout
            </span>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1E152A]">
              Nepal Order &amp; Delivery
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6B6178] hover:text-[#1E152A] hover:bg-[#F2E5F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {placedOrder ? (
            /* Order Placed Success View */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-[#E8F8EE] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#7B1865] uppercase tracking-wider">
                  Order Successfully Registered
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E152A]">
                  Order #{placedOrder.orderNumber}
                </h3>
                <p className="text-sm text-[#554D60] max-w-md mx-auto">
                  Thank you, <strong>{placedOrder.customerName}</strong>! Our boutique team at Ranibagiya,
                  Sainamaina-1 is preparing your order.
                </p>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#FCFBF9] border border-[#EADEEA] text-left text-xs space-y-2 text-[#4A4356]">
                <div className="flex justify-between font-semibold border-b border-[#EFE2EF] pb-2 text-sm text-[#1E152A]">
                  <span>Total Payable:</span>
                  <span className="text-[#4A0E4E] font-bold">
                    रु. {placedOrder.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#756A85]">Delivery Method:</span>
                  <span className="font-medium">{placedOrder.deliveryMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#756A85]">Payment Option:</span>
                  <span className="font-medium">{placedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#756A85]">Contact Phone:</span>
                  <span className="font-medium">{placedOrder.phone}</span>
                </div>

                {/* Nepal Payment Instruction based on method */}
                <div className="mt-3 p-3 rounded-xl bg-[#FAF0FA] border border-[#E8D4E8] text-[11px] text-[#4A0E4E]">
                  {placedOrder.paymentMethod === 'Cash on Delivery' && (
                    <p>
                      💵 <strong>Cash on Delivery</strong>: You can pay when receiving your parcel or inspecting items at the boutique.
                    </p>
                  )}
                  {placedOrder.paymentMethod === 'eSewa' && (
                    <p>
                      📱 <strong>eSewa Payment</strong>: Our store representative will call/WhatsApp you with the official merchant eSewa ID or QR code.
                    </p>
                  )}
                  {placedOrder.paymentMethod === 'Khalti' && (
                    <p>
                      💳 <strong>Khalti Payment</strong>: Please complete wallet transfer to the boutique number once confirmed by store staff.
                    </p>
                  )}
                  {placedOrder.paymentMethod === 'Fonepay / QR' && (
                    <p>
                      🔳 <strong>Fonepay / QR</strong>: Scan the store QR code via your mobile banking app upon delivery or store pickup.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppOrderShare}
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wide transition-all shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl border border-[#E2D2E4] text-xs font-bold text-[#4A0E4E] hover:bg-[#FAF0FA]"
                >
                  Close &amp; Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Customer Contact */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#7B1865] mb-3 flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>1. Contact Information</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A4356] mb-1">
                      Full Name <span className="text-[#C5221F]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Thapa"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D2E4] text-xs outline-none focus:border-[#7B1865]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A4356] mb-1">
                      Phone Number / WhatsApp <span className="text-[#C5221F]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D2E4] text-xs outline-none focus:border-[#7B1865]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#7B1865] mb-3 flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  <span>2. Delivery Method (Nepal)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Store Pickup */}
                  <label
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      deliveryMethod === 'Store Pickup'
                        ? 'border-[#7B1865] bg-[#FAF0FA] text-[#4A0E4E] ring-1 ring-[#7B1865]'
                        : 'border-[#EDE0ED] hover:border-[#7B1865]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-[#7B1865]" />
                        <span className="text-xs font-bold">Store Pickup</span>
                      </div>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === 'Store Pickup'}
                        onChange={() => setDeliveryMethod('Store Pickup')}
                        className="accent-[#7B1865]"
                      />
                    </div>
                    <p className="text-[11px] text-[#756A85] mt-1.5">
                      Ranibagiya, Sainamaina-1
                    </p>
                    <p className="text-xs font-bold text-[#1E7E34] mt-1">FREE</p>
                  </label>

                  {/* Local Delivery */}
                  <label
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      deliveryMethod === 'Local Delivery'
                        ? 'border-[#7B1865] bg-[#FAF0FA] text-[#4A0E4E] ring-1 ring-[#7B1865]'
                        : 'border-[#EDE0ED] hover:border-[#7B1865]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#7B1865]" />
                        <span className="text-xs font-bold">Local Delivery</span>
                      </div>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === 'Local Delivery'}
                        onChange={() => setDeliveryMethod('Local Delivery')}
                        className="accent-[#7B1865]"
                      />
                    </div>
                    <p className="text-[11px] text-[#756A85] mt-1.5">
                      Sainamaina &amp; Rupandehi Area
                    </p>
                    <p className="text-xs font-bold text-[#4A0E4E] mt-1">
                      रु. {settings.deliveryCharges.localDelivery}
                    </p>
                  </label>

                  {/* Nepal-wide Courier */}
                  <label
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      deliveryMethod === 'Nepal-wide Delivery'
                        ? 'border-[#7B1865] bg-[#FAF0FA] text-[#4A0E4E] ring-1 ring-[#7B1865]'
                        : 'border-[#EDE0ED] hover:border-[#7B1865]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#7B1865]" />
                        <span className="text-xs font-bold">Nepal-wide</span>
                      </div>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === 'Nepal-wide Delivery'}
                        onChange={() => setDeliveryMethod('Nepal-wide Delivery')}
                        className="accent-[#7B1865]"
                      />
                    </div>
                    <p className="text-[11px] text-[#756A85] mt-1.5">
                      Courier to all Nepal districts
                    </p>
                    <p className="text-xs font-bold text-[#4A0E4E] mt-1">
                      रु. {settings.deliveryCharges.nepalWide}
                    </p>
                  </label>
                </div>

                {deliveryMethod !== 'Store Pickup' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A4356] mb-1">
                        Street Address / Landmark <span className="text-[#C5221F]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Near Kalika Chowk, Ranibagiya"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs outline-none focus:border-[#7B1865]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4A4356] mb-1">
                        City / Town
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sainamaina, Butwal, Bhairahawa, Kathmandu"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs outline-none focus:border-[#7B1865]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#7B1865] mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" />
                  <span>3. Payment Option</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote },
                    { id: 'eSewa', label: 'eSewa Pay', icon: QrCode },
                    { id: 'Khalti', label: 'Khalti Pay', icon: QrCode },
                    { id: 'Fonepay / QR', label: 'Fonepay / QR', icon: QrCode },
                  ].map((p) => {
                    const Icon = p.icon;
                    const isSelected = paymentMethod === p.id;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setPaymentMethod(p.id as any)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#7B1865] bg-[#FAF0FA] text-[#4A0E4E] ring-1 ring-[#7B1865]'
                            : 'border-[#EDE0ED] hover:border-[#7B1865]/40 text-[#554D60]'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#7B1865] mb-1" />
                        <p className="text-xs font-bold leading-tight">{p.label}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Transparency Notice per instructions */}
                <p className="text-[11px] text-[#756A85] mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span>
                    Orders are verified by our boutique. No unverified third-party gateway simulation is run.
                  </span>
                </p>
              </div>

              {/* Order Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#4A4356] mb-1">
                  Special Notes or Sizing Requests (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please confirm blouse stitching options or morning delivery preference..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs outline-none focus:border-[#7B1865]"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-2xl bg-[#FCFBF9] border border-[#EADEEA] space-y-2 text-xs">
                <div className="flex justify-between text-[#6B6178]">
                  <span>Items Subtotal:</span>
                  <span>रु. {subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#6B6178]">
                  <span>Delivery ({deliveryMethod}):</span>
                  <span>{deliveryCost === 0 ? 'FREE' : `रु. ${deliveryCost}`}</span>
                </div>
                <div className="pt-2 border-t border-[#EDE0ED] flex justify-between text-sm font-bold text-[#1E152A]">
                  <span>Final Total:</span>
                  <span className="text-[#4A0E4E] text-base">
                    रु. {total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit Order */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#7B1865] hover:bg-[#601252] text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(123,24,101,0.25)] active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? 'Confirming Order...' : 'CONFIRM ORDER'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
