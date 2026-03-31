"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SHOES = [
  { src: "/images/image1.png", alt: "Featured footwear 1" },
  { src: "/images/image2.png", alt: "Featured footwear 2" },
  { src: "/images/image3.png", alt: "Featured footwear 3" },
  { src: "/images/image4.png", alt: "Featured footwear 4" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SHOES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#FAFAF9] overflow-hidden flex flex-col justify-between">
      {/* Top label */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 pt-10">
        <p className="text-[11px] tracking-[0.25em] uppercase text-gray-400 font-medium">
          Free delivery to Nairobi & major cities over KSh 15,000
        </p>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-center py-12 md:py-0">
          {/* Left — text */}
          <div className="flex flex-col justify-center gap-10 order-2 md:order-1 pb-12 md:pb-0">
            <h1
              className="font-black leading-[0.88] text-[#111]"
              style={{
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Wear
              <br />
              <span
                className="serif-italic font-light not-italic"
                style={{
                  fontStyle: "italic",
                  color: "#B8B3A9",
                  letterSpacing: "0em",
                }}
              >
                something
              </span>
              <br />
              real.
            </h1>

            <div className="flex flex-col gap-6 max-w-xs">
              <p className="text-sm text-[#555] leading-relaxed">
                Kenya-based. Premium footwear for every step. 100% authentic, trusted by 50K+ customers.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/shop"
                  className="px-6 py-3 rounded-xl bg-[#111] text-white text-sm font-semibold hover:bg-[#2a2a2a] active:scale-95 transition-all duration-200"
                >
                  Shop Now
                </Link>
                <Link
                  href="/shop"
                  className="text-sm text-[#888] hover:text-[#111] transition-colors duration-150 flex items-center gap-2 group"
                >
                  Explore all
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="group-hover:translate-x-0.5 transition-transform duration-150"
                  >
                    <path
                      d="M1 7h12M8 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-6 border-t border-gray-100">
              {[
                { value: "200+", label: "Brands" },
                { value: "12K+", label: "Products" },
                { value: "50K+", label: "Customers" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <p
                    className="text-base font-black text-[#111]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {value}
                  </p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — shoe images */}
          <div className="relative flex items-center justify-center order-1 md:order-2 min-h-[360px] md:min-h-[600px]">
            {/* Circle and shoe container are the same size so shoe fills it */}
            <div className="relative w-[380px] h-[380px] md:w-[580px] md:h-[580px]">
              {/* Accent circle — exact same size as container */}
              <div className="absolute inset-0 rounded-full bg-[#F3F1ED]" />

              {/* Shoes — stacked, crossfade */}
              {SHOES.map((shoe, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{ opacity: i === current ? 1 : 0 }}
                >
                  <Image
                    src={shoe.src}
                    alt={shoe.alt}
                    fill
                    priority={i === 0}
                    className="object-contain drop-shadow-xl"
                    sizes="(max-width: 768px) 380px, 580px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
