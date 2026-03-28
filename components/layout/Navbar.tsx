"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, User } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Men", href: "/shop/men" },
  { label: "Women", href: "/shop/women" },
  { label: "Sale", href: "/sale" },
];

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20"
          : "bg-white",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 text-xl font-black tracking-tight text-soft-black"
        >
          SNEAQR
        </Link>

        {/* Centre nav — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "bg-accent text-soft-black"
                    : "text-gray-600 hover:text-soft-black hover:bg-light-gray",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions — hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
            className="relative p-2 rounded-2xl text-gray-600 hover:text-soft-black hover:bg-light-gray transition-colors duration-150"
          >
            <ShoppingCart size={20} strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-accent text-soft-black text-[10px] font-bold px-1 leading-none">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link
            href="/account"
            aria-label="Account"
            className="p-2 rounded-2xl text-gray-600 hover:text-soft-black hover:bg-light-gray transition-colors duration-150"
          >
            <User size={20} strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </header>
  );
}
