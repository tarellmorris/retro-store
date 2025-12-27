import { Hero } from "@/components/hero";
import gameWall from "@/public/game-wall.jpg";

export default function Games() {
  return (
    <div className="flex flex-col w-full h-full">
      <Hero
        alt="retro hero"
        headerCopy="A Blast From The Past"
        image={gameWall}
      />
    </div>
  );
}
