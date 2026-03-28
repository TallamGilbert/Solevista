import { Suspense } from "react";
import type { Metadata } from "next";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import ShopContent from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse our full collection of premium sneakers. Filter by category, brand, size, and price.",
};

function ShopSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-10">
      {/* Heading skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-9 w-24 bg-gray-200 rounded-full" />
        <div className="h-4 w-32 bg-gray-200 rounded-full mt-2" />
      </div>
      {/* Toolbar skeleton */}
      <div className="flex items-center gap-3 mb-6 animate-pulse">
        <div className="h-10 w-64 bg-gray-200 rounded-2xl" />
        <div className="h-10 w-24 bg-gray-200 rounded-2xl ml-auto" />
      </div>
      {/* Body skeleton */}
      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden md:flex flex-col gap-4 w-56 flex-shrink-0 animate-pulse">
          <div className="h-4 w-16 bg-gray-200 rounded-full" />
          <div className="h-3 w-full bg-gray-200 rounded-full" />
          <div className="h-3 w-4/5 bg-gray-200 rounded-full" />
          <div className="h-3 w-3/5 bg-gray-200 rounded-full" />
          <div className="h-px w-full bg-gray-100 my-2" />
          <div className="h-4 w-20 bg-gray-200 rounded-full" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-8 w-12 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
        {/* Grid skeleton */}
        <div className="flex-1">
          <ProductSkeleton count={9} />
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopContent />
    </Suspense>
  );
}
