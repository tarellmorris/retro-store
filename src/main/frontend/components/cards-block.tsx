import { Card, CardProps } from "@/components/card";

interface CardsBlockProps {
  cards: CardProps[];
}

export const CardsBlock = ({ cards }: CardsBlockProps) => {
  return (
    <div className="flex flex-wrap w-full p-16">
      {cards.map((card) => (
        <Card key={`${card.headerText}-${card.alt}`} {...card} />
      ))}
    </div>
  );
};
