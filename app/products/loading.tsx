import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="h-9 bg-gray-200 rounded w-1/4 mb-6 animate-pulse" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse" />
        <div className="w-full md:w-48 h-12 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}