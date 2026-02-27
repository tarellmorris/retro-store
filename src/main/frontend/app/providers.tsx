"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

import { UserProvider } from "@/context/userContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <UserProvider>{children}</UserProvider>
    </HeroUIProvider>
  );
}
