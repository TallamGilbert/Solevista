"use client";

import { X } from "lucide-react";
import { ALL_BRANDS, Category, PRICE_MAX, PRICE_MIN } from "@/lib/mock-products";

const CATEGORIES: { label: string; value: Category | "" }[] = [
  { label: "All", value: "" },
  { label: "Men", value: "MEN" },
  { label: "Women", value: "WOMEN" },
  { label: "Sneakers", value: "SNEAKERS" },
  { label: "Sports", value: "SPORTS" },
  { label: "Casual", value: "CASUAL" },
];

const ALL_SIZES = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"];

export interface FilterValues {
  category: Category | "";
  brands: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
}

interface FilterSidebarProps {
  values: FilterValues;
  onChange: <K extends keyof FilterValues>(key: K, value: FilterValues[K]) => void;
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  values,
  onChange,
  onClear,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const activeCount =
    (values.category ? 1 : 0) +
    values.brands.length +
    values.sizes.length +
    (values.minPrice > PRICE_MIN || values.maxPrice < PRICE_MAX ? 1 : 0);

  function toggleBrand(brand: string) {
    const next = values.brands.includes(brand)
      ? values.brands.filter((b) => b !== brand)
      : [...values.brands, brand];
    onChange("brands", next);
  }

  function toggleSize(size: string) {
    const next = values.sizes.includes(size)
      ? values.sizes.filter((s) => s !== size)
      : [...values.sizes, size];
    onChange("sizes", next);
  }

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-soft-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-[300px] bg-white flex flex-col transition-transform duration-300 md:static md:z-auto md:w-full md:translate-x-0 md:block",
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 md:px-0 md:pb-4 md:border-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-soft-black">Filters</h2>
            {activeCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-accent text-soft-black text-[11px] font-bold">
                {activeCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <button
                onClick={onClear}
                className="text-xs font-semibold text-gray-400 hover:text-soft-black transition-colors"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="p-1 text-gray-400 hover:text-soft-black md:hidden"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-7 md:px-0">

          {/* Category */}
          <FilterSection title="Category">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(({ label, value }) => (
                <button
                  key={label}
                  onClick={() => onChange("category", value)}
                  className={[
                    "px-3 py-1.5 rounded-2xl text-xs font-semibold border transition-all duration-150",
                    values.category === value
                      ? "bg-soft-black text-white border-soft-black"
                      : "text-gray-600 border-gray-200 hover:border-soft-black",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Price range */}
          <FilterSection title="Price Range">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm font-semibold text-soft-black">
                <span>${values.minPrice}</span>
                <span>${values.maxPrice}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-gray-400 w-6">Min</span>
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={10}
                    value={values.minPrice}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v < values.maxPrice) onChange("minPrice", v);
                    }}
                    className="w-full h-1 accent-yellow-400 cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-gray-400 w-6">Max</span>
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={10}
                    value={values.maxPrice}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v > values.minPrice) onChange("maxPrice", v);
                    }}
                    className="w-full h-1 accent-yellow-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </FilterSection>

          {/* Size */}
          <FilterSection title="Size">
            <div className="flex flex-wrap gap-1.5">
              {ALL_SIZES.map((size) => {
                const active = values.sizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={[
                      "w-12 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150",
                      active
                        ? "bg-accent text-soft-black border-accent"
                        : "text-gray-600 border-gray-200 hover:border-soft-black",
                    ].join(" ")}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* Brand */}
          <FilterSection title="Brand">
            <div className="flex flex-col gap-2">
              {ALL_BRANDS.map((brand) => {
                const checked = values.brands.includes(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <span
                      className={[
                        "w-4 h-4 rounded flex-shrink-0 border transition-all duration-150 flex items-center justify-center",
                        checked
                          ? "bg-soft-black border-soft-black"
                          : "border-gray-300 group-hover:border-soft-black",
                      ].join(" ")}
                      onClick={() => toggleBrand(brand)}
                    >
                      {checked && (
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleBrand(brand)}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-soft-black transition-colors">
                      {brand}
                    </span>
                  </label>
                );
              })}
            </div>
          </FilterSection>
        </div>
      </aside>
    </>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        {title}
      </h3>
      {children}
    </div>
  );
}
