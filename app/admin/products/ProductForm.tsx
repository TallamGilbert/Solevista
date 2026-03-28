"use client";

import { useState, useTransition, useRef } from "react";
import { createProduct, updateProduct } from "./actions";
import { Upload, X, Plus, Minus, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mirrors Prisma Category enum — avoid importing @prisma/client in browser code
type Category = "MEN" | "WOMEN" | "SNEAKERS" | "SPORTS" | "CASUAL";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "MEN", label: "Men" },
  { value: "WOMEN", label: "Women" },
  { value: "SNEAKERS", label: "Sneakers" },
  { value: "SPORTS", label: "Sports" },
  { value: "CASUAL", label: "Casual" },
];

export interface ProductFormInitialData {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number | null;
  brand: string;
  category: Category;
  stock: number;
  images: string[];
  sizes: { label: string; stock: number }[];
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const inputCls = (hasError?: boolean) =>
  [
    "w-full px-4 py-3 rounded-2xl border text-sm text-soft-black bg-white placeholder:text-gray-400",
    "focus:outline-none focus:ring-1 transition-colors duration-150",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : "border-gray-200 focus:border-accent focus:ring-accent",
  ].join(" ");

export default function ProductForm({
  initialData,
}: {
  initialData?: ProductFormInitialData;
}) {
  const isEdit = !!initialData;

  const [name, setName] = useState(initialData?.name ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [price, setPrice] = useState(initialData?.price?.toString() ?? "");
  const [comparePrice, setComparePrice] = useState(
    initialData?.comparePrice?.toString() ?? ""
  );
  const [brand, setBrand] = useState(initialData?.brand ?? "");
  const [category, setCategory] = useState<Category>(
    initialData?.category ?? "SNEAKERS"
  );
  const [stock, setStock] = useState(initialData?.stock?.toString() ?? "0");
  const [images, setImages] = useState<string[]>(initialData?.images ?? []);
  const [sizes, setSizes] = useState<{ label: string; stock: number }[]>(
    initialData?.sizes ?? []
  );
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isPending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  // ─── Name → auto-slug ───────────────────────────────────────────────────────

  function handleNameChange(val: string) {
    setName(val);
    if (!slugTouched) setSlug(slugify(val));
  }

  function handleSlugChange(val: string) {
    setSlugTouched(true);
    setSlug(val);
  }

  // ─── Images ─────────────────────────────────────────────────────────────────

  function addImageUrl() {
    const trimmed = imageUrl.trim();
    if (!trimmed) return;
    setImages((prev) => [...prev, trimmed]);
    setImageUrl("");
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setUploadError(data.error ?? "Upload failed");
      } else {
        setImages((prev) => [...prev, data.url]);
      }
    } catch {
      setUploadError("Network error — please try again");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  // ─── Sizes ───────────────────────────────────────────────────────────────────

  function addSize() {
    setSizes((prev) => [...prev, { label: "", stock: 0 }]);
  }

  function removeSize(i: number) {
    setSizes((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateSizeField(i: number, field: "label" | "stock", val: string) {
    setSizes((prev) =>
      prev.map((s, idx) =>
        idx === i
          ? { ...s, [field]: field === "stock" ? parseInt(val) || 0 : val }
          : s
      )
    );
  }

  // ─── Submit ──────────────────────────────────────────────────────────────────

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const data = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      price: parseFloat(price),
      comparePrice: comparePrice ? parseFloat(comparePrice) : undefined,
      brand: brand.trim(),
      category,
      stock: parseInt(stock) || 0,
      images,
      sizes,
    };

    startTransition(async () => {
      const result = isEdit
        ? await updateProduct(initialData.id, data)
        : await createProduct(data);

      if (result?.error) {
        setErrors(result.error as Record<string, string[]>);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  const fieldErr = (key: string) => errors[key]?.[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-6">

      {/* Global error summary */}
      {Object.keys(errors).length > 0 && (
        <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-red-50 border border-red-100 text-sm text-red-600">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>Please fix the errors below before saving.</span>
        </div>
      )}

      {/* ── Basic info ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-sm font-semibold text-soft-black mb-5">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Air Max 270"
              className={inputCls(!!fieldErr("name"))}
              required
            />
            {fieldErr("name") && (
              <p className="mt-1 text-xs text-red-500">{fieldErr("name")}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="air-max-270"
              className={inputCls(!!fieldErr("slug"))}
              required
            />
            {fieldErr("slug") && (
              <p className="mt-1 text-xs text-red-500">{fieldErr("slug")}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
              Brand *
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Nike"
              className={inputCls(!!fieldErr("brand"))}
              required
            />
            {fieldErr("brand") && (
              <p className="mt-1 text-xs text-red-500">{fieldErr("brand")}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the product…"
              className={inputCls(!!fieldErr("description")) + " resize-none"}
              required
            />
            {fieldErr("description") && (
              <p className="mt-1 text-xs text-red-500">{fieldErr("description")}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Pricing & details ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-sm font-semibold text-soft-black mb-5">Pricing & Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
              Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="120.00"
              className={inputCls(!!fieldErr("price"))}
              required
            />
            {fieldErr("price") && (
              <p className="mt-1 text-xs text-red-500">{fieldErr("price")}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
              Compare ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={comparePrice}
              onChange={(e) => setComparePrice(e.target.value)}
              placeholder="150.00"
              className={inputCls()}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={inputCls()}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
              Total Stock *
            </label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="100"
              className={inputCls(!!fieldErr("stock"))}
              required
            />
            {fieldErr("stock") && (
              <p className="mt-1 text-xs text-red-500">{fieldErr("stock")}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Images ──────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-sm font-semibold text-soft-black mb-5">Images</h2>

        {/* Preview grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
            {images.map((url, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden bg-light-gray group"
              >
                <Image
                  src={url}
                  alt={`Image ${i + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white/90 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                >
                  <X size={11} />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold bg-soft-black text-white px-1.5 py-0.5 rounded-md">
                    MAIN
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {fieldErr("images") && (
          <p className="mb-3 text-xs text-red-500">{fieldErr("images")}</p>
        )}

        {/* Add by URL */}
        <div className="flex gap-2 mb-3">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addImageUrl();
              }
            }}
            placeholder="https://example.com/image.jpg"
            className={inputCls() + " flex-1"}
          />
          <button
            type="button"
            onClick={addImageUrl}
            className="px-4 py-2.5 rounded-2xl bg-light-gray text-soft-black text-sm font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            Add URL
          </button>
        </div>

        {/* Upload from device */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
        >
          <Upload size={16} />
          {uploading ? "Uploading…" : "Upload from device (Cloudinary)"}
        </button>
        {uploadError && (
          <p className="mt-2 text-xs text-red-500">{uploadError}</p>
        )}
      </div>

      {/* ── Sizes ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-soft-black">Sizes</h2>
          <button
            type="button"
            onClick={addSize}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-light-gray text-soft-black text-xs font-semibold hover:bg-gray-200 transition-colors"
          >
            <Plus size={13} /> Add Size
          </button>
        </div>

        {sizes.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            No sizes added — product will be sold as one-size.
          </p>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_120px_44px] gap-2 px-1 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Size Label
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Stock
              </span>
            </div>
            {sizes.map((size, i) => (
              <div key={i} className="grid grid-cols-[1fr_120px_44px] gap-2 items-center">
                <input
                  type="text"
                  value={size.label}
                  onChange={(e) => updateSizeField(i, "label", e.target.value)}
                  placeholder="e.g. 10, 42EU, XL"
                  className={inputCls() + " py-2.5"}
                />
                <input
                  type="number"
                  min="0"
                  value={size.stock}
                  onChange={(e) => updateSizeField(i, "stock", e.target.value)}
                  className={inputCls() + " py-2.5"}
                />
                <button
                  type="button"
                  onClick={() => removeSize(i)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Minus size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Submit ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-4">
        <Link
          href="/admin/products"
          className="px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-soft-black transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending || uploading}
          className="px-6 py-2.5 rounded-2xl bg-soft-black text-white text-sm font-bold hover:bg-accent hover:text-soft-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving…" : isEdit ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
