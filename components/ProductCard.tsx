"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="mx-auto h-48 object-contain"
        loading="eager"
      />

      <h2 className="mt-4 font-semibold line-clamp-2">
        {product.title}
      </h2>

      <p className="text-gray-500 mt-2">
        {product.category}
      </p>

      <p className="mt-2 text-blue-600 font-bold text-lg">
        ${product.price}
      </p>

      <div className="flex gap-2 mt-4">
        <Link
          href={`/products/${product.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Details
        </Link>

        <button
          onClick={() => addToCart(product)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}