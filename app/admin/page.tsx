import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShoppingBag, Package, Users, DollarSign, ChevronRight, TrendingUp } from "lucide-react";

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

export default async function AdminPage() {
  const [totalOrders, revenue, totalProducts, totalUsers, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.product.count(),
      prisma.user.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true, email: true } },
          _count: { select: { items: true } },
        },
      }),
    ]);

  const totalRevenue = revenue._sum.total ?? 0;

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: ShoppingBag,
      href: "/admin/orders",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Revenue",
      value: `$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      href: "/admin/orders",
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Products",
      value: totalProducts.toLocaleString(),
      icon: Package,
      href: "/admin/products",
      color: "bg-accent/10 text-yellow-600",
    },
    {
      label: "Customers",
      value: totalUsers.toLocaleString(),
      icon: Users,
      href: "/admin/orders",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm px-6 py-5 flex items-center gap-3">
        <TrendingUp size={22} className="text-accent" />
        <div>
          <h1 className="text-xl font-black text-soft-black">Admin Overview</h1>
          <p className="text-sm text-gray-400 mt-0.5">Store performance at a glance</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              <Icon size={20} />
            </div>
            <p className="text-2xl font-black text-soft-black">{value}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-soft-black">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-xs text-accent font-semibold flex items-center gap-1 hover:underline"
          >
            View all <ChevronRight size={13} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-gray-400">
            No orders yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Order
                  </th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Customer
                  </th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Items
                  </th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Status
                  </th>
                  <th className="text-right px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-light-gray transition-colors">
                    <td className="px-6 py-3.5 font-semibold text-soft-black">
                      #{order.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-3.5 text-gray-500">
                      {order.user.name ?? order.user.email}
                    </td>
                    <td className="px-6 py-3.5 text-gray-500">
                      {order._count.items}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          STATUS_STYLES[order.status]
                        }`}
                      >
                        {STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right font-bold text-soft-black">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
