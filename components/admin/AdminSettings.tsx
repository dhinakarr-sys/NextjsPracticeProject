"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminSettings() {
  const [settings, setSettings] = useState({ cartDiscount: 0, productDiscounts: {} as Record<string, number> });
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/settings").then(r => r.json()),
      fetch("/api/products").then(r => r.json()),
      fetch("/api/categories").then(r => r.json())
    ]).then(([s, p, c]) => {
      setSettings(s);
      setProducts(p);
      setCategories(c);
      setLoading(false);
    });
  }, []);

  const handleProductDiscountChange = (id: string, value: string) => {
    setSettings({
      ...settings,
      productDiscounts: { ...settings.productDiscounts, [id]: Number(value) }
    });
  };

  const handleCategoryDiscountChange = (id: number, value: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, discountPercent: Number(value) } : c));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      // Save global & product settings
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      // Save category settings
      const categoryUpdates = categories.map(c => 
        fetch("/api/categories", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: c.id, discountPercent: c.discountPercent }),
        })
      );
      await Promise.all(categoryUpdates);

      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (e) {
      setMessage("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white p-8">Loading settings...</div>;

  return (
    <div className="space-y-8">
      {/* Global Discount */}
      <div className="rounded-2xl border border-white/10 bg-[#111119] p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-4">Global Cart Discount</h2>
        <div className="flex items-center gap-4">
          <input 
            type="number" 
            min="0" max="100"
            value={settings.cartDiscount}
            onChange={(e) => setSettings({ ...settings, cartDiscount: Number(e.target.value) })}
            className="w-32 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-white outline-none focus:border-indigo-500"
          />
          <span className="text-zinc-400">% off entire cart</span>
        </div>
      </div>

      {/* Category Discounts */}
      <div className="rounded-2xl border border-white/10 bg-[#111119] p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-1">Category Discounts</h2>
        <p className="text-sm text-zinc-400 mb-6">
          Set discounts for entire categories. 
          <span className="text-indigo-400 ml-1">If a product has its own discount, the higher of the two will apply (they do not stack).</span>
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.id} className="flex flex-col gap-2 rounded-xl border border-white/5 bg-black/20 p-4">
              <span className="font-semibold text-white capitalize">{c.name}</span>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  min="0" max="100"
                  value={c.discountPercent}
                  onChange={(e) => handleCategoryDiscountChange(c.id, e.target.value)}
                  className="w-24 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-white outline-none focus:border-indigo-500"
                />
                <span className="text-zinc-400">%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Discounts */}
      <div className="rounded-2xl border border-white/10 bg-[#111119] p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6">Product Discounts</h2>
        <div className="space-y-4">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-zinc-950 p-1">
                  {p.image && <Image src={p.image} alt={p.title} width={40} height={40} className="h-full w-full object-contain" />}
                </div>
                <div>
                  <p className="font-semibold text-white line-clamp-1">{p.title}</p>
                  <p className="text-sm text-zinc-400">${p.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  min="0" max="100"
                  value={settings.productDiscounts[p.id] || 0}
                  onChange={(e) => handleProductDiscountChange(p.id, e.target.value)}
                  className="w-24 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-white outline-none focus:border-indigo-500"
                />
                <span className="text-zinc-400">%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-4 flex items-center justify-end gap-4 rounded-2xl border border-white/10 bg-[#111119]/90 p-4 backdrop-blur shadow-2xl">
        {message && <span className="text-sm text-emerald-400">{message}</span>}
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
