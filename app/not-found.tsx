import Link from "next/link";

export default function NotFound() {
   return(
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#111119]/85 p-10 text-center shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/10 text-4xl font-black text-indigo-300">
          404
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">Page not found</h1>
        <p className="mt-3 text-base leading-8 text-zinc-400">
          The route you’re looking for seems to have slipped out of the collection. Let’s take you back home.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}