"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";

const QUICK_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "Sale", href: "/sale" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const CATEGORIES = [
  { label: "Men", href: "/shop?category=MEN" },
  { label: "Women", href: "/shop?category=WOMEN" },
  { label: "Sports", href: "/shop?category=SPORTS" },
  { label: "Casual", href: "/shop?category=CASUAL" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Twitter / X", href: "https://twitter.com", Icon: Twitter },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-soft-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="text-xl font-bold tracking-tight">
              SNEAQR
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
              Premium footwear curated for those who move with intention.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-150"
                >
                  <Icon size={17} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Categories
            </h3>
            <ul className="flex flex-col gap-3.5">
              {CATEGORIES.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Stay in the Loop
            </h3>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              New drops and restocks — straight to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2.5"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                aria-label="Email address"
                className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-150"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-2xl bg-accent text-soft-black text-sm font-semibold hover:bg-yellow-400 active:scale-95 transition-all duration-150"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Sneaqr. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-150"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
