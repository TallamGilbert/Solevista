"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle, ShoppingBag, ArrowRight, Package, Mail } from "lucide-react";

function randomOrderId() {
  return "SNQ-" + Math.random().toString(36).toUpperCase().slice(2, 9);
}

const NEXT_STEPS = [
  {
    Icon: Mail,
    title: "Confirmation email sent",
    description: "Check your inbox for your order receipt and tracking details.",
  },
  {
    Icon: Package,
    title: "We're packing your order",
    description: "Most orders are processed and dispatched within 1–2 business days.",
  },
  {
    Icon: ShoppingBag,
    title: "Track your delivery",
    description: "A tracking link will be emailed once your order ships.",
  },
];

export default function ConfirmationPage() {
  // Generate a stable order ID for this page view
  const orderId = useRef(randomOrderId());

  // Confetti-style background pop on mount (CSS only via a brief class)
  useEffect(() => {
    document.title = "Order Confirmed | Sneaqr";
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-16 py-16 flex flex-col items-center gap-10 text-center">

      {/* Success icon */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
        <div className="relative w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle size={40} className="text-green-500" strokeWidth={1.75} />
        </div>
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-soft-black">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 mt-3 leading-relaxed max-w-sm mx-auto">
          Thank you for shopping with Sneaqr. Your order is being prepared and will
          be on its way soon.
        </p>
      </div>

      {/* Order ID card */}
      <div className="w-full bg-light-gray rounded-2xl px-6 py-5 flex items-center justify-between gap-4">
        <div className="text-left">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
            Order Number
          </p>
          <p className="text-lg font-black text-soft-black mt-0.5">{orderId.current}</p>
        </div>
        <div className="flex-shrink-0 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide">
          Processing
        </div>
      </div>

      {/* Next steps */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-sm font-bold text-soft-black uppercase tracking-wider text-left">
          What happens next
        </h2>
        {NEXT_STEPS.map(({ Icon, title, description }, idx) => (
          <div key={idx} className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm text-left">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon size={18} className="text-accent" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-bold text-soft-black">{title}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <Link
          href="/shop"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-accent text-soft-black font-bold text-sm hover:bg-yellow-400 active:scale-95 transition-all duration-150 shadow-lg shadow-accent/20"
        >
          Continue Shopping <ArrowRight size={15} />
        </Link>
        <Link
          href="/"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-gray-200 text-soft-black font-semibold text-sm hover:bg-light-gray transition-colors duration-150"
        >
          Back to Home
        </Link>
      </div>

      <p className="text-xs text-gray-400">
        Need help?{" "}
        <Link href="/contact" className="underline underline-offset-2 hover:text-soft-black transition-colors">
          Contact support
        </Link>
      </p>
    </div>
  );
}
