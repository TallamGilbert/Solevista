import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] bg-soft-black overflow-hidden flex items-center">

      {/* Background texture — subtle noise grain */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Accent glow */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left — copy */}
        <div className="flex flex-col gap-6 text-white">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="w-6 h-px bg-accent" />
            New Season · 2025
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
            Step Into
            <br />
            <span className="text-accent">Something</span>
            <br />
            Real.
          </h1>

          <p className="text-base text-gray-400 leading-relaxed max-w-sm">
            Premium sneakers curated for people who move with intention. From
            the court to the street — find your pair.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-2xl bg-accent text-soft-black font-bold text-sm hover:bg-yellow-400 active:scale-95 transition-all duration-150 shadow-lg shadow-accent/20"
            >
              Shop Now
            </Link>
            <Link
              href="/drops"
              className="px-8 py-3.5 rounded-2xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-colors duration-150"
            >
              New Drops
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-4 pt-6 border-t border-white/10">
            {[
              { value: "200+", label: "Brands" },
              { value: "12K+", label: "Products" },
              { value: "50K+", label: "Customers" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — hero image */}
        <div className="relative flex items-center justify-center">
          {/* Decorative ring */}
          <div className="absolute w-[380px] h-[380px] sm:w-[440px] sm:h-[440px] rounded-full border border-white/5" />
          <div className="absolute w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full bg-white/3" />

          <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px]">
            <Image
              src="https://picsum.photos/seed/sneaqr-hero/800/800"
              alt="Featured sneaker"
              fill
              priority
              className="object-cover rounded-full"
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 500px"
            />
            {/* Overlay to blend into dark bg */}
            <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
          </div>

          {/* Floating badge */}
          <div className="absolute bottom-8 -left-2 sm:left-0 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-light-gray overflow-hidden relative flex-shrink-0">
              <Image
                src="https://picsum.photos/seed/sneaqr-badge/80/80"
                alt="Featured product"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-soft-black">Jordan 1 Retro</p>
              <p className="text-xs text-gray-400">$219.99</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
