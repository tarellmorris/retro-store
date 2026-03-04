"use client";

import { Badge } from "@heroui/badge";
import { Button } from "@heroui/react";
import Image from "next/image";

import { useCart } from "@/context/cart";

export const FloatingCartButton = () => {
  const { cart, drawerDisclosure } = useCart();
  const { onOpen } = drawerDisclosure;

  if (!cart) return null;

  return (
    <div className="fixed bottom-6 right-6 drop-shadow-2xl">
      <Badge color="warning" content={cart.totalItems}>
        <Button color="primary" isIconOnly onPress={onOpen} size="lg">
          <Image
            alt="logo"
            height={40}
            preload={true}
            src={"/cart.svg"}
            width={40}
          />
        </Button>
      </Badge>
    </div>
  );
};
