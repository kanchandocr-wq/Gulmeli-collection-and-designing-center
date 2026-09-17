import { Product, CategoryInfo, OfferCard, LookbookItem, StoreSettings } from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  businessName: 'Gulmeli Collection & Designing Center',
  nepaliName: 'गुल्मेली कलेक्सन & डिजाइनिङ सेन्टर',
  address: 'Ranibagiya, Sainamaina-1, Rupandehi, Lumbini Province, Nepal',
  phone: '98XXXXXXXX', // Editable placeholder as required by authenticity rule
  whatsappNumber: '97798XXXXXXXX', // Editable placeholder for real business number
  email: 'info@gulmelicollection.com.np',
  openingHours: 'Sunday – Friday: 9:30 AM – 7:30 PM (Saturday on appointment)',
  googleMapsUrl: 'https://maps.google.com/?q=Ranibagiya+Sainamaina+Rupandehi+Nepal',
  deliveryCharges: {
    storePickup: 0,
    localDelivery: 100, // Sainamaina, Butwal & surrounding
    nepalWide: 250, // Courier throughout Nepal
  },
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    whatsapp: 'https://wa.me/9779800000000',
  },
  aboutText:
    'Gulmeli Collection & Designing Center (गुल्मेली कलेक्सन & डिजाइनिङ सेन्टर) is Sainamaina\'s premier destination for exquisite South Asian women\'s fashion and bespoke custom tailoring. Located at Ranibagiya, Sainamaina-1, Rupandehi, we combine timeless Nepali craftsmanship with modern silhouettes. From bridal sarees, embroidered lehengas, and festive kurti sets to customized dress stitching tailored to your exact measurements, we bring your personal style to life.',
};

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'new-arrivals',
    name: 'NEW ARRIVALS',
    nepaliName: 'नयाँ कलेक्सन',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    description: 'Fresh festive drops, seasonal silhouettes & trending Nepali boutique designs.',
  },
  {
    id: 'saree',
    name: 'SAREE',
    nepaliName: 'साडी कलेक्सन',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
    description: 'Pure Banarasi silk, soft organza, georgette & handcrafted zari sarees.',
  },
  {
    id: 'kurti',
    name: 'KURTI',
    nepaliName: 'कुर्ती सेट',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    description: 'Everyday elegance to festive heavy-embroidered kurti sets with dupatta.',
  },
  {
    id: 'salwar-suit',
    name: 'SALWAR SUIT',
    nepaliName: 'सल्वार सुट',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
    description: 'Tailored Patiala, straight cut, sharara and Pakistani-style festive suits.',
  },
  {
    id: 'dresses',
    name: 'DRESSES',
    nepaliName: 'मोडर्न ड्रेसेस',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
    description: 'Contemporary Indo-western gowns, maxi cuts, and flowy designer dresses.',
  },
  {
    id: 'party-wear',
    name: 'PARTY WEAR',
    nepaliName: 'पार्टी वेयर',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
    description: 'Statement gowns, sequence festive wear & reception ensembles.',
  },
  {
    id: 'traditional-wear',
    name: 'TRADITIONAL WEAR',
    nepaliName: 'परम्परागत पहिरन',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    description: 'Authentic Nepali cultural attire, Dhaka fusion, bridal gunyo-cholo accents.',
  },
  {
    id: 'accessories',
    name: 'ACCESSORIES',
    nepaliName: 'गहना & एक्ससरिज',
    image: 'https://images.unsplash.com/photo-1611591475878-57c7f12e8418?auto=format&fit=crop&w=900&q=80',
    description: 'Handcrafted potli bags, matching stoles, kundan brooches & boutique adornments.',
  },
  {
    id: 'fancy-collection',
    name: 'FANCY COLLECTION',
    nepaliName: 'फ्यान्सी कलेक्सन',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80',
    description: 'Glamorous fabrics, velvet evening silhouettes, and curated fancy pieces.',
  },
  {
    id: 'custom-designing',
    name: 'CUSTOM DESIGNING',
    nepaliName: 'कस्टम डिजाइनिङ',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
    description: 'Bespoke tailoring, blouse pattern stitching, personalized bridal designing.',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'gul-01',
    name: 'Royal Magenta Zari Silk Saree',
    nepaliName: 'रोयल म्याजेन्टा जरी सिल्क साडी',
    price: 6850,
    originalPrice: 8200,
    category: 'SAREE',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Royal Magenta', hex: '#7B1865' },
      { name: 'Deep Purple', hex: '#4A0E4E' },
      { name: 'Champagne Gold', hex: '#D4AF37' },
    ],
    sizes: ['Free Size (Includes Unstitched Blouse piece)'],
    badge: 'NEW',
    isFeatured: true,
    isNewArrival: true,
    description:
      'Woven with luxurious royal magenta silk, intricate floral gold zari borders, and a matching designer unstitched blouse piece. Ideal for weddings, festive pujas, and formal celebrations.',
    fabricDetails: 'Pure Kanjivaram blend silk with gold zari weaving',
    inStock: true,
    stockCount: 8,
    sku: 'GUL-SAR-001',
  },
  {
    id: 'gul-02',
    name: 'Handcrafted Lavender Chikankari Kurti Set',
    nepaliName: 'ल्याभेन्डर चिकनकारी कुर्ती सेट',
    price: 3450,
    category: 'KURTI',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Soft Lavender', hex: '#D5B7DB' },
      { name: 'Dusty Rose', hex: '#C28CAE' },
      { name: 'Ivory White', hex: '#F9F6F0' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom Stitching'],
    badge: 'NEW',
    isFeatured: true,
    isNewArrival: true,
    description:
      'Soft georgette kurti set featuring delicate hand-embroidered thread work with matching palazzo pants and a sheer chiffon dupatta with scalloped borders.',
    fabricDetails: 'Breathable Georgette with inner cotton lining',
    inStock: true,
    stockCount: 12,
    sku: 'GUL-KUR-002',
  },
  {
    id: 'gul-03',
    name: 'Deep Purple Velvet Festive Anarkali',
    nepaliName: 'डीप पर्पल भेल्भेट अनारकली',
    price: 9200,
    originalPrice: 10500,
    category: 'PARTY WEAR',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Deep Purple', hex: '#4A0E4E' },
      { name: 'Wine Maroon', hex: '#58111A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Fitting'],
    badge: 'LIMITED',
    isFeatured: true,
    isNewArrival: false,
    description:
      'Micro-velvet floor-length Anarkali suit with hand-beaded tilla and zardozi embroidery across the neckline and sleeve cuffs. Includes organza gold-lace dupatta.',
    fabricDetails: 'Premium Micro-Velvet with organza dupatta',
    inStock: true,
    stockCount: 4,
    sku: 'GUL-PRT-003',
  },
  {
    id: 'gul-04',
    name: 'Pastel Organza Embroidered Saree',
    nepaliName: 'पेस्टल ओर्गान्जा एम्ब्रोइडरी साडी',
    price: 5200,
    category: 'SAREE',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Lilac Sheer', hex: '#C8A2C8' },
      { name: 'Peach Cream', hex: '#FAD6A5' },
      { name: 'Mint Mist', hex: '#D8F3DC' },
    ],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    badge: 'NEW',
    isFeatured: false,
    isNewArrival: true,
    description:
      'Ultra-lightweight tissue organza saree adorned with pastel resham floral embroidery and cut-work scalloped borders. Drapes effortlessly for summer and daytime parties.',
    fabricDetails: 'Pure Tissue Organza with satin border finish',
    inStock: true,
    stockCount: 9,
    sku: 'GUL-SAR-004',
  },
  {
    id: 'gul-05',
    name: 'Tailored Punjabi Sharara Suit Set',
    nepaliName: 'पञ्जाबी शरारा सुट सेट',
    price: 4600,
    originalPrice: 5100,
    category: 'SALWAR SUIT',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Berry Magenta', hex: '#8B1E5F' },
      { name: 'Mustard Gold', hex: '#E5A93C' },
      { name: 'Royal Teal', hex: '#0D5C75' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Size'],
    badge: 'SALE',
    isFeatured: true,
    isNewArrival: true,
    description:
      'Three-piece festive suit comprising a short peplum style kurti with gota patti accents, layered flare sharara pants, and a mukaish work net dupatta.',
    fabricDetails: 'Chanderi Silk blend top with georgette flair bottoms',
    inStock: true,
    stockCount: 6,
    sku: 'GUL-SLW-005',
  },
  {
    id: 'gul-06',
    name: 'Contemporary Fusion Cape Gown',
    nepaliName: 'कन्टेम्पोररी फ्युजन केप गाउन',
    price: 7800,
    category: 'DRESSES',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Plum Violet', hex: '#5B104F' },
      { name: 'Blush Champagne', hex: '#ECC8AF' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'NEW',
    isFeatured: false,
    isNewArrival: true,
    description:
      'Modern silhouette featuring a fitted bodice, flowy georgette flare, and a detachable embroidered sheer cape jacket with pearl droplets.',
    fabricDetails: 'Italian Crepe with sheer embroidered net cape',
    inStock: true,
    stockCount: 5,
    sku: 'GUL-DRS-006',
  },
  {
    id: 'gul-07',
    name: 'Traditional Nepali Dhaka Fusion Kurti',
    nepaliName: 'ढाका फ्युजन नेपाली कुर्ती',
    price: 2850,
    category: 'TRADITIONAL WEAR',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Crimson Red', hex: '#9E2A2B' },
      { name: 'Black & Gold', hex: '#2B2D42' },
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    badge: 'LIMITED',
    isFeatured: true,
    isNewArrival: true,
    description:
      'Handloom Palpali/Nepali Dhaka borders integrated into a modern straight cut cotton-linen kurti. Perfect celebration of Nepali heritage for official and festive wear.',
    fabricDetails: 'Organic Cotton Linen with original handloom Dhaka weave',
    inStock: true,
    stockCount: 7,
    sku: 'GUL-TRD-007',
  },
  {
    id: 'gul-08',
    name: 'Bridal Zardozi Potli Bag & Brooch Adornment',
    nepaliName: 'ब्राइडल जरदोजी पोटली ब्याग',
    price: 1450,
    category: 'ACCESSORIES',
    image: 'https://images.unsplash.com/photo-1611591475878-57c7f12e8418?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Magenta & Gold', hex: '#7B1865' },
      { name: 'Golden Antique', hex: '#C59B27' },
      { name: 'Maroon Velvet', hex: '#660708' },
    ],
    sizes: ['Standard Boutique Size'],
    badge: undefined,
    isFeatured: false,
    isNewArrival: false,
    description:
      'Handcrafted drawstring potli purse with heavy beadwork, golden tassels, and pearl shoulder handle. Complements traditional sarees and lehengas.',
    fabricDetails: 'Raw Silk base with hand-stitched beads and zari pearls',
    inStock: true,
    stockCount: 15,
    sku: 'GUL-ACC-008',
  },
];

