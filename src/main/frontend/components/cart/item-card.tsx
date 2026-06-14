"use client";

import {Card, CardBody, CardHeader, NumberInput} from "@heroui/react";
import Image from "next/image";
import {ChangeEvent} from "react";

import {StockItemGame} from "@/@types/stock";
import {useCart} from "@/context/cart";
import {getApiBase} from "@/utils/getApiBase";

export const ItemCard = ({
  id: gameId,
  image,
  name,
  platform,
  price,
  quantity,
}: StockItemGame) => {
  const { fetchCart } = useCart();

  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });

  const apiBase = getApiBase();

  const updateQuantity = async (
    newQuantity: ChangeEvent<HTMLInputElement> | number,
  ) => {
    if (typeof newQuantity != "number") return;
    if (newQuantity < 0) return;

    if (newQuantity === 0) {
      await fetch(`${apiBase}/api/cart/items/${gameId}`, {
        credentials: "include",
        method: "DELETE",
      });
      return await fetchCart();
    }

    await fetch(`${apiBase}/api/cart/items/${gameId}`, {
      body: JSON.stringify({ quantity: newQuantity }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });
    return await fetchCart();
  };

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h3 className="text-xl font-bold">{name}</h3>
        <h4 className="text-md font-semibold">{platform}</h4>
        <p className="font-semibold text-md">{formatter.format(price)}</p>
        <NumberInput
          className="max-w-15"
          onChange={(val) => updateQuantity(val)}
          value={quantity}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="flex w-full bg-linear-65 from-cyan-700/50 to-pink-600/50 rounded-2xl relative h-50 overflow-hidden">
          <Image
            alt={name}
            className="p-4 drop-shadow-sm"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={`/stock/games/${image}`}
            style={{ objectFit: "contain" }}
          />
        </div>
      </CardBody>
    </Card>
  );
};
