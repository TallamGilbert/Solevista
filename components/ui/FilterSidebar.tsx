"use client";

import { X } from "lucide-react";
import { ALL_BRANDS, Category, PRICE_MAX, PRICE_MIN } from "@/lib/mock-products";

const CATEGORIES: { label: string; value: Category | "" }[] = [
  { label: "All", value: "" },
  { label: "Men", value: "MEN" },
  { label: "Women", value: "WOMEN" },
  { label: "Kids", value: "KIDS" },
  { label: "Sneakers", value: "SNEAKERS" },
  { label: "Sports", value: "SPORTS" },
  { label: "Casual", value: "CASUAL" },
  { label: "Running", value: "RUNNING" },
  { label: "Boots", value: "BOOTS" },
  { label: "Sandals", value: "SANDALS" },
  { label: "Formal", value: "FORMAL" },
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
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col transition-transform duration-300 ease-in-out",
          "md:static md:z-auto md:w-full md:translate-x-0 md:bg-transparent",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        {/* Header — mobile only */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 md:hidden">
          <span className="text-sm font-semibold text-[#111]">Filters</span>
          <button onClick={onClose} aria-label="Close filters" className="text-gray-400 hover:text-[#111]">
            <X size={16} />
          </button>
        </div>

        {/* Filter content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 md:px-0 md:py-0 flex flex-col gap-8">

          {/* Header row — desktop */}
          <div className="hidden md:flex items-center justify-between">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Filters {activeCount > 0 && `(${activeCount})`}
            </span>
            {activeCount > 0 && (
              <button
                onClick={onClear}
                className="text-xs text-gray-400 hover:text-[#111] transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category */}
          <FilterSection label="Category">
            <div className="flex flex-col gap-1">
              {CATEGORIES.map(({ label, value }) => (
                <button
                  key={label}
                  onClick={() => onChange("category", value)}
                  className={[
                    "text-left text-sm py-1.5 transition-colors duration-150",
                    values.category === value
                      ? "text-[#111] font-semibold"
                      : "text-gray-400 hover:text-[#111]",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Price range */}
          <FilterSection label="Price">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm text-[#111] font-medium">
                <span>KSh {values.minPrice.toLocaleString()}</span>
                <span>KSh {values.maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={1000}
                value={values.minPrice}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v < values.maxPrice) onChange("minPrice", v);
                }}
                className="w-full h-px bg-gray-200 accent-[#EAB308] cursor-pointer"
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={1000}
                value={values.maxPrice}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v > values.minPrice) onChange("maxPrice", v);
                }}
                className="w-full h-px bg-gray-200 accent-[#EAB308] cursor-pointer"
              />
            </div>
          </FilterSection>

          {/* Size */}
          <FilterSection label="Size (UK)">
            <div className="flex flex-wrap gap-1.5">
              {ALL_SIZES.map((size) => {
                const active = values.sizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={[
                      "w-11 py-1.5 text-xs rounded-lg border transition-all duration-150",
                      active
                        ? "bg-[#111] text-white border-[#111]"
                        : "text-gray-500 border-gray-200 hover:border-gray-400",
                    ].join(" ")}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* Brand */}
          <FilterSection label="Brand">
            <div className="flex flex-col gap-2.5">
              {ALL_BRANDS.map((brand) => {
                const checked = values.brands.includes(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <span
                      onClick={() => toggleBrand(brand)}
                      className={[
                        "w-3.5 h-3.5 rounded-sm border flex-shrink-0 flex items-center justify-center transition-all duration-150",
                        checked
                          ? "bg-[#111] border-[#111]"
                          : "border-gray-300 group-hover:border-gray-500",
                      ].join(" ")}
                    >
                      {checked && (
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleBrand(brand)}
                    />
                    <span className={[
                      "text-sm transition-colors duration-150",
                      checked ? "text-[#111] font-medium" : "text-gray-500 group-hover:text-[#111]",
                    ].join(" ")}>
                      {brand}
                    </span>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          {/* Mobile clear */}
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="md:hidden w-full py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-[#111] hover:bg-gray-50 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 first:border-0 first:pt-0">
      <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">
        {label}
      </p>
      {children}
    </div>
  );
}