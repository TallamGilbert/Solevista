"use client";

import { CreditCard, Smartphone } from "lucide-react";

export type PaymentMethod = "card";

const METHODS = [
  {
    id: "card" as PaymentMethod,
    label: "Card",
    Icon: CreditCard,
    comingSoon: false,
  },
  {
    id: "mpesa" as const,
    label: "M-Pesa",
    Icon: Smartphone,
    comingSoon: true,
  },
];

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div className="flex gap-3">
      {METHODS.map(({ id, label, Icon, comingSoon }) => {
        const isActive = !comingSoon && selected === id;
        const disabled = comingSoon;

        return (
          <button
            key={id}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onSelect(id as PaymentMethod)}
            className={[
              "relative flex items-center gap-2.5 flex-1 px-4 py-3.5 rounded-2xl border text-sm font-semibold transition-all duration-150",
              isActive
                ? "border-soft-black bg-soft-black text-white"
                : disabled
                ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                : "border-gray-200 text-gray-600 hover:border-soft-black",
            ].join(" ")}
          >
            <Icon size={16} strokeWidth={1.75} />
            {label}
            {comingSoon && (
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                Soon
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
