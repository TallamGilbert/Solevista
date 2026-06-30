"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "./actions";

type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "PAID",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pending",
  PAID: "Paid",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  PAID: "bg-blue-100 text-blue-700 border-blue-200",
  SHIPPED: "bg-purple-100 text-purple-700 border-purple-200",
  DELIVERED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
};

export default function StatusDropdown({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: OrderStatus;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={currentStatus}
      disabled={isPending}
      onChange={(e) => {
        const status = e.target.value as OrderStatus;
        startTransition(() => {
          updateOrderStatus(orderId, status);
        });
      }}
      className={[
        "text-[11px] font-semibold px-2 py-1 rounded-lg border cursor-pointer",
        "focus:outline-none focus:ring-1 focus:ring-accent transition-opacity",
        "disabled:opacity-50",
        STATUS_STYLES[currentStatus],
      ].join(" ")}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
