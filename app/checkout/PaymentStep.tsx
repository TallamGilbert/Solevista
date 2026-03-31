"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ShieldCheck, Lock } from "lucide-react";
import { getStripe } from "@/lib/stripe";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import PaymentMethodSelector, { PaymentMethod } from "./PaymentMethodSelector";
import type { ShippingFormData } from "./ShippingForm";

// ─── Inner form (must be inside <Elements>) ───────────────────────────────────

function CardPaymentForm({
  clientSecret,
  isMock,
  shippingData,
  total,
  onBack,
}: {
  clientSecret: string | null;
  isMock: boolean;
  shippingData: ShippingFormData;
  total: number;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  async function saveOrder(paymentIntentId?: string) {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems.map((item) => ({
          productId: item.productId || undefined,
          sizeId: item.sizeId || undefined,
          sizeLabel: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          name: `${shippingData.firstName} ${shippingData.lastName}`,
          line1: shippingData.address,
          city: shippingData.city,
          state: shippingData.city,
          zip: shippingData.postalCode,
          country: shippingData.country,
        },
        guestEmail: shippingData.email,
        paymentIntent: paymentIntentId,
      }),
    });
    if (!res.ok) throw new Error("Failed to save order");
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Dev/mock mode — no real Stripe key configured
      if (isMock || !clientSecret) {
        await new Promise((r) => setTimeout(r, 1200)); // Simulate network
        await saveOrder();
        clearCart();
        router.push("/orders/confirmation");
        return;
      }

      if (!stripe || !elements) {
        setError("Payment not ready yet. Please try again.");
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError("Card input not found.");
        setLoading(false);
        return;
      }

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${shippingData.firstName} ${shippingData.lastName}`,
              email: shippingData.email,
              address: {
                line1: shippingData.address,
                city: shippingData.city,
                country: shippingData.country,
                postal_code: shippingData.postalCode,
              },
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message ?? "Payment failed.");
      } else if (paymentIntent?.status === "succeeded") {
        await saveOrder(paymentIntent.id);
        clearCart();
        router.push("/orders/confirmation");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Card element */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Card Details
        </label>
        <div className="px-4 py-4 rounded-2xl border border-gray-200 bg-white focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-colors duration-150">
          {isMock ? (
            // Placeholder when Stripe key is not configured
            <div className="flex flex-col gap-1">
              <input
                placeholder="1234 5678 9012 3456"
                className="text-sm w-full focus:outline-none text-soft-black placeholder:text-gray-400"
                disabled={loading}
              />
              <p className="text-[11px] text-amber-600 mt-1">
                ⚠ Stripe not configured — running in demo mode
              </p>
            </div>
          ) : (
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "14px",
                    color: "#111111",
                    fontFamily: "inherit",
                    "::placeholder": { color: "#9ca3af" },
                  },
                  invalid: { color: "#ef4444" },
                },
                hidePostalCode: true,
              }}
            />
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-3 rounded-2xl">
          {error}
        </p>
      )}

      {/* Security badges */}
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <Lock size={12} /> SSL encrypted
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={12} /> Secure payment
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-accent text-soft-black font-black text-sm hover:bg-yellow-400 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-accent/20 disabled:opacity-60 disabled:cursor-wait"
        >
          {loading
            ? "Processing…"
            : `Place Order · KSh ${Math.round(total).toLocaleString()}`}
        </button>
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="text-sm text-gray-500 hover:text-soft-black transition-colors text-center disabled:opacity-40"
        >
          ← Back to Shipping
        </button>
      </div>
    </form>
  );
}

// ─── Outer wrapper (fetches intent + loads Stripe) ────────────────────────────

interface PaymentStepProps {
  shippingData: ShippingFormData;
  total: number;
  onBack: () => void;
}

export default function PaymentStep({ shippingData, total, onBack }: PaymentStepProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>("mpesa");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/checkout/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.mock) {
          setIsMock(true);
        } else {
          setClientSecret(data.clientSecret);
        }
        setReady(true);
      })
      .catch(() => {
        setIsMock(true);
        setReady(true);
      });
  }, [total]);

  if (!ready) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-12 bg-gray-100 rounded-2xl" />
        <div className="h-16 bg-gray-100 rounded-2xl" />
        <div className="h-14 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  const stripeOptions = clientSecret
    ? { clientSecret }
    : { mode: "payment" as const, amount: Math.round(total * 100), currency: "kes" };

  return (
    <div className="flex flex-col gap-6">
      {/* Payment method tabs */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Payment Method
        </label>
        <PaymentMethodSelector selected={method} onSelect={setMethod} />
      </div>

      {/* Card form inside Elements */}
      <Elements stripe={getStripe()} options={stripeOptions}>
        <CardPaymentForm
          clientSecret={clientSecret}
          isMock={isMock}
          shippingData={shippingData}
          total={total}
          onBack={onBack}
        />
      </Elements>
    </div>
  );
}
