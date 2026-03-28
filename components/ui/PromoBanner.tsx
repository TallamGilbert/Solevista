import Link from "next/link";
import { Tag } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="relative overflow-hidden rounded-2xl bg-soft-black px-8 py-14 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Accent glow */}
          <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-accent/15 blur-[80px] pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-accent/10 blur-[60px] pointer-events-none" />

          {/* Left — text */}
          <div className="relative text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Tag size={13} className="text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                Limited Time
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Up to{" "}
              <span className="text-accent">40% Off</span>
              <br className="hidden md:block" /> Sale Styles.
            </h2>
            <p className="mt-3 text-gray-400 text-sm max-w-md">
              Clearance prices on last-season favourites. Grab them before they're
              gone — no code needed.
            </p>
          </div>

          {/* Right — CTA */}
          <div className="relative flex-shrink-0 flex flex-col items-center gap-3">
            <Link
              href="/sale"
              className="px-10 py-4 rounded-2xl bg-accent text-soft-black font-black text-sm hover:bg-yellow-400 active:scale-95 transition-all duration-150 shadow-lg shadow-accent/20 whitespace-nowrap"
            >
              Shop the Sale
            </Link>
            <p className="text-xs text-gray-500">
              Ends soon · While stocks last
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
