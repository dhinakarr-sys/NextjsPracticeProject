"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@store.com" && password === "admin123") {
      // Dev-grade gating: Setting a simple hardcoded cookie. Not for production security!
      document.cookie = "admin_logged_in=true; path=/; max-age=86400";
      sessionStorage.setItem("role", "admin");
      const redirectTo = searchParams.get("redirect") || "/admin";
      router.replace(redirectTo);
      return;
    }
    setError("Invalid admin credentials");
  };

  return (
    <div className="mx-auto w-full max-w-md mt-16 rounded-[2rem] border border-white/10 bg-[#111119]/80 p-8 shadow-2xl backdrop-blur-xl">
      <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-white">Admin Login</h1>
      <p className="mb-8 text-center text-zinc-400">Sign in to manage the store</p>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            placeholder="admin@store.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <button type="submit" className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-700">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#06060a]">
      <Header />
      <main className="flex-1 px-4">
        <Suspense fallback={<div className="p-8 text-center text-zinc-400">Loading...</div>}>
          <LoginContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
