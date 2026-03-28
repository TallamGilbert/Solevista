"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "./actions";
import { AlertCircle, CheckCircle } from "lucide-react";

const inputCls = (hasError?: boolean) =>
  [
    "w-full px-4 py-3 rounded-2xl border text-sm text-soft-black bg-white placeholder:text-gray-400",
    "focus:outline-none focus:ring-1 transition-colors duration-150",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : "border-gray-200 focus:border-accent focus:ring-accent",
  ].join(" ");

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
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function ProfileForm({
  initialName,
  initialEmail,
  hasPassword,
}: {
  initialName: string;
  initialEmail: string;
  hasPassword: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword && newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    startTransition(async () => {
      const result = await updateProfile({
        name,
        email,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Personal information */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-sm font-semibold text-soft-black mb-5">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputCls()}
              required
            />
          </Field>
          <Field label="Email Address">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputCls()}
              required
            />
          </Field>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-sm font-semibold text-soft-black mb-1">Change Password</h2>
        {hasPassword ? (
          <>
            <p className="text-xs text-gray-400 mb-5">Leave blank to keep your current password</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Current Password">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputCls()}
                  autoComplete="current-password"
                />
              </Field>
              <Field label="New Password">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className={inputCls()}
                  autoComplete="new-password"
                />
              </Field>
              <Field label="Confirm New Password">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputCls()}
                  autoComplete="new-password"
                />
              </Field>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400 mt-2">
            Your account is linked via Google. Password management is handled by Google.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div>
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-500">
              <AlertCircle size={15} />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
              <CheckCircle size={15} />
              Profile updated successfully
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 rounded-2xl bg-soft-black text-white text-sm font-bold hover:bg-accent hover:text-soft-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
