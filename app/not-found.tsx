import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-7xl font-bold text-red-500">
        404
      </h1>

      <p className="mt-4 text-gray-600">
        Sorry, this page doesn't exist.
      </p>

      <Link
        href="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Go Home
      </Link>
    </div>
  );
}