"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ShippingForm, { ShippingFormData } from "./ShippingForm";
import PaymentStep from "./PaymentStep";
import CheckoutSummary from "./CheckoutSummary";

type Step = 1 | 2;

const STEPS = [
  { id: 1, label: "Shipping" },
  { id: 2, label: "Payment" },
];

const SHIPPING_THRESHOLD = 100;

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map(({ id, label }, idx) => {
        const done = current > id;
        const active = current === id;
        return (
          <div key={id} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={[
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                  done
                    ? "bg-green-500 text-white"
                    : active
                    ? "bg-soft-black text-white"
                    : "bg-gray-100 text-gray-400",
                ].join(" ")}
              >
                {done ? <Check size={13} strokeWidth={2.5} /> : id}
              </div>
              <span
                className={[
                  "text-sm font-semibold hidden sm:block",
                  active ? "text-soft-black" : done ? "text-green-600" : "text-gray-400",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={[
                  "w-12 h-px mx-1 transition-colors duration-300",
                  done ? "bg-green-400" : "bg-gray-200",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CheckoutPage() {
  const { cartCount, cartTotal } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);

  useEffect(() => setMounted(true), []);

  // Redirect to cart if empty
  useEffect(() => {
    if (mounted && cartCount === 0) router.replace("/cart");
  }, [mounted, cartCount, router]);

  if (!mounted || cartCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="h-8 w-48 bg-gray-200 rounded-full animate-pulse mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
          <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  const shipping = cartTotal >= SHIPPING_THRESHOLD ? 0 : 9.99;
  const orderTotal = cartTotal + shipping;

  function handleShippingSubmit(data: ShippingFormData) {
    setShippingData(data);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h1 className="text-2xl font-black text-soft-black">Checkout</h1>
        <StepIndicator current={step} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Main form area ───────────────────────────────────────────────── */}
        <div className="lg:col-span-2">

          {/* Mobile summary at top */}
          <div className="mb-6 lg:hidden">
            <CheckoutSummary shipping={shipping} />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {step === 1 && (
              <>
                <h2 className="text-base font-black text-soft-black mb-6">
                  Shipping Information
                </h2>
                <ShippingForm
                  defaultValues={shippingData ?? undefined}
                  onSubmit={handleShippingSubmit}
                />
              </>
            )}

            {step === 2 && shippingData && (
              <>
                {/* Shipping recap */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                        Shipping to
                      </p>
                      <p className="text-sm font-semibold text-soft-black mt-0.5">
                        {shippingData.firstName} {shippingData.lastName} ·{" "}
                        {shippingData.address}, {shippingData.city}, {shippingData.country}
                      </p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-accent hover:text-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <h2 className="text-base font-black text-soft-black mb-6">
                  Payment
                </h2>
                <PaymentStep
                  shippingData={shippingData}
                  total={orderTotal}
                  onBack={() => setStep(1)}
                />
              </>
            )}
          </div>
        </div>

        {/* ── Desktop summary ──────────────────────────────────────────────── */}
        <div className="hidden lg:block">
          <CheckoutSummary shipping={shipping} />
        </div>
      </div>
    </div>
  );
}
