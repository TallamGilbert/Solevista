"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  comparePrice?: number | null;
  image: string;
  /** Optional: start with item already wishlisted */
  wishlisted?: boolean;
  /** Grid mode: full-width instead of fixed scroll width */
  fullWidth?: boolean;
}

export default function ProductCard({
  slug,
  name,
  brand,
  price,
  comparePrice,
  image,
  wishlisted = false,
  fullWidth = false,
}: ProductCardProps) {
  const [liked, setLiked] = useState(wishlisted);

  const discount =
    comparePrice && comparePrice > price
      ? Math.round(((comparePrice - price) / comparePrice) * 100)
      : null;

  return (
    <article
      className={[
        "group relative rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden",
        fullWidth ? "w-full" : "flex-shrink-0 w-[220px] sm:w-[240px]",
      ].join(" ")}
    >

      {/* Image */}
      <Link href={`/products/${slug}`} className="block">
        <div className="relative w-full aspect-square bg-light-gray overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 220px, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount badge */}
          {discount && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-accent text-soft-black text-[11px] font-bold">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        onClick={() => setLiked((v) => !v)}
        aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        className={[
          "absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-110 active:scale-95",
          liked ? "text-red-500" : "text-gray-400",
        ].join(" ")}
      >
        <Heart
          size={16}
          strokeWidth={2}
          className={liked ? "fill-red-500" : "fill-none"}
        />
      </button>

      {/* Info */}
      <div className="px-4 py-3 flex flex-col gap-1">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          {brand}
        </p>
        <Link
          href={`/products/${slug}`}
          className="text-sm font-semibold text-soft-black leading-snug line-clamp-2 hover:text-accent transition-colors duration-150"
        >
          {name}
        </Link>

        {/* Price row */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-bold text-soft-black">
            ${price.toFixed(2)}
          </span>
          {comparePrice && comparePrice > price && (
            <span className="text-xs text-gray-400 line-through">
              ${comparePrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
