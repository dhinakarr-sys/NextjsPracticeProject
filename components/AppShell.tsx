"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") || pathname === "/login";

  return (
    <>
      {!isAdminRoute ? <Header /> : null}
      <main className="min-h-screen">{children}</main>
      {!isAdminRoute ? <Footer /> : null}
    </>
  );
}
