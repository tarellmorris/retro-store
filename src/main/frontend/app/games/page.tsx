import { Hero } from "@/components/hero";
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

export default async function Games() {
  let gamesList: Game[] = [];
  let page = {};
  try {
    const res = await fetch("http://backend:8080/games");
    const data = await res.json();
    gamesList = data.content;
    page = data.pageable;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Hero
        alt="games hero"
        headerCopy="Real carts and discs for real hardware"
        image={gameWall}
      />
      <div className="flex flex-wrap w-full gap-4 p-8">
        {gamesList.map((game) => (
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
    </div>
  );
}
