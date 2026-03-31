const REVIEWS = [
  {
    name: "Brian M.",
    product: "Jordan 1 Retro High OG",
    initials: "BM",
    quote:
      "Solévista has the best selection and prices for authentic footwear in Kenya. Delivery was super fast and packaging flawless. Now my favorite go-to spot.",
  },
  {
    name: "Aisha N.",
    product: "Adidas Stan Smith Lux",
    initials: "AN",
    quote:
      "Clean experience at Solévista, smooth checkout, and everything arrived in perfect condition. Love the wishlist feature and M-Pesa payment. Highly recommend!",
  },
  {
    name: "Odhiambo J.",
    product: "New Balance 550",
    initials: "OJ",
    quote:
      "Solévista has the widest authentic footwear range I've found locally. Unbeatable prices, size guide was accurate, M-Pesa convenient. Definitely ordering again!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-2">
            Reviews
          </p>
          <h2
            className="text-3xl md:text-4xl font-black text-[#121212]"
            style={{ letterSpacing: "-0.02em" }}
          >
            What customers say
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map(({ name, product, initials, quote }) => (
            <div
              key={name}
              className="flex flex-col justify-between gap-8 rounded-2xl p-7 border border-gray-100 hover:border-gray-200 transition-colors duration-200"
              style={{ background: "#FAFAF9" }}
            >
              {/* Large decorative quote mark */}
              <div className="flex flex-col gap-5">
                <span
                  className="text-5xl font-black text-[#EAB308] leading-none select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p
                  className="text-sm text-[#444] leading-relaxed"
                  style={{ letterSpacing: "0.01em" }}
                >
                  {quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                {/* Initials avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-[#121212]"
                  style={{ background: "#F0EDE8" }}
                >
                  {initials}
                </div>
                <div>
                  <p
                    className="text-[13px] font-semibold text-[#121212] leading-none"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {name}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-wider">
                    {product}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}