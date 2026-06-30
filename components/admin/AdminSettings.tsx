"use client";

import { useEffect, useState } from "react";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>({ cartDiscount: 0, productDiscounts: {} });
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [sRes, pRes] = await Promise.all([fetch("/api/settings"), fetch("/api/products")]);
      const s = await sRes.json();
      const p = await pRes.json();
      setSettings(s);
      setProducts(p || []);
      setLoading(false);
    }
    load();
  }, []);

  const updateCartDiscount = (value: number) => setSettings((s: any) => ({ ...s, cartDiscount: value }));

  const updateProductDiscount = (id: number, value: number) => setSettings((s: any) => ({ ...s, productDiscounts: { ...s.productDiscounts, [id]: value } }));

  const save = async () => {
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    alert("Settings saved");
  };

  if (loading) return <div className="p-6 text-zinc-400">Loading settings…</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-white">Admin Settings</h2>
      <p className="text-sm text-zinc-400">Configure cart and per-product discounts.</p>

      <div className="mt-6 max-w-md space-y-3">
        <div>
          <label className="block text-sm text-zinc-300">Global Cart Discount (%)</label>
          <input type="number" min={0} max={100} value={settings.cartDiscount} onChange={(e) => updateCartDiscount(Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-[#0f1117] px-3 py-2 text-white outline-none" />
        </div>

        <div>
          <h3 className="mt-4 text-sm font-semibold text-white">Per-product Discounts</h3>
          <div className="mt-2 space-y-2">
            {products.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="flex-1 text-sm text-zinc-300">{p.title} (id: {p.id})</div>
                <input type="number" min={0} max={100} value={settings.productDiscounts?.[String(p.id)] ?? 0} onChange={(e) => updateProductDiscount(p.id, Number(e.target.value))} className="w-24 rounded-xl border border-white/10 bg-[#0f1117] px-3 py-1 text-white outline-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <button onClick={save} className="rounded-2xl bg-indigo-600 px-4 py-2 font-semibold text-white">Save</button>
        </div>
      </div>
    </div>
  );
}
