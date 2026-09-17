import React, { useState } from 'react';
import {
  Product,
  Order,
  CustomDesignEnquiry,
  StoreSettings,
  OfferCard,
  CustomerReview,
} from '../types';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Package,
  ShoppingBag,
  Scissors,
  Settings,
  Tag,
  Star,
  Image,
  Check,
  Phone,
  Clock,
  MapPin,
  Save,
  MessageCircle,
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSaveProducts: (products: Product[]) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  customEnquiries: CustomDesignEnquiry[];
  onUpdateEnquiryStatus: (enquiryId: string, status: CustomDesignEnquiry['status']) => void;
  settings: StoreSettings;
  onSaveSettings: (settings: StoreSettings) => void;
  offers: OfferCard[];
  onSaveOffers: (offers: OfferCard[]) => void;
  reviews: CustomerReview[];
  onSaveReviews: (reviews: CustomerReview[]) => void;
  customLogoUrl?: string;
  onSaveCustomLogo: (url: string) => void;
}

type AdminTab = 'products' | 'orders' | 'custom_designs' | 'settings' | 'offers' | 'reviews' | 'logo';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  onSaveProducts,
  orders,
  onUpdateOrderStatus,
  customEnquiries,
  onUpdateEnquiryStatus,
  settings,
  onSaveSettings,
  offers,
  onSaveOffers,
  reviews,
  onSaveReviews,
  customLogoUrl,
  onSaveCustomLogo,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<AdminTab>('products');

  // Product Form State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    nepaliName: '',
    price: 3500,
    originalPrice: 4000,
    category: 'SAREE',
    image: '',
    inStock: true,
    isFeatured: false,
    isNewArrival: true,
    badge: 'NEW',
    description: '',
    fabricDetails: '',
    colors: [{ name: 'Deep Magenta', hex: '#7B1865' }],
    sizes: ['Free Size'],
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<StoreSettings>({ ...settings });

  // Handle Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? ({ ...p, ...productForm, id: editingProduct.id } as Product)
          : p
      );
      onSaveProducts(updated);
      setEditingProduct(null);
    } else {
      const newP: Product = {
        id: 'prod-' + Date.now(),
        name: productForm.name || '',
        nepaliName: productForm.nepaliName,
        price: Number(productForm.price) || 0,
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
        category: (productForm.category as any) || 'SAREE',
        image:
          productForm.image ||
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        inStock: productForm.inStock ?? true,
        isFeatured: productForm.isFeatured ?? false,
        isNewArrival: productForm.isNewArrival ?? true,
        badge: (productForm.badge as any) || undefined,
        description: productForm.description || '',
        fabricDetails: productForm.fabricDetails || '',
        colors: productForm.colors || [{ name: 'Standard', hex: '#7B1865' }],
        sizes: productForm.sizes || ['Free Size'],
      };
      onSaveProducts([newP, ...products]);
      setIsAddingProduct(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      onSaveProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleProductPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSaveCustomLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(settingsForm);
    alert('Boutique store settings updated successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full border border-[#EDE0ED] shadow-2xl flex flex-col h-[90vh] my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0E4F0] flex items-center justify-between bg-[#FCFBF9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7B1865] text-white flex items-center justify-center font-serif-luxury font-bold text-lg">
              G
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1E152A]">
                Gulmeli Boutique Management
              </h2>
              <p className="text-xs text-[#756A85]">
                Store Admin • Sainamaina, Rupandehi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#6B6178] hover:text-[#1E152A] hover:bg-[#F2E5F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#F0E4F0] bg-[#FAF5FA] overflow-x-auto no-scrollbar px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'products'
                ? 'border-[#7B1865] text-[#7B1865]'
                : 'border-transparent text-[#6B6178] hover:text-[#1E152A]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'orders'
                ? 'border-[#7B1865] text-[#7B1865]'
                : 'border-transparent text-[#6B6178] hover:text-[#1E152A]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('custom_designs')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'custom_designs'
                ? 'border-[#7B1865] text-[#7B1865]'
                : 'border-transparent text-[#6B6178] hover:text-[#1E152A]'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Custom Designs ({customEnquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'settings'
                ? 'border-[#7B1865] text-[#7B1865]'
                : 'border-transparent text-[#6B6178] hover:text-[#1E152A]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Info &amp; Rates</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'offers'
                ? 'border-[#7B1865] text-[#7B1865]'
                : 'border-transparent text-[#6B6178] hover:text-[#1E152A]'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Offers ({offers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'reviews'
                ? 'border-[#7B1865] text-[#7B1865]'
                : 'border-transparent text-[#6B6178] hover:text-[#1E152A]'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('logo')}
            className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'logo'
                ? 'border-[#7B1865] text-[#7B1865]'
                : 'border-transparent text-[#6B6178] hover:text-[#1E152A]'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Brand Logo</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
          {/* TAB 1: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
                    Product Inventory
                  </h3>
                  <p className="text-xs text-[#6B6178]">
                    Manage boutique stock, NPR pricing, fabrics, and arrival badges.
                  </p>
                </div>

                {!isAddingProduct && !editingProduct && (
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setProductForm({
                        name: '',
                        nepaliName: '',
                        price: 3500,
                        originalPrice: 4000,
                        category: 'SAREE',
                        image: '',
                        inStock: true,
                        isFeatured: false,
                        isNewArrival: true,
                        badge: 'NEW',
                        description: '',
                        fabricDetails: '',
                        colors: [{ name: 'Deep Magenta', hex: '#7B1865' }],
                        sizes: ['Free Size'],
                      });
                      setIsAddingProduct(true);
                    }}
                    className="inline-flex items-center gap-1.5 bg-[#7B1865] hover:bg-[#601252] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Item</span>
                  </button>
                )}
              </div>

              {/* Add / Edit Product Form */}
              {(isAddingProduct || editingProduct) && (
                <form
                  onSubmit={handleSaveProduct}
                  className="p-5 sm:p-6 rounded-3xl bg-[#FAF5FA] border border-[#E8D9E8] space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-[#F0E4F0] pb-3">
                    <h4 className="font-serif-luxury text-lg font-bold text-[#1E152A]">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingProduct(false);
                        setEditingProduct(null);
                      }}
                      className="text-xs text-[#756A85] hover:text-[#1E152A]"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={productForm.name || ''}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs bg-white"
                        placeholder="e.g. Royal Banarasi Silk Saree"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                        Nepali Name
                      </label>
                      <input
                        type="text"
                        value={productForm.nepaliName || ''}
                        onChange={(e) =>
                          setProductForm({ ...productForm, nepaliName: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs bg-white"
                        placeholder="e.g. रोयल बनारसी सिल्क साडी"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                        Price in NPR (रु.) *
                      </label>
                      <input
                        type="number"
                        required
                        value={productForm.price || ''}
                        onChange={(e) =>
                          setProductForm({ ...productForm, price: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                        Original Price (Optional Strike)
                      </label>
                      <input
                        type="number"
                        value={productForm.originalPrice || ''}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            originalPrice: e.target.value ? Number(e.target.value) : undefined,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                        Category
                      </label>
                      <select
                        value={productForm.category || 'SAREE'}
                        onChange={(e) =>
                          setProductForm({ ...productForm, category: e.target.value as any })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs bg-white"
                      >
                        {['SAREE', 'KURTI', 'LEHENGA', 'GOWN', 'SALWAR SUIT', 'PARTY WEAR', 'FABRIC & SUITING'].map(
                          (c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Photo Upload & Image URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                        Product Photo (Upload or URL)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProductPhotoUpload}
                        className="text-xs mb-2 block"
                      />
                      <input
                        type="url"
                        placeholder="Or paste image URL"
                        value={productForm.image || ''}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs bg-white"
                      />
                    </div>

                    {productForm.image && (
                      <div className="flex items-center gap-3">
                        <img
                          src={productForm.image}
                          alt="Preview"
                          className="w-16 h-20 object-cover rounded-xl border"
                        />
                        <span className="text-xs text-[#756A85]">Image Preview</span>
                      </div>
                    )}
                  </div>

                  {/* Badges and Stock */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#1E152A]">
                      <input
                        type="checkbox"
                        checked={productForm.inStock ?? true}
                        onChange={(e) =>
                          setProductForm({ ...productForm, inStock: e.target.checked })
                        }
                        className="accent-[#7B1865]"
                      />
                      <span>In Stock</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-[#1E152A]">
                      <input
                        type="checkbox"
                        checked={productForm.isFeatured ?? false}
                        onChange={(e) =>
                          setProductForm({ ...productForm, isFeatured: e.target.checked })
                        }
                        className="accent-[#7B1865]"
                      />
                      <span>Featured Collection</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-[#1E152A]">
                      <input
                        type="checkbox"
                        checked={productForm.isNewArrival ?? false}
                        onChange={(e) =>
                          setProductForm({ ...productForm, isNewArrival: e.target.checked })
                        }
                        className="accent-[#7B1865]"
                      />
                      <span>New Arrival</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#4A0E4E]">Badge:</span>
                      <select
                        value={productForm.badge || ''}
                        onChange={(e) =>
                          setProductForm({ ...productForm, badge: (e.target.value as any) || undefined })
                        }
                        className="px-2 py-1 rounded-lg border text-xs bg-white"
                      >
                        <option value="">None</option>
                        <option value="NEW">NEW</option>
                        <option value="SALE">SALE</option>
                        <option value="LIMITED">LIMITED</option>
                        <option value="BESTSELLER">BESTSELLER</option>
                      </select>
                    </div>
                  </div>

                  {/* Description & Fabric */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={productForm.description || ''}
                        onChange={(e) =>
                          setProductForm({ ...productForm, description: e.target.value })
                        }
                        className="w-full p-2.5 rounded-xl border border-[#E2D2E4] text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                        Fabric &amp; Weave Details
                      </label>
                      <textarea
                        rows={2}
                        value={productForm.fabricDetails || ''}
                        onChange={(e) =>
                          setProductForm({ ...productForm, fabricDetails: e.target.value })
                        }
                        className="w-full p-2.5 rounded-xl border border-[#E2D2E4] text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingProduct(false);
                        setEditingProduct(null);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-[#6B6178]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#7B1865] hover:bg-[#601252] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              )}

              {/* Products Table */}
              <div className="border border-[#EDE0ED] rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF5FA] border-b border-[#EDE0ED] text-[#4A0E4E]">
                    <tr>
                      <th className="p-3">Item</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Badges</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5EBF5]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF9FB]">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={p.image}
                            alt=""
                            className="w-10 h-12 object-cover rounded-lg bg-gray-100"
                          />
                          <div>
                            <p className="font-bold text-[#1E152A]">{p.name}</p>
                            {p.nepaliName && (
                              <p className="text-[11px] text-[#756A85]">{p.nepaliName}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-3 font-semibold text-[#7B1865]">{p.category}</td>
                        <td className="p-3 font-bold text-[#1E152A]">
                          रु. {p.price.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3">
                          {p.badge && (
                            <span className="px-2 py-0.5 rounded bg-[#4A0E4E] text-white text-[10px] font-bold mr-1">
                              {p.badge}
                            </span>
                          )}
                          {p.isFeatured && (
                            <span className="px-2 py-0.5 rounded bg-[#FAF0FA] text-[#7B1865] text-[10px] font-bold mr-1">
                              Featured
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setProductForm({ ...p });
                              setIsAddingProduct(false);
                            }}
                            className="p-1.5 text-[#7B1865] hover:bg-[#FAF0FA] rounded-lg mr-1"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-[#C5221F] hover:bg-[#FDF0EF] rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
                  Nepal Customer Orders
                </h3>
                <p className="text-xs text-[#6B6178]">
                  Track order status, delivery options, and payment verification.
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#756A85]">
                  No orders registered yet. New customer orders will appear here in real time.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl border border-[#EDE0ED] bg-[#FCFBF9] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0E4F0] pb-2">
                        <div>
                          <span className="text-xs font-bold text-[#7B1865]">
                            Order #{ord.orderNumber}
                          </span>
                          <span className="text-xs text-[#756A85] ml-2">({ord.createdAt})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#4A0E4E]">Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e) =>
                              onUpdateOrderStatus(ord.id, e.target.value as any)
                            }
                            className="px-2.5 py-1 rounded-lg border border-[#E5CEE5] text-xs font-bold bg-white text-[#7B1865]"
                          >
                            {['Pending', 'Confirmed', 'Tailoring', 'Ready', 'Delivered', 'Cancelled'].map(
                              (s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <p className="font-bold text-[#1E152A]">{ord.customerName}</p>
                          <p className="text-[#6B6178]">Phone: {ord.phone}</p>
                          <p className="text-[#6B6178]">
                            {ord.address}, {ord.city}
                          </p>
                        </div>

                        <div>
                          <p>
                            <strong className="text-[#4A0E4E]">Method:</strong> {ord.deliveryMethod}
                          </p>
                          <p>
                            <strong className="text-[#4A0E4E]">Payment:</strong> {ord.paymentMethod}
                          </p>
                          {ord.notes && (
                            <p className="text-[#756A85] italic">Note: "{ord.notes}"</p>
                          )}
                        </div>

                        <div className="sm:text-right">
                          <p className="text-sm font-bold text-[#4A0E4E]">
                            Total: रु. {ord.totalAmount.toLocaleString('en-IN')}
                          </p>
                          <p className="text-[11px] text-[#756A85]">
                            (Delivery: रु. {ord.deliveryCharge})
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#F5EBF5]">
                        <p className="text-[11px] font-bold text-[#7B1865] mb-1">Items:</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {ord.items.map((it, idx) => (
                            <span
                              key={idx}
                              className="bg-white px-2.5 py-1 rounded-lg border border-[#EFE2EF] text-[#4A4356]"
                            >
                              {it.product.name} (Qty: {it.quantity}, Size: {it.selectedSize})
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM DESIGNS */}
          {activeTab === 'custom_designs' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
                  Custom Designing Inquiries
                </h3>
                <p className="text-xs text-[#6B6178]">
                  Enquiries received from the 'Designed For You' studio form.
                </p>
              </div>

              {customEnquiries.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#756A85]">
                  No custom design requests received yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {customEnquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-5 rounded-2xl border border-[#EDE0ED] bg-[#FCFBF9] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0E4F0] pb-2">
                        <div>
                          <span className="text-sm font-bold text-[#7B1865]">
                            {enq.designType}
                          </span>
                          <span className="text-xs text-[#756A85] ml-2">({enq.createdAt})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#4A0E4E]">Status:</span>
                          <select
                            value={enq.status}
                            onChange={(e) =>
                              onUpdateEnquiryStatus(enq.id, e.target.value as any)
                            }
                            className="px-2.5 py-1 rounded-lg border border-[#E5CEE5] text-xs font-bold bg-white text-[#7B1865]"
                          >
                            {['Pending', 'Consultation', 'Measuring', 'In Production', 'Ready', 'Completed'].map(
                              (s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <p className="font-bold text-[#1E152A]">{enq.customerName}</p>
                          <p className="text-[#6B6178]">Phone: {enq.phone}</p>
                          <p className="text-[#6B6178]">Needed Date: {enq.preferredDate}</p>
                        </div>

                        <div>
                          <p className="font-bold text-[#4A0E4E]">Measurements Provided:</p>
                          <p className="text-[#554D60]">
                            Bust: {enq.measurements.bust || '-'}, Waist: {enq.measurements.waist || '-'}, Hip: {enq.measurements.hip || '-'}
                          </p>
                          <p className="text-[#554D60]">
                            Length: {enq.measurements.length || '-'}, Shoulder: {enq.measurements.shoulder || '-'}
                          </p>
                        </div>

                        <div>
                          <p className="font-bold text-[#4A0E4E]">Requirements &amp; Notes:</p>
                          <p className="text-[#554D60]">{enq.requirements || 'Standard tailoring'}</p>
                          {enq.message && <p className="italic text-[#756A85]">"{enq.message}"</p>}
                        </div>
                      </div>

                      {enq.referenceImage && (
                        <div className="pt-2 border-t border-[#F5EBF5] flex items-center gap-3">
                          <span className="text-[11px] font-bold text-[#7B1865]">
                            Reference Attached:
                          </span>
                          <img
                            src={enq.referenceImage}
                            alt="Reference"
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: STORE SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettingsSubmit} className="space-y-6 max-w-3xl">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
                  Store Settings &amp; Delivery Rates
                </h3>
                <p className="text-xs text-[#6B6178]">
                  Edit your official phone number, WhatsApp contact, Ranibagiya store address, and delivery fees.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                    Store Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                    Store Address
                  </label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, address: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                    Opening Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.openingHours}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, openingHours: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs"
                  />
                </div>
              </div>

              {/* Delivery Rates in NPR */}
              <div className="p-4 rounded-2xl bg-[#FAF5FA] border border-[#E8D9E8] space-y-3">
                <p className="text-xs font-bold text-[#7B1865] uppercase tracking-wider">
                  Editable Delivery Rates (NPR)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#6B6178] mb-1">
                      Store Pickup Rate (रु.)
                    </label>
                    <input
                      type="number"
                      value={settingsForm.deliveryCharges.storePickup}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          deliveryCharges: {
                            ...settingsForm.deliveryCharges,
                            storePickup: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#6B6178] mb-1">
                      Local Delivery Rate (रु.)
                    </label>
                    <input
                      type="number"
                      value={settingsForm.deliveryCharges.localDelivery}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          deliveryCharges: {
                            ...settingsForm.deliveryCharges,
                            localDelivery: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#6B6178] mb-1">
                      Nepal-wide Courier (रु.)
                    </label>
                    <input
                      type="number"
                      value={settingsForm.deliveryCharges.nepalWide}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          deliveryCharges: {
                            ...settingsForm.deliveryCharges,
                            nepalWide: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* About Text Narrative */}
              <div>
                <label className="block text-xs font-bold text-[#4A0E4E] mb-1">
                  About Section Text (Authentic Narrative)
                </label>
                <textarea
                  rows={4}
                  value={settingsForm.aboutText}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, aboutText: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-[#E2D2E4] text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#7B1865] hover:bg-[#601252] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save Store Information</span>
              </button>
            </form>
          )}

          {/* TAB 5: OFFERS */}
          {activeTab === 'offers' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
                  Special Collection Offers
                </h3>
                <p className="text-xs text-[#6B6178]">
                  Manage genuine boutique showcases and seasonal announcements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offers.map((off) => (
                  <div
                    key={off.id}
                    className="p-4 rounded-2xl border border-[#EDE0ED] bg-[#FCFBF9] space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-[#7B1865] uppercase">
                          {off.tag}
                        </span>
                        <h4 className="font-bold text-sm text-[#1E152A]">{off.title}</h4>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF0FA] text-[#7B1865]">
                        {off.badgeText || 'Active'}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6178]">{off.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
                  Customer Reviews
                </h3>
                <p className="text-xs text-[#6B6178]">
                  Real feedback from boutique visitors and online customers.
                </p>
              </div>

              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3.5 rounded-xl border border-[#EDE0ED] bg-white flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#1E152A]">
                          {rev.customerName}
                        </span>
                        <span className="text-[11px] text-[#756A85]">
                          ({rev.location})
                        </span>
                        <span className="text-xs text-[#D4AF37]">
                          {'★'.repeat(rev.rating)}
                        </span>
                      </div>
                      <p className="text-xs text-[#554D60] mt-1">"{rev.comment}"</p>
                    </div>

                    <button
                      onClick={() => onSaveReviews(reviews.filter((r) => r.id !== rev.id))}
                      className="text-[#C5221F] hover:bg-[#FDF0EF] p-1.5 rounded-lg"
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: LOGO */}
          {activeTab === 'logo' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
                  Brand Logo Reference &amp; Custom Upload
                </h3>
                <p className="text-xs text-[#6B6178]">
                  The boutique utilizes the official 'Gulmeli Collection &amp; Designing Center'
                  gradient circle logo. You can also upload a high-resolution file directly.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF5FA] border border-[#E8D9E8] text-center space-y-4">
                <p className="text-xs font-bold text-[#4A0E4E]">Upload New Logo Image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="text-xs mx-auto block"
                />
                {customLogoUrl && (
                  <div className="pt-2">
                    <p className="text-xs text-[#1E7E34] font-semibold mb-2">
                      Custom logo uploaded and active across all sections:
                    </p>
                    <img
                      src={customLogoUrl}
                      alt="Active Logo"
                      className="w-24 h-24 object-contain mx-auto rounded-full bg-white p-2 border shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => onSaveCustomLogo('')}
                      className="mt-2 text-xs text-[#C5221F] underline"
                    >
                      Reset to Default Official Brand Logo
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
