import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products: { id: number }[] = await response.json();

  return products.map((product) => ({ id: product.id.toString() }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product: Product = await response.json();

  return {
    title: `${product.title} | Dhinakar Store`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product: Product = await response.json();

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-400">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/products" className="transition hover:text-white">Products</Link>
          <span>/</span>
          <span className="text-white">{product.title}</span>
        </nav>

        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-[#101018]/80 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/70 p-6">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="mx-auto h-[360px] w-full rounded-[1.25rem] object-contain"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="w-fit rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300">
              {product.category}
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {product.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span>★★★★★ 4.8</span>
              <span>•</span>
              <span>Free shipping over $150</span>
            </div>
            <p className="mt-6 text-lg leading-8 text-zinc-400">{product.description}</p>
            <div className="mt-8 flex items-end justify-between gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Price</p>
                <p className="mt-2 text-4xl font-semibold text-indigo-300">${product.price}</p>
              </div>
              <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">You might also love</h2>
            <Link href="/products" className="text-sm text-indigo-300 transition hover:text-white">View all</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-[#15151d]/80 p-5">
                <div className="h-28 rounded-xl bg-white/5" />
                <div className="mt-4 h-4 w-2/3 rounded bg-white/10" />
                <div className="mt-3 h-4 w-1/2 rounded bg-white/10" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}