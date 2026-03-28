import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, Heart, User, ChevronRight } from "lucide-react";

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

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [user, orderCount, recentOrders, wishlist] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, createdAt: true },
    }),
    prisma.order.count({ where: { userId } }),
    prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        status: true,
        total: true,
        createdAt: true,
        _count: { select: { items: true } },
      },
    }),
    prisma.wishlist.findUnique({
      where: { userId },
      select: { products: { select: { productId: true } } },
    }),
  ]);

  const wishlistCount = wishlist?.products.length ?? 0;

  return (
    <div className="space-y-6">

      {/* Welcome banner */}
      <div className="bg-white rounded-2xl shadow-sm px-6 py-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
          Welcome back
        </p>
        <h1 className="text-2xl font-black text-soft-black">
          {user?.name ?? user?.email?.split("@")[0]}
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">{user?.email}</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Link
          href="/dashboard/orders"
          className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-3"
        >
          <Package size={20} className="text-accent" />
          <div>
            <p className="text-2xl font-black text-soft-black">{orderCount}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Orders</p>
          </div>
        </Link>

        <Link
          href="/dashboard/wishlist"
          className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-3"
        >
          <Heart size={20} className="text-accent" />
          <div>
            <p className="text-2xl font-black text-soft-black">{wishlistCount}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Wishlist</p>
          </div>
        </Link>

        <Link
          href="/dashboard/profile"
          className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-3"
        >
          <User size={20} className="text-accent" />
          <div>
            <p className="text-sm font-semibold text-soft-black mt-1">Profile</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Edit info</p>
          </div>
        </Link>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-soft-black">Recent Orders</h2>
          <Link
            href="/dashboard/orders"
            className="text-xs text-accent font-semibold flex items-center gap-1 hover:underline"
          >
            View all <ChevronRight size={13} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <Package size={36} className="mx-auto text-gray-200 mb-3" />
            <p className="text-sm font-semibold text-gray-500">No orders yet</p>
            <p className="text-xs text-gray-400 mt-1">Your orders will appear here once placed</p>
            <Link
              href="/shop"
              className="mt-5 inline-block px-5 py-2.5 rounded-xl bg-soft-black text-white text-xs font-bold hover:bg-accent hover:text-soft-black transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {recentOrders.map((order) => (
              <li key={order.id}>
                <Link
                  href="/dashboard/orders"
                  className="flex items-center justify-between px-6 py-4 hover:bg-light-gray transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-soft-black">
                      #{order.id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order._count.items} item{order._count.items !== 1 ? "s" : ""} ·{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`hidden sm:inline text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        STATUS_STYLES[order.status]
                      }`}
                    >
                      {STATUS_LABELS[order.status]}
                    </span>
                    <span className="text-sm font-bold text-soft-black">
                      ${order.total.toFixed(2)}
                    </span>
                    <ChevronRight size={15} className="text-gray-300" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