export const INITIAL_OFFERS: OfferCard[] = [
  {
    id: 'off-01',
    title: 'Festive Collection Highlights',
    subtitle: 'Exclusive Sarees & Party Ensembles',
    tag: 'Festive Collection',
    description: 'Explore hand-selected bridal sarees and royal magenta fabrics crafted for your special celebrations.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
    badgeText: 'Curated Boutique Drop',
    active: true,
  },
  {
    id: 'off-02',
    title: 'Personalized Custom Stitching Service',
    subtitle: 'Tailored to Your Exact Body Measurements',
    tag: 'Custom Designing',
    description: 'Book your personal consultation at our Ranibagiya store or send measurements online for custom kurti & blouse stitching.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
    badgeText: 'Studio Specialty',
    active: true,
  },
  {
    id: 'off-03',
    title: 'Seasonal Kurti & Suit Showcase',
    subtitle: 'New Daily & Office Elegance',
    tag: 'New Arrival',
    description: 'Comfortable pure cottons and chanderi silks designed for effortless daily grace in Rupandehi.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    badgeText: 'Trending',
    active: true,
  },
];

export const INITIAL_LOOKBOOK: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'Royal Magenta Drapes',
    category: 'Festive',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
    description: 'A striking blend of royal magenta silk and classic gold border work.',
    tags: ['Saree', 'Festive', 'Wedding Guest', 'Magenta'],
  },
  {
    id: 'look-2',
    title: 'Contemporary Lavender Daywear',
    category: 'Everyday Style',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    description: 'Soft pastels engineered for comfort and high-aesthetic styling.',
    tags: ['Kurti Set', 'Pastel', 'Chikankari'],
  },
  {
    id: 'look-3',
    title: 'Evening Velvet Splendor',
    category: 'Party Wear',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
    description: 'Deep royal jewel tones adorned with glistening zari threadwork.',
    tags: ['Anarkali', 'Party Wear', 'Velvet'],
  },
  {
    id: 'look-4',
    title: 'Nepali Heritage Dhaka Accent',
    category: 'Traditional',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    description: 'Honoring indigenous loom patterns in modern tailored silhouettes.',
    tags: ['Dhaka', 'Heritage', 'Nepali Touch'],
  },
  {
    id: 'look-5',
    title: 'Custom Bridal Blouse Work',
    category: 'Custom Designs',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
    description: 'Bespoke hand embroidery, tailored neckline, and perfect fitted stitch.',
    tags: ['Bespoke', 'Tailoring', 'Studio'],
  },
  {
    id: 'look-6',
    title: 'Organza Sheer Pastel Cascade',
    category: 'New Arrivals',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    description: 'Delicate sheer drape with resham embroidery for graceful occasions.',
    tags: ['Organza', 'Pastel', 'New Drop'],
  },
];

