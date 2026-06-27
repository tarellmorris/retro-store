"use client";

import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Cart } from "@/@types/cart";
import { useUser } from "@/context/user";

type AddToCartData = {
  gameId: number;
  quantity: number;
};

interface CartContextValue {
  addToCart: (data: AddToCartData) => Promise<void>;
  cart: Cart | null;
  drawerDisclosure: ReturnType<typeof useDisclosure>;
  fetchCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const drawerDisclosure = useDisclosure();
  const router = useRouter();
  const { loading: userLoading, user } = useUser();

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cart", {
        credentials: "include",
      });

      if (res.status === 401) {
        setCart(null);
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch cart: ${res.status}`);
      }

      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error(error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      setCart(null);
      setLoading(false);
      return;
    }

    void fetchCart();
  }, [fetchCart, user, userLoading]);

  const addToCart = async (data: AddToCartData) => {
    try {
      const res = await fetch("/api/cart/items", {
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (res.status === 401) {
        const currentPath = `${window.location.pathname}${window.location.search}`;
        router.push(`/login?next=${encodeURIComponent(currentPath)}`);
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to add item to cart: ${res.status}`);
      }

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
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
