import { Hero } from "@/components/hero";
import gameWall from "@/public/game-wall.jpg";

export default function Games() {
  return (
    <div className="flex flex-col w-full h-full">
      <Hero
        alt="games hero"
        headerCopy="Real carts and discs for real hardware"
        image={gameWall}
      />
    </div>
  );
}
