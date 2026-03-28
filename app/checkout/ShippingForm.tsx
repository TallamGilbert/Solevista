"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  address: z.string().min(5, "Enter your full street address"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z
    .string()
    .min(3, "Enter a valid postal code")
    .max(10, "Postal code too long"),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Kenya",
  "Nigeria",
  "South Africa",
  "Netherlands",
  "Sweden",
  "Japan",
];

interface ShippingFormProps {
  defaultValues?: Partial<ShippingFormData>;
  onSubmit: (data: ShippingFormData) => void;
}

export default function ShippingForm({ defaultValues, onSubmit }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First Name" error={errors.firstName?.message}>
          <input
            {...register("firstName")}
            placeholder="Jordan"
            autoComplete="given-name"
            className={inputCls(!!errors.firstName)}
          />
        </Field>
        <Field label="Last Name" error={errors.lastName?.message}>
          <input
            {...register("lastName")}
            placeholder="Lee"
            autoComplete="family-name"
            className={inputCls(!!errors.lastName)}
          />
        </Field>
      </div>

      {/* Email */}
      <Field label="Email Address" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          className={inputCls(!!errors.email)}
        />
      </Field>

      {/* Address */}
      <Field label="Street Address" error={errors.address?.message}>
        <input
          {...register("address")}
          placeholder="123 Sneaker Lane, Apt 4B"
          autoComplete="street-address"
          className={inputCls(!!errors.address)}
        />
      </Field>

      {/* City / Country / Postal */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="City" error={errors.city?.message} className="sm:col-span-1">
          <input
            {...register("city")}
            placeholder="Nairobi"
            autoComplete="address-level2"
            className={inputCls(!!errors.city)}
          />
        </Field>
        <Field label="Country" error={errors.country?.message} className="sm:col-span-1">
          <select
            {...register("country")}
            defaultValue=""
            className={inputCls(!!errors.country)}
          >
            <option value="" disabled>Select…</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Postal Code" error={errors.postalCode?.message} className="sm:col-span-1">
          <input
            {...register("postalCode")}
            placeholder="00100"
            autoComplete="postal-code"
            className={inputCls(!!errors.postalCode)}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-2 w-full py-4 rounded-2xl bg-accent text-soft-black font-black text-sm hover:bg-yellow-400 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-accent/20"
      >
        Continue to Payment →
      </button>
    </form>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function inputCls(hasError: boolean) {
  return [
    "w-full px-4 py-3 rounded-2xl border text-sm text-soft-black bg-white placeholder:text-gray-400",
    "focus:outline-none focus:ring-1 transition-colors duration-150",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : "border-gray-200 focus:border-accent focus:ring-accent",
  ].join(" ");
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
