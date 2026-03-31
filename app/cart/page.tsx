"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const MOCK_DISCOUNT_CODES: Record<string, number> = {
  SNEAQR10: 10,
  WELCOME20: 20,
  FLASH15: 15,
};

const SHIPPING_THRESHOLD = 13000;

export default function CartPage() {
  const { cartItems, cartCount, cartTotal, updateQuantity, removeItem } = useCart();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [discountPct, setDiscountPct] = useState(0);
  const [codeError, setCodeError] = useState("");

  useEffect(() => setMounted(true), []);

  function applyCode() {
    const upper = code.trim().toUpperCase();
    if (MOCK_DISCOUNT_CODES[upper]) {
      setAppliedCode(upper);
      setDiscountPct(MOCK_DISCOUNT_CODES[upper]);
      setCodeError("");
    } else {
      setCodeError("Invalid or expired code.");
    }
  }

  function removeCode() {
    setAppliedCode(null);
    setDiscountPct(0);
    setCode("");
    setCodeError("");
  }

  const shipping = cartTotal >= SHIPPING_THRESHOLD ? 0 : 500;
  const discountAmount = (cartTotal * discountPct) / 100;
  const orderTotal = cartTotal - discountAmount + shipping;

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
          <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-24 flex flex-col items-center gap-6 text-center">
        <div className="w-20 h-20 rounded-2xl bg-light-gray flex items-center justify-center">
          <ShoppingBag size={36} className="text-gray-300" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-soft-black">Your cart is empty</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xs">
            Looks like you haven&apos;t added anything yet. Browse our collection and find your next pair.
          </p>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-accent text-soft-black font-bold text-sm hover:bg-yellow-400 transition-all duration-150 active:scale-95"
        >
          Shop Now <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-10">
      <h1 className="text-3xl font-black text-soft-black mb-8">
        Your Cart
        <span className="ml-3 text-lg font-semibold text-gray-400">
          ({cartCount} item{cartCount !== 1 ? "s" : ""})
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Cart items ───────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm"
            >
              {/* Image */}
              <Link href={`/shop/${item.slug}`} className="flex-shrink-0">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-light-gray">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      {item.brand}
                    </p>
                    <Link
                      href={`/shop/${item.slug}`}
                      className="text-sm font-semibold text-soft-black hover:text-accent transition-colors line-clamp-2 leading-snug"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">Size UK {item.size}</p>
                  </div>
                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.productId, item.size)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="p-1.5 rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors duration-150 flex-shrink-0"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Price + qty */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-sm font-black text-soft-black">
                    KSh {Math.round(item.price * item.quantity).toLocaleString()}
                  </span>

                  {/* Quantity stepper */}
                  <div className="flex items-center gap-1 border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                      className="px-3 py-2 text-gray-500 hover:bg-light-gray disabled:opacity-30 transition-colors duration-150"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="px-3 text-sm font-semibold text-soft-black min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                      disabled={item.quantity >= 10}
                      className="px-3 py-2 text-gray-500 hover:bg-light-gray disabled:opacity-30 transition-colors duration-150"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Continue shopping */}
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-soft-black transition-colors duration-150 self-start mt-2"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* ── Order summary ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-5 sticky top-24">
            <h2 className="text-base font-black text-soft-black">Order Summary</h2>

            {/* Line items */}
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-soft-black">KSh {Math.round(cartTotal).toLocaleString()}</span>
              </div>

              {discountPct > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discountPct}%)</span>
                  <span className="font-semibold">−KSh {Math.round(discountAmount).toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-soft-black">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `KSh ${shipping.toLocaleString()}`
                  )}
                </span>
              </div>

              {shipping > 0 && (
                <p className="text-[11px] text-gray-400">
                  Add KSh {Math.round(SHIPPING_THRESHOLD - cartTotal).toLocaleString()} more for free shipping
                </p>
              )}

              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-black text-soft-black">Total</span>
                <span className="font-black text-soft-black text-base">
                  KSh {Math.round(orderTotal).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Discount code */}
            <div className="flex flex-col gap-2">
              {appliedCode ? (
                <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2">
                    <Tag size={13} className="text-green-600" />
                    <span className="text-xs font-bold text-green-700">{appliedCode}</span>
                    <span className="text-xs text-green-600">applied</span>
                  </div>
                  <button
                    onClick={removeCode}
                    className="text-green-500 hover:text-green-700"
                    aria-label="Remove discount code"
                  >
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.toUpperCase());
                      setCodeError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && applyCode()}
                    placeholder="Discount code"
                    className="flex-1 px-3.5 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <button
                    onClick={applyCode}
                    className="px-4 py-2.5 rounded-2xl bg-soft-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors duration-150"
                  >
                    Apply
                  </button>
                </div>
              )}
              {codeError && (
                <p className="text-xs text-red-500">{codeError}</p>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={() => router.push("/checkout")}
              className="w-full py-4 rounded-2xl bg-accent text-soft-black font-black text-sm hover:bg-yellow-400 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </button>

            <p className="text-[11px] text-center text-gray-400">
              Secure checkout · SSL encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
