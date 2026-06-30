"use client";

import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOrders(data.orders || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: number, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Failed to update status");
      // Optimistically update the UI locally
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (e: any) {
      alert(e.message);
    }
  };

  if (loading) return <div className="p-8 text-zinc-400">Loading orders...</div>;
  if (error) return <div className="p-8 text-rose-400">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Manage Orders</h2>
      
      {orders.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#111119] p-8 text-center text-zinc-400 shadow-xl">
          No orders have been placed yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111119] shadow-xl">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="border-b border-white/10 bg-white/5 text-xs font-semibold uppercase text-zinc-400">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-white">#{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-white">{order.customerName}</div>
                    <div className="text-xs text-zinc-400">{order.customerEmail}</div>
                    <div className="text-xs text-zinc-500">{order.customerPhone}</div>
                  </td>
                  <td className="px-6 py-4">
                    {order.items?.length || 0} items
                    <div className="text-xs text-zinc-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-emerald-400">${order.finalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="text-white">{order.paymentMethod}</div>
                    <div className={`text-xs ${order.paymentStatus === "PAID" ? "text-emerald-400" : "text-amber-400"}`}>
                      {order.paymentStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white outline-none focus:border-indigo-500"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
