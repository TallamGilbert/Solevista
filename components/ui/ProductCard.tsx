"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
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
  id,
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
  const [loading, setLoading] = useState(false);

  const handleWishlistToggle = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await fetch("/api/wishlist", {
          method: liked ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: id }),
        });

        if (!response.ok) {
          throw new Error("Failed to update wishlist");
        }

        setLiked((v) => !v);
      } catch (error) {
        console.error("Wishlist error:", error);
      } finally {
        setLoading(false);
      }
    },
    [liked, id]
  );

  return (
    <article
      className={[
        "group relative rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden",
        fullWidth ? "w-full" : "flex-shrink-0 w-[220px] sm:w-[240px]",
      ].join(" ")}
    >

      {/* Image */}
      <Link href={`/shop/${slug}`} className="block">
        <div className="relative w-full aspect-square bg-light-gray overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 220px, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

        </div>
      </Link>

      {/* Wishlist button */}
      <button
        onClick={handleWishlistToggle}
        disabled={loading}
        aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        className={[
          "absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50",
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
          href={`/shop/${slug}`}
          className="text-sm font-semibold text-soft-black leading-snug line-clamp-2 hover:text-accent transition-colors duration-150"
        >
          {name}
        </Link>

        {/* Price row */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-bold text-soft-black">
            KSh {Math.round(price).toLocaleString()}
          </span>
          {comparePrice && comparePrice > price && (
            <span className="text-xs text-gray-400 line-through">
              KSh {Math.round(comparePrice).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
