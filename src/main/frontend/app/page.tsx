import { CardsBlock } from "@/components/cards-block";
import { Hero } from "@/components/hero";

import cassettes from "../public/cassettes.jpg";
import electronics from "../public/electronics.jpg";
import retroSplash from "../public/retro-games-hero.jpg";
import retroGames from "../public/retro-games.jpg";

const cards = [
  {
    alt: "games",
    ctaText: "Shop",
    ctaURL: "/games",
    description:
      "Search through our collection of second-hand, old school video games",
    headerText: "Video Games",
    image: retroGames,
  },
  {
    alt: "music",
    ctaText: "Browse",
    ctaURL: "/music",
    description: "Browse our on-hand vinyls and cassette tapes",
    headerText: "Music",
    image: cassettes,
  },
  {
    alt: "electronics",
    ctaText: "Explore",
    ctaURL: "/electronics",
    description:
      "VCRs, tape players, and more. Go diving for treasure in our electronics collection",
    headerText: "Electronics",
    image: electronics,
  },
];

export default async function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <Hero
        alt="retro hero"
        headerCopy="A Blast From The Past"
        image={retroSplash}
      />
      <CardsBlock cards={cards} />
    </div>
  );
}
