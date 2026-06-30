import Link from "next/link";

const cards = [
  { href: "/admin/add-product", title: "Add Product", description: "Create new products for the catalog." },
  { href: "/admin/products", title: "Manage Products", description: "Review and update existing products." },
  { href: "/admin/settings", title: "Discount Settings", description: "Control cart and product discounts." },
  { href: "/admin", title: "Future Orders", description: "Order management coming soon." },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="rounded-3xl border border-white/10 bg-[#0f1117] p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-indigo-300">Control Center</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Admin Dashboard</h2>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400">
          Manage your catalog, discounts, and store operations from one polished dashboard.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-3xl border border-white/10 bg-[#0f1117] p-6 transition hover:border-indigo-500/40 hover:bg-[#151723]"
          >
            <h3 className="text-xl font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
