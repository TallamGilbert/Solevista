function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-sm animate-pulse">
      {/* Image placeholder */}
      <div className="w-full aspect-square bg-gray-200" />
      {/* Info */}
      <div className="px-4 py-3 flex flex-col gap-2">
        <div className="h-2.5 w-12 bg-gray-200 rounded-full" />
        <div className="h-3.5 w-3/4 bg-gray-200 rounded-full" />
        <div className="h-3.5 w-1/2 bg-gray-200 rounded-full mt-0.5" />
      </div>
    </div>
  );
}

export default function ProductSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
