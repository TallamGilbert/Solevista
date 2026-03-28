import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";

const QUICK_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/shop/new" },
  { label: "Sale", href: "/sale" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const CATEGORIES = [
  { label: "Men's Sneakers", href: "/shop/men" },
  { label: "Women's Sneakers", href: "/shop/women" },
  { label: "Sports", href: "/shop/sports" },
  { label: "Casual", href: "/shop/casual" },
  { label: "Limited Drops", href: "/drops" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Twitter / X", href: "https://twitter.com", Icon: Twitter },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-soft-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-2xl font-black tracking-tight">
              SNEAQR
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">
              Premium sneakers curated for those who move with intention.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-2xl text-gray-400 hover:text-accent hover:bg-white/5 transition-colors duration-150"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Categories
            </h3>
            <ul className="flex flex-col gap-2.5">
              {CATEGORIES.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Stay in the Loop
            </h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              New drops, exclusive offers, and restocks — straight to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                aria-label="Email address"
                className="w-full px-4 py-2.5 rounded-2xl bg-white/8 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-150"
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
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Sneaqr. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors duration-150">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-150">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
