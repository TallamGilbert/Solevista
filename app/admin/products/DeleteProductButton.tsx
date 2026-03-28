"use client";

import { useState, useTransition } from "react";
import { deleteProduct } from "./actions";
import { Trash2 } from "lucide-react";

export default function DeleteProductButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const [confirm, setConfirm] = useState(false);

  if (confirm) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500">Delete?</span>
        <button
          onClick={() => startTransition(() => deleteProduct(id))}
          disabled={isPending}
          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
        >
          {isPending ? "…" : "Yes"}
        </button>
        <button
          onClick={() => setConfirm(false)}
          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
      aria-label="Delete product"
    >
      <Trash2 size={15} />
    </button>
  );
}
