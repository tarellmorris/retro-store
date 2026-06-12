"use client";

import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCart } from "@/context/cart";

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
  const { fetchCart } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });

  const currentPath = `${pathname}${searchParams.size ? `?${searchParams.toString()}` : ""}`;

  const addToCart = async (data: { gameId: number; quantity: number }) => {
    try {
      const res = await fetch("/api/cart/items", {
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (res.status === 401) {
        router.push(`/login?next=${encodeURIComponent(currentPath)}`);
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to add item to cart: ${res.status}`);
      }

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      className="flex justify-start flex-col w-100 lg:w-75 bg-zinc-50 p-4 rounded-2xl"
      shadow="sm"
    >
      <CardBody className="overflow-visible p-0">
        <div className="flex w-full bg-linear-65 from-cyan-700/50 to-pink-600/50 rounded-2xl relative h-50 overflow-hidden">
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
        <Button
          className="mt-3"
          color="primary"
          onPress={() => addToCart({ gameId: id, quantity: 1 })}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};
