"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Check, Truck, RotateCcw } from "lucide-react";

const WHATSAPP_NUMBER = "254700000000";
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
          KSh {Math.round(product.price).toLocaleString()}
        </span>
        {product.comparePrice && product.comparePrice > product.price && (
          <span className="text-lg text-gray-400 line-through">
            KSh {Math.round(product.comparePrice).toLocaleString()}
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
              <span className="ml-2 font-normal text-gray-500">UK {selectedSize}</span>
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

      {/* WhatsApp enquiry */}
      {(() => {
        const text = `Hi! I'm interested in the *${product.name}* by ${product.brand} (KSh ${Math.round(product.price).toLocaleString()})${selectedSize ? ` in size UK ${selectedSize}` : ""}. Is it available?`;
        return (
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-[#25D366] text-[#25D366] font-semibold text-sm hover:bg-[#25D366] hover:text-white transition-all duration-200 active:scale-[0.98]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-4 h-4 flex-shrink-0 fill-current"
              aria-hidden="true"
            >
              <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.627 4.64 1.813 6.64L2.667 29.333l6.88-1.787A13.29 13.29 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16c0-7.36-5.973-13.333-13.329-13.333zm0 24a11.6 11.6 0 0 1-5.92-1.627l-.427-.253-4.08 1.053 1.08-3.947-.28-.44A11.56 11.56 0 0 1 4.667 16c0-6.253 5.08-11.333 11.333-11.333S27.333 9.747 27.333 16 22.253 26.667 16.004 26.667zm6.213-8.48c-.347-.173-2.04-1-2.36-1.12-.32-.12-.547-.173-.773.173-.227.347-.88 1.12-1.08 1.347-.2.227-.4.253-.747.08-.347-.173-1.453-.533-2.773-1.707-1.027-.907-1.72-2.027-1.92-2.373-.2-.347-.02-.533.147-.707.16-.16.347-.413.52-.627.173-.213.227-.347.347-.573.12-.227.053-.44-.027-.613-.08-.173-.773-1.88-1.067-2.573-.28-.667-.56-.573-.773-.587-.2-.013-.427-.013-.653-.013a1.26 1.26 0 0 0-.907.427c-.307.333-1.187 1.16-1.187 2.827 0 1.667 1.213 3.28 1.387 3.507.173.227 2.387 3.64 5.787 5.107.813.347 1.44.56 1.933.72.813.253 1.547.213 2.133.133.653-.093 2.04-.84 2.32-1.64.28-.813.28-1.507.2-1.653-.08-.133-.307-.213-.653-.387z"/>
            </svg>
            Enquire on WhatsApp
          </a>
        );
      })()}

      {/* Shipping info */}
      <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2.5 text-sm text-gray-600">
          <Truck size={16} className="text-gray-400 flex-shrink-0" />
          <span>
            <strong className="text-soft-black">Free shipping</strong> on orders over KSh 13,000
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
