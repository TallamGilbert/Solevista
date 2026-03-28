"use client";

import { useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, ChevronDown, X } from "lucide-react";

import {
  MOCK_PRODUCTS,
  PRICE_MIN,
  PRICE_MAX,
  ITEMS_PER_PAGE,
  type Category,
} from "@/lib/mock-products";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar, { FilterValues } from "@/components/ui/FilterSidebar";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import { useState } from "react";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Most Popular", value: "popular" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

// ─── URL param helpers ────────────────────────────────────────────────────────

function useShopParams() {
  const searchParams = useSearchParams();

  const category = (searchParams.get("category") ?? "") as Category | "";
  const brands = searchParams.get("brands")?.split(",").filter(Boolean) ?? [];
  const sizes = searchParams.get("sizes")?.split(",").filter(Boolean) ?? [];
  const minPrice = Number(searchParams.get("minPrice") ?? PRICE_MIN);
  const maxPrice = Number(searchParams.get("maxPrice") ?? PRICE_MAX);
  const sort = searchParams.get("sort") ?? "newest";
  const q = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? 1);

  return { category, brands, sizes, minPrice, maxPrice, sort, q, page };
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ShopContent() {
  const router = useRouter();
  const params = useShopParams();
  const [isPending, startTransition] = useTransition();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Build new URL params and push
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const current = new URLSearchParams(window.location.search);
      for (const [key, val] of Object.entries(updates)) {
        if (val === null || val === "") {
          current.delete(key);
        } else {
          current.set(key, val);
        }
      }
      // Reset to page 1 on any filter change
      if (!("page" in updates)) current.delete("page");
      startTransition(() => {
        router.push(`/shop?${current.toString()}`, { scroll: false });
      });
    },
    [router]
  );

  // Filter handler
  function handleFilterChange<K extends keyof FilterValues>(
    key: K,
    value: FilterValues[K]
  ) {
    const updates: Record<string, string | null> = {};
    if (key === "brands" || key === "sizes") {
      updates[key] = (value as string[]).join(",") || null;
    } else if (key === "minPrice" || key === "maxPrice") {
      const num = value as number;
      if (
        (key === "minPrice" && num === PRICE_MIN) ||
        (key === "maxPrice" && num === PRICE_MAX)
      ) {
        updates[key] = null;
      } else {
        updates[key] = String(num);
      }
    } else {
      updates[key] = (value as string) || null;
    }
    updateParams(updates);
  }

  function handleClearFilters() {
    startTransition(() => {
      router.push("/shop", { scroll: false });
    });
    setFilterOpen(false);
  }

  function handleSearch(q: string) {
    updateParams({ q: q || null });
  }

  function handleSort(sort: string) {
    updateParams({ sort });
    setSortOpen(false);
  }

  function handlePageChange(page: number) {
    updateParams({ page: page === 1 ? null : String(page) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Filter + sort logic ───────────────────────────────────────────────────

  let filtered = MOCK_PRODUCTS.filter((p) => {
    if (params.category && p.category !== params.category) return false;
    if (params.brands.length && !params.brands.includes(p.brand)) return false;
    if (params.sizes.length && !params.sizes.some((s) => p.sizes.includes(s))) return false;
    if (p.price < params.minPrice || p.price > params.maxPrice) return false;
    if (
      params.q &&
      !p.name.toLowerCase().includes(params.q.toLowerCase()) &&
      !p.brand.toLowerCase().includes(params.q.toLowerCase())
    )
      return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    switch (params.sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "popular":
        return b.reviewCount - a.reviewCount;
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = Math.min(params.page, Math.max(totalPages, 1));
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const filterValues: FilterValues = {
    category: params.category,
    brands: params.brands,
    sizes: params.sizes,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
  };

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === params.sort)?.label ?? "Newest";

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-10">

      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-soft-black">Shop</h1>
        <p className="text-sm text-gray-500 mt-1">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          {params.q && (
            <> for &ldquo;<span className="font-semibold text-soft-black">{params.q}</span>&rdquo;</>
          )}
        </p>
      </div>

      {/* Search + sort toolbar */}
      <div className="flex items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            placeholder="Search sneakers..."
            defaultValue={params.q}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search products"
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm text-soft-black placeholder:text-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-150 bg-white"
          />
          {params.q && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-soft-black"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setFilterOpen(true)}
          className="md:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-semibold text-soft-black bg-white hover:bg-light-gray transition-colors duration-150"
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>

        {/* Sort dropdown */}
        <div className="relative ml-auto">
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-semibold text-soft-black bg-white hover:bg-light-gray transition-colors duration-150 whitespace-nowrap"
          >
            {currentSortLabel}
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
            />
          </button>
          {sortOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setSortOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1.5 z-20 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden min-w-[180px]">
                {SORT_OPTIONS.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => handleSort(value)}
                    className={[
                      "w-full text-left px-4 py-2.5 text-sm transition-colors duration-150",
                      params.sort === value
                        ? "font-semibold text-soft-black bg-light-gray"
                        : "text-gray-600 hover:bg-light-gray",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Body: sidebar + grid */}
      <div className="flex gap-8">

        {/* Sidebar — always visible md+ */}
        <div className="hidden md:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar
              values={filterValues}
              onChange={handleFilterChange}
              onClear={handleClearFilters}
              isOpen={false}
              onClose={() => {}}
            />
          </div>
        </div>

        {/* Mobile sidebar */}
        <FilterSidebar
          values={filterValues}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        />

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {isPending ? (
            <ProductSkeleton count={9} />
          ) : paginated.length === 0 ? (
            <EmptyState onClear={handleClearFilters} />
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {paginated.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    slug={product.slug}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                    comparePrice={product.comparePrice}
                    image={product.image}
                    fullWidth
                  />
                ))}
              </div>
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
