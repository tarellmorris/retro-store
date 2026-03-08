"use client";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/react";

import { FloatingCartButton } from "@/components/cart/floating-cart-button";
import { ItemCard } from "@/components/cart/item-card";
import { useCart } from "@/context/cart";

export const CartDrawer = () => {
  const { cart, drawerDisclosure } = useCart();
  const { isOpen, onClose } = drawerDisclosure;

  if (!isOpen) {
    return <FloatingCartButton />;
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              Your cart
            </DrawerHeader>
            <DrawerBody>
              <div className="flex flex-col scroll-auto gap-2">
                {cart?.items?.map((item, index) => (
                  <ItemCard {...item.gameDetails} key={index} />
                ))}
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" onPress={onClose} variant="light">
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Checkout
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
