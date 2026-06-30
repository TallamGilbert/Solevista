export type Category =
  | "MEN"
  | "WOMEN"
  | "KIDS"
  | "SNEAKERS"
  | "SPORTS"
  | "CASUAL"
  | "RUNNING"
  | "BOOTS"
  | "SANDALS"
  | "FORMAL";

export interface MockProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  comparePrice?: number;
  image: string;
  images: string[];
  sizes: string[];
  outOfStockSizes?: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  description?: string;
}

const MEN_SIZES = [
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "12",
];
const WOMEN_SIZES = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10"];
const UNISEX_SIZES = ["6", "7", "8", "9", "10", "11", "12"];

// Real shoe images from Unsplash (stable, no random content)
const SHOE_IMAGES = {
  nike_airmax: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
  ],
  adidas_ultraboost: [
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&h=600&fit=crop",
  ],
  new_balance: [
    "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop",
  ],
  nike_react: [
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
  ],
  adidas_stan: [
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
  ],
  puma: [
    "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop",
  ],
  jordan: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
  ],
  nb_550: [
    "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop",
  ],
  asics: [
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
  ],
  under_armour: [
    "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop",
  ],
  vans: [
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=600&h=600&fit=crop",
  ],
  converse: [
    "https://images.unsplash.com/photo-1494496195158-c3becb4f2475?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop",
  ],
};

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "1",
    slug: "nike-air-max-270-react",
    name: "Nike Air Max 270 React",
    brand: "Nike",
    category: "MEN",
    price: 20800,
    comparePrice: 24700,
    image: SHOE_IMAGES.nike_airmax[0],
    images: SHOE_IMAGES.nike_airmax,
    sizes: MEN_SIZES,
    outOfStockSizes: ["7", "12"],
    rating: 4.6,
    reviewCount: 128,
    createdAt: "2025-02-10T00:00:00Z",
    description:
      "The Nike Air Max 270 React fuses two of Nike's most innovative cushioning technologies. A full-length React foam midsole pairs with a visible Air Max unit at the heel for a ride that's as responsive as it is cushioned. The breathable mesh upper keeps feet cool during long days on your feet.",
  },
  {
    id: "2",
    slug: "adidas-ultraboost-22",
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    category: "MEN",
    price: 24700,
    comparePrice: 28600,
    image: SHOE_IMAGES.adidas_ultraboost[0],
    images: SHOE_IMAGES.adidas_ultraboost,
    sizes: MEN_SIZES,
    outOfStockSizes: ["7.5", "11"],
    rating: 4.8,
    reviewCount: 214,
    createdAt: "2025-01-18T00:00:00Z",
    description:
      "Engineered for long-distance running, the Adidas Ultraboost 22 features a Primeknit upper that adapts to your foot's natural movement. The responsive Boost midsole returns energy with every stride, while the Continental rubber outsole provides reliable grip on wet and dry surfaces.",
  },
  {
    id: "3",
    slug: "new-balance-574-core",
    name: "New Balance 574 Core",
    brand: "New Balance",
    category: "MEN",
    price: 11700,
    comparePrice: 14300,
    image: SHOE_IMAGES.new_balance[0],
    images: SHOE_IMAGES.new_balance,
    sizes: MEN_SIZES,
    rating: 4.4,
    reviewCount: 89,
    createdAt: "2024-12-05T00:00:00Z",
    description:
      "A timeless silhouette built for everyday wear. The New Balance 574 Core features a durable suede and mesh upper with ENCAP midsole technology for superior support and cushioning. Versatile enough for the gym or the street.",
  },
  {
    id: "4",
    slug: "nike-react-infinity-run-flyknit-3",
    name: "Nike React Infinity Run Flyknit 3",
    brand: "Nike",
    category: "WOMEN",
    price: 22100,
    comparePrice: 25400,
    image: SHOE_IMAGES.nike_react[0],
    images: SHOE_IMAGES.nike_react,
    sizes: WOMEN_SIZES,
    rating: 4.7,
    reviewCount: 176,
    createdAt: "2025-02-28T00:00:00Z",
    description:
      "Designed to help reduce injury, the Nike React Infinity Run Flyknit 3 offers a stable, cushioned ride from start to finish. The rocker-shaped sole and wide base promote natural foot movement, while the Flyknit upper wraps your foot in adaptive comfort.",
  },
  {
    id: "5",
    slug: "adidas-stan-smith-lux",
    name: "Adidas Stan Smith Lux",
    brand: "Adidas",
    category: "WOMEN",
    price: 15600,
    comparePrice: 18200,
    image: SHOE_IMAGES.adidas_stan[0],
    images: SHOE_IMAGES.adidas_stan,
    sizes: WOMEN_SIZES,
    rating: 4.5,
    reviewCount: 203,
    createdAt: "2025-01-09T00:00:00Z",
    description:
      "The Adidas Stan Smith Lux elevates the iconic tennis shoe with premium materials and refined details. A clean leather upper with subtle perforated 3-Stripes and a minimalist sole make this the perfect everyday sneaker for those who appreciate understated style.",
  },
  {
    id: "6",
    slug: "puma-cali-dream-pastel",
    name: "Puma Cali Dream Pastel",
    brand: "Puma",
    category: "WOMEN",
    price: 13000,
    comparePrice: 15600,
    image: SHOE_IMAGES.puma[0],
    images: SHOE_IMAGES.puma,
    sizes: WOMEN_SIZES,
    rating: 4.3,
    reviewCount: 61,
    createdAt: "2024-11-20T00:00:00Z",
    description:
      "The Puma Cali Dream Pastel brings a fresh, feminine update to the classic Cali silhouette. Soft pastel colorways sit atop a chunky platform sole for a look that blends retro sport with modern street style.",
  },
  {
    id: "7",
    slug: "jordan-1-retro-high-og",
    name: "Jordan 1 Retro High OG",
    brand: "Jordan",
    category: "SNEAKERS",
    price: 28600,
    comparePrice: 32500,
    image: SHOE_IMAGES.jordan[0],
    images: SHOE_IMAGES.jordan,
    sizes: UNISEX_SIZES,
    outOfStockSizes: ["6", "12"],
    rating: 4.9,
    reviewCount: 512,
    createdAt: "2025-03-01T00:00:00Z",
    description:
      "The shoe that started it all. The Air Jordan 1 Retro High OG brings back the iconic silhouette in premium leather with the classic Wings logo on the ankle collar. A must-have for any collector or sneaker enthusiast looking to own a piece of basketball history.",
  },
  {
    id: "8",
    slug: "new-balance-550-white-green",
    name: "New Balance 550 White Green",
    brand: "New Balance",
    category: "SNEAKERS",
    price: 16900,
    comparePrice: 19500,
    image: SHOE_IMAGES.nb_550[0],
    images: SHOE_IMAGES.nb_550,
    sizes: UNISEX_SIZES,
    outOfStockSizes: ["8", "9"],
    rating: 4.7,
    reviewCount: 294,
    createdAt: "2025-02-14T00:00:00Z",
    description:
      "Originally designed as a basketball shoe in 1989, the New Balance 550 has found new life as one of streetwear's hottest silhouettes. Clean white leather with green accents sits atop a vintage-inspired cupsole for a look that bridges sport and style.",
  },
  {
    id: "9",
    slug: "asics-gel-kayano-30",
    name: "Asics Gel-Kayano 30",
    brand: "Asics",
    category: "SPORTS",
    price: 23400,
    comparePrice: 26000,
    image: SHOE_IMAGES.asics[0],
    images: SHOE_IMAGES.asics,
    sizes: UNISEX_SIZES,
    rating: 4.6,
    reviewCount: 143,
    createdAt: "2024-12-22T00:00:00Z",
    description:
      "The Asics Gel-Kayano 30 celebrates 30 years of the brand's most iconic stability shoe. Advanced GEL technology and a FF BLAST PLUS ECO midsole deliver exceptional cushioning and support for overpronators tackling long training runs.",
  },
  {
    id: "10",
    slug: "under-armour-hovr-phantom-3",
    name: "Under Armour HOVR Phantom 3",
    brand: "Under Armour",
    category: "SPORTS",
    price: 19500,
    comparePrice: 22800,
    image: SHOE_IMAGES.under_armour[0],
    images: SHOE_IMAGES.under_armour,
    sizes: UNISEX_SIZES,
    rating: 4.4,
    reviewCount: 78,
    createdAt: "2024-11-05T00:00:00Z",
    description:
      "The Under Armour HOVR Phantom 3 features UA's signature HOVR cushioning that provides a 'zero gravity feel' to maintain energy return. Connected running technology tracks your metrics in real time via the MapMyRun app.",
  },
  {
    id: "11",
    slug: "vans-old-skool-pro",
    name: "Vans Old Skool Pro",
    brand: "Vans",
    category: "CASUAL",
    price: 10400,
    comparePrice: 12400,
    image: SHOE_IMAGES.vans[0],
    images: SHOE_IMAGES.vans,
    sizes: UNISEX_SIZES,
    rating: 4.5,
    reviewCount: 321,
    createdAt: "2025-01-30T00:00:00Z",
    description:
      "The Vans Old Skool Pro is built for skateboarding but styled for the street. Featuring DURACAP reinforced underlays, a UltraCush HD sockline, and the iconic side stripe — it's the shoe that's been on feet everywhere since 1977.",
  },
  {
    id: "12",
    slug: "converse-chuck-70-hi",
    name: "Converse Chuck 70 Hi",
    brand: "Converse",
    category: "CASUAL",
    price: 12400,
    comparePrice: 14300,
    image: SHOE_IMAGES.converse[0],
    images: SHOE_IMAGES.converse,
    sizes: UNISEX_SIZES,
    rating: 4.6,
    reviewCount: 407,
    createdAt: "2025-02-05T00:00:00Z",
    description:
      "The Converse Chuck 70 Hi is a premium take on the original Chuck Taylor. Higher quality canvas, more durable construction, and OrthoLite cushioning make this the grown-up version of the shoe that defined youth culture for decades.",
  },
];

export function getProductBySlug(slug: string): MockProduct | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export const ALL_BRANDS = Array.from(
  new Set(MOCK_PRODUCTS.map((p) => p.brand)),
).sort();
export const PRICE_MIN = 0;
export const PRICE_MAX = 65000;
export const ITEMS_PER_PAGE = 9;
