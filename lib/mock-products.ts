export type Category = "MEN" | "WOMEN" | "SNEAKERS" | "SPORTS" | "CASUAL";

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
  createdAt: string; // ISO date string
  description?: string;
}

const MEN_SIZES = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"];
const WOMEN_SIZES = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10"];
const UNISEX_SIZES = ["6", "7", "8", "9", "10", "11", "12"];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "1",
    slug: "nike-air-max-270-react",
    name: "Nike Air Max 270 React",
    brand: "Nike",
    category: "MEN",
    price: 159.99,
    comparePrice: 190.0,
    image: "https://picsum.photos/seed/sneaqr-101/600/600",
    images: [
      "https://picsum.photos/seed/sneaqr-101/600/600",
      "https://picsum.photos/seed/sneaqr-102/600/600",
      "https://picsum.photos/seed/sneaqr-103/600/600",
    ],
    sizes: MEN_SIZES,
    rating: 4.6,
    reviewCount: 128,
    createdAt: "2025-02-10T00:00:00Z",
  },
  {
    id: "2",
    slug: "adidas-ultraboost-22",
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    category: "MEN",
    price: 189.99,
    comparePrice: 220.0,
    image: "https://picsum.photos/seed/sneaqr-201/600/600",
    images: [
      "https://picsum.photos/seed/sneaqr-201/600/600",
      "https://picsum.photos/seed/sneaqr-202/600/600",
      "https://picsum.photos/seed/sneaqr-203/600/600",
    ],
    sizes: MEN_SIZES,
    rating: 4.8,
    reviewCount: 214,
    createdAt: "2025-01-18T00:00:00Z",
  },
  {
    id: "3",
    slug: "new-balance-574-core",
    name: "New Balance 574 Core",
    brand: "New Balance",
    category: "MEN",
    price: 89.99,
    comparePrice: 110.0,
    image: "https://picsum.photos/seed/sneaqr-301/600/600",
    images: [
      "https://picsum.photos/seed/sneaqr-301/600/600",
      "https://picsum.photos/seed/sneaqr-302/600/600",
      "https://picsum.photos/seed/sneaqr-303/600/600",
    ],
    sizes: MEN_SIZES,
    rating: 4.4,
    reviewCount: 89,
    createdAt: "2024-12-05T00:00:00Z",
  },
  {
    id: "4",
    slug: "nike-react-infinity-run-flyknit-3",
    name: "Nike React Infinity Run Flyknit 3",
    brand: "Nike",
    category: "WOMEN",
    price: 169.99,
    comparePrice: 195.0,
    image: "https://picsum.photos/seed/sneaqr-401/600/600",
    images: [
      "https://picsum.photos/seed/sneaqr-401/600/600",
      "https://picsum.photos/seed/sneaqr-402/600/600",
      "https://picsum.photos/seed/sneaqr-403/600/600",
    ],
    sizes: WOMEN_SIZES,
    rating: 4.7,
    reviewCount: 176,
    createdAt: "2025-02-28T00:00:00Z",
  },
  {
    id: "5",
    slug: "adidas-stan-smith-lux",
    name: "Adidas Stan Smith Lux",
    brand: "Adidas",
    category: "WOMEN",
    price: 119.99,
    comparePrice: 140.0,
    image: "https://picsum.photos/seed/sneaqr-501/600/600",
    images: [
      "https://picsum.photos/seed/sneaqr-501/600/600",
      "https://picsum.photos/seed/sneaqr-502/600/600",
      "https://picsum.photos/seed/sneaqr-503/600/600",
    ],
    sizes: WOMEN_SIZES,
    rating: 4.5,
    reviewCount: 203,
    createdAt: "2025-01-09T00:00:00Z",
  },
  {
    id: "6",
    slug: "puma-cali-dream-pastel",
    name: "Puma Cali Dream Pastel",
    brand: "Puma",
    category: "WOMEN",
    price: 99.99,
    comparePrice: 120.0,
    image: "https://picsum.photos/seed/sneaqr-601/600/600",
    images: [
      "https://picsum.photos/seed/sneaqr-601/600/600",
      "https://picsum.photos/seed/sneaqr-602/600/600",
      "https://picsum.photos/seed/sneaqr-603/600/600",
    ],
    sizes: WOMEN_SIZES,
    rating: 4.3,
    reviewCount: 61,
    createdAt: "2024-11-20T00:00:00Z",
  },
  {
    id: "7",
    slug: "jordan-1-retro-high-og",
    name: "Jordan 1 Retro High OG",
    brand: "Jordan",
    category: "SNEAKERS",
    price: 219.99,
    comparePrice: 250.0,
    image: "https://picsum.photos/seed/sneaqr-701/600/600",
    images: [
      "https://picsum.photos/seed/sneaqr-701/600/600",
      "https://picsum.photos/seed/sneaqr-702/600/600",
      "https://picsum.photos/seed/sneaqr-703/600/600",
    ],
    sizes: UNISEX_SIZES,
    rating: 4.9,
    reviewCount: 512,
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "8",
    slug: "new-balance-550-white-green",
    name: "New Balance 550 White Green",
    brand: "New Balance",
    category: "SNEAKERS",
    price: 129.99,
    comparePrice: 150.0,
    image: "https://picsum.photos/seed/sneaqr-801/600/600",
    images: [
      "https://picsum.photos/seed/sneaqr-801/600/600",
      "https://picsum.photos/seed/sneaqr-802/600/600",
      "https://picsum.photos/seed/sneaqr-803/600/600",
    ],
    sizes: UNISEX_SIZES,
    rating: 4.7,
    reviewCount: 294,
    createdAt: "2025-02-14T00:00:00Z",
  },
  {
    id: "9",
    slug: "asics-gel-kayano-30",
    name: "Asics Gel-Kayano 30",
    brand: "Asics",
    category: "SPORTS",
    price: 179.99,
    comparePrice: 200.0,
    image: "https://picsum.photos/seed/sneaqr-901/600/600",
    images: [
      "https://picsum.photos/seed/sneaqr-901/600/600",
      "https://picsum.photos/seed/sneaqr-902/600/600",
      "https://picsum.photos/seed/sneaqr-903/600/600",
    ],
    sizes: UNISEX_SIZES,
    rating: 4.6,
    reviewCount: 143,
    createdAt: "2024-12-22T00:00:00Z",
  },
  {
    id: "10",
    slug: "under-armour-hovr-phantom-3",
    name: "Under Armour HOVR Phantom 3",
    brand: "Under Armour",
    category: "SPORTS",
    price: 149.99,
    comparePrice: 175.0,
    image: "https://picsum.photos/seed/sneaqr-1001/600/600",
    images: [
      "https://picsum.photos/seed/sneaqr-1001/600/600",
      "https://picsum.photos/seed/sneaqr-1002/600/600",
      "https://picsum.photos/seed/sneaqr-1003/600/600",
    ],
    sizes: UNISEX_SIZES,
    rating: 4.4,
    reviewCount: 78,
    createdAt: "2024-11-05T00:00:00Z",
  },
  {
    id: "11",
    slug: "vans-old-skool-pro",
    name: "Vans Old Skool Pro",
    brand: "Vans",
    category: "CASUAL",
    price: 79.99,
    comparePrice: 95.0,
    image: "https://picsum.photos/seed/sneaqr-1101/600/600",
    images: [
      "https://picsum.photos/seed/sneaqr-1101/600/600",
      "https://picsum.photos/seed/sneaqr-1102/600/600",
      "https://picsum.photos/seed/sneaqr-1103/600/600",
    ],
    sizes: UNISEX_SIZES,
    rating: 4.5,
    reviewCount: 321,
    createdAt: "2025-01-30T00:00:00Z",
  },
  {
    id: "12",
    slug: "converse-chuck-70-hi",
    name: "Converse Chuck 70 Hi",
    brand: "Converse",
    category: "CASUAL",
    price: 94.99,
    comparePrice: 110.0,
    image: "https://picsum.photos/seed/sneaqr-1201/600/600",
    images: [
      "https://picsum.photos/seed/sneaqr-1201/600/600",
      "https://picsum.photos/seed/sneaqr-1202/600/600",
      "https://picsum.photos/seed/sneaqr-1203/600/600",
    ],
    sizes: UNISEX_SIZES,
    rating: 4.6,
    reviewCount: 407,
    createdAt: "2025-02-05T00:00:00Z",
  },
];

