"use client";

import { Card, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";

export interface StockItemProps {
  alt: string;
  description: string;
  name: string;
  platform: string;
  price: number;
  url: string;
}

export const StockItem = ({
  alt,
  description,
  name,
  platform,
  price,
  url,
}: StockItemProps) => {
  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });
  return (
    <Card
      className="flex justify-start flex-col w-150 lg:w-100 bg-zinc-50 p-4 rounded-2xl"
      isPressable
      shadow="sm"
    >
      <CardBody className="overflow-visible p-0">
        <div className="flex w-full bg-linear-65 from-cyan-700/50 to-pink-600/50 rounded-2xl relative h-80 overflow-hidden">
          <Image
            alt={alt}
            className="p-4 drop-shadow-sm"
            fill={true}
            loading="lazy"
            src={`/stock/games/${url}`}
            style={{ objectFit: "contain" }}
          />
        </div>
      </CardBody>
      <CardFooter className="flex flex-col h-full w-full gap-2justify-center items-start text-left">
        <h3 className="text-xl font-bold">{name}</h3>
        <h4 className="text-md font-semibold">{platform}</h4>
        <p className="text-sm">{description}</p>
        <p className="font-semibold text-md">{formatter.format(price)}</p>
      </CardFooter>
    </Card>
  );
};
