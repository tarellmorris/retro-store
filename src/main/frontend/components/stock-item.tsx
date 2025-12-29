import Image from "next/image";

import { CTAButton } from "@/components/cta-button";

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
    <div className="flex justify-start flex-col flex-1 bg-zinc-50 p-4 rounded-2xl min-w-100 gap-4">
      <div className="flex w-full bg-linear-65 from-cyan-700/50 to-pink-600/50 rounded-2xl relative h-80 overflow-hidden drop-shadow-sm">
        <Image
          alt={alt}
          className="p-4"
          fill={true}
          loading="lazy"
          src={`/stock/games/${url}`}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex flex-col justify-between w-full gap-2">
        <div>
          <h3 className="text-2xl font-bold">{name}</h3>
          <h4 className="text-lg font-semibold">{platform}</h4>
        </div>
        <p className="text-sm">{description}</p>
        <p className="font-semibold text-lg">{formatter.format(price)}</p>
      </div>
      <CTAButton ctaURL="/" text="Add to cart" />
    </div>
  );
};
