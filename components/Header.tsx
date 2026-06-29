"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/admin/add-product", label: "Admin" },
];

export default function Header() {
  const { cart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-semibold shadow-lg shadow-indigo-500/30">
            D
          </div>
          <div>
            <p className="text-lg font-semibold tracking-[0.2em] text-white">DHINAKAR</p>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Studio</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-300">
            <span>🛒</span>
            <span>{cart.length}</span>
          </div>
        </div>

        <button
          className="rounded-full border border-white/10 p-2 text-white md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-[#0b0b10] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-300">
              <span>🛒</span>
              <span>Cart {cart.length}</span>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}