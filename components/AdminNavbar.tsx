"use client";

import { useRouter } from "next/navigation";

export default function AdminNavbar({ title }: { title: string }) {
  const router = useRouter();

  const logout = () => {
    sessionStorage.removeItem("role");
    router.replace("/");
  };

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-[#0b0d13] px-6 py-4">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Admin</p>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
      </div>
      <button
        onClick={logout}
        className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
      >
        Logout
      </button>
    </header>
  );
}
