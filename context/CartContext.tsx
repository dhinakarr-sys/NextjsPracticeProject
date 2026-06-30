"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  // billing is computed on the server; context only manages cart items

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      // store minimal cart item shape required by the app
      return [...prev, { id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 } as CartItem];
    });
  }

  function updateQuantity(id: number, quantity: number) {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item)).filter((item) => item.quantity > 0));
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const getCount = () => cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}