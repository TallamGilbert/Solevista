import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    label: "Men",
    href: "/shop/men",
    image: "https://picsum.photos/seed/sneaqr-cat-men/800/1000",
    span: "row-span-2",
  },
  {
    label: "Women",
    href: "/shop/women",
    image: "https://picsum.photos/seed/sneaqr-cat-women/800/1000",
    span: "row-span-2",
  },
  {
    label: "Sneakers",
    href: "/shop/sneakers",
    image: "https://picsum.photos/seed/sneaqr-cat-sneakers/800/500",
    span: "",
  },
  {
    label: "Sports",
    href: "/shop/sports",
    image: "https://picsum.photos/seed/sneaqr-cat-sports/800/500",
    span: "",
  },
  {
    label: "Casual",
    href: "/shop/casual",
    image: "https://picsum.photos/seed/sneaqr-cat-casual/800/500",
    span: "",
  },
];

export default function CategoriesGrid() {
  const [men, women, ...rest] = CATEGORIES;

  return (
    <section className="py-16 md:py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
            Browse by
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-soft-black">
            Shop Categories
          </h2>
        </div>

        {/* Desktop: asymmetric grid — mobile: 2-col */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

          {/* Men — tall left card */}
          <CategoryCard {...men} className="col-span-1 md:col-span-1 row-span-2 h-[340px] md:h-auto" tallOnDesktop />

          {/* Women — tall second card */}
          <CategoryCard {...women} className="col-span-1 md:col-span-1 row-span-2 h-[340px] md:h-auto" tallOnDesktop />

          {/* Right column — 3 short cards stacked */}
          <div className="col-span-2 md:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
            {rest.map((cat) => (
              <CategoryCard key={cat.label} {...cat} className="h-[160px] md:h-[215px]" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  label,
  href,
  image,
  className = "",
  tallOnDesktop = false,
}: {
  label: string;
  href: string;
  image: string;
  className?: string;
  span?: string;
  tallOnDesktop?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "group relative overflow-hidden rounded-2xl bg-gray-200 block",
        tallOnDesktop ? "md:h-[450px]" : "",
        className,
      ].join(" ")}
    >
      {/* Image */}
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 25vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-soft-black/70 via-soft-black/10 to-transparent" />

      {/* Label */}
      <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between">
        <span className="text-white font-black text-lg leading-none">{label}</span>
        <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider group-hover:text-accent transition-colors duration-150">
          Shop →
        </span>
      </div>
    </Link>
  );
}
