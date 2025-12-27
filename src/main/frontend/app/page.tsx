import { CardsBlock } from "@/components/cards-block";
import { Hero } from "@/components/hero";

import retroSplash from "../public/retro-games-hero.jpg";
import retroGames from "../public/retro-games.jpg";

const cards = [
  {
    alt: "retro-games",
    ctaText: "Shop",
    ctaURL: "/retro-games",
    description:
      "Search through our collection of second-hand, old school video games",
    headerText: "Video Game Shop",
    image: retroGames,
  },
];

export default async function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <Hero
        alt="retro hero"
        headerCopy="A blast from the past"
        image={retroSplash}
      />
      <CardsBlock cards={cards} />
    </div>
  );
}
