import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";

const STATUS_STYLES = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
} as const;

const STATUS_LABELS = {
  PENDING: "Pending",
  PAID: "Paid",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
} as const;

export default async function OrdersPage() {
  const session = await auth();
  const userId = session!.user.id;

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: { select: { name: true, images: true, slug: true } },
          size: { select: { label: true } },
        },
      },
    },
  });

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm px-6 py-5">
        <h1 className="text-xl font-black text-soft-black">Order History</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {orders.length} order{orders.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm px-6 py-16 text-center">
          <Package size={40} className="mx-auto text-gray-200 mb-4" />
          <p className="font-semibold text-gray-500">No orders yet</p>
          <p className="text-sm text-gray-400 mt-1">
            When you place an order it will appear here
          </p>
          <Link
            href="/shop"
            className="mt-5 inline-block px-5 py-2.5 rounded-xl bg-soft-black text-white text-sm font-semibold hover:bg-accent hover:text-soft-black transition-colors"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">

              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-soft-black">
                    Order #{order.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      STATUS_STYLES[order.status]
                    }`}
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                  <span className="text-sm font-bold text-soft-black">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Line items */}
              <ul className="divide-y divide-gray-50">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="relative w-14 h-14 rounded-xl bg-light-gray overflow-hidden flex-shrink-0">
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="text-sm font-semibold text-soft-black truncate hover:text-accent transition-colors block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Size {item.size.label} · Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-soft-black flex-shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
