"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/cart/summary", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: [{ id: product.id, title: product.title, price: product.price, quantity: 1 }] }) });
        const data = await res.json();
        if (!mounted) return;
        setDetail(data.items?.[0] ?? null);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, [product.id, product.price, product.title]);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#15151c]/90 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/60 hover:shadow-[0_25px_80px_rgba(99,102,241,0.24)]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />

      <div className="relative mb-4 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 p-3">
        <span className="absolute left-3 top-3 rounded-full bg-indigo-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-indigo-300">
          {product.category}
        </span>
        <Image
          src={product.image}
          alt={product.title}
          width={240}
          height={240}
          className="mx-auto h-48 w-full rounded-xl object-contain transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="eager"
        />
      </div>

      <div className="relative">
        <h2 className="line-clamp-2 text-lg font-semibold text-white">
          {product.title}
        </h2>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-zinc-400">Premium pick</div>
          <div className="text-right text-sm">
            {loading ? (
              <div className="text-zinc-400">Loading price…</div>
            ) : detail ? (
              <div>
                <div className="text-zinc-400">Original ${product.price.toFixed(2)}</div>
                <div className="text-indigo-300">- ${detail.discountAmount.toFixed(2)}</div>
                <div className="text-xl font-semibold text-indigo-400">${detail.final.toFixed(2)}</div>
              </div>
            ) : (
              <div className="text-xl font-semibold text-indigo-400">${product.price.toFixed(2)}</div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:border-indigo-400/50 hover:bg-indigo-500/15"
          >
            Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}