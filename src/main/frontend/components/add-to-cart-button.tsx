"use client";

import { Button } from "@heroui/react";

import { useCart } from "@/context/cart";

type AddToCartButtonProps = {
  className?: string;
  gameId: number;
  quantity: number;
};

export const AddToCartButton = ({
  className,
  gameId,
  quantity,
}: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  const isOutOfStock = quantity <= 0;

  return (
    <Button
      className={className}
      color="primary"
      isDisabled={isOutOfStock}
      onPress={() => addToCart({ gameId, quantity: 1 })}
    >
      {isOutOfStock ? "Out of stock" : "Add to cart"}
    </Button>
  );
};
