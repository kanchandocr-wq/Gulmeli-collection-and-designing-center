import React, { useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  CustomDesignEnquiry,
  StoreSettings,
  OfferCard,
  CustomerReview,
} from './types';
import {
  initialProducts,
  initialCategories,
  initialStoreSettings,
  initialOffers,
  initialLookbook,
  initialReviews,
} from './data/initialData';

// Component Imports
import { BrandLogo } from './components/BrandLogo';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HeroSection } from './components/HeroSection';
import { BrandIntro } from './components/BrandIntro';
import { CategorySection } from './components/CategorySection';
import { FeaturedCollection } from './components/FeaturedCollection';
import { NewArrivals } from './components/NewArrivals';
import { CustomDesigning } from './components/CustomDesigning';
import { PurpleBrandMoment } from './components/PurpleBrandMoment';
import { Lookbook } from './components/Lookbook';
import { OffersSection } from './components/OffersSection';
import { StoreVisitSection } from './components/StoreVisitSection';
import { AboutSection } from './components/AboutSection';
import { CustomerReviews } from './components/CustomerReviews';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';

// Modals and Drawers
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  // Splash / Loading Screen State
  const [loading, setLoading] = useState(true);

  // Store Data States with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('gulmeli_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('gulmeli_settings');
      return saved ? JSON.parse(saved) : initialStoreSettings;
    } catch {
      return initialStoreSettings;
    }
  });

  const [offers, setOffers] = useState<OfferCard[]>(() => {
    try {
      const saved = localStorage.getItem('gulmeli_offers');
      return saved ? JSON.parse(saved) : initialOffers;
    } catch {
      return initialOffers;
    }
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('gulmeli_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('gulmeli_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customEnquiries, setCustomEnquiries] = useState<CustomDesignEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem('gulmeli_custom_enquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customLogoUrl, setCustomLogoUrl] = useState<string>(() => {
    return localStorage.getItem('gulmeli_custom_logo') || '';
  });

  // Cart & Wishlist States
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gulmeli_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('gulmeli_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // UI Interactive Overlays
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Active Category Filter for Catalog View
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('gulmeli_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('gulmeli_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('gulmeli_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('gulmeli_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('gulmeli_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gulmeli_custom_enquiries', JSON.stringify(customEnquiries));
  }, [customEnquiries]);

  useEffect(() => {
    localStorage.setItem('gulmeli_custom_logo', customLogoUrl);
  }, [customLogoUrl]);

  useEffect(() => {
    localStorage.setItem('gulmeli_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('gulmeli_wishlist', JSON.stringify(Array.from(wishlistIds)));
  }, [wishlistIds]);

  // Loading animation dismissal
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Handlers for Wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }
      return next;
    });
  };

  // Handlers for Cart
  const handleAddToCart = (product: Product, color?: string, size?: string) => {
    const chosenColor = color || (product.colors[0]?.name ?? 'Standard');
    const chosenSize = size || (product.sizes[0] ?? 'Free Size');
    const itemId = `${product.id}-${chosenColor}-${chosenSize}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          quantity: 1,
          selectedColor: chosenColor,
          selectedSize: chosenSize,
        },
      ];
    });
  };

  const handleUpdateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleBuyNow = (product: Product, color: string, size: string) => {
    handleAddToCart(product, color, size);
    setQuickViewProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product);
  };

  // Smooth scroll handler
  const handleNavigateSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));

  // Category Filtered Products for category view
  const categoryFilteredProducts =
    selectedCategory === 'ALL'
      ? products
      : products.filter((p) => p.category.toUpperCase() === selectedCategory.toUpperCase());

  return (
    <div className="min-h-screen bg-[#FCFBF9] text-[#1E152A] font-sans flex flex-col relative selection:bg-[#7B1865] selection:text-white">
      {/* Luxury Loading Screen with authentic logo */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-[#1E051C] flex flex-col items-center justify-center space-y-5 transition-opacity duration-500">
          <div className="animate-pulse">
            <BrandLogo size="hero" variant="onDark" showTagline={true} customLogoUrl={customLogoUrl} />
          </div>
          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-[#D4AF37] rounded-full animate-[shimmer_1.5s_infinite]" />
          </div>
          <p className="text-xs text-[#F2DFB3] tracking-[0.25em] uppercase font-serif-luxury">
            Ranibagiya, Sainamaina-1
          </p>
        </div>
      )}

      {/* 1. Top Header with Sticky Navigation & Logo */}
      <Header
        wishlistCount={wishlistIds.size}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        whatsappNumber={settings.whatsappNumber}
        customLogoUrl={customLogoUrl}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Editorial Hero Section */}
        <HeroSection
          whatsappNumber={settings.whatsappNumber}
          customLogoUrl={customLogoUrl}
          onExploreClick={() => handleNavigateSection('featured-collection')}
          onCustomDesignClick={() => handleNavigateSection('custom-designing')}
        />

        {/* 3. Brand Introduction (गुल्मेली कलेक्सन & डिजाइनिङ सेन्टर) */}
        <BrandIntro />

        {/* 4. Curated Category Showcase */}
        <CategorySection
          categories={initialCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={(catName) => {
            setSelectedCategory(catName);
            handleNavigateSection('featured-collection');
          }}
        />

        {/* 5. Featured Collection Grid */}
        <FeaturedCollection
          products={categoryFilteredProducts}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          whatsappNumber={settings.whatsappNumber}
          onViewAllClick={() => setSelectedCategory('ALL')}
        />

        {/* 6. New Arrivals Section (6-8 items, 4-col desktop, 2-col mobile) */}
        <NewArrivals
          products={products}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          whatsappNumber={settings.whatsappNumber}
        />

        {/* 7. CUSTOM DESIGNING — CORE BRAND FEATURE: 'Designed For You' */}
        <CustomDesigning
          onSaveEnquiry={(enq) => setCustomEnquiries((prev) => [enq, ...prev])}
          whatsappNumber={settings.whatsappNumber}
        />

        {/* 8. Purple Brand Moment ('G' monogram, 'Express Your Style.') */}
        <PurpleBrandMoment
          onExploreClick={() => handleNavigateSection('featured-collection')}
          customLogoUrl={customLogoUrl}
        />

        {/* 9. Style Inspiration Lookbook (Instagram-style masonry gallery) */}
        <Lookbook lookbookItems={initialLookbook} />

        {/* 10. Special Collection Offers Section */}
        <OffersSection
          offers={offers}
          onSelectOffer={(tag) => {
            setSelectedCategory('ALL');
            handleNavigateSection('featured-collection');
          }}
        />

        {/* 11. Store Visit Section (Ranibagiya, Sainamaina-1 with Maps & Direct CTAs) */}
        <StoreVisitSection settings={settings} />

        {/* 12. About Gulmeli (Authentic editorial boutique narrative) */}
        <AboutSection
          aboutText={settings.aboutText}
          customLogoUrl={customLogoUrl}
        />

        {/* 13. Customer Reviews (Authentic reviews & submission modal) */}
        <CustomerReviews
          reviews={reviews}
          onAddReview={(rev) => setReviews((prev) => [rev, ...prev])}
        />

        {/* 14. Follow Our Journey Social Media */}
        <SocialSection settings={settings} />
      </main>

      {/* 15. Comprehensive Boutique Footer */}
      <Footer
        settings={settings}
        customLogoUrl={customLogoUrl}
        onNavigateSection={handleNavigateSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 16. Mobile Bottom Quick Bar */}
      <MobileBottomNav
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.size}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 17. Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* 18. Live Search Modal with Suggestions & Empty State */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onSelectCategory={(c) => {
          setSelectedCategory(c);
          handleNavigateSection('featured-collection');
        }}
      />

      {/* 19. Wishlist Slide-in Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
        onViewProduct={(p) => setQuickViewProduct(p)}
      />

      {/* 20. Shopping Bag / Mini-Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* 21. Nepal-Friendly Checkout Modal (Store Pickup, Local, Courier, COD/eSewa/Khalti) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderPlaced={(order) => {
          setOrders((prev) => [order, ...prev]);
          setCartItems([]);
        }}
        settings={settings}
      />

      {/* 22. Admin Management Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onSaveProducts={setProducts}
        orders={orders}
        onUpdateOrderStatus={(orderId, status) => {
          setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status } : o))
          );
        }}
        customEnquiries={customEnquiries}
        onUpdateEnquiryStatus={(enqId, status) => {
          setCustomEnquiries((prev) =>
            prev.map((e) => (e.id === enqId ? { ...e, status } : e))
          );
        }}
        settings={settings}
        onSaveSettings={setSettings}
        offers={offers}
        onSaveOffers={setOffers}
        reviews={reviews}
        onSaveReviews={setReviews}
        customLogoUrl={customLogoUrl}
        onSaveCustomLogo={setCustomLogoUrl}
      />
    </div>
  );
}
