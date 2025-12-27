import { Cards } from "@/components/cards";
import { Hero } from "@/components/hero";

import retroSplash from "../public/retro-games-hero.jpg";

export default async function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <Hero
        alt="retro hero"
        headerCopy="A blast from the past"
        image={retroSplash}
      />
      <Cards />
    </div>
  );
}
