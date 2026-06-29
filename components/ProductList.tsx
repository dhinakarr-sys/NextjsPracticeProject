"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <>
      <div className="sticky top-20 z-20 mb-8 rounded-[1.5rem] border border-white/10 bg-[#111119]/85 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input
            type="text"
            placeholder="Search the catalog..."
            className="flex-1 rounded-2xl border border-white/10 bg-[#1a1a24] px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:border-indigo-400/40 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-[#101018]/70 px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10 text-2xl text-indigo-300">
            ✦
          </div>
          <h3 className="text-xl font-semibold text-white">Nothing matched your search</h3>
          <p className="mt-2 max-w-md text-sm leading-7 text-zinc-400">
            Try a broader keyword or reset the filter to explore the full collection again.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="mt-5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}