export const INITIAL_REVIEWS: import('../types').CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Anju Shrestha',
    location: 'Ranibagiya, Sainamaina',
    rating: 5,
    comment:
      'Got my festive saree blouse custom stitched here at Ranibagiya store. The fitting and neck piping were done exactly according to my measurements. Very welcoming service!',
    productName: 'Custom Blouse Designing',
    date: 'Sep 2024',
    verifiedPurchase: true,
  },
  {
    id: 'rev-2',
    customerName: 'Pratima Thapa',
    location: 'Butwal, Rupandehi',
    rating: 5,
    comment:
      'The royal magenta zari saree is very elegant and the fabric texture is genuine silk. It arrived safely and looked even more beautiful in person.',
    productName: 'Royal Magenta Zari Silk Saree',
    date: 'Oct 2024',
    verifiedPurchase: true,
  },
  {
    id: 'rev-3',
    customerName: 'Rashmi Sharma',
    location: 'Sainamaina-1',
    rating: 5,
    comment:
      'Convenient local boutique in Sainamaina. Quality of fabric and finishing is superior. Highly recommend for custom tailoring.',
    productName: 'Lavender Chikankari Kurti Set',
    date: 'Nov 2024',
    verifiedPurchase: true,
  },
];

// Convenient exported aliases
export const initialProducts = INITIAL_PRODUCTS;
export const initialCategories = CATEGORIES_DATA;
export const initialStoreSettings = INITIAL_SETTINGS;
export const initialOffers = INITIAL_OFFERS;
export const initialLookbook = INITIAL_LOOKBOOK;
export const initialReviews = INITIAL_REVIEWS;

