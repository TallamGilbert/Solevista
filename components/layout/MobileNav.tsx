"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, ShoppingCart, User } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Shop", href: "/shop", Icon: ShoppingBag },
  { label: "Search", href: "/search", Icon: Search },
  { label: "Cart", href: "/cart", Icon: ShoppingCart },
  { label: "Profile", href: "/account", Icon: User },
];

interface MobileNavProps {
  cartCount?: number;
}

export default function MobileNav({ cartCount = 0 }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] rounded-t-2xl"
    >
      <ul className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map(({ label, href, Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          const isCart = href === "/cart";

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-label={isCart && cartCount > 0 ? `${label}, ${cartCount} item${cartCount !== 1 ? "s" : ""}` : label}
                className={[
                  "relative flex flex-col items-center justify-center gap-1 py-2 mx-auto w-full rounded-2xl transition-colors duration-150",
                  isActive ? "text-soft-black" : "text-gray-400",
                ].join(" ")}
              >
                {/* Active pill indicator */}
                {isActive && (
                  <span className="absolute top-1 w-5 h-1 rounded-full bg-accent" />
                )}

                {/* Cart badge */}
                <span className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2 : 1.75}
                    className={isActive ? "text-soft-black" : "text-gray-400"}
                  />
                  {isCart && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full bg-accent text-soft-black text-[9px] font-bold px-0.5 leading-none">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </span>

                <span
                  className={[
                    "text-[10px] font-medium leading-none",
                    isActive ? "text-soft-black" : "text-gray-400",
                  ].join(" ")}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
