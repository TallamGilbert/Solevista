import { PrismaClient, Category } from "@prisma/client";
import { hash } from "crypto";

const prisma = new PrismaClient();

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Placeholder images via picsum keyed by a stable seed integer
function img(seed: number) {
  return `https://picsum.photos/seed/sneaqr-${seed}/800/800`;
}

// ─── Product data ─────────────────────────────────────────────────────────────

const MEN_SIZES = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"];
const WOMEN_SIZES = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10"];
const UNISEX_SIZES = ["6", "7", "8", "9", "10", "11", "12"];

function makeSizes(labels: string[], stockRange: [number, number] = [5, 30]) {
  return labels.map((label) => ({
    label,
    stock: Math.floor(Math.random() * (stockRange[1] - stockRange[0])) + stockRange[0],
  }));
}

const products = [
  // ── Men ──────────────────────────────────────────────────────────────────
  {
    name: "Nike Air Max 270 React",
    brand: "Nike",
    category: Category.MEN,
    price: 159.99,
    comparePrice: 190.0,
    description:
      "The Nike Air Max 270 React fuses two of Nike's most innovative cushioning technologies. A full-length React foam midsole pairs with a visible Air Max unit at the heel for a ride that's as responsive as it is cushioned. The breathable mesh upper keeps feet cool during long days on your feet.",
    images: [img(101), img(102), img(103)],
    sizes: MEN_SIZES,
    rating: 4.6,
    stock: 120,
  },
  {
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    category: Category.MEN,
    price: 189.99,
    comparePrice: 220.0,
    description:
      "Engineered for long-distance running, the Adidas Ultraboost 22 features a Primeknit upper that adapts to your foot's natural movement. The responsive Boost midsole returns energy with every stride, while the Continental rubber outsole provides reliable grip on wet and dry surfaces.",
    images: [img(201), img(202), img(203)],
    sizes: MEN_SIZES,
    rating: 4.8,
    stock: 85,
  },
  {
    name: "New Balance 574 Core",
    brand: "New Balance",
    category: Category.MEN,
    price: 89.99,
    comparePrice: 110.0,
    description:
      "A timeless silhouette updated for modern wear. The New Balance 574 Core combines a suede and mesh upper with ENCAP midsole technology for all-day comfort. Its versatile design moves seamlessly from casual outings to weekend errands.",
    images: [img(301), img(302), img(303)],
    sizes: MEN_SIZES,
    rating: 4.4,
    stock: 200,
  },
  // ── Women ────────────────────────────────────────────────────────────────
  {
    name: "Nike React Infinity Run Flyknit 3",
    brand: "Nike",
    category: Category.WOMEN,
    price: 169.99,
    comparePrice: 195.0,
    description:
      "Designed to keep you running, the Nike React Infinity Run Flyknit 3 features a wider base for a more stable ride. The React foam midsole offers cushioned yet responsive energy return, and the Flyknit upper wraps your foot in a breathable, sock-like fit.",
    images: [img(401), img(402), img(403)],
    sizes: WOMEN_SIZES,
    rating: 4.7,
    stock: 95,
  },
  {
    name: "Adidas Stan Smith Lux",
    brand: "Adidas",
    category: Category.WOMEN,
    price: 119.99,
    comparePrice: 140.0,
    description:
      "The iconic Stan Smith gets a luxurious update with premium full-grain leather and subtle gold branding. A minimalist design that pairs effortlessly with anything in your wardrobe, from tailored trousers to weekend denim.",
    images: [img(501), img(502), img(503)],
    sizes: WOMEN_SIZES,
    rating: 4.5,
    stock: 150,
  },
  {
    name: "Puma Cali Dream Pastel",
    brand: "Puma",
    category: Category.WOMEN,
    price: 99.99,
    comparePrice: 120.0,
    description:
      "Inspired by California cool, the Puma Cali Dream Pastel brings a fresh, platform-elevated twist to retro style. The soft pastel upper in a mix of leather and suede is finished with a chunky cupsole that adds extra height and attitude.",
    images: [img(601), img(602), img(603)],
    sizes: WOMEN_SIZES,
    rating: 4.3,
    stock: 110,
  },
  // ── Sneakers ─────────────────────────────────────────────────────────────
  {
    name: "Jordan 1 Retro High OG",
    brand: "Jordan",
    category: Category.SNEAKERS,
    price: 219.99,
    comparePrice: 250.0,
    description:
      "The shoe that started it all. The Air Jordan 1 Retro High OG brings back the iconic silhouette in premium leather with the classic Wings logo on the ankle collar. A must-have for any collector or sneaker enthusiast.",
    images: [img(701), img(702), img(703)],
    sizes: UNISEX_SIZES,
    rating: 4.9,
    stock: 45,
  },
  {
    name: "New Balance 550 White Green",
    brand: "New Balance",
    category: Category.SNEAKERS,
    price: 129.99,
    comparePrice: 150.0,
    description:
      "Originally designed as a basketball shoe in 1989, the New Balance 550 has found new life as one of streetwear's hottest silhouettes. Clean white leather with green accents sits atop a vintage-inspired cupsole for a look that bridges sport and style.",
    images: [img(801), img(802), img(803)],
    sizes: UNISEX_SIZES,
    rating: 4.7,
    stock: 70,
  },
  // ── Sports ───────────────────────────────────────────────────────────────
  {
    name: "Asics Gel-Kayano 30",
    brand: "Asics",
    category: Category.SPORTS,
    price: 179.99,
    comparePrice: 200.0,
    description:
      "Built for overpronators who refuse to compromise on comfort, the Asics Gel-Kayano 30 features the brand's best-in-class GEL cushioning and a Dynamic DuoMax support system. Whether you're training for a marathon or logging daily miles, the Kayano 30 keeps you supported mile after mile.",
    images: [img(901), img(902), img(903)],
    sizes: UNISEX_SIZES,
    rating: 4.6,
    stock: 80,
  },
  {
    name: "Under Armour HOVR Phantom 3",
    brand: "Under Armour",
    category: Category.SPORTS,
    price: 149.99,
    comparePrice: 175.0,
    description:
      "The Under Armour HOVR Phantom 3 delivers zero-gravity cushioning that eliminates impact without sacrificing energy return. The UA MapSole outsole and integrated chip track every run so you can analyze and improve your training data via the UA Run app.",
    images: [img(1001), img(1002), img(1003)],
    sizes: UNISEX_SIZES,
    rating: 4.4,
    stock: 65,
  },
  // ── Casual ───────────────────────────────────────────────────────────────
  {
    name: "Vans Old Skool Pro",
    brand: "Vans",
    category: Category.CASUAL,
    price: 79.99,
    comparePrice: 95.0,
    description:
      "The Vans Old Skool Pro takes the classic canvas-and-suede skate shoe and upgrades it with a UltraCush HD sockliners for superior comfort and impact protection. The iconic sidestripe and waffle outsole remain exactly as they should — timeless.",
    images: [img(1101), img(1102), img(1103)],
    sizes: UNISEX_SIZES,
    rating: 4.5,
    stock: 180,
  },
  {
    name: "Converse Chuck 70 Hi",
    brand: "Converse",
    category: Category.CASUAL,
    price: 94.99,
    comparePrice: 110.0,
    description:
      "The Converse Chuck 70 Hi is a premium take on the original basketball shoe that defined casual cool. Heavier canvas, better cushioning, and an ortholite insole make this the most comfortable Chuck ever made. Wear it with everything — because you always have.",
    images: [img(1201), img(1202), img(1203)],
    sizes: UNISEX_SIZES,
    rating: 4.6,
    stock: 160,
  },
];

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.wishlistProduct.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.size.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.discountCode.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();

  // ── Admin user ────────────────────────────────────────────────────────────
  const admin = await prisma.user.create({
    data: {
      name: "Sneaqr Admin",
      email: "admin@sneaqr.com",
      password: hash("sha256", "admin1234"),
      role: "ADMIN",
    },
  });
  console.log(`  ✔ Created admin user: ${admin.email}`);

  // ── Demo user ─────────────────────────────────────────────────────────────
  const demoUser = await prisma.user.create({
    data: {
      name: "Jordan Lee",
      email: "jordan@example.com",
      password: hash("sha256", "password123"),
      role: "USER",
    },
  });
  console.log(`  ✔ Created demo user: ${demoUser.email}`);

  // ── Products ──────────────────────────────────────────────────────────────
  const createdProducts = [];

  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: slugify(p.name),
        description: p.description,
        price: p.price,
        comparePrice: p.comparePrice,
        brand: p.brand,
        category: p.category,
        images: p.images,
        stock: p.stock,
        rating: p.rating,
        sizes: {
          create: makeSizes(p.sizes),
        },
      },
    });
    createdProducts.push(product);
    console.log(`  ✔ Created product: ${product.name}`);
  }

  // ── Reviews ───────────────────────────────────────────────────────────────
  const reviewComments = [
    "Absolutely love these! Comfort and style in one package.",
    "Great fit, true to size. Would buy again.",
    "Solid build quality. Had them for 6 months and still going strong.",
    "Perfect for daily wear. Lightweight and breathable.",
    "Exactly as described. Fast shipping too!",
  ];

  for (const product of createdProducts.slice(0, 6)) {
    await prisma.review.create({
      data: {
        userId: demoUser.id,
        productId: product.id,
        rating: Math.floor(product.rating),
        comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
      },
    });
  }
  console.log("  ✔ Created sample reviews");

  // ── Wishlist ──────────────────────────────────────────────────────────────
  await prisma.wishlist.create({
    data: {
      userId: demoUser.id,
      products: {
        create: createdProducts.slice(0, 3).map((p) => ({ productId: p.id })),
      },
    },
  });
  console.log("  ✔ Created demo wishlist");

  // ── Discount codes ────────────────────────────────────────────────────────
  const codes = [
    { code: "SNEAQR10", percent: 10, maxUses: 500 },
    { code: "WELCOME20", percent: 20, maxUses: 100 },
    { code: "FLASH15", percent: 15, maxUses: 50, expiresAt: new Date("2025-12-31") },
  ];

  await prisma.discountCode.createMany({ data: codes });
  console.log("  ✔ Created discount codes");

  // ── Newsletter ────────────────────────────────────────────────────────────
  await prisma.newsletterSubscriber.createMany({
    data: [
      { email: "sarah@example.com" },
      { email: "mike@example.com" },
      { email: "priya@example.com" },
    ],
  });
  console.log("  ✔ Created newsletter subscribers");

  console.log("\n✅ Seeding complete!");
  console.log(`   ${createdProducts.length} products | 2 users | 3 discount codes`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
