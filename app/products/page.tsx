import type { Metadata } from "next";
import ProductList from "@/components/ProductList";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

export const metadata: Metadata = {
  title: "Products | Dhinakar Store",
  description: "Browse the premium collection with search and category filters.",
};

export default async function ProductsPage() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await response.json();

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-[#111119]/80 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">Premium catalog</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Discover the latest in luxury essentials
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
            Search, filter, and explore a beautifully curated collection of standout products.
          </p>
        </div>

        <ProductList products={products} />
      </div>
    </div>
  );
}