"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function OrdersPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/checkout?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setOrders(data.orders || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#06060a]">
      <Header />
      <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 rounded-[2rem] border border-white/10 bg-[#111119]/80 p-8 shadow-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Order History</h1>
            <p className="mt-2 text-zinc-400">Enter your email to view your past purchases.</p>
            
            <form onSubmit={fetchOrders} className="mt-6 flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full max-w-sm rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-500"
              />
              <button disabled={loading} type="submit" className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white disabled:opacity-50">
                {loading ? "Searching..." : "Lookup"}
              </button>
            </form>
            {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
          </div>

          {orders && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="rounded-2xl border border-white/10 p-8 text-center text-zinc-400">
                  No orders found for this email.
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="rounded-2xl border border-white/10 bg-[#151723] p-6 shadow-xl">
                    <div className="flex flex-col md:flex-row justify-between mb-4 border-b border-white/10 pb-4">
                      <div>
                        <div className="text-sm text-zinc-400">Order #{order.id}</div>
                        <div className="text-sm text-zinc-500">{new Date(order.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="mt-2 md:mt-0 md:text-right">
                        <span className="inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                          {order.status}
                        </span>
                        <div className="mt-2 text-xl font-semibold text-white">${order.finalAmount.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-zinc-950 p-1">
                            {item.image ? (
                              <Image src={item.image} alt={item.title} width={48} height={48} className="h-full w-full object-contain" />
                            ) : null}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white">{item.title}</p>
                            <p className="text-xs text-zinc-400">Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}</p>
                          </div>
                          <div className="text-sm font-medium text-white">${item.lineTotal.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sm text-zinc-400">
                      <div>Payment: {order.paymentMethod} ({order.paymentStatus})</div>
                      <div>Total Discount: ${(order.productDiscount + order.categoryDiscount + order.cartDiscount).toFixed(2)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
