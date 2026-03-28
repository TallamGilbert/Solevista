"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);

  function selectImage(idx: number) {
    if (idx === activeIndex) return;
    setFading(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setFading(false);
    }, 180);
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Main image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-light-gray">
        <Image
          src={images[activeIndex]}
          alt={`${name} — view ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className={[
            "object-cover transition-opacity duration-[180ms]",
            fading ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
      </div>

      {/* Thumbnail row */}
      <div className="flex gap-3">
        {images.map((src, idx) => (
          <button
            key={src}
            onClick={() => selectImage(idx)}
            aria-label={`View image ${idx + 1}`}
            className={[
              "relative flex-1 aspect-square rounded-xl overflow-hidden bg-light-gray transition-all duration-150 flex-shrink-0",
              activeIndex === idx
                ? "ring-2 ring-offset-2 ring-soft-black"
                : "opacity-60 hover:opacity-90",
            ].join(" ")}
          >
            <Image
              src={src}
              alt={`${name} thumbnail ${idx + 1}`}
              fill
              sizes="15vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
