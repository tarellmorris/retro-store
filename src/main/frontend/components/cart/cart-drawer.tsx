"use client";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/react";
import Image from "next/image";

import { FloatingCartButton } from "@/components/cart/floating-cart-button";
import { ItemCard } from "@/components/cart/item-card";
import { useCart } from "@/context/cart";

export const CartDrawer = () => {
  const { cart, drawerDisclosure } = useCart();
  const { isOpen, onClose } = drawerDisclosure;

  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });

  const isEmpty = !cart?.items?.length;

  if (!isOpen) {
    return <FloatingCartButton />;
  }

  const renderEmptyCartMessage = () => {
    return (
      <div className="flex flex-col scroll-auto gap-2 justify-center align-center h-full w-full">
        <h2 className="text-center text-2xl font-bold">Your cart is empty</h2>
        <Image
          alt="logo"
          className="w-1/2 mx-auto"
          height={40}
          preload={true}
          src={"/tv-black.svg"}
          width={40}
        />
      </div>
    );
  };

  const renderCartContent = () => {
    return (
      <div className="flex flex-col scroll-auto gap-2">
        {cart?.items?.map((item, index) => (
          <ItemCard
            {...item.gameDetails}
            key={index}
            price={item.priceAtAdd}
            quantity={item.quantity}
          />
        ))}
      </div>
    );
  };

  const renderSubtotal = () => {
    if (isEmpty || !cart?.subtotal) return "";

    return (
      <div>
        <p className="font-bold">Subtotal:</p>
        {formatter.format(cart.subtotal)}
      </div>
    );
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              Your cart
            </DrawerHeader>
            <DrawerBody>
              {isEmpty ? renderEmptyCartMessage() : renderCartContent()}
            </DrawerBody>
            <DrawerFooter className="flex flex-col gap-2">
              {renderSubtotal()}
              <div className="flex gap-2 justify-end">
                <Button color="danger" onPress={onClose} variant="light">
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Checkout
                </Button>
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
