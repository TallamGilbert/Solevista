"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Heart,
  User,
  ShoppingBag,
} from "lucide-react";

type Variant = "user" | "admin";

const USER_LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/orders", label: "Orders", icon: Package, exact: false },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart, exact: false },
  { href: "/dashboard/profile", label: "Profile", icon: User, exact: false },
];

const ADMIN_LINKS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package, exact: false },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag, exact: false },
];

export default function DashboardLayout({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: Variant;
}) {
  const pathname = usePathname();
  const links = variant === "admin" ? ADMIN_LINKS : USER_LINKS;
  const title = variant === "admin" ? "Admin" : "My Account";

  return (
    <div className="bg-light-gray min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 md:flex md:gap-6">

        {/* Desktop sidebar */}
        <aside className="hidden md:block w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24">
            <div className="px-4 pt-5 pb-3 border-b border-gray-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {title}
              </p>
            </div>
            <nav className="p-2 flex flex-col gap-0.5">
              {links.map(({ href, label, icon: Icon, exact }) => {
                const active = exact
                  ? pathname === href
                  : pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={[
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                      active
                        ? "bg-soft-black text-white"
                        : "text-gray-500 hover:bg-light-gray hover:text-soft-black",
                    ].join(" ")}
                  >
                    <Icon size={16} strokeWidth={2} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile tab strip */}
        <div className="md:hidden mb-4 bg-white rounded-2xl shadow-sm overflow-hidden">
          <nav className="flex">
            {links.map(({ href, label, icon: Icon, exact }) => {
              const active = exact
                ? pathname === href
                : pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-semibold transition-colors border-b-2",
                    active
                      ? "text-soft-black border-accent"
                      : "text-gray-400 border-transparent hover:text-soft-black",
                  ].join(" ")}
                >
                  <Icon size={18} strokeWidth={2} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
