"use client";

export default function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 shadow animate-pulse">
      <div className="mx-auto h-48 bg-gray-200 rounded" />
      <div className="mt-4 h-5 bg-gray-200 rounded w-3/4" />
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
      <div className="mt-2 h-6 bg-gray-200 rounded w-1/3" />
      <div className="flex gap-2 mt-4">
        <div className="flex-1 h-10 bg-gray-200 rounded" />
        <div className="flex-1 h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
