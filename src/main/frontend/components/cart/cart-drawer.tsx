"use client";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/react";
import { useEffect } from "react";

import { FloatingCartButton } from "@/components/cart/floating-cart-button";
import { ItemCard } from "@/components/cart/item-card";
import { useCart } from "@/context/cart";

export const CartDrawer = () => {
  const { cartItems, drawerDisclosure, fetchCartItemDetails } = useCart();
  const { isOpen, onClose } = drawerDisclosure;

  useEffect(() => {
    if (!isOpen) return;
    fetchCartItemDetails();
  }, [fetchCartItemDetails, isOpen]);

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
              {cartItems?.map((item, index) => (
                <ItemCard {...item} key={index} />
              ))}
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
