import Link from "next/link";

const footerLinks = [
  { href: "/products", label: "Shop" },
  { href: "/admin/add-product", label: "Admin" },
  { href: "/", label: "About" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06060a] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold tracking-[0.24em] text-white">DHINAKAR</p>
          <p className="mt-3 max-w-xs text-sm leading-7 text-zinc-400">
            Curated premium essentials for the modern lifestyle — designed to feel effortless, elevated, and unforgettable.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-300">Navigate</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-300">Follow</h3>
          <div className="mt-4 flex gap-4 text-sm text-zinc-400">
            <span className="transition hover:text-white">Instagram</span>
            <span className="transition hover:text-white">X</span>
            <span className="transition hover:text-white">Dribbble</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Dhinakar Studio. All rights reserved.</p>
        <p>Crafted with Next.js and Tailwind CSS.</p>
      </div>
    </footer>
  );
}