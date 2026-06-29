"use client";

export default function AddProductLoading() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="h-9 bg-gray-200 rounded w-1/3 mb-6 animate-pulse" />

      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}
