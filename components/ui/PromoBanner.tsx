import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="py-20 md:py-28 bg-[#F5F3F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Left */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400">
              Kenya Finest
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-[#121212] leading-[0.95]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Up to <span className="texta-[#EAB308]">40% off</span>
              <br />
              premium footwear.
            </h2>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Locally sourced, authentic styles. Limited time only. Free
              delivery over KSh 15,000.
            </p>
          </div>

          {/* Right — dark button, yellow reserved for the % only */}
          <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
            <Link
              href="/sale"
              className="px-7 py-3 rounded-xl bg-[#121212] text-white text-[13px] font-semibold hover:bg-[#2a2a2a] active:scale-95 transition-all duration-200 whitespace-nowrap"
              style={{ letterSpacing: "0.04em" }}
            >
              Shop the Sale
            </Link>
            <p className="text-[11px] text-gray-400 tracking-wide">
              Ends soon · While stocks last
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
