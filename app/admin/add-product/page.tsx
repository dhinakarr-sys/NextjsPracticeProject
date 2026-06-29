"use client";

import { useState, type FormEvent } from "react";

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, price: Number(price), category, image }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add product");

      setStatusMessage(data.message || "Product added successfully");
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-[#111119]/85 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">Admin console</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">Create a new product</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-400">Compose a premium offering and push it to your storefront instantly.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Title</label>
            <input type="text" placeholder="Aurora Speaker" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Description</label>
            <textarea rows={4} placeholder="Describe the product experience" className="input-field resize-none" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Price</label>
              <input type="number" placeholder="199" className="input-field" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Category</label>
              <input type="text" placeholder="Electronics" className="input-field" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">Image URL</label>
            <input type="text" placeholder="https://example.com/image.jpg" className="input-field" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>

          {statusMessage ? (
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              {statusMessage}
            </div>
          ) : null}

          <button type="submit" disabled={isSubmitting} className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-70">
            {isSubmitting ? "Publishing..." : "Publish Product"}
          </button>
        </form>
      </div>
    </div>
  );
}