"use client";

export default function AdminProductsLoading() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="h-9 bg-gray-200 rounded w-1/4 mb-6 animate-pulse" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border p-4 rounded animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-5 bg-gray-200 rounded w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
