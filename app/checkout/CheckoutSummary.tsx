"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CheckoutSummaryProps {
  shipping?: number;
  discount?: number;
}

export default function CheckoutSummary({
  shipping = 0,
  discount = 0,
}: CheckoutSummaryProps) {
  const { cartItems, cartTotal } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const orderTotal = cartTotal - discount + shipping;

  const content = (
    <div className="flex flex-col gap-5">
      {/* Items */}
      <div className="flex flex-col gap-3">
        {cartItems.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-light-gray flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="56px"
              />
              {/* Qty badge */}
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-soft-black text-white text-[10px] font-bold flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-soft-black truncate">{item.name}</p>
              <p className="text-[11px] text-gray-400">Size UK {item.size}</p>
            </div>
            <span className="text-xs font-bold text-soft-black flex-shrink-0">
              KSh {Math.round(item.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span className="font-semibold text-soft-black">KSh {Math.round(cartTotal).toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-semibold">−KSh {Math.round(discount).toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span className="font-semibold text-soft-black">
            {shipping === 0 ? <span className="text-green-600">Free</span> : `KSh ${Math.round(shipping).toLocaleString()}`}
          </span>
        </div>
        <div className="flex justify-between pt-3 border-t border-gray-100">
          <span className="font-black text-soft-black">Total</span>
          <span className="font-black text-soft-black">KSh {Math.round(orderTotal).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile — collapsible toggle */}
      <div className="lg:hidden bg-white rounded-2xl shadow-sm overflow-hidden">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4"
        >
          <span className="text-sm font-bold text-soft-black">
            Order Summary ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-soft-black">KSh {Math.round(orderTotal).toLocaleString()}</span>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>
        {mobileOpen && <div className="px-5 pb-5">{content}</div>}
      </div>

      {/* Desktop — always visible */}
      <div className="hidden lg:block bg-white rounded-2xl p-6 shadow-sm sticky top-24">
        <h2 className="text-base font-black text-soft-black mb-5">Order Summary</h2>
        {content}
      </div>
    </>
  );
}
