"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setAuthError(null);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setAuthError("Invalid email or password. Please try again.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl });
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-light-gray">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black text-soft-black tracking-tight">
            SNEAQR
          </Link>
          <h1 className="text-2xl font-black text-soft-black mt-4">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col gap-6">

          {/* Global error */}
          {authError && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-red-50 border border-red-100 text-sm text-red-600">
              <AlertCircle size={15} className="flex-shrink-0" />
              {authError}
            </div>
          )}

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-soft-black hover:bg-light-gray disabled:opacity-60 disabled:cursor-wait transition-colors duration-150"
          >
            {/* Google SVG logo */}
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            {googleLoading ? "Redirecting…" : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Credentials form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>

            <Field label="Email" error={errors.email?.message}>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className={inputCls(!!errors.email)}
              />
            </Field>

            <Field label="Password" error={errors.password?.message}>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={inputCls(!!errors.password) + " pr-11"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-soft-black transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            <div className="flex justify-end -mt-1">
              <Link
                href="/auth/forgot-password"
                className="text-xs text-gray-400 hover:text-soft-black transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-accent text-soft-black font-black text-sm hover:bg-yellow-400 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-accent/20 disabled:opacity-60 disabled:cursor-wait mt-1"
            >
              {isSubmitting ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-soft-black hover:text-accent transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
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
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
