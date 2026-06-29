import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-5xl font-bold text-blue-600">
        Welcome to Dhinakar Store
      </h1>

      <p className="mt-6 text-lg text-gray-600 max-w-2xl">
        Discover amazing products at affordable prices.
        Built with Next.js App Router, Server Side Rendering,
        Static Site Generation and Tailwind CSS.
      </p>

      <Link
        href="/products"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        View Products
      </Link>
    </main>
  );
}