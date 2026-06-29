import type { Metadata } from "next";

import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dhinakar Store",
  description: "An E-Commerce Store built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body>
    <CartProvider>

        <Header />

            <main className="min-h-screen">
            {children}
            </main>

        <Footer />

    </CartProvider>
</body>
    </html>
  );
}