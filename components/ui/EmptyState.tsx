import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onClear: () => void;
}

export default function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-light-gray flex items-center justify-center">
        <SearchX size={28} className="text-gray-400" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-base font-bold text-soft-black">No products found</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-xs">
          Try adjusting your filters or search term to find what you&apos;re looking for.
        </p>
      </div>
      <button
        onClick={onClear}
        className="mt-2 px-6 py-2.5 rounded-2xl bg-soft-black text-white text-sm font-semibold hover:bg-gray-800 active:scale-95 transition-all duration-150"
      >
        Clear all filters
      </button>
    </div>
  );
}
