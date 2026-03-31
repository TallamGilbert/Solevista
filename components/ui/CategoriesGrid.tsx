import Link from "next/link";

const CATEGORIES = [
  { label: "Men", href: "/shop?category=MEN", count: "142 styles" },
  { label: "Women", href: "/shop?category=WOMEN", count: "118 styles" },
  { label: "Kids", href: "/shop?category=KIDS", count: "64 styles" },
  { label: "Sneakers", href: "/shop?category=SNEAKERS", count: "96 styles" },
  { label: "Sports", href: "/shop?category=SPORTS", count: "83 styles" },
  { label: "Casual", href: "/shop?category=CASUAL", count: "71 styles" },
];

export default function CategoriesGrid() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-2">
            Browse by
          </p>
          <h2
            className="text-3xl md:text-4xl font-black text-[#121212]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Shop categories
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map(({ label, href, count }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col justify-between gap-8 p-5 rounded-2xl border border-gray-100 hover:border-[#121212] transition-all duration-200"
              style={{ background: "#FAFAF9" }}
            >
              {/* Arrow — top right */}
              <div className="flex justify-end">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-gray-300 group-hover:text-[#121212] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                >
                  <path
                    d="M2 12L12 2M12 2H5M12 2V9"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Label + count */}
              <div className="flex flex-col gap-1">
                <p
                  className="text-sm font-bold text-[#121212]"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {label}
                </p>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider">
                  {count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}