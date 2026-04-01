"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock } from "lucide-react";
import Script from "next/script";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import PaymentMethodSelector, { PaymentMethod } from "./PaymentMethodSelector";
import type { ShippingFormData } from "./ShippingForm";

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        channels?: string[];
        ref?: string;
        callback: (response: { reference: string; status: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

interface PaymentStepProps {
  shippingData: ShippingFormData;
  total: number;
  onBack: () => void;
}

export default function PaymentStep({ shippingData, total, onBack }: PaymentStepProps) {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function saveOrder(paystackReference: string) {
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
        paymentIntent: paystackReference,
      }),
    });
    if (!res.ok) throw new Error("Failed to save order");
  }

  async function handlePaystackSuccess(reference: string) {
    try {
      const verifyRes = await fetch("/api/paystack/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });

      if (!verifyRes.ok) {
        const errData = await verifyRes.json();
        throw new Error(errData.error ?? "Payment verification failed");
      }

      await saveOrder(reference);
      clearCart();
      router.push("/orders/confirmation");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  }

  function handlePay() {
    setError(null);
    setLoading(true);

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    // Mock/dev mode when no Paystack key is configured
    if (!publicKey) {
      setTimeout(async () => {
        try {
          await saveOrder(`mock_${Date.now()}`);
          clearCart();
          router.push("/orders/confirmation");
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Something went wrong";
          setError(msg);
          toast.error(msg);
          setLoading(false);
        }
      }, 1200);
      return;
    }

    if (!window.PaystackPop) {
      setError("Payment system not ready. Please refresh and try again.");
      setLoading(false);
      return;
    }

    const channels = method === "mpesa" ? ["mobile_money"] : ["card"];

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: shippingData.email,
      amount: Math.round(total * 100), // Paystack uses smallest currency unit (kobo/cents)
      currency: "KES",
      channels,
      callback: (response) => {
        handlePaystackSuccess(response.reference).catch(console.error);
      },
      onClose: () => {
        setLoading(false);
      },
    });

    handler.openIframe();
  }

  return (
    <div className="flex flex-col gap-6">
      <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />

      {/* Payment method tabs */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Payment Method
        </label>
        <PaymentMethodSelector selected={method} onSelect={setMethod} />
      </div>

      {/* Method info */}
      {method === "mpesa" ? (
        <div className="bg-green-50 border border-green-100 rounded-2xl px-4 py-3">
          <p className="text-sm text-green-800 font-semibold">M-Pesa via Paystack</p>
          <p className="text-xs text-green-700 mt-0.5">
            You&apos;ll be prompted to enter your M-Pesa number in the secure payment popup.
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
          <p className="text-sm text-soft-black font-semibold">Card Payment via Paystack</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Enter your card details securely in the Paystack payment popup.
          </p>
        </div>
      )}

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
          <ShieldCheck size={12} /> Powered by Paystack
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handlePay}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-accent text-soft-black font-black text-sm hover:bg-yellow-400 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-accent/20 disabled:opacity-60 disabled:cursor-wait"
        >
          {loading
            ? "Processing…"
            : `Pay KSh ${Math.round(total).toLocaleString()} · ${method === "mpesa" ? "M-Pesa" : "Card"}`}
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
    </div>
  );
}
