"use client";

import Link from "next/link";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/add-product", label: "Add Product" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#090b10] p-6 md:flex md:flex-col">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-semibold text-white">
          D
        </div>
        <div>
          <p className="text-lg font-semibold text-white">Dhinakar</p>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Admin Panel</p>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active ? "bg-indigo-600/20 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
