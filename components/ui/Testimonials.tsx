import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Marcus T.",
    initials: "MT",
    color: "bg-yellow-100 text-yellow-700",
    rating: 5,
    product: "Jordan 1 Retro High OG",
    quote:
      "Sneaqr had the best price I found anywhere online and shipping was incredibly fast. Packaging was pristine — these are 100% legit. My new go-to.",
  },
  {
    name: "Priya S.",
    initials: "PS",
    color: "bg-purple-100 text-purple-700",
    rating: 5,
    product: "Adidas Stan Smith Lux",
    quote:
      "Clean site, easy checkout, and the shoes look even better in person. Love the wishlist feature too — already have my next three picks saved.",
  },
  {
    name: "Jordan K.",
    initials: "JK",
    color: "bg-blue-100 text-blue-700",
    rating: 4,
    product: "New Balance 550",
    quote:
      "Great selection and competitive pricing. The size guide was accurate, which I really appreciated. Will definitely be ordering again soon.",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={0}
          className={i < rating ? "fill-accent" : "fill-gray-200"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
            Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-soft-black">
            What Our Customers Say
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map(({ name, initials, color, rating, product, quote }) => (
            <div
              key={name}
              className="flex flex-col gap-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Stars */}
              <StarRow rating={rating} />

              {/* Quote */}
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                &ldquo;{quote}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                {/* Avatar initials */}
                <div
                  className={[
                    "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                    color,
                  ].join(" ")}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-soft-black leading-none">
                    {name}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
