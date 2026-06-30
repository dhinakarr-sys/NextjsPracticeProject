import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import CheckoutModal from "./CheckoutModal";
import Toast from "./Toast";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (cart.length === 0) {
      setSummary(null);
      return;
    }

    async function loadSummary() {
      setLoading(true);
      try {
        const res = await fetch("/api/cart/summary", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: cart }) });
        const data = await res.json();
        setSummary(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, [open, cart]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/70">
      <div className="h-full w-full max-w-xl border-l border-white/10 bg-[#0f1117] p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Your cart</p>
            <h2 className="text-2xl font-semibold text-white">Checkout</h2>
          </div>
          <button onClick={onClose} className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-300">Close</button>
        </div>

        <div className="mt-6 space-y-4 overflow-y-auto pr-2" style={{ maxHeight: "55vh" }}>
          {cart.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-zinc-400">
              Your cart is empty. Add a product to continue.
            </div>
          ) : loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-zinc-400">Loading summary…</div>
          ) : (
            cart.map((item) => {
              const detail = summary?.items?.find((d: any) => d.id === item.id);
              return (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex gap-3">
                    <div className="h-16 w-16 overflow-hidden rounded-xl bg-zinc-950/80 p-1">
                      <Image src={item.image} alt={item.title} width={64} height={64} className="h-full w-full rounded-lg object-contain" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-zinc-400">Remove</button>
                      </div>
                      <p className="mt-1 text-sm text-zinc-400">Original: ${item.price.toFixed(2)} each</p>
                      <div className="mt-2 text-sm text-zinc-300">
                        <div>Quantity: {item.quantity}</div>
                        <div>Discount: ${detail ? detail.discountAmount.toFixed(2) : "0.00"}</div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 text-lg text-white">−</button>
                            <span className="min-w-6 text-center text-sm text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 text-lg text-white">+</button>
                          </div>
                          <p className="text-sm font-semibold text-indigo-300">Final: ${detail ? detail.final.toFixed(2) : (item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#151723] p-4 text-sm text-zinc-300">
          {loading ? (
            <div>Calculating totals…</div>
          ) : summary ? (
            <>
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${summary.subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span>Product Discount</span>
                <span>- ${summary.productDiscount.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span>Cart Discount ({summary.cartDiscountPercent}%)</span>
                <span>- ${summary.cartDiscount.toFixed(2)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
                <span>Final Total</span>
                <span>${summary.finalAmount.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <div className="text-zinc-400">No totals available</div>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <button onClick={() => setCheckoutOpen(true)} disabled={!summary || loading || cart.length === 0} className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-semibold text-white disabled:opacity-50">Checkout</button>
          {cart.length > 0 ? (
            <button onClick={clearCart} className="w-full rounded-2xl border border-white/10 px-4 py-2 text-sm text-zinc-400">Clear cart</button>
          ) : null}
        </div>

        <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} summary={summary} cart={cart} onSuccess={() => { setToast("Order placed successfully"); clearCart(); setCheckoutOpen(false); }} />
        <Toast message={toast} onClose={() => setToast(null)} />
      </div>
    </div>
  );
}
