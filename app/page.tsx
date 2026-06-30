import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dhinakar Store | Shop the Future",
  description: "Discover premium products with a luxury e-commerce experience built with Next.js.",
};

const features = [
  { title: "Curated Drops", description: "Limited release essentials for modern living." },
  { title: "Fast Delivery", description: "Lightning-fast shipping with premium packaging." },
  { title: "Secure Checkout", description: "Protected payments and transparent service." },
];

const categories = [
  { name: "Electronics", icon: "⚡" },
  { name: "Jewelry", icon: "💎" },
  { name: "Fashion", icon: "✨" },
  { name: "Home", icon: "🏡" },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pt-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.3),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.22),_transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300">
              New season • premium collection
            </span>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
              Shop the <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Future</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
              Discover bold essentials crafted for the next generation of luxury shopping — sleek, intelligent, and unforgettable.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:shadow-indigo-500/40"
              >
                Explore Collection
              </Link>
              <Link
                href="/admin/add-product"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-center font-semibold text-white transition hover:border-indigo-400/40 hover:bg-indigo-500/10"
              >
                Add a Product
              </Link>
            </div>
          </div>

  
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">Featured categories</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Built for every mood</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <div key={category.name} className="rounded-2xl border border-white/10 bg-[#171722]/80 p-6 transition hover:border-indigo-400/40 hover:bg-[#1b1b28]">
                <div className="text-3xl">{category.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-white">{category.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">Elevated essentials, thoughtfully curated.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#12121a]/80 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">Why us</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Premium service, effortlessly delivered.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/10 bg-[#171722]/80 p-6">
                <div className="mb-4 h-10 w-10 rounded-full bg-indigo-500/15" />
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}