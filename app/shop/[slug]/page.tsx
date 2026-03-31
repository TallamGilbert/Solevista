import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";

import { MOCK_PRODUCTS, getProductBySlug } from "@/lib/mock-products";
import ProductCard from "@/components/ui/ProductCard";
import ProductGallery from "./ProductGallery";
import ProductActions from "./ProductActions";
import DescriptionAccordion from "./DescriptionAccordion";
import WriteReviewModal from "./WriteReviewModal";

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `Shop ${product.name} by ${product.brand} at Sneaqr. KSh ${Math.round(product.price).toLocaleString()}.`,
  };
}

// ─── Mock reviews ─────────────────────────────────────────────────────────────

const MOCK_REVIEWS = [
  {
    id: "r1",
    name: "Brian M.",
    initials: "BM",
    color: "bg-yellow-100 text-yellow-700",
    rating: 5,
    date: "March 12, 2025",
    comment:
      "Absolutely love these. Fit is true to size, comfort is top tier. The quality is immediately obvious — worth every penny.",
  },
  {
    id: "r2",
    name: "Aisha N.",
    initials: "AN",
    color: "bg-purple-100 text-purple-700",
    rating: 4,
    date: "February 28, 2025",
    comment:
      "Great shoe overall. Styling is versatile and the cushioning is great for all-day wear. Docked one star because delivery took an extra day.",
  },
  {
    id: "r3",
    name: "Odhiambo J.",
    initials: "OJ",
    color: "bg-blue-100 text-blue-700",
    rating: 5,
    date: "January 19, 2025",
    comment:
      "Third pair from Sneaqr and as always — no complaints. Size guide was spot on. Already eyeing my next pickup.",
  },
];

// ─── Star row ─────────────────────────────────────────────────────────────────

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          className={i < Math.round(rating) ? "fill-accent" : "fill-gray-200"}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  // Related: same category, excluding self — take up to 4
  const related = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  // Fill with other products if category has < 4
  if (related.length < 4) {
    const others = MOCK_PRODUCTS.filter(
      (p) => p.id !== product.id && !related.find((r) => r.id === p.id)
    );
    related.push(...others.slice(0, 4 - related.length));
  }

  const description =
    product.description ??
    `The ${product.name} is a premium footwear piece from ${product.brand}, designed for those who demand both style and performance. Crafted with quality materials and thoughtful construction, this shoe delivers on every front — from everyday wear to special occasions.`;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 md:py-12">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-soft-black transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:text-soft-black transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-soft-black transition-colors capitalize"
        >
          {product.category.charAt(0) + product.category.slice(1).toLowerCase()}
        </Link>
        <ChevronRight size={12} />
        <span className="text-soft-black font-medium truncate max-w-[180px]">{product.name}</span>
      </nav>

      {/* Product hero — gallery + info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">

        {/* Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Info column */}
        <div className="flex flex-col gap-5">

          {/* Brand + name */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
              {product.brand}
            </p>
            <h1 className="text-2xl md:text-3xl font-black text-soft-black leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2.5">
              <Stars rating={product.rating} />
              <span className="text-sm font-semibold text-soft-black">{product.rating}</span>
              <span className="text-sm text-gray-400">
                ({product.reviewCount} review{product.reviewCount !== 1 ? "s" : ""})
              </span>
            </div>
          </div>

          {/* Interactive actions: price, size, cart, wishlist */}
          <ProductActions product={product} />

          {/* Description accordion */}
          <DescriptionAccordion description={description} />
        </div>
      </div>

      {/* ── Reviews ─────────────────────────────────────────────────────────── */}
      <section className="mt-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-soft-black">Customer Reviews</h2>
            {/* Rating summary */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-4xl font-black text-soft-black">{product.rating}</span>
              <div className="flex flex-col gap-1">
                <Stars rating={product.rating} size={16} />
                <span className="text-xs text-gray-500">
                  Based on {product.reviewCount} reviews
                </span>
              </div>
            </div>
          </div>
          <WriteReviewModal productId={product.id} />
        </div>

        {/* Rating breakdown bars */}
        <div className="flex flex-col gap-1.5 mb-8 max-w-xs">
          {[5, 4, 3, 2, 1].map((star) => {
            // Simulate a bell-curve distribution
            const pct = [62, 24, 9, 3, 2][5 - star];
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-3">{star}</span>
                <Star size={10} strokeWidth={0} className="fill-accent flex-shrink-0" />
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-6 text-right">{pct}%</span>
              </div>
            );
          })}
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_REVIEWS.map(({ id, name, initials, color, rating, date, comment }) => (
            <div
              key={id}
              className="flex flex-col gap-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-50"
            >
              <div className="flex items-center justify-between">
                <Stars rating={rating} />
                <span className="text-[11px] text-gray-400">{date}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed flex-1">
                &ldquo;{comment}&rdquo;
              </p>
              <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
                <div
                  className={[
                    "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0",
                    color,
                  ].join(" ")}
                >
                  {initials}
                </div>
                <span className="text-sm font-semibold text-soft-black">{name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related products ──────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-black text-soft-black">You May Also Like</h2>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-soft-black transition-colors"
            >
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide -mx-6 px-6 md:-mx-0 md:px-0">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                slug={p.slug}
                name={p.name}
                brand={p.brand}
                price={p.price}
                comparePrice={p.comparePrice}
                image={p.image}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
