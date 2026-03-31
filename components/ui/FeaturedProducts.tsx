import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock-products";

const FEATURED_SLUGS = [
  "nike-air-max-270-react",
  "adidas-ultraboost-22",
  "jordan-1-retro-high-og",
  "new-balance-550-white-green",
  "vans-old-skool-pro",
];

const FEATURED = MOCK_PRODUCTS.filter((p) =>
  FEATURED_SLUGS.includes(p.slug),
).sort(
  (a, b) => FEATURED_SLUGS.indexOf(a.slug) - FEATURED_SLUGS.indexOf(b.slug),
);

export default function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-soft-black">
            Featured
          </h2>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 hover:text-soft-black transition-colors duration-150 group"
          >
            View all
            <ArrowRight
              size={15}
              className="group-hover:translate-x-0.5 transition-transform duration-150"
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {FEATURED.map(({ id, slug, name, price, image }) => (
            <Link key={id} href={`/shop/${slug}`} className="group">
              <div className="relative w-full aspect-square bg-light-gray rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <p className="text-sm font-semibold text-soft-black leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-150">
                {name}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                KSh {Math.round(price).toLocaleString()}
              </p>
            </Link>
          ))}
        </div>

        {/* Mobile "view all" */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-1.5 w-full py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-soft-black"
          >
            View all products <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
