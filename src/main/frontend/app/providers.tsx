"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

import { CartProvider } from "@/context/cart";
import { UserProvider } from "@/context/user";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <UserProvider>
        <CartProvider>{children}</CartProvider>
      </UserProvider>
    </HeroUIProvider>
  );
}
