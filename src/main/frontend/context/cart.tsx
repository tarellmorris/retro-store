import { useDisclosure } from "@heroui/react";
import React, { createContext, useContext, useEffect, useState } from "react";

import { Cart } from "@/@types/cart";

interface CartContextValue {
  cart: Cart | null;
  drawerDisclosure: ReturnType<typeof useDisclosure>;
  fetchCart: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const drawerDisclosure = useDisclosure();

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(cart);
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("api/cart", {
        credentials: "include",
      });
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.log(error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        drawerDisclosure,
        fetchCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
