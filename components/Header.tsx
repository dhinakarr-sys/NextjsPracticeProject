"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cart } = useCart();

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Store Logo */}
        <h1 className="text-2xl font-bold">
          Dhinakar Store
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-6" suppressHydrationWarning>
          <Link href="/">Home</Link>

          <Link href="/products">Products</Link>

          <Link href="/admin/add-product">
            Admin
          </Link>

          {/* Cart Count */}
          <div className="bg-white text-blue-600 px-3 py-1 rounded-full font-semibold">
            🛒 Cart ({cart.length})
          </div>
        </div>
      </nav>
    </header>
  );
}