"use client";

import { useState } from "react";

export default function CheckoutModal({ open, onClose, summary, cart, onSuccess }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleConfirm = async () => {
    setError(null);
    if (!name || !email) {
      setError("Please provide name and email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customerName: name, customerEmail: email, items: cart }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout failed");
      onSuccess?.();
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex min-h-screen items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-[#0f1117] p-6 shadow-2xl" style={{ maxHeight: "calc(100vh - 3rem)" }}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Checkout</h3>
          <button onClick={onClose} className="text-sm text-zinc-400">Close</button>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm text-zinc-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-indigo-500"
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#151723] p-4 text-sm text-zinc-300">
            <div className="flex items-center justify-between"><span>Subtotal</span><span>${summary?.subtotal?.toFixed(2) ?? "0.00"}</span></div>
            <div className="mt-2 flex items-center justify-between"><span>Product Discount</span><span>- ${summary?.productDiscount?.toFixed(2) ?? "0.00"}</span></div>
            <div className="mt-2 flex items-center justify-between"><span>Cart Discount</span><span>- ${summary?.cartDiscount?.toFixed(2) ?? "0.00"}</span></div>
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white"><span>Final Amount</span><span>${summary?.finalAmount?.toFixed(2) ?? "0.00"}</span></div>
          </div>

          {error ? <div className="text-sm text-rose-400">{error}</div> : null}

          <button onClick={handleConfirm} disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-semibold text-white disabled:opacity-50">{loading ? "Processing…" : "Confirm Order"}</button>
        </div>
      </div>
    </div>
  );
}
