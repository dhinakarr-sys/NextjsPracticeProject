export default function ProductDetailsLoading() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="w-full h-96 bg-gray-200 rounded animate-pulse" />

        <div>
          <div className="h-9 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
          </div>

          <div className="mt-4 h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
          <div className="mt-6 h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