// Patch descriptions and OOS sizes onto existing products
MOCK_PRODUCTS[0].description =
  "The Nike Air Max 270 React fuses two of Nike's most innovative cushioning technologies. A full-length React foam midsole pairs with a visible Air Max unit at the heel for a ride that's as responsive as it is cushioned. The breathable mesh upper keeps feet cool during long days on your feet.";
MOCK_PRODUCTS[0].outOfStockSizes = ["7", "12"];

MOCK_PRODUCTS[1].description =
  "Engineered for long-distance running, the Adidas Ultraboost 22 features a Primeknit upper that adapts to your foot's natural movement. The responsive Boost midsole returns energy with every stride, while the Continental rubber outsole provides reliable grip on wet and dry surfaces.";
MOCK_PRODUCTS[1].outOfStockSizes = ["7.5", "11"];

MOCK_PRODUCTS[6].description =
  "The shoe that started it all. The Air Jordan 1 Retro High OG brings back the iconic silhouette in premium leather with the classic Wings logo on the ankle collar. A must-have for any collector or sneaker enthusiast looking to own a piece of basketball history.";
MOCK_PRODUCTS[6].outOfStockSizes = ["6", "12"];

MOCK_PRODUCTS[7].description =
  "Originally designed as a basketball shoe in 1989, the New Balance 550 has found new life as one of streetwear's hottest silhouettes. Clean white leather with green accents sits atop a vintage-inspired cupsole for a look that bridges sport and style.";
MOCK_PRODUCTS[7].outOfStockSizes = ["8", "9"];

export function getProductBySlug(slug: string): MockProduct | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export const ALL_BRANDS = [...new Set(MOCK_PRODUCTS.map((p) => p.brand))].sort();

export const PRICE_MIN = 0;
export const PRICE_MAX = 500;
export const ITEMS_PER_PAGE = 9;
