import Image from "next/image";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { getApiBase } from "@/utils/getApiBase";

type GameDetails = {
  description: string;
  id: number;
  image: string;
  longDescription: string;
  name: string;
  platform: string;
  price: number;
  quantity: number;
};

export default async function Details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apiBase = getApiBase();

  const res = await fetch(`${apiBase}/api/games/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch game details: ${res.status}`);
  }

  const data = (await res.json()) as GameDetails;
  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });

  return (
    <main className="flex min-h-full w-full justify-center p-8">
      <section className="grid w-full max-w-5xl gap-8 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="relative min-h-80 overflow-hidden rounded-2xl bg-linear-65 from-cyan-700/50 to-pink-600/50">
          <Image
            alt={data.name}
            className="p-8 drop-shadow-sm"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            src={`/stock/games/${data.image}`}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
              {data.platform}
            </p>
            <h1 className="text-4xl font-bold">{data.name}</h1>
          </div>
          <p className="text-lg">{data.description}</p>
          <p className="text-zinc-700">{data.longDescription}</p>
          <p className="text-2xl font-semibold">
            {formatter.format(data.price)}
          </p>
          <p className="font-medium text-red-500">{`Quantity: ${data.quantity}`}</p>
          <AddToCartButton
            className="mt-2 w-fit"
            gameId={data.id}
            quantity={data.quantity}
          />
        </div>
      </section>
    </main>
  );
}
