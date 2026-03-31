import { Truck, RefreshCw, ShieldCheck, BadgeCheck } from "lucide-react";

const BADGES = [
  {
    title: "Free Shipping",
    description: "On orders over KSh 13,000",
    icon: Truck,
  },
  {
    title: "Easy Returns",
    description: "30-day hassle-free policy",
    icon: RefreshCw,
  },
  {
    title: "Secure Payment",
    description: "M-Pesa, Card & PayPal accepted",
    icon: ShieldCheck,
  },
  {
    title: "100% Authentic",
    description: "All footwear verified & certified",
    icon: BadgeCheck,
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-white border-y border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-gray-100">
          {BADGES.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex items-start md:items-center gap-3 md:px-8 first:md:pl-0 last:md:pr-0"
            >
              <Icon
                size={16}
                strokeWidth={1.5}
                className="flex-shrink-0 text-[#121212] mt-0.5 md:mt-0"
              />
              <div>
                <p
                  className="text-[13px] font-semibold text-[#121212]"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {title}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
