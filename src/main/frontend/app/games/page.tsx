import { Hero } from "@/components/hero";
import gameWall from "@/public/game-wall.jpg";

export default async function Games() {
  // let gamesList = [];
  try {
    // const res = await fetch("http://backend:8080/games");
    // const data = await res.json();
    // gamesList = data.content;
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
    </div>
  );
}
