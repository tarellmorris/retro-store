"use client";

import { Card, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { AddToCartButton } from "@/components/add-to-cart-button";

type StockItemProps = {
  alt: string;
  description: string;
  id: number;
  name: string;
  platform: string;
  price: number;
  quantity: number;
  url: string;
};

export const StockItem = ({
  alt,
  description,
  id,
  name,
  platform,
  price,
  quantity,
  url,
}: StockItemProps) => {
  const router = useRouter();
  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });

  const routeToDetails = () => router.push(`/details/${id}`);

  return (
    <Card
      className="flex justify-start flex-col w-100 lg:w-75 bg-zinc-50 p-4 rounded-2xl"
      shadow="sm"
    >
      <CardBody className="overflow-visible p-0">
        <div
          className="flex w-full bg-linear-65 from-cyan-700/50 to-pink-600/50 rounded-2xl relative h-50 overflow-hidden cursor-pointer hover:shadow-md"
          onClick={routeToDetails}
        >
          <Image
            alt={alt}
            className="p-4 drop-shadow-sm"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        <div className="flex flex-col">
          <p className="font-normal text-md text-red-500 mt-2">{`In stock`}</p>
          <p className="font-semibold text-md">{`Quantity: ${quantity}`}</p>
        </div>
        <AddToCartButton
          className="mt-3"
          gameId={id}
          quantity={quantity}
        />
      </CardFooter>
    </Card>
  );
};
