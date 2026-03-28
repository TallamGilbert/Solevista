"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Check, Truck, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { MockProduct } from "@/lib/mock-products";

interface ProductActionsProps {
  product: MockProduct;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addItem, cartItems } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const oos = product.outOfStockSizes ?? [];

  // Check if this exact size is already in the cart
  const inCart = cartItems.some(
    (i) => i.productId === product.id && i.size === selectedSize
  );

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const discount =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(
          ((product.comparePrice - product.price) / product.comparePrice) * 100
        )
      : null;

  return (
    <div className="flex flex-col gap-6">

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-black text-soft-black">
          ${product.price.toFixed(2)}
        </span>
        {product.comparePrice && product.comparePrice > product.price && (
          <span className="text-lg text-gray-400 line-through">
            ${product.comparePrice.toFixed(2)}
          </span>
        )}
        {discount && (
          <span className="px-2.5 py-0.5 rounded-full bg-accent text-soft-black text-xs font-bold">
            -{discount}%
          </span>
        )}
      </div>

      {/* Size selector */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-soft-black">
            Select Size
            {selectedSize && (
              <span className="ml-2 font-normal text-gray-500">US {selectedSize}</span>
            )}
          </label>
          <button className="text-xs text-gray-400 underline underline-offset-2 hover:text-soft-black transition-colors">
            Size guide
          </button>
        </div>

        <div
          className={[
            "grid grid-cols-5 gap-2 rounded-2xl transition-all duration-200",
            sizeError ? "outline outline-2 outline-red-400 outline-offset-4" : "",
          ].join(" ")}
        >
          {product.sizes.map((size) => {
            const isOos = oos.includes(size);
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                disabled={isOos}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                className={[
                  "py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 relative",
                  isSelected
                    ? "bg-accent text-soft-black border-accent shadow-sm"
                    : isOos
                    ? "text-gray-300 border-gray-100 cursor-not-allowed line-through"
                    : "text-gray-700 border-gray-200 hover:border-soft-black",
                ].join(" ")}
              >
                {size}
              </button>
            );
          })}
        </div>

        {sizeError && (
          <p className="text-xs text-red-500 font-medium animate-pulse">
            Please select a size before adding to cart.
          </p>
        )}
      </div>

      {/* CTA row */}
      <div className="flex gap-3">
        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className={[
            "flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-[0.98]",
            added
              ? "bg-green-500 text-white"
              : "bg-accent text-soft-black hover:bg-yellow-400 shadow-lg shadow-accent/20",
          ].join(" ")}
        >
          {added ? (
            <>
              <Check size={18} strokeWidth={2.5} />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart size={18} strokeWidth={2} />
              {inCart ? "Add Another" : "Add to Cart"}
            </>
          )}
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted((v) => !v)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={[
            "p-4 rounded-2xl border transition-all duration-150 hover:scale-105 active:scale-95",
            wishlisted
              ? "bg-red-50 border-red-200 text-red-500"
              : "border-gray-200 text-gray-500 hover:border-soft-black",
          ].join(" ")}
        >
          <Heart
            size={20}
            strokeWidth={2}
            className={wishlisted ? "fill-red-500" : "fill-none"}
          />
        </button>
      </div>

      {/* Shipping info */}
      <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2.5 text-sm text-gray-600">
          <Truck size={16} className="text-gray-400 flex-shrink-0" />
          <span>
            <strong className="text-soft-black">Free shipping</strong> on orders over $100
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-600">
          <RotateCcw size={16} className="text-gray-400 flex-shrink-0" />
          <span>
            <strong className="text-soft-black">Free returns</strong> within 30 days
          </span>
        </div>
      </div>
    </div>
  );
}
