import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import AppShell from "@/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhinakar Store",
  description: "Premium fashion and tech storefront built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#06060a]">
      <body className="bg-transparent text-zinc-100">
        <CartProvider>
          <AppShell>{children}</AppShell>
        </CartProvider>
      </body>
    </html>
  );
}