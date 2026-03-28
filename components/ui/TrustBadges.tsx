import { Truck, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";

const BADGES = [
  {
    Icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $100",
  },
  {
    Icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
  {
    Icon: ShieldCheck,
    title: "Secure Payment",
    description: "256-bit SSL encryption",
  },
  {
    Icon: Sparkles,
    title: "Premium Quality",
    description: "100% authentic products",
  },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {BADGES.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Icon size={20} className="text-accent" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-bold text-soft-black">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
