"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("admin@store.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@store.com" && password === "admin123") {
      sessionStorage.setItem("role", "admin");
      const redirectTo = searchParams.get("redirect") || "/admin";
      router.replace(redirectTo);
      return;
    }
    setError("Invalid admin credentials");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#06060a] px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f1117] p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Admin Access</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Login</h2>
        <p className="mt-2 text-sm text-zinc-400">Use admin@store.com / admin123 to continue.</p>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#151723] px-4 py-3 text-white outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#151723] px-4 py-3 text-white outline-none"
            />
          </div>
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <button className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-semibold text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
