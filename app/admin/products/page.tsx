"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Products</h1>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id ?? `product-${index}`} className="border p-4 rounded">
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-blue-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
