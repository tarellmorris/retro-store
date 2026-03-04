import { useDisclosure } from "@heroui/react";
import React, { createContext, useContext, useEffect, useState } from "react";

import { Cart } from "@/@types/cart";
import { StockItemProps } from "@/@types/stock";

interface CartContextValue {
  cart: Cart | null;
  cartItems: null | StockItemProps[];
  drawerDisclosure: ReturnType<typeof useDisclosure>;
  fetchCart: () => void;
  fetchCartItemDetails: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const drawerDisclosure = useDisclosure();

  const [cart, setCart] = useState<Cart | null>(null);
  const [cartItems, setCartItems] = useState<null | StockItemProps[]>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const gameIds = cart?.items.map(({ gameId }) => gameId) ?? [];

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

  const fetchCartItemDetails = async () => {
    if (!gameIds.length) return;

    try {
      setLoading(true);
      const res = await fetch("api/games/byId", {
        body: JSON.stringify(gameIds),
        credentials: "include",
      });
      const data = await res.json();
      setCartItems(data);
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
        cartItems,
        drawerDisclosure,
        fetchCart,
        fetchCartItemDetails,
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
