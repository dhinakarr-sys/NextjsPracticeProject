"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckoutModal({ open, onClose, summary, cart, onSuccess }: any) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<any>(null);

  // Shipping
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Payment
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  
  useEffect(() => {
    if (!open) {
      setStep(1);
      setError(null);
      setOrderResult(null);
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const validateShipping = () => {
    const { name, email, phone, addressLine1, city, state, pincode, country } = shipping;
    if (!name || !email || !phone || !addressLine1 || !city || !state || !pincode || !country) {
      setError("Please fill in all required shipping fields");
      return false;
    }
    setError(null);
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateShipping()) return;
    setStep((s) => s + 1);
  };

  const handleConfirm = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...shipping, paymentMethod, cartItems: cart }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout failed");
      const result = data.order ?? data;
      setOrderResult(result);
      setStep(4);
      onSuccess?.(result);
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex min-h-screen items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-[#121823] p-6 shadow-2xl relative flex flex-col" style={{ maxHeight: "calc(100vh - 3rem)" }}>
        
        {step < 4 && (
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <h3 className="text-lg font-semibold text-white">
              {step === 1 ? "Shipping Details" : step === 2 ? "Payment Method" : "Review & Confirm"}
            </h3>
            <button onClick={onClose} className="text-sm text-zinc-400 hover:text-white transition">Close</button>
          </div>
        )}

        <div className="overflow-y-auto pr-2 flex-1" style={{ maxHeight: "60vh" }}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Full Name *</label>
                  <input type="text" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Email *</label>
                  <input type="email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Phone *</label>
                  <input type="tel" value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Country *</label>
                  <input type="text" value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Address Line 1 *</label>
                <input type="text" value={shipping.addressLine1} onChange={(e) => setShipping({ ...shipping, addressLine1: e.target.value })} className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Address Line 2 (Optional)</label>
                <input type="text" value={shipping.addressLine2} onChange={(e) => setShipping({ ...shipping, addressLine2: e.target.value })} className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">City *</label>
                  <input type="text" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">State *</label>
                  <input type="text" value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Pincode *</label>
                  <input type="text" value={shipping.pincode} onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })} className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {["UPI", "CARD", "COD"].map(method => (
                  <button 
                    key={method} 
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-xl border p-3 text-sm font-semibold transition ${paymentMethod === method ? "border-indigo-500 bg-indigo-500/10 text-indigo-300" : "border-white/10 bg-white/5 text-zinc-400"}`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-white/5 bg-black/20 p-4">
                {paymentMethod === "UPI" && (
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">UPI ID</label>
                    <input type="text" placeholder="yourname@upi" className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
                  </div>
                )}
                {paymentMethod === "CARD" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">CVV</label>
                        <input type="password" placeholder="123" className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-indigo-500" />
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod === "COD" && (
                  <p className="text-sm text-zinc-400">Pay via cash or UPI to the delivery executive upon arrival.</p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300 space-y-2">
                <h4 className="font-semibold text-white mb-2">Shipping to:</h4>
                <p>{shipping.name} ({shipping.phone})</p>
                <p>{shipping.addressLine1} {shipping.addressLine2}</p>
                <p>{shipping.city}, {shipping.state}, {shipping.pincode}</p>
                <p>{shipping.country}</p>
                <div className="mt-2 pt-2 border-t border-white/10">
                  <span className="font-semibold text-white">Payment Method:</span> {paymentMethod}
                </div>
              </div>
              
              <div className="rounded-xl border border-white/10 bg-[#151723] p-4 text-sm text-zinc-300">
                <div className="flex items-center justify-between"><span>Subtotal</span><span>${summary?.subtotal?.toFixed(2) ?? "0.00"}</span></div>
                <div className="mt-2 flex items-center justify-between"><span>Product Discount</span><span>- ${summary?.productDiscount?.toFixed(2) ?? "0.00"}</span></div>
                <div className="mt-2 flex items-center justify-between"><span>Category Discount</span><span>- ${summary?.categoryDiscount?.toFixed(2) ?? "0.00"}</span></div>
                <div className="mt-2 flex items-center justify-between"><span>Cart Discount</span><span>- ${summary?.cartDiscount?.toFixed(2) ?? "0.00"}</span></div>
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white"><span>Final Amount</span><span>${summary?.finalAmount?.toFixed(2) ?? "0.00"}</span></div>
              </div>
            </div>
          )}

          {step === 4 && orderResult && (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Order Placed!</h3>
              <p className="text-zinc-400 mb-6">Your order #{orderResult.id} has been confirmed.</p>
              <Link href="/orders" onClick={onClose} className="inline-block rounded-xl bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20 transition">
                View Order History
              </Link>
            </div>
          )}

          {error && <div className="mt-4 text-sm text-rose-400">{error}</div>}
        </div>

        {step < 4 && (
          <div className="mt-6 flex justify-between gap-3 border-t border-white/10 pt-4">
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} className="rounded-xl border border-white/20 px-6 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-white/5 transition">
                Back
              </button>
            ) : <div />}
            
            {step < 3 ? (
              <button onClick={handleNext} className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition">
                Continue
              </button>
            ) : (
              <button onClick={handleConfirm} disabled={loading} className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition disabled:opacity-50">
                {loading ? "Processing..." : "Place Order"}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
