"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";

interface WriteReviewModalProps {
  productId: string;
}

export default function WriteReviewModal({ productId }: WriteReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    setLoading(true);
    setError(null);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating, comment: comment.trim() || undefined }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Failed to submit review.");
    } else {
      setSuccess(true);
    }
  }

  function handleClose() {
    setOpen(false);
    setRating(0);
    setHovered(0);
    setComment("");
    setError(null);
    setSuccess(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:block px-5 py-2.5 rounded-2xl border border-gray-200 text-sm font-semibold text-soft-black hover:bg-light-gray transition-colors duration-150"
      >
        Write a Review
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-5">

            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-soft-black">Write a Review</h2>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-xl text-gray-400 hover:text-soft-black hover:bg-light-gray transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {success ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Star size={22} className="fill-green-500 text-green-500" strokeWidth={0} />
                </div>
                <p className="font-semibold text-soft-black">Thanks for your review!</p>
                <p className="text-sm text-gray-500">Your feedback helps other shoppers.</p>
                <button
                  onClick={handleClose}
                  className="mt-2 px-6 py-2.5 rounded-2xl bg-soft-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Star rating */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Rating *
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        className="p-0.5 transition-transform hover:scale-110 active:scale-95"
                        aria-label={`${star} star`}
                      >
                        <Star
                          size={28}
                          strokeWidth={0}
                          className={
                            star <= (hovered || rating)
                              ? "fill-accent"
                              : "fill-gray-200"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Comment (optional)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    maxLength={1000}
                    placeholder="Share your experience with this product…"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm text-soft-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-accent focus:ring-accent transition-colors resize-none"
                  />
                  <p className="text-[11px] text-gray-400 text-right">{comment.length}/1000</p>
                </div>

                {error && (
                  <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-3 rounded-2xl">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-accent text-soft-black font-black text-sm hover:bg-yellow-400 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-accent/20 disabled:opacity-60 disabled:cursor-wait"
                >
                  {loading ? "Submitting…" : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
