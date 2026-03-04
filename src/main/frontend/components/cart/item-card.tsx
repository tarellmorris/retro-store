import { Card, CardBody, CardHeader } from "@heroui/react";
import Image from "next/image";

import { StockItemProps } from "@/@types/stock";

export const ItemCard = ({
  alt,
  description,
  id,
  name,
  platform,
  price,
  quantity,
  url,
}: StockItemProps) => {
  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h3 className="text-xl font-bold">{name}</h3>
        <h4 className="text-md font-semibold">{platform}</h4>
        <p className="text-sm">{description}</p>
        <p className="font-semibold text-md">{formatter.format(price)}</p>
        <div className="flex flex-col">
          <p className="font-normal text-md text-red-500 mt-2">{`In stock`}</p>
          <p className="font-semibold text-md">{`Quantity: ${quantity}`}</p>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
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
    </Card>
  );
};
