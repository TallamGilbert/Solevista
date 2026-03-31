"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Search, ShoppingCart, User } from "lucide-react";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Men", href: "/shop?category=MEN" },
  { label: "Women", href: "/shop?category=WOMEN" },
  { label: "Kids", href: "/shop?category=KIDS" },
];

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    return pathname === href.split("?")[0];
  }

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <header
        className="pointer-events-auto w-full transition-all duration-500 ease-out"
        style={{
          maxWidth: scrolled ? "720px" : "100%",
        }}
      >
        <div
          className="flex items-center justify-between gap-4 px-5 transition-all duration-500"
          style={{
            height: scrolled ? "48px" : "52px",
            background: scrolled
              ? "rgba(255,255,255,0.92)"
              : "rgba(255,255,255,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: scrolled ? "999px" : "20px",
            border: "0.5px solid rgba(0,0,0,0.08)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)"
              : "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 text-[23px] font-bold text-[#121212] hover:opacity-70 transition-opacity duration-200 "
            style={{ letterSpacing: "0.06em" }}
          >
            Solévista
          </Link>

          {/* Center nav — desktop only */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative px-3.5 py-1.5 text-[12px] font-medium text-[#121212] rounded-full transition-all duration-200"
                  style={{
                    letterSpacing: "0.08em",
                    opacity: active ? 1 : 0.45,
                    background: active ? "rgba(0,0,0,0.05)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(0,0,0,0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.opacity = "0.45";
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                    }
                  }}
                >
                  {label}
                  {/* Yellow dot indicator */}
                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#EAB308]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right utilities — desktop only */}
          <div className="hidden md:flex items-center gap-0.5 relative z-10">
            <button
              aria-label="Search"
              className="p-2 rounded-full text-[#121212] transition-all duration-200 hover:bg-black/5"
              style={{ opacity: 0.5 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.5";
              }}
            >
              <Search size={15} strokeWidth={1.5} />
            </button>

            <Link
              href="/cart"
              aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
              className="relative p-2 rounded-full text-[#121212] transition-all duration-200 hover:bg-black/5"
              style={{ opacity: cartCount > 0 ? 1 : 0.5 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity =
                  cartCount > 0 ? "1" : "0.5";
              }}
            >
              <ShoppingCart size={15} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] flex items-center justify-center rounded-full bg-[#EAB308] text-[#111] text-[8px] font-bold px-1 leading-none">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <Link
              href={session ? "/dashboard" : "/auth/login"}
              aria-label="Account"
              className="p-2 rounded-full text-[#121212] transition-all duration-200 hover:bg-black/5"
              style={{ opacity: 0.5 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
            >
              <User size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
