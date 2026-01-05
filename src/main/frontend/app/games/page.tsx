import { Hero } from "@/components/hero";
import { Pagination } from "@/components/pagination";
import { StockItem } from "@/components/stock-item";
import gameWall from "@/public/game-wall.jpg";

export interface Game {
  alt: string;
  description: string;
  id: number;
  image: string;
  name: string;
  platform: string;
  price: number;
}

export default async function Games({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const {
    direction: paramDirection,
    page: paramPage,
    size: paramSize,
    sortBy: paramSortBy,
  } = await searchParams;

  const page = Number(paramPage ?? 0);
  const size = Number(paramSize ?? 9);
  const sortBy = paramSortBy ?? "name";
  const direction = paramDirection ?? "ASC";

  const query = new URLSearchParams({
    direction,
    page: page.toString(),
    size: size.toString(),
    sortBy,
  }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/games?${query}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch games: ${res.status}`);
  }

  const data = await res.json();

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Hero
        alt="games hero"
        headerCopy="Real carts and discs for real hardware"
        image={gameWall}
      />
      <div className="flex flex-wrap justify-center gap-6 p-8">
        {data.content.map((game: Game) => (
          <StockItem
            alt={game.name}
            description={game.description}
            key={game.id}
            name={game.name}
            platform={game.platform}
            price={game.price}
            url={game.image}
          />
        ))}
      </div>
      <div className="mb-8 flex gap-2">
        <Pagination queryString={query} total={data.totalPages} />
      </div>
    </div>
  );
}
