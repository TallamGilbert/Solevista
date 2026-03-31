import { prisma } from "@/lib/prisma";
import Image from "next/image";
import StatusDropdown from "./StatusDropdown";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      items: {
        include: {
          product: { select: { name: true, images: true } },
          size: { select: { label: true } },
        },
      },
    },
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm px-6 py-5">
        <h1 className="text-xl font-black text-soft-black">Orders</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {orders.length} total order{orders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm px-6 py-14 text-center text-sm text-gray-400">
            No orders yet
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">

              {/* Order header row */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-soft-black">
                    #{order.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {order.user.name ?? order.user.email} ·{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusDropdown
                    orderId={order.id}
                    currentStatus={order.status}
                  />
                  <span className="text-sm font-bold text-soft-black">
                    KSh {Math.round(order.total).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Line items */}
              <div className="divide-y divide-gray-50">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 px-6 py-3">
                    <div className="relative w-10 h-10 rounded-lg bg-light-gray overflow-hidden flex-shrink-0">
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-soft-black truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Size {item.size.label} · Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-soft-black flex-shrink-0">
                      KSh {Math.round(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
