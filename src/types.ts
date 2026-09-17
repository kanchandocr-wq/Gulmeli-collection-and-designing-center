export type ProductCategory =
  | 'NEW ARRIVALS'
  | 'SAREE'
  | 'KURTI'
  | 'SALWAR SUIT'
  | 'DRESSES'
  | 'PARTY WEAR'
  | 'TRADITIONAL WEAR'
  | 'ACCESSORIES'
  | 'FANCY COLLECTION'
  | 'CUSTOM DESIGNING';

export type ProductBadge = 'NEW' | 'SALE' | 'LIMITED';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  nepaliName?: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  image: string;
  secondaryImages?: string[];
  colors: ProductColor[];
  sizes: string[];
  badge?: ProductBadge;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  description: string;
  fabricDetails?: string;
  inStock: boolean;
  stockCount?: number;
  sku?: string;
}

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  nepaliName: string;
  image: string;
  description: string;
}

export interface CartItem {
  id: string; // unique item key (productId + color + size)
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface CustomDesignEnquiry {
  id: string;
  customerName: string;
  phone: string;
  designType: string;
  preferredDate: string;
  measurements: {
    bust?: string;
    waist?: string;
    hip?: string;
    length?: string;
    shoulder?: string;
    notes?: string;
  };
  requirements: string;
  referenceImage?: string;
  message: string;
  createdAt: string;
  status: 'Pending' | 'Contacted' | 'In Progress' | 'Completed';
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  deliveryMethod: 'Store Pickup' | 'Local Delivery' | 'Nepal-wide Delivery';
  paymentMethod: 'Cash on Delivery' | 'eSewa' | 'Khalti' | 'Fonepay / QR';
  items: CartItem[];
  totalAmount: number;
  deliveryCharge: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Tailoring' | 'Ready' | 'Delivered' | 'Cancelled';
  createdAt: string;
  notes?: string;
}

export interface OfferCard {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  image: string;
  badgeText?: string;
  active: boolean;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: 'Everyday Style' | 'Festive' | 'Party Wear' | 'Traditional' | 'New Arrivals' | 'Custom Designs';
  image: string;
  description: string;
  tags: string[];
}

export interface CustomerReview {
  id: string;
  customerName: string;
  author?: string;
  location?: string;
  rating: number;
  date: string;
  comment: string;
  productName?: string;
  verifiedPurchase?: boolean;
  isVerifiedPurchase?: boolean;
  isApproved?: boolean;
}

export interface StoreSettings {
  businessName: string;
  nepaliName: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  openingHours: string;
  googleMapsUrl: string;
  deliveryCharges: {
    storePickup: number;
    localDelivery: number;
    nepalWide: number;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
    whatsapp: string;
  };
  customLogoUrl?: string;
  aboutText?: string;
}
