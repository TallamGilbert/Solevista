import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard, { ProductCardProps } from "./ProductCard";

const FEATURED: ProductCardProps[] = [
  {
    id: "1",
    slug: "nike-air-max-270-react",
    name: "Nike Air Max 270 React",
    brand: "Nike",
    price: 159.99,
    comparePrice: 190.0,
    image: "https://picsum.photos/seed/sneaqr-101/600/600",
  },
  {
    id: "2",
    slug: "adidas-ultraboost-22",
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    price: 189.99,
    comparePrice: 220.0,
    image: "https://picsum.photos/seed/sneaqr-201/600/600",
  },
  {
    id: "3",
    slug: "jordan-1-retro-high-og",
    name: "Jordan 1 Retro High OG",
    brand: "Jordan",
    price: 219.99,
    comparePrice: 250.0,
    image: "https://picsum.photos/seed/sneaqr-701/600/600",
  },
  {
    id: "4",
    slug: "new-balance-550-white-green",
    name: "New Balance 550",
    brand: "New Balance",
    price: 129.99,
    comparePrice: 150.0,
    image: "https://picsum.photos/seed/sneaqr-801/600/600",
  },
  {
    id: "5",
    slug: "vans-old-skool-pro",
    name: "Vans Old Skool Pro",
    brand: "Vans",
    price: 79.99,
    comparePrice: 95.0,
    image: "https://picsum.photos/seed/sneaqr-1101/600/600",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
              Handpicked
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-soft-black">
              Featured Products
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-soft-black hover:text-accent transition-colors duration-150 group"
          >
            View all
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-150" />
          </Link>
        </div>

        {/* Scrollable row */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 md:-mx-0 md:px-0">
          {FEATURED.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Mobile "view all" */}
        <div className="mt-6 sm:hidden">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-1.5 w-full py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-soft-black hover:bg-light-gray transition-colors duration-150"
          >
            View all products <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
