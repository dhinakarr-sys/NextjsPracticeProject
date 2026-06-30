"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role !== "admin") {
      const target = pathname && pathname !== "/admin" ? pathname : "/admin";
      router.replace(`/login?redirect=${encodeURIComponent(target)}`);
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return <div className="flex min-h-screen items-center justify-center bg-[#06060a] text-zinc-400">Checking access…</div>;
  }

  return (
    <div className="min-h-screen bg-[#06060a] text-zinc-100">
      <div className="flex min-h-screen">
        <AdminSidebar pathname={pathname ?? "/admin"} />
        <div className="flex min-h-screen flex-1 flex-col">
          <AdminNavbar title="Admin Dashboard" />
          <div className="flex-1 p-6 md:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
